/**
 * input/textarea에 너비 조절 기능을 제공한다 (표 안/밖 공통).
 *
 * - 방법 1: CSS resize:horizontal → 브라우저 기본 핸들(우측 하단 ◢) 활성화
 * - 방법 2: 커스텀 드래그 핸들(우측 중앙 파란 막대) → mousemove로 너비 직접 조절
 * - ResizeObserver로 네이티브 리사이즈 감지 → onResized 콜백 발화
 * - position:fixed → document.body 부착으로 contentEl 레이아웃에 영향 없음
 *
 * 표 밖 input: contentEl 너비 기준으로 maxWidth 제한
 * 표 안  input: 셀(td/th) 너비 기준으로 maxWidth 제한
 */
export class InputResizer {
    input = null;
    handle = null;
    observer = null;
    onResized = null;
    contentEl = null;
    _dragStart = 0;
    _dragInitW = 0;
    scrollHandler = () => this.syncHandle();
    // ── 공개 API ─────────────────────────────────────────────────────────────────
    /**
     * input을 활성화한다.
     * CSS resize + 커스텀 핸들 동시 활성화.
     *
     * @param input      - 대상 input 또는 textarea
     * @param onResized  - 너비가 변경될 때 호출되는 콜백
     * @param contentEl  - 에디터 컨텐츠 영역 (표 밖 input의 maxWidth 제한용)
     */
    attach(input, onResized, contentEl) {
        this.detach();
        this.input = input;
        this.onResized = onResized ?? null;
        this.contentEl = contentEl ?? null;
        // ── 방법 1: CSS resize ────────────────────────────────────────────
        input.style.resize = 'horizontal';
        input.style.overflow = 'hidden';
        input.style.minWidth = '60px';
        input.style.boxSizing = 'border-box';
        // 표 안: 셀 너비 기준 / 표 밖: 에디터 너비 기준
        const isInCell = !!input.closest('td, th');
        if (isInCell) {
            input.style.maxWidth = '100%';
        }
        else if (contentEl) {
            input.style.maxWidth = `${contentEl.clientWidth - 32}px`;
        }
        else {
            input.style.maxWidth = '100%';
        }
        // 네이티브 리사이즈 감지
        if (typeof ResizeObserver !== 'undefined') {
            this.observer = new ResizeObserver(() => {
                this.syncHandle();
                this.onResized?.();
            });
            this.observer.observe(input);
        }
        // ── 방법 2: 커스텀 드래그 핸들 ───────────────────────────────────
        this._showHandle(input);
        // 스크롤 시 핸들 위치 동기화
        window.addEventListener('scroll', this.scrollHandler, true);
    }
    /** input을 비활성화하고 핸들과 CSS를 정리한다 */
    detach() {
        if (this.input) {
            this.input.style.resize = 'none';
            this.input.style.maxWidth = '';
            this.input = null;
        }
        this.observer?.disconnect();
        this.observer = null;
        this.contentEl = null;
        this._hideHandle();
        this.onResized = null;
        window.removeEventListener('scroll', this.scrollHandler, true);
    }
    /** 핸들 위치를 input의 현재 위치에 맞게 갱신한다 */
    syncHandle() {
        const h = this.handle;
        const inp = this.input;
        if (!h || !inp)
            return;
        const rect = inp.getBoundingClientRect();
        h.style.left = `${rect.right - 4}px`;
        h.style.top = `${rect.top + (rect.height - 24) / 2}px`;
    }
    // ── 핸들 생성 / 제거 ─────────────────────────────────────────────────────────
    _showHandle(input) {
        this._hideHandle();
        const h = document.createElement('div');
        h.dataset.poaResizeHandle = 'true';
        h.title = '좌우로 드래그하여 너비 조절';
        h.style.cssText = [
            'position:fixed',
            'width:8px', 'height:24px',
            'background:#2563EB',
            'border-radius:3px',
            'cursor:ew-resize',
            'z-index:99999',
            'display:flex', 'align-items:center', 'justify-content:center',
            'user-select:none', '-webkit-user-select:none',
        ].join(';');
        h.innerHTML = `<svg width="6" height="14" viewBox="0 0 6 14" fill="none">
      <line x1="2" y1="2" x2="2" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4" y1="2" x2="4" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;
        document.body.appendChild(h);
        this.handle = h;
        this.syncHandle();
        h.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._dragStart = e.clientX;
            this._dragInitW = input.getBoundingClientRect().width;
            // 표 안: 셀 너비 / 표 밖: 에디터 너비 (저장된 contentEl 사용)
            const cell = input.closest('td, th');
            const maxW = cell
                ? cell.getBoundingClientRect().width - 4
                : (this.contentEl ? this.contentEl.clientWidth - 32 : 9999);
            const onMove = (me) => {
                const newW = Math.max(60, Math.min(maxW, this._dragInitW + (me.clientX - this._dragStart)));
                input.style.width = `${newW}px`;
                this.syncHandle();
            };
            const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                this.onResized?.();
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }
    _hideHandle() {
        this.handle?.remove();
        this.handle = null;
    }
}
