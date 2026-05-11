export interface PaperSize {
  id: 'A3' | 'A4' | 'A5' | 'B4' | 'B5' | 'Letter' | 'Legal';
  label: string;
  widthPx: number;
  heightPx: number;
  widthMm: number;
  heightMm: number;
}

/** 용지 여백 (단위: mm) */
export interface PageMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const PAPER_SIZES: ReadonlyArray<PaperSize> = [
  { id: 'A3',     label: 'A3',     widthPx: 1123, heightPx: 1587, widthMm: 297,   heightMm: 420   },
  { id: 'A4',     label: 'A4',     widthPx: 794,  heightPx: 1123, widthMm: 210,   heightMm: 297   },
  { id: 'A5',     label: 'A5',     widthPx: 559,  heightPx: 794,  widthMm: 148,   heightMm: 210   },
  { id: 'B4',     label: 'B4',     widthPx: 945,  heightPx: 1335, widthMm: 250,   heightMm: 353   },
  { id: 'B5',     label: 'B5',     widthPx: 665,  heightPx: 945,  widthMm: 176,   heightMm: 250   },
  { id: 'Letter', label: 'Letter', widthPx: 816,  heightPx: 1056, widthMm: 215.9, heightMm: 279.4 },
  { id: 'Legal',  label: 'Legal',  widthPx: 816,  heightPx: 1344, widthMm: 215.9, heightMm: 355.6 },
];

export const DEFAULT_MARGIN: PageMargin = { top: 25, right: 30, bottom: 25, left: 30 };

const MM_TO_PX = 3.7795; // 96 DPI 기준 1mm → px

export class PaperSizeManager {
  private currentSize:   PaperSize;
  private currentZoom:   number;
  private currentMargin: PageMargin;

  static readonly ZOOM_MIN  = 50;
  static readonly ZOOM_MAX  = 200;
  static readonly ZOOM_STEP = 10;

  private static readonly STORAGE_KEY_SIZE   = 'poa-paper-size';
  private static readonly STORAGE_KEY_ZOOM   = 'poa-editor-zoom';
  private static readonly STORAGE_KEY_MARGIN = 'poa-paper-margin';

  constructor(
    private readonly editableArea: HTMLElement,
    private readonly wrapperEl: HTMLElement,
  ) {
    this.currentSize   = PAPER_SIZES.find(p => p.id === 'A4')!;
    this.currentZoom   = 100;
    this.currentMargin = { ...DEFAULT_MARGIN };
  }

  init(): void {
    try {
      const savedSize = localStorage.getItem(PaperSizeManager.STORAGE_KEY_SIZE);
      if (savedSize) {
        const found = PAPER_SIZES.find(p => p.id === savedSize);
        if (found) this.currentSize = found;
      }
      const savedZoom = localStorage.getItem(PaperSizeManager.STORAGE_KEY_ZOOM);
      if (savedZoom) {
        const z = parseInt(savedZoom, 10);
        if (!isNaN(z)) {
          this.currentZoom = Math.min(PaperSizeManager.ZOOM_MAX, Math.max(PaperSizeManager.ZOOM_MIN, z));
        }
      }
      const savedMargin = localStorage.getItem(PaperSizeManager.STORAGE_KEY_MARGIN);
      if (savedMargin) {
        const parsed = JSON.parse(savedMargin) as Partial<PageMargin>;
        this.currentMargin = { ...DEFAULT_MARGIN, ...parsed };
      }
    } catch { /* localStorage unavailable */ }
    this.applyToEditor();
  }

  setPaperSize(id: string): void {
    const found = PAPER_SIZES.find(p => p.id === id);
    if (!found) return;
    this.currentSize = found;
    this.applyToEditor();
  }

  setZoom(value: number): void {
    const stepped = Math.round(value / PaperSizeManager.ZOOM_STEP) * PaperSizeManager.ZOOM_STEP;
    this.currentZoom = Math.min(PaperSizeManager.ZOOM_MAX, Math.max(PaperSizeManager.ZOOM_MIN, stepped));
    this.applyToEditor();
  }

  setMargin(margin: Partial<PageMargin>): void {
    this.currentMargin = { ...this.currentMargin, ...margin };
    this.applyToEditor();
  }

  zoomIn(): void  { this.setZoom(this.currentZoom + PaperSizeManager.ZOOM_STEP); }
  zoomOut(): void { this.setZoom(this.currentZoom - PaperSizeManager.ZOOM_STEP); }
  resetZoom(): void { this.setZoom(100); }

  getSize(): PaperSize     { return this.currentSize; }
  getZoom(): number        { return this.currentZoom; }
  getMargin(): PageMargin  { return { ...this.currentMargin }; }

  applyToEditor(): void {
    const { widthPx, heightPx } = this.currentSize;
    const scale = this.currentZoom / 100;
    const { top, right, bottom, left } = this.currentMargin;
    const tPx = Math.round(top    * MM_TO_PX);
    const rPx = Math.round(right  * MM_TO_PX);
    const bPx = Math.round(bottom * MM_TO_PX);
    const lPx = Math.round(left   * MM_TO_PX);

    this.editableArea.style.width           = `${widthPx}px`;
    this.editableArea.style.minHeight       = `${heightPx}px`;
    this.editableArea.style.height          = 'auto';
    this.editableArea.style.padding         = `${tPx}px ${rPx}px ${bPx}px ${lPx}px`;
    this.editableArea.style.boxSizing       = 'border-box';
    this.editableArea.style.overflowY       = 'visible';
    this.editableArea.style.overflowX       = 'visible';
    this.editableArea.style.flex            = '0 0 auto'; // shrink 금지 — 내용에 따라 A4 박스 자동 확장
    this.editableArea.style.transform       = `scale(${scale})`;
    this.editableArea.style.transformOrigin = 'top center';
    this.editableArea.style.margin          = '0 auto';
    this.editableArea.style.backgroundColor = 'var(--poa-editor-bg, #fff)';

    this.wrapperEl.style.background      = '#e5e5e5';
    this.wrapperEl.style.padding         = '20px';
    this.wrapperEl.style.overflowY       = 'auto';
    this.wrapperEl.style.overflowX       = 'auto';
    this.wrapperEl.style.display         = 'flex';
    this.wrapperEl.style.flexDirection   = 'column';
    this.wrapperEl.style.alignItems      = 'center';
    this.wrapperEl.style.justifyContent  = 'flex-start';

    try {
      localStorage.setItem(PaperSizeManager.STORAGE_KEY_SIZE,   this.currentSize.id);
      localStorage.setItem(PaperSizeManager.STORAGE_KEY_ZOOM,   String(this.currentZoom));
      localStorage.setItem(PaperSizeManager.STORAGE_KEY_MARGIN, JSON.stringify(this.currentMargin));
    } catch { /* ignore */ }

    this.wrapperEl.dispatchEvent(new CustomEvent('paper-change', {
      bubbles: true,
      detail: { size: this.currentSize, zoom: this.currentZoom, margin: this.currentMargin },
    }));
  }
}
