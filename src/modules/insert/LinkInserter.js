const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
/**
 * URL 유효성 검사 — 허용 프로토콜(http/https/mailto/tel)과 내부 책갈피(#)만 통과.
 * javascript: 등 위험 프로토콜은 명시적으로 차단한다.
 */
export function validateLinkUrl(url) {
    if (url.startsWith('#'))
        return url.length > 1;
    try {
        const parsed = new URL(url);
        return ALLOWED_PROTOCOLS.has(parsed.protocol);
    }
    catch {
        return false;
    }
}
/**
 * contenteditable 루트에 하이퍼링크를 삽입·수정·제거한다.
 * - target="_blank" 설정 시 rel="noopener noreferrer" 자동 주입
 * - Selection API 사용 (execCommand 미사용)
 */
export class LinkInserter {
    root;
    savedRange = null;
    constructor(root) {
        this.root = root;
    }
    /** 다이얼로그를 열기 전에 현재 선택 범위를 저장 */
    saveSelection() {
        const sel = this.root.ownerDocument.getSelection();
        if (sel && sel.rangeCount > 0) {
            this.savedRange = sel.getRangeAt(0).cloneRange();
        }
    }
    /**
     * 커서/선택 영역에 링크를 삽입한다.
     * 선택 텍스트가 있으면 해당 텍스트를 링크로, 없으면 attrs.text를 사용한다.
     */
    insertLink(attrs) {
        if (!validateLinkUrl(attrs.href)) {
            throw new Error('유효하지 않은 URL입니다.');
        }
        const doc = this.root.ownerDocument;
        const anchor = doc.createElement('a');
        anchor.href = attrs.href;
        if (attrs.title)
            anchor.title = attrs.title;
        if (attrs.target === '_blank') {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
        }
        // savedRange에 선택 텍스트가 있으면 그것을 링크 텍스트로 사용
        const rangeText = this.savedRange?.toString().trim();
        anchor.textContent = rangeText || attrs.text.trim() || attrs.href;
        if (attrs.target === '_self')
            anchor.target = '_self';
        this.insertNode(anchor);
    }
    /** 기존 <a> 엘리먼트의 속성을 업데이트한다 */
    updateLink(anchor, attrs) {
        if (attrs.href !== undefined) {
            if (!validateLinkUrl(attrs.href))
                throw new Error('유효하지 않은 URL입니다.');
            anchor.href = attrs.href;
        }
        if (attrs.text !== undefined)
            anchor.textContent = attrs.text;
        if (attrs.title !== undefined)
            anchor.title = attrs.title;
        if (attrs.target !== undefined) {
            if (attrs.target === '_blank') {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }
            else {
                anchor.target = '_self';
                anchor.removeAttribute('rel');
            }
        }
    }
    /** <a>를 제거하고 내부 텍스트 노드를 그 자리에 남긴다 */
    removeLink(anchor) {
        const parent = anchor.parentNode;
        if (!parent)
            return;
        while (anchor.firstChild) {
            parent.insertBefore(anchor.firstChild, anchor);
        }
        parent.removeChild(anchor);
    }
    /** 현재 커서 위치에서 가장 가까운 <a>를 반환한다 */
    getFocusedAnchor() {
        const sel = this.root.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0)
            return null;
        let node = sel.getRangeAt(0).startContainer;
        while (node && node !== this.root) {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    insertNode(node) {
        const doc = this.root.ownerDocument;
        const sel = doc.getSelection();
        let range;
        if (this.savedRange) {
            range = this.savedRange.cloneRange();
            this.savedRange = null;
        }
        else if (sel && sel.rangeCount > 0) {
            range = sel.getRangeAt(0);
        }
        else {
            range = doc.createRange();
            range.selectNodeContents(this.root);
            range.collapse(false);
        }
        range.deleteContents();
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
}
