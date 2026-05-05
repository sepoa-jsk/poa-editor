type Unit = 'px' | '%';

export interface TableInlineToolbarCallbacks {
  /** 너비·높이가 변경되어 history 캡처가 필요할 때 호출된다 */
  onApply?: (table: HTMLTableElement) => void;
}

/**
 * 선택된 표 위에 인라인 툴바를 절대 위치로 표시한다.
 * 너비/높이 직접 입력, px·% 단위 전환, 원본 복원을 지원한다.
 *
 * - contentEl(position:relative) 안에 position:absolute로 삽입된다.
 * - data-poa-temp 마커로 getHTML() 직렬화에서 제외된다.
 * - mousedown stopPropagation → contentEl의 deselectTable 트리거 방지.
 */
export class TableInlineToolbar {
  private readonly cb: TableInlineToolbarCallbacks;

  private toolbar:   HTMLDivElement         | null = null;
  private table:     HTMLTableElement       | null = null;
  private contentEl: HTMLElement            | null = null;
  private wInput:    HTMLInputElement       | null = null;
  private hInput:    HTMLInputElement       | null = null;
  private wSelect:   HTMLSelectElement      | null = null;

  constructor(callbacks: TableInlineToolbarCallbacks = {}) {
    this.cb = callbacks;
  }

