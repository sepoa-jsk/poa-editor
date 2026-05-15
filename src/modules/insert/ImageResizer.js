const HANDLES = [
    { dir: 'nw', cursor: 'nw-resize', top: '0', left: '0' },
    { dir: 'n', cursor: 'n-resize', top: '0', left: '50%' },
    { dir: 'ne', cursor: 'ne-resize', top: '0', left: '100%' },
    { dir: 'e', cursor: 'e-resize', top: '50%', left: '100%' },
    { dir: 'se', cursor: 'se-resize', top: '100%', left: '100%' },
    { dir: 's', cursor: 's-resize', top: '100%', left: '50%' },
    { dir: 'sw', cursor: 'sw-resize', top: '100%', left: '0' },
    { dir: 'w', cursor: 'w-resize', top: '50%', left: '0' },
];
const MIN_SIZE = 20;
/**
 * contenteditable 루트 안의 이미지에 드래그 리사이즈 기능을 제공한다.
 *
 * - 이미지 클릭 시 8방향 핸들이 표시된 오버레이를 root 위에 절대 위치로 삽입한다.
 * - 핸들 mousedown → document mousemove/mouseup 체인으로 크기를 실시간 조절한다.
 * - Shift+드래그(모서리 핸들)로 비율 고정.
 * - 오버레이는 data-poa-temp 속성으로 표시해 getHTML() 직렬화에서 제외된다.
 */
export class ImageResizer {
    root;
    cb;
    overlay = null;
    activeImg = null;
    dragging = false;
    dragDir = 'se';
    dragStartX = 0;
    dragStartY = 0;
    dragStartW = 0;
    dragStartH = 0;
    constructor(root, callbacks = {}) {
        this.root = root;
        this.cb = callbacks;
    }
    attach() {
        // 오버레이 절대 위치의 기준 컨테이너
        if (!this.root.style.position)
            this.root.style.position = 'relative';
        this.root.addEventListener('click', this.onRootClick, true);
        this.root.addEventListener('contextmenu', this.onContextMenu);
        this.root.addEventListener('input', this.onContentInput);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    detach() {
        this.deactivate();
        this.root.removeEventListener('click', this.onRootClick, true);
        this.root.removeEventListener('contextmenu', this.onContextMenu);
        this.root.removeEventListener('input', this.onContentInput);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
    /** 현재 활성 이미지 반환 */
    getActiveImage() {
        return this.activeImg;
    }
    /** 외부(툴바)에서 이미지 크기 변경 후 오버레이 위치를 동기화한다 */
    syncOverlay() {
        this.updatePos();
    }
    /** 이미지 선택 해제 */
    deactivate() {
        this.overlay?.remove();
        this.overlay = null;
        if (this.activeImg) {
            this.activeImg = null;
            this.cb.onDeactivate?.();
        }
    }
    // ── private ────────────────────────────────────────────────────────────────
    activate(img) {
        if (this.activeImg === img)
            return;
        this.overlay?.remove();
        this.activeImg = img;
        this.createOverlay();
        this.cb.onActivate?.(img);
    }
    createOverlay() {
        if (!this.activeImg)
            return;
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
    updatePos() {
        if (!this.overlay || !this.activeImg)
            return;
        const ir = this.activeImg.getBoundingClientRect();
        const rr = this.root.getBoundingClientRect();
        const t = ir.top - rr.top + this.root.scrollTop;
        const l = ir.left - rr.left + this.root.scrollLeft;
        Object.assign(this.overlay.style, {
            top: `${t}px`,
            left: `${l}px`,
            width: `${ir.width}px`,
            height: `${ir.height}px`,
        });
    }
    onRootClick = (e) => {
        const target = e.target;
        // 핸들 클릭은 무시 (mousedown에서 처리)
        if (this.overlay?.contains(target))
            return;
        if (target.tagName === 'IMG') {
            this.activate(target);
        }
        else {
            this.deactivate();
        }
    };
    onContextMenu = (e) => {
        const target = e.target;
        if (target.tagName !== 'IMG')
            return;
        e.preventDefault();
        const img = target;
        this.activate(img);
        this.cb.onContextMenu?.(img, e.clientX, e.clientY);
    };
    onContentInput = () => {
        // 키보드 삭제 등으로 이미지가 DOM에서 제거된 경우 선택 해제
        if (this.activeImg && !this.root.contains(this.activeImg)) {
            this.deactivate();
        }
    };
    onHandleMouseDown = (e) => {
        if (!this.activeImg)
            return;
        const dir = e.currentTarget.dataset.dir;
        e.preventDefault();
        e.stopPropagation();
        const ir = this.activeImg.getBoundingClientRect();
        this.dragging = true;
        this.dragDir = dir;
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
        this.dragStartW = ir.width;
        this.dragStartH = ir.height;
        document.body.style.cursor = e.currentTarget.style.cursor;
        document.body.style.userSelect = 'none';
    };
    onMouseMove = (e) => {
        if (!this.dragging || !this.activeImg)
            return;
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        const dir = this.dragDir;
        const maxW = this.root.clientWidth;
        let w = this.dragStartW;
        let h = this.dragStartH;
        if (dir === 'e' || dir === 'ne' || dir === 'se')
            w = this.dragStartW + dx;
        if (dir === 'w' || dir === 'nw' || dir === 'sw')
            w = this.dragStartW - dx;
        if (dir === 's' || dir === 'se' || dir === 'sw')
            h = this.dragStartH + dy;
        if (dir === 'n' || dir === 'ne' || dir === 'nw')
            h = this.dragStartH - dy;
        const isCorner = dir === 'nw' || dir === 'ne' || dir === 'sw' || dir === 'se';
        if (e.shiftKey && isCorner && this.dragStartH > 0) {
            const ratio = this.dragStartW / this.dragStartH;
            if (Math.abs(dx) >= Math.abs(dy)) {
                h = w / ratio;
            }
            else {
                w = h * ratio;
            }
        }
        w = Math.max(MIN_SIZE, Math.min(maxW, w));
        h = Math.max(MIN_SIZE, h);
        this.activeImg.style.width = `${Math.round(w)}px`;
        this.activeImg.style.height = `${Math.round(h)}px`;
        this.updatePos();
        this.cb.onResize?.(this.activeImg);
    };
    onMouseUp = () => {
        if (!this.dragging)
            return;
        this.dragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        if (this.activeImg) {
            this.updatePos();
            this.cb.onResizeEnd?.();
        }
    };
}
