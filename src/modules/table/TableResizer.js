const COL_HANDLE = 5; // 우측 N px 영역에서 col-resize 트리거
const ROW_HANDLE = 5; // 하단 N px 영역에서 row-resize 트리거
const MIN_COL_W = 30; // 컬럼 최소 너비 (px)
const MIN_ROW_H = 20; // 행 최소 높이 (px)
const MAX_DELTA = 300; // 한 번에 허용하는 최대 변경 px
const IDLE = {
    type: null, cell: null, row: null,
    startX: 0, startY: 0, startW: 0, startH: 0,
};
/**
 * 셀 우측/하단 경계 드래그로 열 너비·행 높이를 조절한다.
 *
 * 설계 원칙:
 * - state 객체 하나로 모든 드래그 상태 관리
 * - mousedown 에서만 state 설정, mouseup 에서만 state 초기화
 * - mousemove 에서 e.target 재계산 완전 금지 — state.cell/row 만 사용
 * - clientX/clientY 만 사용, startX/startY 기준 delta 계산
 * - col 리사이즈: state.cell.style.width + minWidth 만 변경
 * - row 리사이즈: state.row.style.height + 행 내 모든 td.style.height 동기화
 */
export class TableResizer {
    contentEl = null;
    onModified = () => { };
    state = { ...IDLE };
    lastCursorCell = null;
    constructor(onModified = () => { }) {
        this.onModified = onModified;
    }
    attach(contentEl) {
        this.detach();
        this.contentEl = contentEl;
        contentEl.addEventListener('mousemove', this.onContentMouseMove);
        contentEl.addEventListener('mousedown', this.onContentMouseDown);
        document.addEventListener('mousemove', this.onDocMouseMove);
        document.addEventListener('mouseup', this.onDocMouseUp);
    }
    detach() {
        if (this.contentEl) {
            this.contentEl.removeEventListener('mousemove', this.onContentMouseMove);
            this.contentEl.removeEventListener('mousedown', this.onContentMouseDown);
            this.contentEl = null;
        }
        document.removeEventListener('mousemove', this.onDocMouseMove);
        document.removeEventListener('mouseup', this.onDocMouseUp);
        this.resetCursor();
        this.state = { ...IDLE };
    }
    // ── 커서 표시 (드래그 중에는 갱신 안 함) ────────────────────────
    onContentMouseMove = (e) => {
        if (this.state.type)
            return;
        const td = this.findCell(e.target);
        if (!td) {
            this.resetCursor();
            return;
        }
        const r = td.getBoundingClientRect();
        if (e.clientX >= r.right - COL_HANDLE) {
            td.style.cursor = 'col-resize';
            this.lastCursorCell = td;
        }
        else if (e.clientY >= r.bottom - ROW_HANDLE) {
            td.style.cursor = 'row-resize';
            this.lastCursorCell = td;
        }
        else {
            if (this.lastCursorCell === td)
                this.resetCursor();
            else
                td.style.cursor = '';
        }
    };
    resetCursor() {
        if (this.lastCursorCell) {
            this.lastCursorCell.style.cursor = '';
            this.lastCursorCell = null;
        }
    }
    // ── mousedown: startX/startY/startW/startH 를 여기서만 설정 ────
    onContentMouseDown = (e) => {
        if (e.button !== 0)
            return;
        const td = this.findCell(e.target);
        if (!td)
            return;
        const r = td.getBoundingClientRect();
        if (e.clientX >= r.right - COL_HANDLE) {
            e.preventDefault();
            this.state = {
                type: 'col', cell: td, row: null,
                startX: e.clientX, startY: 0,
                startW: td.offsetWidth, startH: 0, // offsetWidth 고정 사용
            };
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            if (import.meta.env.DEV)
                console.log('[TableResizer] col resize 시작', {
                    cellIndex: td.cellIndex,
                    startW: td.offsetWidth,
                    startX: e.clientX,
                });
        }
        else if (e.clientY >= r.bottom - ROW_HANDLE) {
            e.preventDefault();
            const tr = td.closest('tr');
            if (!tr)
                return;
            this.state = {
                type: 'row', cell: null, row: tr,
                startX: 0, startY: e.clientY,
                startW: 0, startH: tr.offsetHeight, // tr.offsetHeight 고정 사용
            };
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
            if (import.meta.env.DEV)
                console.log('[TableResizer] row resize 시작', {
                    startH: tr.offsetHeight,
                    startY: e.clientY,
                });
        }
    };
    // ── document mousemove: state.cell/row 만 사용, e.target 재계산 금지 ──
    onDocMouseMove = (e) => {
        if (!this.state.type)
            return;
        if (this.state.type === 'col' && this.state.cell) {
            const delta = e.clientX - this.state.startX; // clientX 기준
            if (Math.abs(delta) > MAX_DELTA)
                return; // 비정상 delta 차단
            const newW = Math.max(MIN_COL_W, this.state.startW + delta);
            this.state.cell.style.width = `${newW}px`;
            this.state.cell.style.minWidth = `${newW}px`;
            // table-layout: fixed 대응 — 컬럼 너비는 첫 행 셀로 결정되므로
            // 클릭한 셀이 첫 행이 아니면 첫 행의 같은 열 셀도 동기화한다.
            const table = this.state.cell.closest('table');
            const firstRow = table?.querySelector('tr');
            if (firstRow && firstRow !== this.state.cell.parentElement) {
                const colIdx = this.state.cell.cellIndex;
                const headCell = firstRow.cells?.[colIdx];
                if (headCell) {
                    headCell.style.width = `${newW}px`;
                    headCell.style.minWidth = `${newW}px`;
                }
            }
        }
        if (this.state.type === 'row' && this.state.row) {
            const delta = e.clientY - this.state.startY; // clientY 기준
            if (Math.abs(delta) > MAX_DELTA)
                return; // 비정상 delta 차단
            const newH = Math.max(MIN_ROW_H, this.state.startH + delta);
            this.state.row.style.height = `${newH}px`;
            // tr.style.height 단독은 브라우저에서 min-height 로만 동작 → 셀 높이 동기화 필수
            for (const td of Array.from(this.state.row.cells)) {
                td.style.height = `${newH}px`;
            }
        }
    };
    // ── document mouseup: state 완전 초기화 ────────────────────────
    onDocMouseUp = () => {
        if (!this.state.type)
            return;
        this.onModified();
        this.state = { ...IDLE };
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };
    // ── 헬퍼 ────────────────────────────────────────────────────────
    /**
     * Node(텍스트·엘리먼트) 에서 가장 가까운 td/th 를 반환한다.
     * 이벤트 위임 방식에서 e.target 이 셀 안의 자식 요소일 때도 올바른 td/th 를 찾는다.
     */
    findCell(node) {
        const el = node.nodeType === Node.ELEMENT_NODE
            ? node
            : node.parentElement;
        return el ? el.closest('td, th') : null;
    }
}
