import { PAPER_SIZES, DEFAULT_MARGIN } from '../modules/view/PaperSizeManager.js';
import type { PageMargin } from '../modules/view/PaperSizeManager.js';

export class PoaStatusBar extends HTMLElement {
  private shadow: ShadowRoot;
  private docClickHandler: ((e: MouseEvent) => void) | null = null;

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

    const dm = DEFAULT_MARGIN;

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
  position: relative;
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
/* ── 여백 버튼 ─────────────────────────────────────── */
.poa-margin-btn {
  height: 20px; border: 1px solid #ccc; border-radius: 3px;
  background: #fff; color: #555; font-size: 11px;
  padding: 0 6px; cursor: pointer; flex-shrink: 0;
  white-space: nowrap;
}
.poa-margin-btn:hover { background: #eef3ff; border-color: #aab; }
/* ── 여백 팝오버 ────────────────────────────────────── */
.margin-popup {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 10px 12px;
  z-index: 200;
  min-width: 180px;
  font-size: 12px;
  color: #374151;
}
.margin-popup.hidden { display: none; }
.margin-popup-title {
  font-weight: 600; font-size: 11px; color: #6b7280;
  margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em;
}
.margin-row {
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 5px;
}
.margin-row label {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: #374151; user-select: none;
  width: 20px; justify-content: flex-end; flex-shrink: 0;
}
.margin-input {
  width: 52px; height: 22px; padding: 0 4px;
  border: 1px solid #d1d5db; border-radius: 4px;
  font-size: 12px; text-align: right; box-sizing: border-box;
  color: #111;
}
.margin-input:focus { outline: none; border-color: #2563eb; }
.margin-unit { color: #9ca3af; font-size: 11px; }
.margin-apply-btn {
  margin-top: 8px; width: 100%; height: 26px;
  border: 1px solid #2563eb; border-radius: 4px;
  background: #2563eb; color: #fff; font-size: 12px;
  cursor: pointer;
}
.margin-apply-btn:hover { background: #1d4ed8; }
</style>
<div class="bar">
  <span id="char-count">0자</span>
  <span id="word-count">0단어</span>
  <div class="sep"></div>
  <select id="paper-select" class="poa-paper-select" title="용지 크기">
    ${paperOptions}
  </select>
  <button id="margin-btn" class="poa-margin-btn" title="여백 설정">여백</button>
  <div id="margin-popup" class="margin-popup hidden">
    <div class="margin-popup-title">여백 (mm)</div>
    <div class="margin-row">
      <label>상</label>
      <input type="number" id="m-top"    class="margin-input" min="0" max="150" step="1" value="${dm.top}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>하</label>
      <input type="number" id="m-bottom" class="margin-input" min="0" max="150" step="1" value="${dm.bottom}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>좌</label>
      <input type="number" id="m-left"   class="margin-input" min="0" max="150" step="1" value="${dm.left}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>우</label>
      <input type="number" id="m-right"  class="margin-input" min="0" max="150" step="1" value="${dm.right}">
      <span class="margin-unit">mm</span>
    </div>
    <button id="m-apply" class="margin-apply-btn">적용</button>
  </div>
  <div class="sep"></div>
  <button id="zoom-out" class="poa-zoom-btn" title="축소 (Ctrl+-)">−</button>
  <select id="zoom-select" class="poa-zoom-select" title="확대/축소">
    ${zoomOptions}
  </select>
  <button id="zoom-in" class="poa-zoom-btn" title="확대 (Ctrl+=)">+</button>
</div>`;

    const paperSel   = this.shadow.getElementById('paper-select') as HTMLSelectElement;
    const zoomSel    = this.shadow.getElementById('zoom-select')  as HTMLSelectElement;
    const zoomInBtn  = this.shadow.getElementById('zoom-in')      as HTMLButtonElement;
    const zoomOutBtn = this.shadow.getElementById('zoom-out')     as HTMLButtonElement;
    const marginBtn  = this.shadow.getElementById('margin-btn')   as HTMLButtonElement;
    const popup      = this.shadow.getElementById('margin-popup') as HTMLDivElement;
    const mTop       = this.shadow.getElementById('m-top')        as HTMLInputElement;
    const mBottom    = this.shadow.getElementById('m-bottom')     as HTMLInputElement;
    const mLeft      = this.shadow.getElementById('m-left')       as HTMLInputElement;
    const mRight     = this.shadow.getElementById('m-right')      as HTMLInputElement;
    const applyBtn   = this.shadow.getElementById('m-apply')      as HTMLButtonElement;

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

    // 여백 팝오버 토글
    marginBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('hidden');
    });

    // 팝오버 내부 클릭이 document 핸들러에 도달하지 않도록
    popup.addEventListener('click', (e) => e.stopPropagation());

    // 적용 버튼
    const applyMargin = (): void => {
      const margin: PageMargin = {
        top:    Math.max(0, parseFloat(mTop.value)    || 0),
        bottom: Math.max(0, parseFloat(mBottom.value) || 0),
        left:   Math.max(0, parseFloat(mLeft.value)   || 0),
        right:  Math.max(0, parseFloat(mRight.value)  || 0),
      };
      this.dispatchAction('paper:margin', JSON.stringify(margin));
      popup.classList.add('hidden');
    };
    applyBtn.addEventListener('click', applyMargin);

    // Enter 키로 적용
    [mTop, mBottom, mLeft, mRight].forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); applyMargin(); }
        if (e.key === 'Escape') popup.classList.add('hidden');
      });
    });

    // 팝오버 외부 클릭 시 닫기
    this.docClickHandler = (): void => { popup.classList.add('hidden'); };
    document.addEventListener('click', this.docClickHandler);
  }

  disconnectedCallback(): void {
    if (this.docClickHandler) {
      document.removeEventListener('click', this.docClickHandler);
      this.docClickHandler = null;
    }
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
    const { size, zoom, margin } = e.detail as {
      size: { id: string };
      zoom: number;
      margin?: PageMargin;
    };
    const paperSel = this.shadow.getElementById('paper-select') as HTMLSelectElement | null;
    const zoomSel  = this.shadow.getElementById('zoom-select')  as HTMLSelectElement | null;
    if (paperSel) paperSel.value = size.id;
    if (zoomSel)  zoomSel.value  = String(zoom);
    if (margin) {
      const mTop    = this.shadow.getElementById('m-top')    as HTMLInputElement | null;
      const mBottom = this.shadow.getElementById('m-bottom') as HTMLInputElement | null;
      const mLeft   = this.shadow.getElementById('m-left')   as HTMLInputElement | null;
      const mRight  = this.shadow.getElementById('m-right')  as HTMLInputElement | null;
      if (mTop)    mTop.value    = String(margin.top);
      if (mBottom) mBottom.value = String(margin.bottom);
      if (mLeft)   mLeft.value   = String(margin.left);
      if (mRight)  mRight.value  = String(margin.right);
    }
  }

  private dispatchAction(type: string, value?: string): void {
    this.dispatchEvent(new CustomEvent('poa-action', {
      bubbles: true, composed: true,
      detail: { type, ...(value !== undefined ? { value } : {}) },
    }));
  }
}
