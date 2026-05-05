export interface TooltipEntry {
  id:         string;
  el:         HTMLElement;
  title:      string;
  content:    string;
  anchorText: string;
}

function genId(): string {
  return `tt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
}

export class TooltipManager {
  constructor(private container: HTMLElement) {}

  /** 선택 범위를 tooltip span으로 감싼다 */
  insert(title: string, content: string, range: Range): HTMLElement {
    const ownerDoc = this.container.ownerDocument;
    const span = ownerDoc.createElement('span');
    span.className = 'poa-tooltip';
    span.dataset.tooltipId      = genId();
    span.dataset.tooltipTitle   = title;
    span.dataset.tooltipContent = content;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    return span;
  }

  /** contentEl 내 모든 tooltip 반환 */
  getAll(): TooltipEntry[] {
    return Array.from(
      this.container.querySelectorAll<HTMLElement>('.poa-tooltip[data-tooltip-id]'),
    ).map(el => ({
      id:         el.dataset.tooltipId      ?? '',
      el,
      title:      el.dataset.tooltipTitle   ?? '',
      content:    el.dataset.tooltipContent ?? '',
      anchorText: el.textContent            ?? '',
    }));
  }

  update(id: string, title: string, content: string): boolean {
    const el = this._findById(id);
    if (!el) return false;
    el.dataset.tooltipTitle   = title;
    el.dataset.tooltipContent = content;
    return true;
  }

  /** span 제거 — 텍스트 내용은 유지 */
  remove(id: string): boolean {
    const el = this._findById(id);
    if (!el?.parentNode) return false;
    const frag = el.ownerDocument.createDocumentFragment();
    while (el.firstChild) frag.appendChild(el.firstChild);
    el.parentNode.replaceChild(frag, el);
    return true;
  }

  removeAll(): void {
    for (const entry of this.getAll()) this.remove(entry.id);
  }

  private _findById(id: string): HTMLElement | null {
    return Array.from(
      this.container.querySelectorAll<HTMLElement>('.poa-tooltip[data-tooltip-id]'),
    ).find(el => el.dataset.tooltipId === id) ?? null;
  }

  // ── 정적 헬퍼 ────────────────────────────────────────────────────────────

  static injectStyles(): void {
    if (document.getElementById('poa-tooltip-styles')) return;
    const style = document.createElement('style');
    style.id = 'poa-tooltip-styles';
    style.textContent = [
      '.poa-tooltip {',
      '  cursor: help;',
      '  border-bottom: 1.5px dotted #6b7280;',
      '}',
      '.poa-tooltip-popup {',
      '  position: fixed;',
      '  background: #1F2937;',
      '  color: #fff;',
      '  border-radius: 6px;',
      '  padding: 8px 12px;',
      '  font-size: 13px;',
      '  max-width: 240px;',
      '  line-height: 1.5;',
      '  pointer-events: none;',
      '  z-index: 99999;',
      '  box-shadow: 0 4px 12px rgba(0,0,0,.3);',
      '  word-break: break-word;',
      '  white-space: pre-wrap;',
      '}',
      '.poa-tooltip-popup-title {',
      '  font-weight: 500;',
      '  margin-bottom: 4px;',
      '}',
      '.poa-tooltip-popup-body {',
      '  color: #D1D5DB;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  /** contentEl에 hover 팝업 핸들러를 연결 */
  static attachHoverPopup(container: HTMLElement): void {
    let popup: HTMLDivElement | null = null;

    container.addEventListener('mouseover', (e) => {
      const target = (e.target as Element).closest<HTMLElement>('.poa-tooltip');
      if (!target) return;
      popup?.remove();

      const titleText   = target.dataset.tooltipTitle   ?? '';
      const contentText = target.dataset.tooltipContent ?? '';
      if (!contentText) return;

      popup = document.createElement('div');
      popup.className = 'poa-tooltip-popup';

      if (titleText) {
        const h = document.createElement('div');
        h.className = 'poa-tooltip-popup-title';
        h.textContent = titleText;
        popup.appendChild(h);
      }
      const c = document.createElement('div');
      c.className = 'poa-tooltip-popup-body';
      c.textContent = contentText;
      popup.appendChild(c);

      popup.style.visibility = 'hidden';
      document.body.appendChild(popup);

      const rect = target.getBoundingClientRect();
      const pw   = popup.offsetWidth;
      const ph   = popup.offsetHeight;
      let left = rect.left + rect.width / 2 - pw / 2;
      let top  = rect.top  - ph - 8;
      left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
      if (top < 0) top = rect.bottom + 8;
      popup.style.left       = `${left}px`;
      popup.style.top        = `${top}px`;
      popup.style.visibility = '';
    });

    container.addEventListener('mouseout', (e) => {
      if (!(e.target as Element).closest('.poa-tooltip')) return;
      popup?.remove();
      popup = null;
    });
  }
}
