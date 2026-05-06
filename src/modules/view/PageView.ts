import { eventBus, BusEvent } from '../../utils/eventBus.js';
import type { BookmarkEntry } from '../insert/BookmarkManager.js';

/** A4 210mm × 297mm at 96 dpi */
const PAGE_W_PX  = 794;
const PAGE_H_PX  = 1123;

export interface PageMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const DEFAULT_MARGIN: PageMargin = { top: 60, right: 80, bottom: 60, left: 80 };

const PRINT_STYLE_ID = 'poa-print-styles';

/**
 * A4 용지 렌더링 뷰.
 *
 * mount(container, html, bookmarks, margin?): 컨테이너에 페이지 렌더링
 * unmount(): DOM 정리 및 인쇄 스타일 제거
 */
export class PageView {
  private container: HTMLElement | null = null;

  mount(
    container: HTMLElement,
    html: string,
    bookmarks: BookmarkEntry[] = [],
    margin: PageMargin = DEFAULT_MARGIN,
  ): void {
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

  unmount(): void {
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
    document.getElementById(PRINT_STYLE_ID)?.remove();
  }

  getPageCount(html: string): number {
    return this.splitByPageBreaks(html).length;
  }

  // ── private ──────────────────────────────────────────────────────────────

  private buildPage(html: string, margin: PageMargin): HTMLDivElement {
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

  private buildSidebar(bookmarks: BookmarkEntry[]): HTMLDivElement {
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
      a.href      = `#${bm.id}`;
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

  private splitByPageBreaks(html: string): string[] {
    // <hr class="poa-page-break"> 또는 <div class="poa-page-break">...</div> 전체 매칭
    const pattern = /<hr[^>]*class="[^"]*poa-page-break[^"]*"[^>]*\/?>|<div[^>]*class="[^"]*poa-page-break[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
    const parts = html.split(pattern);
    return parts.length > 0 ? parts : [html];
  }

  private injectPrintStyles(margin: PageMargin): void {
    if (document.getElementById(PRINT_STYLE_ID)) return;
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
export function insertPageBreak(contentEl: HTMLElement): void {
  const ownerDoc = contentEl.ownerDocument;
  const sel = ownerDoc.getSelection();

  let range: Range;
  if (sel && sel.rangeCount > 0) {
    range = sel.getRangeAt(0);
  } else {
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
  } else {
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

function findBlockAncestor(node: Node, root: HTMLElement): HTMLElement | null {
  const BLOCK = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'BLOCKQUOTE', 'LI', 'TD', 'TH', 'PRE']);
  let cur: Node | null = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  while (cur && cur !== root) {
    if (cur.nodeType === Node.ELEMENT_NODE && BLOCK.has((cur as HTMLElement).tagName)) {
      return cur as HTMLElement;
    }
    cur = cur.parentNode;
  }
  return null;
}
