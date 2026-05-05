export interface InputInlineToolbarCallbacks {
  /** 너비가 변경되어 history 캡처가 필요할 때 */
  onResized?: () => void;
}

/**
 * 선택된 셀 input 위에 인라인 툴바를 표시한다.
 *
 * - 너비 직접 입력(px) + Enter / blur → 즉시 적용
 * - 셀에 맞춤 버튼 → width:100%
 * - 텍스트 정렬 드롭다운 → left / center / right
 *
 * - position:fixed + document.body → contentEl 레이아웃에 영향 없음
 * - contentEl scroll & window scroll 모두 위치 동기화
 */
export class InputInlineToolbar {
  private readonly cb: InputInlineToolbarCallbacks;

  private toolbar:   HTMLDivElement  | null = null;
  private input:     HTMLElement     | null = null;
  private contentEl: HTMLElement     | null = null;
  private wInput:    HTMLInputElement | null = null;
  private alignSel:  HTMLSelectElement | null = null;

  constructor(callbacks: InputInlineToolbarCallbacks = {}) {
    this.cb = callbacks;
  }

  // ── 공개 API ─────────────────────────────────────────────────────────────────

  show(input: HTMLElement, contentEl: HTMLElement): void {
    this.hide();
    this.input     = input;
    this.contentEl = contentEl;
    this._createToolbar();
    contentEl.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.onScroll, true);
  }

  hide(): void {
    this.toolbar?.remove();
    this.contentEl?.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('scroll', this.onScroll, true);
    this.toolbar   = null;
    this.input     = null;
    this.contentEl = null;
    this.wInput    = null;
    this.alignSel  = null;
  }

  /** input 너비가 외부에서 변경됐을 때 입력값과 위치를 동기화한다 */
  syncPosition(): void {
    this._updatePosition();
    this._syncValues();
  }

  // ── 툴바 생성 ─────────────────────────────────────────────────────────────────

  private _createToolbar(): void {
    if (!this.input) return;

    const bar = document.createElement('div');
    bar.dataset.poaTemp = 'true';
    bar.style.cssText =
      'position:fixed;display:flex;align-items:center;gap:6px;' +
      'background:#fff;border:1px solid #ccc;border-radius:4px;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.15);padding:4px 8px;' +
      'font-size:12px;white-space:nowrap;z-index:99998;';
    bar.addEventListener('mousedown', (e) => e.stopPropagation());

    // ── 너비 섹션 ────────────────────────────────────────────────────
    bar.appendChild(this._makeLabel('너비'));

    const wInput = document.createElement('input');
    wInput.type = 'number';
    wInput.min  = '60';
    wInput.max  = '2000';
    wInput.style.cssText = 'width:60px;padding:1px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
    const curW = Math.round(this.input.getBoundingClientRect().width) || 100;
    wInput.value = String(curW);
    this.wInput = wInput;
    bar.appendChild(wInput);
    bar.appendChild(this._makeLabel('px'));

    wInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this._applyWidth(); }
    });
    wInput.addEventListener('blur', () => this._applyWidth());

    bar.appendChild(this._makeSep());

    // ── 셀에 맞춤 버튼 ────────────────────────────────────────────────
    const fitBtn = document.createElement('button');
    fitBtn.textContent = '셀에 맞춤';
    fitBtn.style.cssText =
      'border:1px solid #ccc;border-radius:3px;background:#f5f5f5;' +
      'padding:1px 8px;cursor:pointer;font-size:12px;color:#333;white-space:nowrap;';
    fitBtn.addEventListener('click', () => this._applyFit());
    bar.appendChild(fitBtn);

    bar.appendChild(this._makeSep());

    // ── 텍스트 정렬 ───────────────────────────────────────────────────
    bar.appendChild(this._makeLabel('정렬'));

    const alignSel = document.createElement('select');
    alignSel.style.cssText = 'padding:1px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
    const currentAlign = (this.input as HTMLInputElement).style?.textAlign ?? '';
    for (const [val, lbl] of [['', '왼쪽'], ['center', '가운데'], ['right', '오른쪽']] as [string, string][]) {
      const opt = document.createElement('option');
      opt.value       = val;
      opt.textContent = lbl;
      if (currentAlign === val) opt.selected = true;
      alignSel.appendChild(opt);
    }
    alignSel.addEventListener('change', () => this._applyAlign(alignSel.value));
    this.alignSel = alignSel;
    bar.appendChild(alignSel);

    this.toolbar = bar;
    document.body.appendChild(bar);
    this._updatePosition();
  }

  // ── 적용 함수 ─────────────────────────────────────────────────────────────────

  private _applyWidth(): void {
    if (!this.input || !this.wInput) return;
    const v = Math.max(60, parseFloat(this.wInput.value) || 60);
    this.wInput.value          = String(Math.round(v));
    this.input.style.width     = `${Math.round(v)}px`;
    this.input.style.maxWidth  = '100%';
    this._updatePosition();
    this.cb.onResized?.();
  }

  private _applyFit(): void {
    if (!this.input) return;
    this.input.style.width    = '100%';
    this.input.style.maxWidth = '100%';
    this._syncValues();
    this._updatePosition();
    this.cb.onResized?.();
  }

  private _applyAlign(value: string): void {
    if (!this.input) return;
    this.input.style.textAlign = value;
    this.cb.onResized?.();
  }

  // ── 값 동기화 ─────────────────────────────────────────────────────────────────

  private _syncValues(): void {
    if (!this.input || !this.wInput || !this.alignSel) return;
    const w = Math.round(this.input.getBoundingClientRect().width) || 100;
    this.wInput.value   = String(w);
    const align = (this.input as HTMLInputElement).style?.textAlign ?? '';
    this.alignSel.value = align;
  }

  // ── 위치 동기화 ───────────────────────────────────────────────────────────────

  private _updatePosition(): void {
    if (!this.toolbar || !this.input) return;
    const ir   = this.input.getBoundingClientRect();
    const barH = this.toolbar.offsetHeight || 32;
    this.toolbar.style.top  = `${Math.max(0, ir.top - barH - 4)}px`;
    this.toolbar.style.left = `${ir.left}px`;
  }

  private readonly onScroll = (): void => { this._updatePosition(); };

  // ── DOM 헬퍼 ─────────────────────────────────────────────────────────────────

  private _makeLabel(text: string): HTMLSpanElement {
    const s = document.createElement('span');
    s.textContent = text;
    s.style.color = '#555';
    return s;
  }

  private _makeSep(): HTMLDivElement {
    const d = document.createElement('div');
    d.style.cssText = 'width:1px;height:16px;background:#ddd;margin:0 2px;flex-shrink:0;';
    return d;
  }
}
