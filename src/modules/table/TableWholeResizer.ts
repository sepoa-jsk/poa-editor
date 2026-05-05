const MIN_TABLE_W = 100;
const HANDLE_PX   = 8;

type Dir = 'e' | 's' | 'se';

interface HandleSpec {
  dir:    Dir;
  cursor: string;
  top:    string;
  left:   string;
}

const SPECS: HandleSpec[] = [
  { dir: 'e',  cursor: 'e-resize',  top: '50%',  left: '100%' },
  { dir: 's',  cursor: 's-resize',  top: '100%', left: '50%'  },
  { dir: 'se', cursor: 'se-resize', top: '100%', left: '100%' },
];

export interface TableWholeResizerCallbacks {
  onResizeEnd?: (table: HTMLTableElement) => void;
}

/**
 * 선택된 표 위에 E/S/SE 리사이즈 핸들 오버레이를 생성하고
 * 드래그로 표 전체 너비·높이를 조절한다.
 *
 * - 오버레이는 data-poa-temp 마커로 getHTML() 직렬화에서 제외된다.
 * - 기존 TableResizer(셀 컬럼 드래그)와 충돌하지 않는다:
 *   핸들은 contentEl 직계 자식(셀 외부)이므로 findCell()이 null 반환.
 */
export class TableWholeResizer {
  private readonly contentEl: HTMLElement;
  private readonly cb: TableWholeResizerCallbacks;

  private table:   HTMLTableElement | null = null;
  private overlay: HTMLDivElement   | null = null;
  private preview: HTMLDivElement   | null = null;
  private tooltip: HTMLDivElement   | null = null;

  private dragging    = false;
  private dragDir:    Dir    = 'se';
  private dragStartX  = 0;
  private dragStartY  = 0;
  private dragStartW  = 0;
  private dragStartH  = 0;

  constructor(contentEl: HTMLElement, callbacks: TableWholeResizerCallbacks = {}) {
    this.contentEl = contentEl;
    this.cb = callbacks;
  }

  /** 표를 선택하고 핸들 오버레이를 붙인다 */
  attach(table: HTMLTableElement): void {
    this.detach();
    this.table = table;
    this.createOverlay();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup',   this.onMouseUp);
    this.contentEl.addEventListener('scroll', this.syncHandles);
    this.contentEl.addEventListener('input',  this.onContentInput);
  }

  /** 핸들 오버레이를 제거한다 */
  detach(): void {
    this.overlay?.remove();
    this.preview?.remove();
    this.destroyTooltip();
    this.overlay = null;
    this.preview = null;
    this.table   = null;
    this.dragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup',   this.onMouseUp);
    this.contentEl.removeEventListener('scroll', this.syncHandles);
    this.contentEl.removeEventListener('input',  this.onContentInput);
  }

  /** 표 크기 변경 후 핸들 위치를 동기화한다 */
  readonly syncHandles = (): void => { this.updateOverlayPos(); };

  // ── 오버레이 생성 ─────────────────────────────────────────────────

  private createOverlay(): void {
    if (!this.table) return;
    const ov = document.createElement('div');
    ov.dataset.poaTemp = 'true';
    ov.style.cssText = 'position:absolute;pointer-events:none;z-index:10;box-sizing:border-box;';

    for (const spec of SPECS) {
      const h = document.createElement('div');
      h.dataset.dir     = spec.dir;
      h.dataset.poaTemp = 'true';
      h.style.cssText =
        `position:absolute;width:${HANDLE_PX}px;height:${HANDLE_PX}px;` +
        `background:#0078d7;border:1px solid #fff;border-radius:1px;` +
        `box-sizing:border-box;cursor:${spec.cursor};` +
        `top:${spec.top};left:${spec.left};transform:translate(-50%,-50%);` +
        `pointer-events:all;z-index:11;`;
      h.addEventListener('mousedown', this.onHandleMouseDown);
      ov.appendChild(h);
    }

    this.contentEl.appendChild(ov);
    this.overlay = ov;
    this.updateOverlayPos();
  }

  private updateOverlayPos(): void {
    if (!this.overlay || !this.table) return;
    const tr = this.table.getBoundingClientRect();
    const cr = this.contentEl.getBoundingClientRect();
    Object.assign(this.overlay.style, {
      top:    `${tr.top  - cr.top  + this.contentEl.scrollTop}px`,
      left:   `${tr.left - cr.left + this.contentEl.scrollLeft}px`,
      width:  `${tr.width}px`,
      height: `${tr.height}px`,
    });
  }

  // ── 드래그 ───────────────────────────────────────────────────────

