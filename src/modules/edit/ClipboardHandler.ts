import DOMPurify from 'dompurify';
import { sanitize } from '../../utils/dom';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp',
]);

export interface ClipboardHandlerOptions {
  /** 붙여넣기 완료 후 호출되는 콜백 — 히스토리 캡처 등에 사용 */
  onPaste?: (html: string) => void;
  /** 이미지 붙여넣기 완료 후 호출 — 히스토리 캡처에 사용 */
  onPasteImage?: () => void;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function plainToHtml(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      const t = line.trim();
      return t === '' ? '<br>' : `<p>${escapeHtml(t)}</p>`;
    })
    .join('');
}

/** 엑셀/스프레드시트에서 붙여넣은 표 HTML에 기본 선·패딩 스타일 적용 */
function fixTableStyles(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('table').forEach((table) => {
    table.style.borderCollapse = 'collapse';
    if (!table.style.width) table.style.width = '100%';
    if (!table.style.border && !table.getAttribute('border')) {
      table.style.border = '1px solid #000000';
    }
  });

  doc.querySelectorAll<HTMLElement>('td, th').forEach((cell) => {
    if (!cell.style.border && !cell.style.borderTop) {
      cell.style.border = '1px solid #000000';
    }
    if (!cell.style.padding) {
      cell.style.padding = '4px 8px';
    }
  });

  return doc.body.innerHTML;
}

/** 표 관련 속성을 허용하는 DOMPurify 설정으로 정제 */
function sanitizeWithTable(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['style', 'border', 'width', 'height', 'colspan', 'rowspan', 'cellpadding', 'cellspacing'],
    ADD_TAGS: ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'colgroup', 'col'],
  });
}

/**
 * contenteditable 요소의 붙여넣기 이벤트를 가로채
 * - 이미지: FileReader Base64 변환 후 커서 위치에 <img> 삽입
 * - 표 HTML: 기본 border/padding 스타일 보정 후 DOMPurify 정제
 * - 일반 HTML: DOMPurify 정제
 * - 평문: 단락으로 변환 후 Selection API로 삽입
 * execCommand 미사용.
 */
export class ClipboardHandler {
  private readonly root: HTMLElement;
  private readonly options: ClipboardHandlerOptions;

  private readonly pasteHandler = (e: ClipboardEvent): void => {
    const items = e.clipboardData?.items;

    // ── 1. 이미지 우선 처리 ─────────────────────────────────────────
    if (items) {
      for (const item of Array.from(items)) {
        if (ALLOWED_IMAGE_TYPES.has(item.type)) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          const reader = new FileReader();
          reader.onload = (ev) => {
            const base64 = ev.target?.result as string;
            if (!base64) return;

            const ownerDoc = this.root.ownerDocument;
            const img = ownerDoc.createElement('img');
            img.src = base64;
            img.style.maxWidth = '100%';
            img.alt = '붙여넣기 이미지';

            const sel = ownerDoc.getSelection();
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode(img);
              range.setStartAfter(img);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            } else {
              this.root.appendChild(img);
            }

            this.options.onPasteImage?.();
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    }

    // ── 2. HTML / 텍스트 처리 ──────────────────────────────────────
    e.preventDefault();
    const rawHtml = e.clipboardData?.getData('text/html') ?? '';
    const rawText = e.clipboardData?.getData('text/plain') ?? '';

    if (!rawHtml && !rawText) return;

    let html: string;
    if (rawHtml) {
      html = rawHtml.includes('<table')
        ? sanitizeWithTable(fixTableStyles(rawHtml))
        : sanitize(rawHtml);
    } else {
      html = plainToHtml(rawText);
    }
    if (!html) return;

    this.insertAtCursor(html);
    this.options.onPaste?.(html);
  };

  constructor(root: HTMLElement, options: ClipboardHandlerOptions = {}) {
    this.root = root;
    this.options = options;
  }

  register(): void {
    this.root.addEventListener('paste', this.pasteHandler);
  }

  unregister(): void {
    this.root.removeEventListener('paste', this.pasteHandler);
  }

  private insertAtCursor(html: string): void {
    const ownerDoc = this.root.ownerDocument;
    const sel = ownerDoc.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const fragment = range.createContextualFragment(html);
    const lastNode = fragment.lastChild;
    range.insertNode(fragment);

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}
