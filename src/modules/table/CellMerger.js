/**
 * table.rows 를 순회하여 colspan/rowspan 을 반영한 2D 논리 그리드를 구축한다.
 * grid[r][c] 는 해당 논리 위치를 점유하는 GridCell 을 가리킨다.
 */
export function buildGridMap(table) {
    const rows = Array.from(table.rows);
    const grid = rows.map(() => []);
    for (let r = 0; r < rows.length; r++) {
        let c = 0;
        for (const rawCell of Array.from(rows[r].cells)) {
            const cell = rawCell;
            while (grid[r][c] !== undefined && grid[r][c] !== null)
                c++;
            const rowspan = Math.max(cell.rowSpan, 1);
            const colspan = Math.max(cell.colSpan, 1);
            const gc = { cell, row: r, col: c };
            for (let dr = 0; dr < rowspan && r + dr < rows.length; dr++) {
                if (!grid[r + dr])
                    grid[r + dr] = [];
                for (let dc = 0; dc < colspan; dc++) {
                    grid[r + dr][c + dc] = gc;
                }
            }
            c += colspan;
        }
    }
    return grid;
}
/**
 * 에디터 contentEl 에 대한 테이블 셀 선택·병합·분할 관리.
 *
 * - 셀 클릭 → 단일 선택
 * - Shift+클릭 → 앵커~타깃 직사각형 다중 선택 (파란 테두리 강조)
 * - merge() → 선택 셀 병합, 첫 번째 셀 내용 유지
 * - splitCellHorizontal/Vertical() → colspan/rowspan 기준 분할
 * - applyCellProperties() → 셀 스타일 속성 적용
 */
