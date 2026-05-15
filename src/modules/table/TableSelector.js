import { buildGridMap } from './CellMerger.js';
/**
 * 표 셀 드래그 다중 선택.
 * - mousedown → mousemove → mouseup 체인으로 범위 선택
 * - 직사각형(병합 가능): 녹색(poa-cell-sel-ok)
 * - 비직사각형: 빨간색(poa-cell-sel-bad)
 * - 드래그 중: 파란색(poa-cell-selected)
 * CellMerger 인스턴스와 연동하여 앵커·범위를 공유한다.
 *
 * 드래그 완료 후 브라우저가 click을 발사하면 CellMerger.clickHandler가
 * 다중 선택을 단일 셀로 덮어쓰는 문제를 방지하기 위해
 * 캡처 단계 clickGuard로 드래그 직후 click을 차단한다.
 */
export class TableSelector {
    contentEl = null;
    merger;
    anchor = null;
    isDragging = false;
    /** 드래그 완료 직후 발사되는 click 이벤트를 한 번만 차단하는 플래그 */
    justDragged = false;
    constructor(merger) {
        this.merger = merger;
    }
    attach(contentEl) {
        this.detach();
        this.contentEl = contentEl;
        contentEl.addEventListener('mousedown', this.mdownHandler);
        // 캡처 단계에서 드래그 직후 click을 차단 (CellMerger.clickHandler 보호)
        contentEl.addEventListener('click', this.clickGuard, true);
        document.addEventListener('mousemove', this.mmoveHandler);
        document.addEventListener('mouseup', this.mupHandler);
    }
    detach() {
        if (this.contentEl) {
            this.contentEl.removeEventListener('mousedown', this.mdownHandler);
            this.contentEl.removeEventListener('click', this.clickGuard, true);
            this.contentEl = null;
        }
        document.removeEventListener('mousemove', this.mmoveHandler);
        document.removeEventListener('mouseup', this.mupHandler);
        this.anchor = null;
        this.isDragging = false;
        this.justDragged = false;
    }
    // ── 이벤트 핸들러 ────────────────────────────────────────────────
    mdownHandler = (e) => {
        const cell = this.findCell(e.target);
        if (!cell)
            return;
        // 우클릭 · resize 커서 시 무시 (target 또는 셀 자체의 커서 확인)
        if (e.button !== 0)
            return;
        if (e.target.style?.cursor?.includes('resize'))
            return;
        if (cell.style?.cursor?.includes('resize'))
            return;
        this.anchor = cell;
        this.isDragging = false;
        this.justDragged = false;
        // CellMerger 앵커도 동기화
        this.merger.setAnchor(cell);
        this.applyFeedback('drag');
    };
    mmoveHandler = (e) => {
        if (!this.anchor || e.buttons !== 1)
            return;
        const target = this.findCellAt(e.clientX, e.clientY);
        if (!target)
            return;
        const table = this.anchor.closest('table');
        if (!table || target.closest('table') !== table)
            return;
        if (!this.isDragging && target !== this.anchor) {
            this.isDragging = true;
        }
        if (!this.isDragging)
            return;
        this.merger.selectTo(target);
        const state = this.isRectangular() ? 'ok' : 'bad';
        this.applyFeedback(state);
    };
    mupHandler = () => {
        if (!this.isDragging) {
            this.anchor = null;
            return;
        }
        this.isDragging = false;
        this.justDragged = true; // 드래그 완료 — 다음 click 차단 준비
        // 최종 상태 색상 유지
        const state = this.isRectangular() ? 'ok' : 'bad';
        this.applyFeedback(state);
        this.anchor = null;
    };
    /**
     * 캡처 단계 click 가드.
     * 드래그 완료 직후 발사되는 click을 차단하여 CellMerger.clickHandler가
     * 다중 선택을 단일 셀로 덮어쓰는 것을 방지한다.
     */
    clickGuard = (e) => {
        if (!this.justDragged)
            return;
        this.justDragged = false;
        // 셀 범위 안에서 발사된 click만 차단 (표 바깥 click은 통과)
        const cell = this.findCell(e.target);
        if (cell)
            e.stopPropagation();
    };
    // ── 직사각형 검증 ────────────────────────────────────────────────
    isRectangular() {
        const cells = this.merger.getSelectedCells();
        const table = this.merger.getSelectedTable();
        if (!table || cells.length < 2)
            return true;
        const grid = buildGridMap(table);
        const cellSet = new Set(cells);
        let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                const gc = grid[r]?.[c];
                if (gc && cellSet.has(gc.cell)) {
                    if (r < minR)
                        minR = r;
                    if (r > maxR)
                        maxR = r;
                    if (c < minC)
                        minC = c;
                    if (c > maxC)
                        maxC = c;
                }
            }
        }
        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                const gc = grid[r]?.[c];
                if (!gc || !cellSet.has(gc.cell))
                    return false;
            }
        }
        return true;
    }
    // ── 시각적 피드백 ────────────────────────────────────────────────
    applyFeedback(state) {
        const cells = this.merger.getSelectedCells();
        for (const cell of cells) {
            cell.classList.remove('poa-cell-selected', 'poa-cell-sel-ok', 'poa-cell-sel-bad');
            if (state === 'drag')
                cell.classList.add('poa-cell-selected');
            if (state === 'ok')
                cell.classList.add('poa-cell-sel-ok');
            if (state === 'bad')
                cell.classList.add('poa-cell-sel-bad');
        }
    }
    // ── 외부 API ────────────────────────────────────────────────────
    /** 현재 선택 유효(직사각형)한지 여부 */
    get canMerge() {
        return this.merger.getSelectedCells().length >= 2 && this.isRectangular();
    }
    /** 현재 선택된 셀 목록을 반환한다 */
    getCellSelection() {
        return this.merger.getSelectedCells();
    }
    // ── 헬퍼 ────────────────────────────────────────────────────────
    findCell(node) {
        let cur = node;
        while (cur) {
            if (cur.nodeType === Node.ELEMENT_NODE) {
                const tag = cur.tagName.toLowerCase();
                if (tag === 'td' || tag === 'th')
                    return cur;
                if (tag === 'table')
                    break;
            }
            cur = cur.parentNode;
        }
        return null;
    }
    findCellAt(x, y) {
        const el = document.elementFromPoint(x, y);
        return el ? this.findCell(el) : null;
    }
}
