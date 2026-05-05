type Unit = 'px' | '%';

export interface TableInlineToolbarCallbacks {
  /** 너비·높이가 변경되어 history 캡처가 필요할 때 호출된다 */
  onApply?: (table: HTMLTableElement) => void;
}

/**
 * 선택된 표 위에 인라인 툴바를 fixed 위치로 표시한다.
 *
 * 위치 결정 규칙:
 * 1. 기본: 표 상단 바로 위 (contentEl 상단보다 위로는 절대 올라가지 않음)
 * 2. 공간 부족 시: 표 하단으로 이동
 * 3. 좌우: contentEl 범위 내로 클램핑
 * 4. 드래그 핸들로 사용자가 위치 직접 이동 가능 (초기화는 hide → show)
 *
 * z-index = 100 (메뉴바/컨텍스트툴바는 z-index ≥ 200 으로 항상 위에 표시)
 */
export class TableInlineToolbar {
  private readonly cb: TableInlineToolbarCallbacks;

  private toolbar:    HTMLDivElement    | null = null;
  private table:      HTMLTableElement  | null = null;
  private contentEl:  HTMLElement       | null = null;
  private wInput:     HTMLInputElement  | null = null;
  private hInput:     HTMLInputElement  | null = null;
  private wSelect:    HTMLSelectElement | null = null;