export class CellMerger {
    contentEl = null;
    selectedCells = new Set();
    anchorCell = null;
    currentTable = null;
    clickHandler = (e) => {
        const cell = this.findCell(e.target);
        if (!cell) {
            if (!e.target.closest?.('table'))
                this.clearSelection();
            return;
        }
        const table = cell.closest('table');
        if (e.shiftKey && this.anchorCell && table === this.currentTable) {
            e.preventDefault();
            this.selectRange(this.anchorCell, cell);
        }
        else {
            this.clearSelection();
            this.currentTable = table;
            this.anchorCell = cell;
            this.selectCell(cell);
        }
    };
    attach(contentEl) {
        this.detach();
        this.contentEl = contentEl;
        contentEl.addEventListener('click', this.clickHandler);
        CellMerger.injectStyles(contentEl.ownerDocument);
    }
    detach() {
        if (this.contentEl) {
            this.contentEl.removeEventListener('click', this.clickHandler);
            this.contentEl = null;
        }
        this.clearSelection();
        this.anchorCell = null;
        this.currentTable = null;
    }
    getSelectedCells() { return Array.from(this.selectedCells); }
    getSelectedTable() { return this.currentTable; }
    /** TableSelector 에서 드래그 도중 범위를 확장할 때 호출 */
    selectTo(target) {
        if (!this.anchorCell) {
            this.clearSelection();
            this.anchorCell = target;
            this.currentTable = target.closest('table');
            this.selectCell(target);
        }
        else {
            this.selectRange(this.anchorCell, target);
        }
    }
    /** 드래그 시작 셀을 앵커로 지정 (clearSelection 포함) */
    setAnchor(cell) {
        this.clearSelection();
        this.currentTable = cell.closest('table');
        this.anchorCell = cell;
        this.selectCell(cell);
    }
    clearSelection() {
        for (const cell of this.selectedCells)
            cell.classList.remove('poa-cell-selected', 'poa-cell-sel-ok', 'poa-cell-sel-bad');
        this.selectedCells.clear();
    }
    /** 현재 선택된 셀들을 병합한다. 비직사각형이면 실패 메시지를 반환한다 */
    merge() {
        if (!this.currentTable)
            return { success: false, message: '선택된 표가 없습니다.' };
        if (this.selectedCells.size < 2)
            return { success: false, message: '병합할 셀을 2개 이상 선택하세요.' };
        const result = CellMerger.mergeCells(Array.from(this.selectedCells), this.currentTable);
        if (result.success)
            this.clearSelection();
        return result;
    }
    // ── Static helpers ────────────────────────────────────────────────
    /**
     * cells 배열이 직사각형 영역을 이루면 첫 번째 셀로 병합한다.
     * 비직사각형이면 success: false 를 반환한다.
     */
    static mergeCells(cells, table) {
        if (cells.length < 2)
            return { success: false, message: '병합할 셀을 2개 이상 선택하세요.' };
        const grid = buildGridMap(table);
        const cellSet = new Set(cells);
        let minRow = Infinity, maxRow = -Infinity;
        let minCol = Infinity, maxCol = -Infinity;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                const gc = grid[r]?.[c];
                if (gc && cellSet.has(gc.cell)) {
                    if (r < minRow)
                        minRow = r;
                    if (r > maxRow)
                        maxRow = r;
                    if (c < minCol)
                        minCol = c;
                    if (c > maxCol)
                        maxCol = c;
                }
            }
        }
        // 직사각형 검증
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                const gc = grid[r]?.[c];
                if (!gc || !cellSet.has(gc.cell)) {
                    return { success: false, message: '병합 불가: 선택 영역이 직사각형이 아닙니다.' };
                }
            }
        }
        const targetCell = grid[minRow]?.[minCol]?.cell;
        if (!targetCell)
            return { success: false };
        const contentParts = [];
        const toRemove = new Set();
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                const gc = grid[r]?.[c];
                if (!gc || gc.row !== r || gc.col !== c || gc.cell === targetCell)
                    continue;
                const inner = gc.cell.innerHTML.replace(/^(\s|&nbsp;)*$/i, '').trim();
                if (inner)
                    contentParts.push(inner);
                toRemove.add(gc.cell);
            }
        }
        if (contentParts.length > 0) {
            const existing = targetCell.innerHTML.replace(/^(\s|&nbsp;)*$/i, '').trim();
            targetCell.innerHTML = [existing, ...contentParts].filter(Boolean).join(' ') || '&nbsp;';
        }
        targetCell.colSpan = maxCol - minCol + 1;
        targetCell.rowSpan = maxRow - minRow + 1;
        for (const cell of toRemove)
            cell.remove();
        return { success: true };
    }
    /**
     * colspan > 1 셀을 수평 분할한다 (colspan 기준).
     * 1x1 셀은 무시한다.
     */
    static splitCellHorizontal(cell, table) {
        const colspan = Math.max(cell.colSpan, 1);
        if (colspan === 1)
            return;
        const grid = buildGridMap(table);
        const ownerDoc = cell.ownerDocument;
        const tag = cell.tagName.toLowerCase();
        let cellRow = -1, cellCol = -1;
        outer: for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                const gc = grid[r]?.[c];
                if (gc?.cell === cell && gc.row === r && gc.col === c) {
                    cellRow = r;
                    cellCol = c;
                    break outer;
                }
            }
        }
        if (cellRow === -1)
            return;
        const origRowspan = Math.max(cell.rowSpan, 1);
        cell.colSpan = 1;
        // 같은 행: 원본 셀 뒤에 순서대로 삽입
        let prev = cell;
        for (let dc = 1; dc < colspan; dc++) {
            const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
            nc.rowSpan = origRowspan;
            prev.insertAdjacentElement('afterend', nc);
            prev = nc;
        }
        // rowspan > 1: 원본 셀이 걸치는 아래 행에도 빈 셀 삽입
        if (origRowspan > 1) {
            const rows = Array.from(table.rows);
            for (let dr = 1; dr < origRowspan; dr++) {
                const targetRow = rows[cellRow + dr];
                if (!targetRow)
                    continue;
                const insertBefore = CellMerger.findInsertBefore(grid, cellRow + dr, cellCol + colspan - 1, targetRow);
                for (let dc = 0; dc < colspan; dc++) {
                    const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                    if (insertBefore)
                        targetRow.insertBefore(nc, insertBefore);
                    else
                        targetRow.appendChild(nc);
                }
            }
            cell.rowSpan = 1;
        }
    }
    /**
     * rowspan > 1 셀을 수직 분할한다 (rowspan 기준).
     * 1x1 셀은 무시한다.
     */
    static splitCellVertical(cell, table) {
        const rowspan = Math.max(cell.rowSpan, 1);
        if (rowspan === 1)
            return;
        const grid = buildGridMap(table);
        const rows = Array.from(table.rows);
        const ownerDoc = cell.ownerDocument;
        const tag = cell.tagName.toLowerCase();
        let cellRow = -1, cellCol = -1;
        outer: for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                const gc = grid[r]?.[c];
                if (gc?.cell === cell && gc.row === r && gc.col === c) {
                    cellRow = r;
                    cellCol = c;
                    break outer;
                }
            }
        }
        if (cellRow === -1)
            return;
        const origColspan = Math.max(cell.colSpan, 1);
        cell.rowSpan = 1;
        for (let dr = 1; dr < rowspan; dr++) {
            const targetRow = rows[cellRow + dr];
            if (!targetRow)
                continue;
            const insertBefore = CellMerger.findInsertBefore(grid, cellRow + dr, cellCol + origColspan - 1, targetRow);
            for (let dc = 0; dc < origColspan; dc++) {
                const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                if (insertBefore)
                    targetRow.insertBefore(nc, insertBefore);
                else
                    targetRow.appendChild(nc);
            }
        }
    }
    /** 셀에 CellProperties 를 적용한다 */
    static applyCellProperties(cell, props) {
        const { borderStyle, borderWidth, borderColor, indent, bgColor, fontSize, id, className, verticalAlign } = props;
        if (borderStyle !== undefined || borderWidth !== undefined || borderColor !== undefined) {
            const bStyle = borderStyle ?? 'solid';
            const bWidth = borderWidth ?? 1;
            const bColor = borderColor ?? '#000000';
            cell.style.border = bStyle === 'none' ? 'none' : `${bWidth}px ${bStyle} ${bColor}`;
        }
        if (indent !== undefined)
            cell.style.paddingLeft = indent > 0 ? `${indent}px` : '';
        if (bgColor !== undefined)
            cell.style.backgroundColor = bgColor;
        if (verticalAlign !== undefined)
            cell.style.verticalAlign = verticalAlign;
        if (fontSize !== undefined) {
            const fsVal = fontSize > 0 ? `${fontSize}px` : '';
            cell.style.fontSize = fsVal;
            // 셀 내부 인라인 font-size 스타일을 가진 요소에도 덮어써서 CSS 특수성 문제를 해결한다
            cell.querySelectorAll('[style*="font-size"]').forEach((el) => {
                el.style.fontSize = fsVal;
            });
        }
        if (id !== undefined)
            cell.id = id;
        if (className !== undefined)
            cell.className = className;
    }
    /** 셀의 현재 CellProperties 를 읽어 반환한다 */
    static readCellProperties(cell) {
        const bm = cell.style.border.match(/^(\d+)px\s+(\S+)\s+(.+)$/);
        const va = cell.style.verticalAlign;
        return {
            borderStyle: bm?.[2] ?? 'solid',
            borderWidth: bm ? parseInt(bm[1], 10) : 1,
            borderColor: bm?.[3] ?? '#000000',
            indent: parseFloat(cell.style.paddingLeft) || 0,
            bgColor: cell.style.backgroundColor || '',
            fontSize: parseFloat(cell.style.fontSize) || 0,
            id: cell.id || '',
            className: cell.className || '',
            verticalAlign: (va === 'top' || va === 'bottom') ? va : 'middle',
        };
    }
    // ── Private helpers ───────────────────────────────────────────────
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
    selectCell(cell) {
        this.selectedCells.add(cell);
        cell.classList.add('poa-cell-selected');
    }
    selectRange(anchor, target) {
        const table = anchor.closest('table');
        if (!table || target.closest('table') !== table)
            return;
        const grid = buildGridMap(table);
        const cellPos = new Map();
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                const gc = grid[r]?.[c];
                if (gc && gc.row === r && gc.col === c)
                    cellPos.set(gc.cell, { r, c });
            }
        }
        const aPos = cellPos.get(anchor);
        const tPos = cellPos.get(target);
        if (!aPos || !tPos)
            return;
        const minRow = Math.min(aPos.r, tPos.r), maxRow = Math.max(aPos.r, tPos.r);
        const minCol = Math.min(aPos.c, tPos.c), maxCol = Math.max(aPos.c, tPos.c);
        this.clearSelection();
        for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
                const gc = grid[r]?.[c];
                if (gc && gc.row === r && gc.col === c)
                    this.selectCell(gc.cell);
            }
        }
    }
    /**
     * 셀을 colCount 열 × rowCount 행으로 나눈다.
     *
     * - colspan/rowspan > 1 → 기존 span을 N개로 균등 분배
     * - colspan/rowspan = 1 → 새 셀/행을 삽입하고 인접 셀의 span을 보정
     * - 두 방향 동시 지정 시 수평 → 수직 순으로 처리하며 새 행의 셀 수를 수평 조각 수에 맞춘다
     */
    static splitCell(cell, table, colCount, rowCount) {
        const nCols = Math.max(colCount, 1);
        const nRows = Math.max(rowCount, 1);
        if (nCols <= 1 && nRows <= 1)
            return;
        const ownerDoc = cell.ownerDocument;
        const tag = cell.tagName.toLowerCase();
        // 수평 분할 후 조각 수/colspan 을 추적 (수직 분할의 새 행 크기 결정에 사용)
        let hPieces = 1;
        let hColWidths = [Math.max(cell.colSpan, 1)];
        // ── 수평 분할 ────────────────────────────────────────────────────
        if (nCols > 1) {
            const grid = buildGridMap(table);
            const allRows = Array.from(table.rows);
            const curCols = Math.max(cell.colSpan, 1);
            const curRows = Math.max(cell.rowSpan, 1);
            let cellRow = -1, cellCol = -1;
            outerH: for (let r = 0; r < grid.length; r++) {
                for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
                    const gc = grid[r]?.[c];
                    if (gc?.cell === cell && gc.row === r && gc.col === c) {
                        cellRow = r;
                        cellCol = c;
                        break outerH;
                    }
                }
            }
            if (cellRow !== -1) {
                if (nCols <= curCols) {
                    // 기존 colspan을 nCols 개로 균등 분배
                    const colWidths = CellMerger.distribute(curCols, nCols);
                    hPieces = nCols;
                    hColWidths = colWidths;
                    cell.colSpan = colWidths[0];
                    let prev = cell;
                    for (let ci = 1; ci < nCols; ci++) {
                        const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                        nc.colSpan = colWidths[ci];
                        nc.rowSpan = curRows;
                        prev.insertAdjacentElement('afterend', nc);
                        prev = nc;
                    }
                }
                else {
                    // colspan=1 → 오른쪽에 nCols-1 개 셀 삽입, 다른 행 spanning 셀 colspan 확장
                    const extra = nCols - 1;
                    hPieces = nCols;
                    hColWidths = new Array(nCols).fill(1);
                    let prev = cell;
                    for (let ci = 0; ci < extra; ci++) {
                        const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                        prev.insertAdjacentElement('afterend', nc);
                        prev = nc;
                    }
                    const seen = new Set();
                    for (let r = 0; r < allRows.length; r++) {
                        if (r >= cellRow && r < cellRow + curRows)
                            continue;
                        const gc = grid[r]?.[cellCol];
                        if (!gc || gc.cell === cell || seen.has(gc.cell))
                            continue;
                        seen.add(gc.cell);
                        gc.cell.colSpan += extra;
                    }
                }
            }
        }
        // ── 수직 분할 ────────────────────────────────────────────────────
        if (nRows > 1) {
            // H 분할 이후 그리드 재계산
            const grid2 = buildGridMap(table);
            const allRows2 = Array.from(table.rows);
            const curCols2 = Math.max(cell.colSpan, 1);
            const curRows2 = Math.max(cell.rowSpan, 1);
            let cellRow2 = -1, cellCol2 = -1;
            outerV: for (let r = 0; r < grid2.length; r++) {
                for (let c = 0; c < (grid2[r]?.length ?? 0); c++) {
                    const gc = grid2[r]?.[c];
                    if (gc?.cell === cell && gc.row === r && gc.col === c) {
                        cellRow2 = r;
                        cellCol2 = c;
                        break outerV;
                    }
                }
            }
            if (cellRow2 === -1)
                return;
            if (nRows <= curRows2) {
                // 기존 rowspan을 nRows 개로 균등 분배
                const rowHeights = CellMerger.distribute(curRows2, nRows);
                cell.rowSpan = rowHeights[0];
                let physOffset = rowHeights[0];
                for (let ri = 1; ri < nRows; ri++) {
                    const physRow = allRows2[cellRow2 + physOffset];
                    if (physRow) {
                        const insertBefore = CellMerger.findInsertBefore(grid2, cellRow2 + physOffset, cellCol2 + curCols2 - 1, physRow);
                        const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                        nc.colSpan = curCols2;
                        nc.rowSpan = rowHeights[ri];
                        if (insertBefore)
                            physRow.insertBefore(nc, insertBefore);
                        else
                            physRow.appendChild(nc);
                    }
                    physOffset += rowHeights[ri];
                }
            }
            else {
                // rowspan=1 → 아래에 nRows-1 개 행 삽입, 다른 컬럼 spanning 셀 rowspan 확장
                const extra = nRows - 1;
                let lastInserted = allRows2[cellRow2];
                for (let ri = 0; ri < extra; ri++) {
                    const newRow = ownerDoc.createElement('tr');
                    // 수평 분할된 각 조각마다 셀 추가 (단일 셀이면 hPieces=1)
                    for (let hi = 0; hi < hPieces; hi++) {
                        const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
                        nc.colSpan = hColWidths[hi] ?? 1;
                        newRow.appendChild(nc);
                    }
                    lastInserted.insertAdjacentElement('afterend', newRow);
                    lastInserted = newRow;
                }
                const seen = new Set();
                for (let c = 0; c < (grid2[cellRow2]?.length ?? 0); c++) {
                    if (c >= cellCol2 && c < cellCol2 + curCols2)
                        continue;
                    const gc = grid2[cellRow2]?.[c];
                    if (!gc || gc.cell === cell || seen.has(gc.cell))
                        continue;
                    seen.add(gc.cell);
                    gc.cell.rowSpan += extra;
                }
            }
        }
    }
    /** total 을 parts 개로 최대한 균등 분배한다. */
    static distribute(total, parts) {
        if (parts <= 0)
            return [total];
        const base = Math.floor(total / parts);
        const extra = total % parts;
        return Array.from({ length: parts }, (_, i) => base + (i < extra ? 1 : 0));
    }
    static findInsertBefore(grid, physRow, afterCol, targetRowEl) {
        const rowGrid = grid[physRow];
        if (!rowGrid)
            return null;
        for (let c = afterCol + 1; c < rowGrid.length; c++) {
            const gc = rowGrid[c];
            if (gc && gc.row === physRow && gc.col === c && gc.cell.parentElement === targetRowEl) {
                return gc.cell;
            }
        }
        return null;
    }
    static makeEmptyCell(ownerDoc, tag, cssText) {
        const cell = ownerDoc.createElement(tag);
        cell.style.cssText = cssText;
        cell.innerHTML = '&nbsp;';
        return cell;
    }
    static _stylesInjected = false;
    static injectStyles(ownerDoc) {
        if (CellMerger._stylesInjected)
            return;
        CellMerger._stylesInjected = true;
        const s = ownerDoc.createElement('style');
        s.id = 'poa-cell-merger-styles';
        s.textContent = [
            '.poa-cell-selected{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}',
            '.poa-cell-sel-ok{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}',
            '.poa-cell-sel-bad{outline:2px solid #c62828!important;outline-offset:-2px!important;background:rgba(198,40,40,0.12)!important;}',
        ].join('');
        ownerDoc.head.appendChild(s);
    }
}
