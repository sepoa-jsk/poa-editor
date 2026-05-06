import { PAPER_SIZES } from '../modules/view/PaperSizeManager.js';

export class PoaStatusBar extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    const paperOptions = PAPER_SIZES.map(p =>
      `<option value="${p.id}">${p.id}</option>`
    ).join('');

    const zoomOptions = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 175, 200].map(v =>
      `<option value="${v}">${v}%</option>`
    ).join('');

    this.shadow.innerHTML = `
<style>
:host { display: block; box-sizing: border-box; }
.bar {
  display: flex; align-items: center; gap: 8px;
  padding: 3px 12px;
  background: var(--poa-statusbar-bg, #f5f5f5);
  border-top: 1px solid var(--poa-toolbar-border, #ddd);
  font-size: 11px; color: var(--poa-statusbar-color, #777);
  user-select: none; -webkit-user-select: none;
}
.sep { width: 1px; height: 14px; background: #ddd; margin: 0 4px; }
.poa-paper-select,
.poa-zoom-select {
  height: 20px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 11px; background: #fff; color: #555;
  padding: 0 2px; cursor: pointer;
}
.poa-zoom-btn {
  width: 20px; height: 20px; border: 1px solid #ccc; border-radius: 3px;
  background: #fff; color: #555; font-size: 14px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 0; flex-shrink: 0;
}
.poa-zoom-btn:hover { background: #eef3ff; border-color: #aab; }
</style>
<div class="bar">
  <span id="char-count">0자</span>
  <span id="word-count">0단어</span>
  <div class="sep"></div>
  <select id="paper-select" class="poa-paper-select" title="용지 크기">
    ${paperOptions}
  </select>
  <div class="sep"></div>
  <button id="zoom-out" class="poa-zoom-btn" title="축소 (Ctrl+-)">−</button>
  <select id="zoom-select" class="poa-zoom-select" title="확대/축소">
    ${zoomOptions}
  </select>
  <button id="zoom-in" class="poa-zoom-btn" title="확대 (Ctrl+=)">+</button>
</div>`;

    const paperSel  = this.shadow.getElementById('paper-select') as HTMLSelectElement;
    const zoomSel   = this.shadow.getElementById('zoom-select')  as HTMLSelectElement;
    const zoomInBtn = this.shadow.getElementById('zoom-in')      as HTMLButtonElement;
    const zoomOutBtn = this.shadow.getElementById('zoom-out')    as HTMLButtonElement;

    // 기본값 설정
    paperSel.value = 'A4';
    zoomSel.value  = '100';

    paperSel.addEventListener('change', () => {
      this.dispatchAction('paper:size', paperSel.value);
    });
    zoomSel.addEventListener('change', () => {
      this.dispatchAction('paper:zoom', zoomSel.value);
    });
    zoomInBtn.addEventListener('click',  () => this.dispatchAction('paper:zoom-in'));
    zoomOutBtn.addEventListener('click', () => this.dispatchAction('paper:zoom-out'));
  }

  update(html: string): void {
    const charEl = this.shadow.getElementById('char-count');
    const wordEl = this.shadow.getElementById('word-count');
    if (!charEl || !wordEl) return;

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent ?? '';

    const charCount = [...text.replace(/\s/g, '')].length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    charEl.textContent = `${charCount}자`;
    wordEl.textContent = `${wordCount}단어`;
  }

  /** PaperSizeManager 가 발행하는 paper-change 이벤트를 수신해 UI 동기화 */
  syncPaper(e: CustomEvent): void {
    const { size, zoom } = e.detail as { size: { id: string }; zoom: number };
    const paperSel = this.shadow.getElementById('paper-select') as HTMLSelectElement | null;
    const zoomSel  = this.shadow.getElementById('zoom-select')  as HTMLSelectElement | null;
    if (paperSel) paperSel.value = size.id;
    if (zoomSel)  zoomSel.value  = String(zoom);
  }

  private dispatchAction(type: string, value?: string): void {
    this.dispatchEvent(new CustomEvent('poa-action', {
      bubbles: true, composed: true,
      detail: { type, ...(value !== undefined ? { value } : {}) },
    }));
  }
}