  show(table: HTMLTableElement, contentEl: HTMLElement): void {
    this.hide();
    this.table     = table;
    this.contentEl = contentEl;
    this.createToolbar();
    contentEl.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.onScroll, true);
  }

  hide(): void {
    this.toolbar?.remove();
    this.contentEl?.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('scroll', this.onScroll, true);
    this.toolbar   = null;
    this.table     = null;
    this.contentEl = null;
    this.wInput    = null;
    this.hInput    = null;
    this.wSelect   = null;
  }

  /** 외부에서 표 크기가 변경됐을 때 입력값과 위치를 동기화한다 */
  syncPosition(): void {
    this.updatePosition();
    this.syncValues();
  }

  // ── 툴바 생성 ────────────────────────────────────────────────────

  private createToolbar(): void {
    if (!this.table || !this.contentEl) return;

    const bar = document.createElement('div');
    bar.dataset.poaTemp = 'true';
    // position:fixed + document.body → contentEl 레이아웃에 영향 없음
    bar.style.cssText =
      'position:fixed;display:flex;align-items:center;gap:6px;' +
      'background:#fff;border:1px solid #ccc;border-radius:4px;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.15);padding:4px 8px;' +
      'font-size:12px;white-space:nowrap;z-index:20;';
    // 전체 mousedown 차단 — contentEl의 deselectTable 방지
    bar.addEventListener('mousedown', (e) => e.stopPropagation());

    // 너비 섹션
    bar.appendChild(this.makeLabel('너비'));
    const wInput = this.makeInput('w', this.readWidthPx());
    this.wInput  = wInput;
    bar.appendChild(wInput);
    const wSelect = this.makeUnitSelect(this.readWidthUnit());
    this.wSelect  = wSelect;
    bar.appendChild(wSelect);

    bar.appendChild(this.makeSep());

    // 높이 섹션
    bar.appendChild(this.makeLabel('높이'));
    const hInput = this.makeInput('h', this.readHeightPx());
    this.hInput  = hInput;
    bar.appendChild(hInput);
    bar.appendChild(this.makeLabel('px'));

    bar.appendChild(this.makeSep());

    // 원본 버튼
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '원본';
    resetBtn.style.cssText =
      'border:1px solid #ccc;border-radius:3px;background:#f5f5f5;' +
      'padding:1px 8px;cursor:pointer;font-size:12px;color:#333;';
    resetBtn.addEventListener('click', () => this.applyReset());
    bar.appendChild(resetBtn);

    this.toolbar = bar;
    document.body.appendChild(bar);
    this.updatePosition();

    // Enter → 즉시 적용, blur → 적용
    wInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.applyWidth(); }
    });
    wInput.addEventListener('blur', () => this.applyWidth());
    wSelect.addEventListener('change', () => this.applyWidth());

    hInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); this.applyHeight(); }
    });
    hInput.addEventListener('blur', () => this.applyHeight());
  }

  // ── DOM 헬퍼 ─────────────────────────────────────────────────────

  private makeLabel(text: string): HTMLSpanElement {
    const lbl = document.createElement('span');
    lbl.textContent = text;
    lbl.style.color = '#555';
    return lbl;
  }

  private makeInput(id: string, value: string): HTMLInputElement {
    const inp = document.createElement('input');
    inp.type  = 'number';
    inp.value = value;
    inp.min   = '1';
    inp.id    = `poa-tbl-tb-${id}`;
    inp.style.cssText = 'width:54px;padding:1px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
    return inp;
  }

  private makeUnitSelect(unit: Unit): HTMLSelectElement {
    const sel = document.createElement('select');
    sel.style.cssText = 'padding:1px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
    for (const u of ['px', '%'] as Unit[]) {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      if (u === unit) opt.selected = true;
      sel.appendChild(opt);
    }
    return sel;
  }

  private makeSep(): HTMLDivElement {
    const sep = document.createElement('div');
    sep.style.cssText = 'width:1px;height:16px;background:#ddd;margin:0 2px;flex-shrink:0;';
    return sep;
  }

  // ── 값 읽기 ──────────────────────────────────────────────────────

  private readWidthUnit(): Unit {
    return (this.table?.style.width ?? '').endsWith('%') ? '%' : 'px';
  }

  private readWidthPx(): string {
    if (!this.table) return '100';
    const w = this.table.style.width;
    if (w.endsWith('%'))  return String(Math.round(parseFloat(w)));
    if (w.endsWith('px')) return String(Math.round(parseFloat(w)));
    return String(Math.round(this.table.getBoundingClientRect().width || 100));
  }

  private readHeightPx(): string {
    if (!this.table) return '';
    const h = this.table.style.minHeight;
    if (h.endsWith('px')) return String(Math.round(parseFloat(h)));
    return String(Math.round(this.table.getBoundingClientRect().height || 0));
  }

  // ── 적용 ─────────────────────────────────────────────────────────

  private applyWidth(): void {
    if (!this.table || !this.wInput || !this.wSelect) return;
    const unit = this.wSelect.value as Unit;
    const v    = Math.max(1, parseFloat(this.wInput.value) || 100);
    this.wInput.value      = String(Math.round(v));
    this.table.style.width = `${Math.round(v)}${unit}`;
    this.updatePosition();
    this.cb.onApply?.(this.table);
  }

  private applyHeight(): void {
    if (!this.table || !this.hInput) return;
    const v = Math.max(1, parseFloat(this.hInput.value) || 0);
    this.hInput.value           = String(Math.round(v));
    this.table.style.minHeight  = v > 0 ? `${Math.round(v)}px` : '';
    this.cb.onApply?.(this.table);
  }

  private applyReset(): void {
    if (!this.table) return;
    this.table.style.width     = '100%';
    this.table.style.minHeight = '';
    this.syncValues();
    this.updatePosition();
    this.cb.onApply?.(this.table);
  }

  private syncValues(): void {
    if (!this.wInput || !this.hInput || !this.wSelect || !this.table) return;
    this.wSelect.value = this.readWidthUnit();
    this.wInput.value  = this.readWidthPx();
    this.hInput.value  = this.readHeightPx();
  }

  // ── 위치 동기화 ──────────────────────────────────────────────────

  private updatePosition(): void {
    if (!this.toolbar || !this.table || !this.contentEl) return;
    const tr   = this.table.getBoundingClientRect();
    // position:fixed → getBoundingClientRect 값이 곧 뷰포트 기준 좌표
    const barH = this.toolbar.offsetHeight || 32;
    this.toolbar.style.top  = `${Math.max(0, tr.top - barH - 4)}px`;
    this.toolbar.style.left = `${tr.left}px`;
  }

  private readonly onScroll = (): void => { this.updatePosition(); };
}
