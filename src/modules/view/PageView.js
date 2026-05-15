import { eventBus, BusEvent } from '../../utils/eventBus.js';
/** A4 210mm × 297mm at 96 dpi */
const PAGE_W_PX = 794;
const PAGE_H_PX = 1123;
/** 페이지 사이 간격 (px) */
const PAGE_GAP = 24;
const DEFAULT_MARGIN = { top: 60, right: 80, bottom: 60, left: 80 };
const PRINT_STYLE_ID = 'poa-print-styles';
/**
 * A4 용지 렌더링 뷰.
 *
 * mount(container, html, bookmarks, margin?): 컨테이너에 페이지 렌더링
 * unmount(): DOM 정리 및 인쇄 스타일 제거
 */
export class PageView {
    container = null;
    mount(container, html, bookmarks = [], margin = DEFAULT_MARGIN) {
        this.container = container;
        container.innerHTML = '';
        // Main scroll area
        const main = document.createElement('div');
        main.className = 'poa-page-main';
        main.style.cssText =
            'flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;align-items:center;background:#e8e8e8;';
        this.injectPrintStyles(margin);
        const pages = this.splitByPageBreaks(html);
        for (const pageHtml of pages) {
            main.appendChild(this.buildPage(pageHtml, margin));
        }
        container.appendChild(main);
        // Bookmark sidebar (only when bookmarks exist)
        if (bookmarks.length > 0) {
            container.appendChild(this.buildSidebar(bookmarks));
        }
    }
    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
            this.container = null;
        }
        document.getElementById(PRINT_STYLE_ID)?.remove();
    }
    getPageCount(html) {
        return this.splitByPageBreaks(html).length;
    }
    // ── private ──────────────────────────────────────────────────────────────
    buildPage(html, margin) {
        const page = document.createElement('div');
        page.className = 'poa-a4-page';
        page.style.cssText = [
            `width:${PAGE_W_PX}px`,
            `min-height:${PAGE_H_PX}px`,
            'background:#fff',
            'box-shadow:0 2px 8px rgba(0,0,0,.2)',
            `padding:${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
            'box-sizing:border-box',
            'margin-bottom:20px',
            'position:relative',
            'font-size:14px',
            'line-height:1.6',
        ].join(';');
        page.innerHTML = html;
        return page;
    }
    buildSidebar(bookmarks) {
        const sidebar = document.createElement('div');
        sidebar.className = 'poa-page-sidebar';
        sidebar.style.cssText = [
            'width:180px', 'flex-shrink:0', 'overflow-y:auto',
            'background:#fafafa', 'border-left:1px solid #ddd', 'padding:12px',
        ].join(';');
        const title = document.createElement('div');
        title.style.cssText =
            'font-size:12px;font-weight:600;color:#555;margin-bottom:8px;' +
                'padding-bottom:6px;border-bottom:1px solid #eee;';
        title.textContent = '책갈피';
        sidebar.appendChild(title);
        for (const bm of bookmarks) {
            const a = document.createElement('a');
            a.href = `#${bm.id}`;
            a.textContent = bm.label;
            a.style.cssText =
                'display:block;font-size:12px;color:#1976d2;text-decoration:none;' +
                    'padding:5px 0;border-bottom:1px solid #f0f0f0;';
            a.addEventListener('mouseenter', () => { a.style.textDecoration = 'underline'; });
            a.addEventListener('mouseleave', () => { a.style.textDecoration = 'none'; });
            sidebar.appendChild(a);
        }
        return sidebar;
    }
    splitByPageBreaks(html) {
        // <hr class="poa-page-break"> 또는 <div class="poa-page-break">...</div> 전체 매칭
        const pattern = /<hr[^>]*class="[^"]*poa-page-break[^"]*"[^>]*\/?>|<div[^>]*class="[^"]*poa-page-break[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
        const parts = html.split(pattern);
        return parts.length > 0 ? parts : [html];
    }
    injectPrintStyles(margin) {
        if (document.getElementById(PRINT_STYLE_ID))
            return;
        const style = document.createElement('style');
        style.id = PRINT_STYLE_ID;
        style.textContent = `
@media print {
  body > *:not(poa-editor) { display: none !important; }
  poa-editor { all: unset; display: block; }
  .poa-page-sidebar { display: none; }
  .poa-a4-page {
    page-break-after: always;
    box-shadow: none !important;
    margin: 0 !important;
    padding: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px !important;
  }
  hr.poa-page-break { display: none; }
}
`;
        document.head.appendChild(style);
    }
}
/**
 * 커서 위치에 페이지 구분선을 삽입한다.
 * contentEditable 환경에서 호출한다.
 */
