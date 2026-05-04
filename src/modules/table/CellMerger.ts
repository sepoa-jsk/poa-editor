/** 논리 그리드 상의 셀 참조 */
export interface GridCell {
  cell: HTMLTableCellElement;
  /** 셀이 물리적으로 속한 행 인덱스 (table.rows 기준) */
  row: number;
  /** 셀의 논리 원점 열 인덱스 */
  col: number;
}

/** 셀 속성 */
export interface CellProperties {
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  borderWidth?: number;
  borderColor?: string;
  /** 들여쓰기 = padding-left px */
  indent?: number;
  bgColor?: string;
  id?: string;
  className?: string;
}

export interface MergeResult {
  success: boolean;
  message?: string;
}

/**
 * table.rows 를 순회하여 colspan/rowspan 을 반영한 2D 논리 그리드를 구축한다.
 * grid[r][c] 는 해당 논리 위치를 점유하는 GridCell 을 가리킨다.
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
 * 에디터 contentEl 에 대한 테이블 셀 선택·병합·분할 관리.
 *
 * - 셀 클릭 → 단일 선택
 * - Shift+클릭 → 앵커~타깃 직사각형 다중 선택 (파란 테두리 강조)
 * - merge() → 선택 셀 병합, 첫 번째 셀 내용 유지
 * - splitCellHorizontal/Vertical() → colspan/rowspan 기준 분할
 * - applyCellProperties() → 셀 스타일 속성 적용
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
      this.anchorCell   = cell;
      this.selectCell(cell);
    }
  };

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
    this.anchorCell   = null;
    this.currentTable = null;
  }

  getSelectedCells(): HTMLTableCellElement[] { return Array.from(this.selectedCells); }
  getSelectedTable(): HTMLTableElement | null { return this.currentTable; }

  /** TableSelector 에서 드래그 도중 범위를 확장할 때 호출 */
  selectTo(target: HTMLTableCellElement): void {
    if (!this.anchorCell) {
      this.clearSelection();
      this.anchorCell   = target;
      this.currentTable = target.closest('table') as HTMLTableElement | null;
      this.selectCell(target);
    } else {
      this.selectRange(this.anchorCell, target);
    }
  }

  /** 드래그 시작 셀을 앵커로 지정 (clearSelection 포함) */
  setAnchor(cell: HTMLTableCellElement): void {
    this.clearSelection();
    this.currentTable = cell.closest('table') as HTMLTableElement | null;
    this.anchorCell   = cell;
    this.selectCell(cell);
  }

  clearSelection(): void {
    for (const cell of this.selectedCells) cell.classList.remove('poa-cell-selected');
    this.selectedCells.clear();
  }

  /** 현재 선택된 셀들을 병합한다. 비직사각형이면 실패 메시지를 반환한다 */
  merge(): MergeResult {
    if (!this.currentTable) return { success: false, message: '선택된 표가 없습니다.' };
    if (this.selectedCells.size < 2) return { success: false, message: '병합할 셀을 2개 이상 선택하세요.' };

    const result = CellMerger.mergeCells(Array.from(this.selectedCells), this.currentTable);
    if (result.success) this.clearSelection();
    return result;
  }

  // ── Static helpers ────────────────────────────────────────────────

  /**
   * cells 배열이 직사각형 영역을 이루면 첫 번째 셀로 병합한다.
   * 비직사각형이면 success: false 를 반환한다.
   */
  static mergeCells(cells: HTMLTableCellElement[], table: HTMLTableElement): MergeResult {
    if (cells.length < 2) return { success: false, message: '병합할 셀을 2개 이상 선택하세요.' };

    const grid    = buildGridMap(table);
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
          return { success: false, message: '병합 불가: 선택 영역이 직사각형이 아닙니다.' };
        }
      }
    }

    const targetCell = grid[minRow]?.[minCol]?.cell;
    if (!targetCell) return { success: false };

    const contentParts: string[] = [];
    const toRemove = new Set<HTMLTableCellElement>();

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const gc = grid[r]?.[c];
        if (!gc || gc.row !== r || gc.col !== c || gc.cell === targetCell) continue;
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

    for (const cell of toRemove) cell.remove();
    return { success: true };
  }

  /**
   * colspan > 1 셀을 수평 분할한다 (colspan 기준).
   * 1x1 셀은 무시한다.
   */
  static splitCellHorizontal(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const colspan = Math.max(cell.colSpan, 1);
    if (colspan === 1) return;

    const grid = buildGridMap(table);
    const ownerDoc = cell.ownerDocument;
    const tag = cell.tagName.toLowerCase() as 'td' | 'th';

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

    const origRowspan = Math.max(cell.rowSpan, 1);
    cell.colSpan = 1;

    // 같은 행: 원본 셀 뒤에 순서대로 삽입
    let prev: Element = cell;
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
        if (!targetRow) continue;
        const insertBefore = CellMerger.findInsertBefore(grid, cellRow + dr, cellCol + colspan - 1, targetRow);
        for (let dc = 0; dc < colspan; dc++) {
          const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
          if (insertBefore) targetRow.insertBefore(nc, insertBefore);
          else              targetRow.appendChild(nc);
        }
      }
      cell.rowSpan = 1;
    }
  }

  /**
   * rowspan > 1 셀을 수직 분할한다 (rowspan 기준).
   * 1x1 셀은 무시한다.
   */
  static splitCellVertical(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const rowspan = Math.max(cell.rowSpan, 1);
    if (rowspan === 1) return;

    const grid = buildGridMap(table);
    const rows = Array.from(table.rows);
    const ownerDoc = cell.ownerDocument;
    const tag = cell.tagName.toLowerCase() as 'td' | 'th';

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

    const origColspan = Math.max(cell.colSpan, 1);
    cell.rowSpan = 1;

    for (let dr = 1; dr < rowspan; dr++) {
      const targetRow = rows[cellRow + dr];
      if (!targetRow) continue;
      const insertBefore = CellMerger.findInsertBefore(grid, cellRow + dr, cellCol + origColspan - 1, targetRow);
      for (let dc = 0; dc < origColspan; dc++) {
        const nc = CellMerger.makeEmptyCell(ownerDoc, tag, cell.style.cssText);
        if (insertBefore) targetRow.insertBefore(nc, insertBefore);
        else              targetRow.appendChild(nc);
      }
    }
  }

  /** 셀에 CellProperties 를 적용한다 */
  static applyCellProperties(cell: HTMLTableCellElement, props: CellProperties): void {
    const { borderStyle, borderWidth, borderColor, indent, bgColor, id, className } = props;

    if (borderStyle !== undefined || borderWidth !== undefined || borderColor !== undefined) {
      const bStyle = borderStyle ?? 'solid';
      const bWidth = borderWidth ?? 1;
      const bColor = borderColor ?? '#000000';
      cell.style.border = bStyle === 'none' ? 'none' : `${bWidth}px ${bStyle} ${bColor}`;
    }
    if (indent     !== undefined) cell.style.paddingLeft   = indent > 0 ? `${indent}px` : '';
    if (bgColor    !== undefined) cell.style.backgroundColor = bgColor;
    if (id         !== undefined) cell.id        = id;
    if (className  !== undefined) cell.className = className;
  }

  /** 셀의 현재 CellProperties 를 읽어 반환한다 */
  static readCellProperties(cell: HTMLTableCellElement): CellProperties {
    const bm = cell.style.border.match(/^(\d+)px\s+(\S+)\s+(.+)$/);
    return {
      borderStyle:  (bm?.[2] as CellProperties['borderStyle']) ?? 'solid',
      borderWidth:  bm ? parseInt(bm[1], 10) : 1,
      borderColor:  bm?.[3] ?? '#000000',
      indent:       parseFloat(cell.style.paddingLeft) || 0,
      bgColor:      cell.style.backgroundColor || '',
      id:           cell.id        || '',
      className:    cell.className || '',
    };
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

    const grid    = buildGridMap(table);
    const cellPos = new Map<HTMLTableCellElement, { r: number; c: number }>();

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c) cellPos.set(gc.cell, { r, c });
      }
    }

    const aPos = cellPos.get(anchor);
    const tPos = cellPos.get(target);
    if (!aPos || !tPos) return;

    const minRow = Math.min(aPos.r, tPos.r), maxRow = Math.max(aPos.r, tPos.r);
    const minCol = Math.min(aPos.c, tPos.c), maxCol = Math.max(aPos.c, tPos.c);

    this.clearSelection();
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c) this.selectCell(gc.cell);
      }
    }
  }

  static findInsertBefore(
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
    const s = ownerDoc.createElement('style');
    s.id = 'poa-cell-merger-styles';
    s.textContent = [
      '.poa-cell-selected{outline:2px solid #1565c0!important;background:rgba(21,101,192,0.12)!important;}',
      '.poa-cell-sel-ok{outline:2px solid #2e7d32!important;background:rgba(46,125,50,0.12)!important;}',
      '.poa-cell-sel-bad{outline:2px solid #c62828!important;background:rgba(198,40,40,0.10)!important;}',
    ].join('');
    ownerDoc.head.appendChild(s);
  }
}
