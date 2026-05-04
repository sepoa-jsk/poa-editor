/** 논리 그리드 상의 셀 참조 */
export interface GridCell {
  cell: HTMLTableCellElement;
  /** 셀이 물리적으로 속한 행 인덱스 */
  row: number;
  /** 셀의 논리적 원점 열 인덱스 */
  col: number;
}

/**
 * table.rows를 순회하여 colspan/rowspan을 반영한 2D 논리 그리드를 구축한다.
 * grid[r][c]는 해당 논리 위치를 점유하는 GridCell을 가리킨다.
 */
export function buildGridMap(table: HTMLTableElement): (GridCell | null)[][] {
  const rows = Array.from(table.rows);
  const grid: (GridCell | null)[][] = rows.map(() => []);

  for (let r = 0; r < rows.length; r++) {
    let c = 0;
    for (const rawCell of Array.from(rows[r].cells)) {
      const cell = rawCell as HTMLTableCellElement;
      while (grid[r][c] !== undefined && grid[r][c] !== null) c++;

      const rowspan = Math.max(cell.rowSpan, 1);
      const colspan = Math.max(cell.colSpan, 1);
      const gc: GridCell = { cell, row: r, col: c };

      for (let dr = 0; dr < rowspan && r + dr < rows.length; dr++) {
        if (!grid[r + dr]) grid[r + dr] = [];
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
 * 에디터 contentEl에 대한 테이블 셀 선택/병합/분할 관리.
 *
 * - 테이블 셀 클릭 → 단일 셀 선택
 * - Shift+클릭 → 앵커~타깃 사각형 영역 다중 선택
 * - merge() → 선택된 셀 병합
 * - split(cell) → 단일 병합 셀 분할
 */
export class CellMerger {
  private contentEl: HTMLElement | null = null;
  private selectedCells: Set<HTMLTableCellElement> = new Set();
  private anchorCell: HTMLTableCellElement | null = null;
  private currentTable: HTMLTableElement | null = null;

  private readonly clickHandler = (e: MouseEvent): void => {
    const cell = this.findCell(e.target as Node);
    if (!cell) {
      if (!(e.target as Element).closest?.('table')) this.clearSelection();
      return;
    }

    const table = cell.closest('table') as HTMLTableElement | null;

    if (e.shiftKey && this.anchorCell && table === this.currentTable) {
      e.preventDefault();
      this.selectRange(this.anchorCell, cell);
    } else {
      this.clearSelection();
      this.currentTable = table;
      this.anchorCell = cell;
      this.selectCell(cell);
    }
  };

  /** contentEl에 이벤트를 위임하여 모든 하위 테이블을 처리한다 */
  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('click', this.clickHandler);
    CellMerger.injectStyles(contentEl.ownerDocument);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('click', this.clickHandler);
      this.contentEl = null;
    }
    this.clearSelection();
    this.anchorCell = null;
    this.currentTable = null;
  }

  getSelectedCells(): HTMLTableCellElement[] {
    return Array.from(this.selectedCells);
  }

  getSelectedTable(): HTMLTableElement | null {
    return this.currentTable;
  }

  clearSelection(): void {
    for (const cell of this.selectedCells) {
      cell.classList.remove('poa-cell-selected');
    }
    this.selectedCells.clear();
  }

  /** 현재 선택된 셀들을 병합한다 */
  merge(): boolean {
    if (!this.currentTable || this.selectedCells.size < 2) return false;
    try {
      CellMerger.mergeCells(Array.from(this.selectedCells), this.currentTable);
      this.clearSelection();
      return true;
    } catch {
      return false;
    }
  }

  /** 단일 셀을 분할한다 */
  split(cell: HTMLTableCellElement): void {
    const table = cell.closest('table') as HTMLTableElement | null;
    if (!table) return;
    CellMerger.splitCell(cell, table);
    this.clearSelection();
  }

  // ── Static helpers ────────────────────────────────────────────────

  /** cells 배열이 table 안에서 직사각형 영역을 이루면 첫 번째 셀로 병합한다 */
  static mergeCells(cells: HTMLTableCellElement[], table: HTMLTableElement): void {
    if (cells.length < 2) return;

    const grid = buildGridMap(table);
    const cellSet = new Set(cells);

    let minRow = Infinity, maxRow = -Infinity;
    let minCol = Infinity, maxCol = -Infinity;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && cellSet.has(gc.cell)) {
          if (r < minRow) minRow = r;
          if (r > maxRow) maxRow = r;
          if (c < minCol) minCol = c;
          if (c > maxCol) maxCol = c;
        }
      }
    }

    // 직사각형 검증
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const gc = grid[r]?.[c];
        if (!gc || !cellSet.has(gc.cell)) {
          throw new Error('선택 영역이 직사각형이 아닙니다.');
        }
      }
    }

    const targetGc = grid[minRow]?.[minCol];
    if (!targetGc) return;
    const targetCell = targetGc.cell;

    // 병합 대상 셀 수집 (원점 위치만 처리)
    const contentParts: string[] = [];
    const toRemove = new Set<HTMLTableCellElement>();

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const gc = grid[r]?.[c];
        if (!gc || gc.row !== r || gc.col !== c) continue;
        if (gc.cell === targetCell) continue;

        const inner = gc.cell.innerHTML.replace(/^(\s|&nbsp;)*$/i, '').trim();
        if (inner) contentParts.push(inner);
        toRemove.add(gc.cell);
      }
    }

    if (contentParts.length > 0) {
      const existing = targetCell.innerHTML.replace(/^(\s|&nbsp;)*$/i, '').trim();
      targetCell.innerHTML = [existing, ...contentParts].filter(Boolean).join(' ') || '&nbsp;';
    }

    targetCell.colSpan = maxCol - minCol + 1;
    targetCell.rowSpan = maxRow - minRow + 1;

    for (const cell of toRemove) {
      cell.remove();
    }
  }

  /** colspan/rowspan > 1인 셀을 개별 셀들로 분할한다 */
  static splitCell(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const colspan = Math.max(cell.colSpan, 1);
    const rowspan = Math.max(cell.rowSpan, 1);
    if (colspan === 1 && rowspan === 1) return;

    const grid = buildGridMap(table);
    const rows = Array.from(table.rows);

    let cellRow = -1, cellCol = -1;
    outer: for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc?.cell === cell && gc.row === r && gc.col === c) {
          cellRow = r; cellCol = c; break outer;
        }
      }
    }
    if (cellRow === -1) return;

    const ownerDoc = cell.ownerDocument;
    const tagName = cell.tagName.toLowerCase() as 'td' | 'th';

    cell.colSpan = 1;
    cell.rowSpan = 1;

    // 같은 행: 원본 셀 바로 뒤에 순서대로 삽입
    let insertRef: Element = cell;
    for (let dc = 1; dc < colspan; dc++) {
      const newCell = CellMerger.makeEmptyCell(ownerDoc, tagName, cell.style.cssText);
      insertRef.insertAdjacentElement('afterend', newCell);
      insertRef = newCell;
    }

    // 다른 행: 병합 영역 이후 첫 번째 셀 앞에 모두 삽입
    for (let dr = 1; dr < rowspan; dr++) {
      const targetRow = rows[cellRow + dr];
      if (!targetRow) continue;

      const insertBefore = CellMerger.findInsertBefore(
        grid, cellRow + dr, cellCol + colspan - 1, targetRow,
      );

      for (let dc = 0; dc < colspan; dc++) {
        const newCell = CellMerger.makeEmptyCell(ownerDoc, tagName, cell.style.cssText);
        if (insertBefore) {
          targetRow.insertBefore(newCell, insertBefore);
        } else {
          targetRow.appendChild(newCell);
        }
      }
    }
  }

  // ── Private helpers ───────────────────────────────────────────────

  private findCell(node: Node): HTMLTableCellElement | null {
    let cur: Node | null = node;
    while (cur) {
      if (cur.nodeType === Node.ELEMENT_NODE) {
        const tag = (cur as Element).tagName.toLowerCase();
        if (tag === 'td' || tag === 'th') return cur as HTMLTableCellElement;
        if (tag === 'table') break;
      }
      cur = cur.parentNode;
    }
    return null;
  }

  private selectCell(cell: HTMLTableCellElement): void {
    this.selectedCells.add(cell);
    cell.classList.add('poa-cell-selected');
  }

  private selectRange(anchor: HTMLTableCellElement, target: HTMLTableCellElement): void {
    const table = anchor.closest('table') as HTMLTableElement | null;
    if (!table || target.closest('table') !== table) return;

    const grid = buildGridMap(table);
    const cellSet = new Map<HTMLTableCellElement, { r: number; c: number }>();

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c) {
          cellSet.set(gc.cell, { r, c });
        }
      }
    }

    const aPos = cellSet.get(anchor);
    const tPos = cellSet.get(target);
    if (!aPos || !tPos) return;

    const minRow = Math.min(aPos.r, tPos.r);
    const maxRow = Math.max(aPos.r, tPos.r);
    const minCol = Math.min(aPos.c, tPos.c);
    const maxCol = Math.max(aPos.c, tPos.c);

    this.clearSelection();

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c) {
          this.selectCell(gc.cell);
        }
      }
    }
  }

  private static findInsertBefore(
    grid: (GridCell | null)[][],
    physRow: number,
    afterCol: number,
    targetRowEl: HTMLTableRowElement,
  ): Element | null {
    const rowGrid = grid[physRow];
    if (!rowGrid) return null;

    for (let c = afterCol + 1; c < rowGrid.length; c++) {
      const gc = rowGrid[c];
      if (gc && gc.row === physRow && gc.col === c && gc.cell.parentElement === targetRowEl) {
        return gc.cell;
      }
    }
    return null;
  }

  private static makeEmptyCell(
    ownerDoc: Document,
    tag: 'td' | 'th',
    cssText: string,
  ): HTMLTableCellElement {
    const cell = ownerDoc.createElement(tag);
    cell.style.cssText = cssText;
    cell.innerHTML = '&nbsp;';
    return cell;
  }

  private static _stylesInjected = false;
  private static injectStyles(ownerDoc: Document): void {
    if (CellMerger._stylesInjected) return;
    CellMerger._stylesInjected = true;
    const style = ownerDoc.createElement('style');
    style.id = 'poa-cell-merger-styles';
    style.textContent = '.poa-cell-selected{outline:2px solid #1565c0!important;background:rgba(21,101,192,0.08)!important;}';
    ownerDoc.head.appendChild(style);
  }
}