export function insertPageBreak(contentEl) {
    const ownerDoc = contentEl.ownerDocument;
    const sel = ownerDoc.getSelection();
    let range;
    if (sel && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
    }
    else {
        range = ownerDoc.createRange();
        range.selectNodeContents(contentEl);
        range.collapse(false);
    }
    range.deleteContents();
    // 페이지 구분선 div 생성
    const pb = ownerDoc.createElement('div');
    pb.className = 'poa-page-break';
    pb.contentEditable = 'false';
    const label = ownerDoc.createElement('span');
    label.className = 'poa-page-break-label';
    label.textContent = '페이지 나누기';
    pb.appendChild(label);
    // 구분선 다음에 커서가 위치할 빈 단락 생성
    const after = ownerDoc.createElement('p');
    after.appendChild(ownerDoc.createElement('br'));
    // 삽입: 현재 블록 경계를 찾아 그 뒤에 삽입
    const block = findBlockAncestor(range.startContainer, contentEl);
    if (block && block !== contentEl) {
        block.after(pb, after);
    }
    else {
        range.insertNode(after);
        range.insertNode(pb);
    }
    // 커서를 빈 단락으로 이동
    const newRange = ownerDoc.createRange();
    newRange.setStart(after, 0);
    newRange.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(newRange);
    eventBus.emit(BusEvent.FILE_DIRTY, true);
    contentEl.dispatchEvent(new Event('input', { bubbles: true }));
}
/**
 * 디자인 모드에서 A4 페이지 경계를 CSS background-image 로 표시한다.
 *
 * - repeating-linear-gradient + background-attachment:local 방식 사용
 *   → DOM 오버레이 없이 항상 올바르게 렌더링
 * - PaperSizeManager.applyToEditor() 는 background-color 만 사용하므로
 *   background-image 는 덮어쓰이지 않음
 * - MutationObserver + ResizeObserver 로 페이지 수 변경 시 상태바 업데이트
 */
export class PageGuide {
    contentEl = null;
    pageHeightPx = 1123; // A4 기본값
    lastPageCount = 0;
    renderTimer = null;
    mutationObserver = new MutationObserver(() => {
        this.scheduleRender();
    });
    resizeObserver = new ResizeObserver(() => {
        this.scheduleRender();
    });
    attach(contentEl) {
        this.detach();
        this.contentEl = contentEl;
        this.applyBackground();
        this.mutationObserver.observe(contentEl, {
            childList: true, subtree: true, characterData: true,
        });
        this.resizeObserver.observe(contentEl);
        this.render();
    }
    detach() {
        this.mutationObserver.disconnect();
        this.resizeObserver.disconnect();
        this.removeBackground();
        this.contentEl = null;
        if (this.renderTimer !== null) {
            clearTimeout(this.renderTimer);
            this.renderTimer = null;
        }
    }
    setPageSize(pageHeightPx) {
        if (this.pageHeightPx === pageHeightPx)
            return;
        this.pageHeightPx = pageHeightPx;
        this.applyBackground();
        this.render();
    }
    getPageCount() {
        if (!this.contentEl || this.pageHeightPx <= 0)
            return 1;
        return Math.max(1, Math.ceil(this.contentEl.scrollHeight / this.pageHeightPx));
    }
    getCurrentPage(anchorNode) {
        if (!this.contentEl || this.pageHeightPx <= 0)
            return 1;
        try {
            const ownerDoc = this.contentEl.ownerDocument;
            const range = ownerDoc.createRange();
            range.setStart(anchorNode, 0);
            range.collapse(true);
            const rect = range.getBoundingClientRect();
            const containerRect = this.contentEl.getBoundingClientRect();
            const scale = this.contentEl.offsetWidth > 0
                ? containerRect.width / this.contentEl.offsetWidth
                : 1;
            const unscaledOffsetY = (rect.top - containerRect.top) / scale;
            return Math.max(1, Math.floor(unscaledOffsetY / this.pageHeightPx) + 1);
        }
        catch {
            return 1;
        }
    }
    // ── CSS background 적용/제거 ────────────────────────────────────────────────
    applyBackground() {
        if (!this.contentEl)
            return;
        const h = this.pageHeightPx;
        const gap = PAGE_GAP; // 24px 회색 밴드
        // background-attachment:local → contentEl 이 scroll container 가 아니더라도
        // 부모 스크롤 시 contentEl 과 함께 이동(= scroll 과 동일 동작). 항상 올바르게 표시됨.
        this.contentEl.style.backgroundImage =
            `repeating-linear-gradient(` +
                `to bottom,` +
                `transparent 0px,` +
                `transparent ${h - gap}px,` +
                `#E5E7EB ${h - gap}px,` +
                `#E5E7EB ${h}px` +
                `)`;
        this.contentEl.style.backgroundSize = `100% ${h}px`;
        this.contentEl.style.backgroundAttachment = 'local';
    }
    removeBackground() {
        if (!this.contentEl)
            return;
        this.contentEl.style.backgroundImage = '';
        this.contentEl.style.backgroundSize = '';
        this.contentEl.style.backgroundAttachment = '';
    }
    // ── 페이지 수 업데이트 ──────────────────────────────────────────────────────
    scheduleRender() {
        if (this.renderTimer !== null)
            clearTimeout(this.renderTimer);
        this.renderTimer = setTimeout(() => {
            this.renderTimer = null;
            this.render();
        }, 100);
    }
    render() {
        if (!this.contentEl)
            return;
        const totalPages = this.getPageCount();
        // contentEl 최소 높이를 페이지 배수로 유지해 마지막 페이지가 잘리지 않게 한다.
        const newMinH = `${totalPages * this.pageHeightPx}px`;
        if (this.contentEl.style.minHeight !== newMinH) {
            this.contentEl.style.minHeight = newMinH;
        }
        if (totalPages !== this.lastPageCount) {
            this.lastPageCount = totalPages;
            eventBus.emit(BusEvent.PAGE_UPDATED, { total: totalPages });
        }
    }
}
function findBlockAncestor(node, root) {
    const BLOCK = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'BLOCKQUOTE', 'LI', 'TD', 'TH', 'PRE']);
    let cur = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    while (cur && cur !== root) {
        if (cur.nodeType === Node.ELEMENT_NODE && BLOCK.has(cur.tagName)) {
            return cur;
        }
        cur = cur.parentNode;
    }
    return null;
}