  // 드래그 이동 상태
  private isDragging  = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

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
    this.stopDrag();
    this.toolbar   = null;
    this.table     = null;
    this.contentEl = null;
    this.wInput    = null;
    this.hInput    = null;
    this.wSelect   = null;
  }

  /** 외부에서 표 크기가 변경됐을 때 입력값과 위치를 동기화한다 */
  syncPosition(): void {
    if (!this.isDragging) this.updatePosition();
    this.syncValues();
  }

  // ── 툴바 생성 ────────────────────────────────────────────────────

  private createToolbar(): void {
    if (!this.table || !this.contentEl) return;

    const bar = document.createElement('div');
    bar.dataset.poaTemp = 'true';
    bar.style.cssText =
      'position:fixed;display:flex;align-items:center;gap:6px;' +
      'height:32px;' +
      'background:rgba(255,255,255,0.95);' +
      'border:1px solid #E5E7EB;border-radius:6px;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.12);' +
      'padding:0 8px;font-size:12px;white-space:nowrap;' +
      'z-index:100;box-sizing:border-box;';

    // mousedown stopPropagation — contentEl의 deselectTable 트리거 방지
    bar.addEventListener('mousedown', (e) => e.stopPropagation());

    // ── 드래그 핸들 ────────────────────────────────────────────────
    const handle = document.createElement('span');
    handle.textContent = '⠿';
    handle.title = '드래그하여 이동';
    handle.style.cssText =
      'cursor:grab;color:#9CA3AF;font-size:14px;line-height:1;' +
      'padding:0 4px 0 0;flex-shrink:0;user-select:none;-webkit-user-select:none;';
    handle.addEventListener('mousedown', (e) => this.onHandleMouseDown(e));
    bar.appendChild(handle);

    // 구분선
    bar.appendChild(this.makeSep());

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
      'border:1px solid #D1D5DB;border-radius:4px;background:#F9FAFB;' +
      'padding:2px 8px;cursor:pointer;font-size:11px;color:#374151;' +
      'line-height:1.4;flex-shrink:0;';
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
    lbl.style.cssText = 'color:#6B7280;flex-shrink:0;';
    return lbl;
  }

  private makeInput(id: string, value: string): HTMLInputElement {
    const inp = document.createElement('input');
    inp.type  = 'number';
    inp.value = value;
    inp.min   = '1';
    inp.id    = `poa-tbl-tb-${id}`;
    inp.style.cssText =
      'width:52px;height:22px;padding:0 4px;' +
      'border:1px solid #D1D5DB;border-radius:4px;' +
      'font-size:12px;box-sizing:border-box;text-align:right;';
    return inp;
  }

  private makeUnitSelect(unit: Unit): HTMLSelectElement {
    const sel = document.createElement('select');
    sel.style.cssText =
      'height:22px;padding:0 2px;' +
      'border:1px solid #D1D5DB;border-radius:4px;font-size:12px;';
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
    sep.style.cssText =
      'width:1px;height:16px;background:#E5E7EB;margin:0 2px;flex-shrink:0;';
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
    if (!this.isDragging) this.updatePosition();
    this.cb.onApply?.(this.table);
  }

  private applyHeight(): void {
    if (!this.table || !this.hInput) return;
    const v = Math.max(1, parseFloat(this.hInput.value) || 0);
    this.hInput.value          = String(Math.round(v));
    this.table.style.minHeight = v > 0 ? `${Math.round(v)}px` : '';
    this.cb.onApply?.(this.table);
  }

  private applyReset(): void {
    if (!this.table) return;
    this.table.style.width     = '100%';
    this.table.style.minHeight = '';
    this.syncValues();
    if (!this.isDragging) this.updatePosition();
    this.cb.onApply?.(this.table);
  }

  private syncValues(): void {
    if (!this.wInput || !this.hInput || !this.wSelect || !this.table) return;
    this.wSelect.value = this.readWidthUnit();
    this.wInput.value  = this.readWidthPx();
    this.hInput.value  = this.readHeightPx();
  }

  // ── 위치 결정 ────────────────────────────────────────────────────
  // 규칙:
  //   top  : 표 상단 바로 위, 단 contentEl 상단보다 위로 올라가지 않음
  //          공간 없으면 표 하단으로 이동 (표 하단이 화면 밖이면 다시 상단으로)
  //   left : 표 좌측 정렬, contentEl 범위 내로 클램핑
  //   드래그 중에는 호출하지 않음 (사용자 위치 유지)

  private updatePosition(): void {
    if (!this.toolbar || !this.table || !this.contentEl) return;
    if (this.isDragging) return;

    const tr  = this.table.getBoundingClientRect();
    const cr  = this.contentEl.getBoundingClientRect();
    const barH = this.toolbar.offsetHeight || 32;
    const barW = this.toolbar.offsetWidth  || 300;

    // contentEl 가시 영역의 실제 상단 (스크롤 관계없이 뷰포트 기준)
    const contentTop = cr.top;

    // 기본: 표 상단 위
    let top  = tr.top - barH - 4;
    let left = tr.left;

    // 표 위에 contentEl 안에서 공간이 없으면 → 표 아래로
    if (top < contentTop + 4) {
      top = tr.bottom + 4;
      // 표 아래도 화면 밖이면 → 다시 표 위(contentEl 상단 기준 최소값)으로
      if (top + barH > window.innerHeight - 8) {
        top = contentTop + 4;
      }
    }

    // 우측 클램핑 (contentEl 우측 끝 기준)
    const maxLeft = cr.right - barW - 4;
    left = Math.min(left, maxLeft);
    left = Math.max(cr.left, left);

    this.toolbar.style.top  = `${top}px`;
    this.toolbar.style.left = `${left}px`;
  }

  private readonly onScroll = (): void => {
    if (!this.isDragging) this.updatePosition();
  };

  // ── 드래그 핸들 이동 ─────────────────────────────────────────────

  private onHandleMouseDown(e: MouseEvent): void {
    if (!this.toolbar) return;
    e.preventDefault();
    e.stopPropagation();
    this.isDragging  = true;
    this.dragOffsetX = e.clientX - this.toolbar.offsetLeft;
    this.dragOffsetY = e.clientY - this.toolbar.offsetTop;
    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup',   this.onDragUp);
    if (this.toolbar) this.toolbar.style.cursor = 'grabbing';
  }

  private readonly onDragMove = (e: MouseEvent): void => {
    if (!this.isDragging || !this.toolbar) return;
    const barH = this.toolbar.offsetHeight || 32;
    const barW = this.toolbar.offsetWidth  || 300;

    let newLeft = e.clientX - this.dragOffsetX;
    let newTop  = e.clientY - this.dragOffsetY;

    // 뷰포트 밖으로 나가지 않도록 클램핑
    newLeft = Math.max(0, Math.min(window.innerWidth  - barW - 4, newLeft));
    newTop  = Math.max(0, Math.min(window.innerHeight - barH - 4, newTop));

    this.toolbar.style.left = `${newLeft}px`;
    this.toolbar.style.top  = `${newTop}px`;
  };

  private readonly onDragUp = (): void => {
    this.stopDrag();
  };

  private stopDrag(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup',   this.onDragUp);
    if (this.toolbar) this.toolbar.style.cursor = '';
  }
}
