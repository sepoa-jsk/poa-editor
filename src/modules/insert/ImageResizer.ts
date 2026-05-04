/** 리사이즈 핸들 8방향 정의 */
type HandleDir = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface HandleSpec {
  dir: HandleDir;
  cursor: string;
  top: string;
  left: string;
}

const HANDLES: ReadonlyArray<HandleSpec> = [
  { dir: 'nw', cursor: 'nw-resize', top: '0',    left: '0'    },
  { dir: 'n',  cursor: 'n-resize',  top: '0',    left: '50%'  },
  { dir: 'ne', cursor: 'ne-resize', top: '0',    left: '100%' },
  { dir: 'e',  cursor: 'e-resize',  top: '50%',  left: '100%' },
  { dir: 'se', cursor: 'se-resize', top: '100%', left: '100%' },
  { dir: 's',  cursor: 's-resize',  top: '100%', left: '50%'  },
  { dir: 'sw', cursor: 'sw-resize', top: '100%', left: '0'    },
  { dir: 'w',  cursor: 'w-resize',  top: '50%',  left: '0'    },
];

const MIN_SIZE = 20;

export interface ImageResizerCallbacks {
  /** 이미지가 활성화(클릭)됐을 때 — 툴바 표시에 사용 */
  onActivate?: (img: HTMLImageElement) => void;
  /** 드래그 중 크기가 변경될 때마다 — 툴바 입력값 갱신에 사용 */
  onResize?: (img: HTMLImageElement) => void;
  /** 드래그가 끝났을 때 — history 캡처에 사용 */
  onResizeEnd?: () => void;
  /** 선택이 해제됐을 때 */
  onDeactivate?: () => void;
  /** 우클릭 컨텍스트 메뉴 요청 */
  onContextMenu?: (img: HTMLImageElement, x: number, y: number) => void;
}

/**
 * contenteditable 루트 안의 이미지에 드래그 리사이즈 기능을 제공한다.
 *
 * - 이미지 클릭 시 8방향 핸들이 표시된 오버레이를 root 위에 절대 위치로 삽입한다.
 * - 핸들 mousedown → document mousemove/mouseup 체인으로 크기를 실시간 조절한다.
 * - Shift+드래그(모서리 핸들)로 비율 고정.
 * - 오버레이는 data-poa-temp 속성으로 표시해 getHTML() 직렬화에서 제외된다.
 */
export class ImageResizer {
  private readonly root: HTMLElement;
  private readonly cb: ImageResizerCallbacks;
  private overlay: HTMLDivElement | null = null;
  private activeImg: HTMLImageElement | null = null;

  private dragging = false;
  private dragDir: HandleDir = 'se';
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartW = 0;
  private dragStartH = 0;

  constructor(root: HTMLElement, callbacks: ImageResizerCallbacks = {}) {
    this.root = root;
    this.cb = callbacks;
  }