  private readonly onHandleMouseDown = (e: MouseEvent): void => {
    if (!this.table) return;
    const dir = (e.currentTarget as HTMLElement).dataset.dir as Dir;
    e.preventDefault();
    e.stopPropagation(); // contentEl.mousedown(deselectTable) 방지

    const tr = this.table.getBoundingClientRect();
    this.dragging    = true;
    this.dragDir     = dir;
    this.dragStartX  = e.clientX;
    this.dragStartY  = e.clientY;
    this.dragStartW  = tr.width;
    this.dragStartH  = tr.height;

    document.body.style.cursor     = (e.currentTarget as HTMLElement).style.cursor;
    document.body.style.userSelect = 'none';

    this.createPreview(tr.width, tr.height);
  };

  private readonly onMouseMove = (e: MouseEvent): void => {
    if (!this.dragging || !this.table) return;
    const { w, h } = this.computeSize(e);
    this.updatePreview(w, h);
    this.showTooltip(w, h, e.clientX, e.clientY);
  };

  private readonly onMouseUp = (e: MouseEvent): void => {
    if (!this.dragging || !this.table) return;
    this.dragging = false;

    const { w, h } = this.computeSize(e);
    const dir = this.dragDir;

    if (dir === 'e' || dir === 'se') this.table.style.width     = `${Math.round(w)}px`;
    if (dir === 's' || dir === 'se') this.table.style.minHeight = `${Math.round(h)}px`;

    this.preview?.remove();
    this.preview = null;
    this.destroyTooltip();
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';

    requestAnimationFrame(() => {
      this.updateOverlayPos();
      if (this.table) this.cb.onResizeEnd?.(this.table);
    });
  };

  private readonly onContentInput = (): void => {
    if (this.table && !this.contentEl.contains(this.table)) this.detach();
  };

  // ── 크기 계산 ────────────────────────────────────────────────────

  private computeSize(e: MouseEvent): { w: number; h: number } {
    const dx   = e.clientX - this.dragStartX;
    const dy   = e.clientY - this.dragStartY;
    const dir  = this.dragDir;
    const maxW = this.contentEl.clientWidth;
    const minH = Math.max(30, (this.table?.rows.length ?? 1) * 30);

    let w = this.dragStartW;
    let h = this.dragStartH;

    if (dir === 'e' || dir === 'se') w = this.dragStartW + dx;
    if (dir === 's' || dir === 'se') h = this.dragStartH + dy;

    // Shift + SE → 비율 고정
    if (e.shiftKey && dir === 'se' && this.dragStartH > 0) {
      h = w / (this.dragStartW / this.dragStartH);
    }

    return {
      w: Math.max(MIN_TABLE_W, Math.min(maxW, w)),
      h: Math.max(minH, h),
    };
  }

  // ── 프리뷰 & 툴팁 ────────────────────────────────────────────────

  private createPreview(w: number, h: number): void {
    if (!this.table) return;
    const prev = document.createElement('div');
    prev.dataset.poaTemp = 'true';
    prev.style.cssText =
      'position:absolute;border:1px dashed #0078d7;' +
      'background:rgba(0,120,215,0.05);pointer-events:none;z-index:9;box-sizing:border-box;';
    this.contentEl.appendChild(prev);
    this.preview = prev;
    this.updatePreview(w, h);
  }

  private updatePreview(w: number, h: number): void {
    if (!this.preview || !this.table) return;
    const tr = this.table.getBoundingClientRect();
    const cr = this.contentEl.getBoundingClientRect();
    Object.assign(this.preview.style, {
      top:    `${tr.top  - cr.top  + this.contentEl.scrollTop}px`,
      left:   `${tr.left - cr.left + this.contentEl.scrollLeft}px`,
      width:  `${Math.round(w)}px`,
      height: `${Math.round(h)}px`,
    });
  }

  private showTooltip(w: number, h: number, x: number, y: number): void {
    if (!this.tooltip) {
      const tt = document.createElement('div');
      tt.dataset.poaTemp = 'true';
      tt.style.cssText =
        'position:fixed;background:#222;color:#fff;font-size:11px;' +
        'padding:3px 7px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;';
      document.body.appendChild(tt);
      this.tooltip = tt;
    }
    this.tooltip.textContent  = `${Math.round(w)}px × ${Math.round(h)}px`;
    this.tooltip.style.left   = `${x + 14}px`;
    this.tooltip.style.top    = `${y + 14}px`;
  }

  private destroyTooltip(): void {
    this.tooltip?.remove();
    this.tooltip = null;
  }
}
