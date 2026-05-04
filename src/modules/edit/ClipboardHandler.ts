import { sanitize } from '../../utils/dom';

export interface ClipboardHandlerOptions {
  /** 붙여넣기 완료 후 호출되는 콜백 — 히스토리 캡처 등에 사용 */
  onPaste?: (html: string) => void;
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

/**
 * contenteditable 요소의 붙여넣기 이벤트를 가로채
 * HTML은 DOMPurify로 정제하고, 일반 텍스트는 단락으로 변환하여 Selection API로 삽입.
 * execCommand 미사용.
 */
export class ClipboardHandler {
  private readonly root: HTMLElement;
  private readonly options: ClipboardHandlerOptions;

  private readonly pasteHandler = (e: ClipboardEvent): void => {
    e.preventDefault();
    const rawHtml = e.clipboardData?.getData('text/html') ?? '';
    const rawText = e.clipboardData?.getData('text/plain') ?? '';

    if (!rawHtml && !rawText) return;
    const html = rawHtml ? sanitize(rawHtml) : plainToHtml(rawText);
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