  attach(): void {
    // 오버레이 절대 위치의 기준 컨테이너
    if (!this.root.style.position) this.root.style.position = 'relative';
    this.root.addEventListener('click', this.onRootClick, true);
    this.root.addEventListener('contextmenu', this.onContextMenu);
    this.root.addEventListener('input', this.onContentInput);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  detach(): void {
    this.deactivate();
    this.root.removeEventListener('click', this.onRootClick, true);
    this.root.removeEventListener('contextmenu', this.onContextMenu);
    this.root.removeEventListener('input', this.onContentInput);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  /** 현재 활성 이미지 반환 */
  getActiveImage(): HTMLImageElement | null {
    return this.activeImg;
  }

  /** 외부(툴바)에서 이미지 크기 변경 후 오버레이 위치를 동기화한다 */
  syncOverlay(): void {
    this.updatePos();
  }

  /** 이미지 선택 해제 */
  deactivate(): void {
    this.overlay?.remove();
    this.overlay = null;
    if (this.activeImg) {
      this.activeImg = null;
      this.cb.onDeactivate?.();
    }
  }

  // ── private ────────────────────────────────────────────────────────────────

  private activate(img: HTMLImageElement): void {
    if (this.activeImg === img) return;
    this.overlay?.remove();
    this.activeImg = img;
    this.createOverlay();
    this.cb.onActivate?.(img);
  }

  private createOverlay(): void {
    if (!this.activeImg) return;
    const ov = document.createElement('div');
    ov.className = 'poa-img-resize-overlay';
    ov.dataset.poaTemp = 'true'; // getHTML() 직렬화 제외 마커
    ov.style.cssText =
      'position:absolute;border:2px solid #0078d7;pointer-events:none;' +
      'z-index:10;box-sizing:border-box;';

    for (const spec of HANDLES) {
      const h = document.createElement('div');
      h.dataset.dir = spec.dir;
      h.style.cssText =
        `position:absolute;width:8px;height:8px;background:#0078d7;` +
        `border:1px solid #fff;border-radius:1px;box-sizing:border-box;` +
        `cursor:${spec.cursor};top:${spec.top};left:${spec.left};` +
        `transform:translate(-50%,-50%);pointer-events:all;z-index:11;`;
      h.addEventListener('mousedown', this.onHandleMouseDown);
      ov.appendChild(h);
    }

    this.root.appendChild(ov);
    this.overlay = ov;
    this.updatePos();
  }

  private updatePos(): void {
    if (!this.overlay || !this.activeImg) return;
    const ir = this.activeImg.getBoundingClientRect();
    const rr = this.root.getBoundingClientRect();
    const t = ir.top  - rr.top  + this.root.scrollTop;
    const l = ir.left - rr.left + this.root.scrollLeft;
    Object.assign(this.overlay.style, {
      top:    `${t}px`,
      left:   `${l}px`,
      width:  `${ir.width}px`,
      height: `${ir.height}px`,
    });
  }

  private onRootClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    // 핸들 클릭은 무시 (mousedown에서 처리)
    if (this.overlay?.contains(target)) return;
    if (target.tagName === 'IMG') {
      this.activate(target as HTMLImageElement);
    } else {
      this.deactivate();
    }
  };

  private onContextMenu = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'IMG') return;
    e.preventDefault();
    const img = target as HTMLImageElement;
    this.activate(img);
    this.cb.onContextMenu?.(img, e.clientX, e.clientY);
  };

  private onContentInput = (): void => {
    // 키보드 삭제 등으로 이미지가 DOM에서 제거된 경우 선택 해제
    if (this.activeImg && !this.root.contains(this.activeImg)) {
      this.deactivate();
    }
  };

  private onHandleMouseDown = (e: MouseEvent): void => {
    if (!this.activeImg) return;
    const dir = (e.currentTarget as HTMLElement).dataset.dir as HandleDir;
    e.preventDefault();
    e.stopPropagation();

    const ir = this.activeImg.getBoundingClientRect();
    this.dragging    = true;
    this.dragDir     = dir;
    this.dragStartX  = e.clientX;
    this.dragStartY  = e.clientY;
    this.dragStartW  = ir.width;
    this.dragStartH  = ir.height;

    document.body.style.cursor     = (e.currentTarget as HTMLElement).style.cursor;
    document.body.style.userSelect = 'none';
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.dragging || !this.activeImg) return;

    const dx  = e.clientX - this.dragStartX;
    const dy  = e.clientY - this.dragStartY;
    const dir = this.dragDir;
    const maxW = this.root.clientWidth;

    let w = this.dragStartW;
    let h = this.dragStartH;

    if (dir === 'e' || dir === 'ne' || dir === 'se') w = this.dragStartW + dx;
    if (dir === 'w' || dir === 'nw' || dir === 'sw') w = this.dragStartW - dx;
    if (dir === 's' || dir === 'se' || dir === 'sw') h = this.dragStartH + dy;
    if (dir === 'n' || dir === 'ne' || dir === 'nw') h = this.dragStartH - dy;

    const isCorner = dir === 'nw' || dir === 'ne' || dir === 'sw' || dir === 'se';
    if (e.shiftKey && isCorner && this.dragStartH > 0) {
      const ratio = this.dragStartW / this.dragStartH;
      if (Math.abs(dx) >= Math.abs(dy)) {
        h = w / ratio;
      } else {
        w = h * ratio;
      }
    }

    w = Math.max(MIN_SIZE, Math.min(maxW, w));
    h = Math.max(MIN_SIZE, h);

    this.activeImg.style.width  = `${Math.round(w)}px`;
    this.activeImg.style.height = `${Math.round(h)}px`;
    this.updatePos();
    this.cb.onResize?.(this.activeImg);
  };

  private onMouseUp = (): void => {
    if (!this.dragging) return;
    this.dragging = false;
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
    if (this.activeImg) {
      this.updatePos();
      this.cb.onResizeEnd?.();
    }
  };
}
