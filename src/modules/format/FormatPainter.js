const INLINE_PROPS = [
    'font-family', 'font-size', 'font-weight', 'font-style',
    'text-decoration', 'color', 'background-color',
    'letter-spacing', 'line-height',
];
/** 인라인 서식 태그 (unwrap 대상) */
const FORMAT_TAGS = new Set(['strong', 'em', 'u', 's', 'sup', 'sub', 'span']);
/**
 * 서식 복사/붙여넣기/제거 기능을 담당한다.
 *
 * - copy(): 현재 커서/선택 위치에서 인라인 스타일을 수집하고 페인터 모드 활성화
 * - paste(): 저장된 스타일을 현재 선택 영역에 적용
 * - clear(): 선택 영역의 모든 인라인 서식 제거 (순수 텍스트만 유지)
 * - 페인터 활성 중 mouseup → 자동 paste → 비연속 모드면 자동 해제
 * - ESC → 페인터 모드 해제
 */
export class FormatPainter {
    contentEl;
    cb;
    savedStyles = new Map();
    _active = false;
    _continuous = false;
    constructor(contentEl, callbacks = {}) {
        this.contentEl = contentEl;
        this.cb = callbacks;
    }
    get isActive() { return this._active; }
    get hasSavedStyles() { return this.savedStyles.size > 0; }
    // ── 공개 API ────────────────────────────────────────────────────
    /**
     * 현재 커서/선택 시작 지점의 인라인 스타일을 수집하고 페인터 모드를 활성화한다.
     * @param continuous true이면 ESC로만 해제되는 연속 적용 모드
     */
    copy(continuous = false) {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        const range = sel.getRangeAt(0);
        this.collectStyles(range.startContainer);
        this._active = continuous ? true : true;
        this._continuous = continuous;
        this.contentEl.style.cursor = 'crosshair';
        this.cb.onModeChange?.(true);
    }
    /**
     * 현재 선택 영역(또는 전달된 range)에 저장된 스타일을 적용한다.
     * 비연속 모드에서는 적용 후 페인터 모드를 자동 해제한다.
     */
    paste(range) {
        if (this.savedStyles.size === 0)
            return;
        const sel = this.contentEl.ownerDocument.getSelection();
        const r = range ?? (sel?.rangeCount ? sel.getRangeAt(0) : null);
        if (!r || r.collapsed)
            return;
        const ownerDoc = this.contentEl.ownerDocument;
        const span = ownerDoc.createElement('span');
        this.savedStyles.forEach((val, prop) => span.style.setProperty(prop, val));
        const fragment = r.extractContents();
        span.appendChild(fragment);
        r.insertNode(span);
        if (sel) {
            sel.removeAllRanges();
            const newRange = ownerDoc.createRange();
            newRange.selectNodeContents(span);
            sel.addRange(newRange);
        }
        if (!this._continuous)
            this.deactivate();
    }
    /**
     * 선택 영역의 모든 인라인 서식을 제거한다.
     * span/strong/em/u/s 태그를 언래핑하고 style 속성을 초기화한다.
     */
    clear(range) {
        const sel = this.contentEl.ownerDocument.getSelection();
        const r = range ?? (sel?.rangeCount ? sel.getRangeAt(0) : null);
        if (!r || r.collapsed)
            return;
        // 선택 범위를 DocumentFragment로 추출한 뒤 인라인 태그를 평탄화
        const fragment = r.cloneContents();
        this.flattenInlineElements(fragment);
        const text = fragment.textContent ?? r.toString();
        r.deleteContents();
        r.insertNode(this.contentEl.ownerDocument.createTextNode(text));
        if (sel) {
            sel.removeAllRanges();
            const newRange = this.contentEl.ownerDocument.createRange();
            newRange.setStart(r.startContainer, r.startOffset);
            newRange.collapse(true);
            sel.addRange(newRange);
        }
    }
    /** 페인터 모드를 해제한다 */
    deactivate() {
        if (!this._active)
            return;
        this._active = false;
        this._continuous = false;
        this.contentEl.style.cursor = '';
        this.cb.onModeChange?.(false);
    }
    // ── 이벤트 훅 ────────────────────────────────────────────────────
    /** contentEl mouseup 이벤트에 연결: 페인터 활성 중 선택 완료 시 자동 paste */
    handleMouseUp() {
        if (!this._active)
            return;
        const sel = this.contentEl.ownerDocument.getSelection();
        if (sel && !sel.isCollapsed)
            this.paste();
    }
    /** keydown 이벤트에 연결: ESC → 페인터 해제 */
    handleKeydown(e) {
        if (e.key === 'Escape' && this._active) {
            e.preventDefault();
            this.deactivate();
        }
    }
    // ── 내부 헬퍼 ────────────────────────────────────────────────────
    collectStyles(node) {
        this.savedStyles.clear();
        let cur = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
        while (cur && cur !== this.contentEl) {
            if (cur.nodeType === Node.ELEMENT_NODE) {
                const el = cur;
                for (const prop of INLINE_PROPS) {
                    if (!this.savedStyles.has(prop)) {
                        const val = el.style.getPropertyValue(prop);
                        if (val)
                            this.savedStyles.set(prop, val);
                    }
                }
            }
            cur = cur.parentNode;
        }
    }
    flattenInlineElements(node) {
        const children = Array.from(node.childNodes);
        for (const child of children) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                const el = child;
                if (FORMAT_TAGS.has(el.tagName.toLowerCase())) {
                    // 인라인 태그: 자식을 끌어올리고 태그 제거
                    this.flattenInlineElements(el);
                    while (el.firstChild)
                        node.insertBefore(el.firstChild, el);
                    node.removeChild(el);
                }
                else {
                    this.flattenInlineElements(el);
                }
            }
        }
    }
}
