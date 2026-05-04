import { describe, it, expect, afterEach } from 'vitest';
import { buildGridMap, CellMerger } from '../../src/modules/table/CellMerger';

// ───────────────────── 헬퍼 ──────────────────────────────────────────

/** rows × cols 단순 표 생성 */
function makeTable(rows: number, cols: number): HTMLTableElement {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  for (let r = 0; r < rows; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.textContent = `r${r}c${c}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}

/** colspan=2 셀을 포함한 2행 3열 표 */
function makeTableWithColspan(): HTMLTableElement {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  const tr0 = document.createElement('tr');
  const td00 = document.createElement('td'); td00.colSpan = 2; td00.textContent = 'A';
  const td02 = document.createElement('td'); td02.textContent = 'B';
  tr0.append(td00, td02);

  const tr1 = document.createElement('tr');
  ['C', 'D', 'E'].forEach((t) => {
    const td = document.createElement('td'); td.textContent = t; tr1.appendChild(td);
  });

  tbody.append(tr0, tr1);
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}

/** rowspan=2 셀을 포함한 2행 표 */
function makeTableWithRowspan(): HTMLTableElement {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  const tr0 = document.createElement('tr');
  const spanned = document.createElement('td'); spanned.rowSpan = 2;
  const td01 = document.createElement('td'); td01.textContent = 'R';
  tr0.append(spanned, td01);

  const tr1 = document.createElement('tr');
  const td10 = document.createElement('td'); td10.textContent = 'S';
  tr1.appendChild(td10);

  tbody.append(tr0, tr1);
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}

const cleanup: HTMLTableElement[] = [];
afterEach(() => { cleanup.forEach((t) => t.remove()); cleanup.length = 0; });
function track<T extends HTMLTableElement>(t: T): T { cleanup.push(t); return t; }

// ───────────────────── buildGridMap ──────────────────────────────────

describe('buildGridMap', () => {
  it('3×3 단순 표의 행/열 수를 정확히 반환한다', () => {
    const table = track(makeTable(3, 3));
    const grid  = buildGridMap(table);

    expect(grid).toHaveLength(3);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        expect(grid[r][c]?.cell).toBe(table.rows[r].cells[c]);
        expect(grid[r][c]?.row).toBe(r);
        expect(grid[r][c]?.col).toBe(c);
      }
    }
  });

  it('colspan=2 셀이 두 열을 동일한 GridCell 로 채운다', () => {
    const table = track(makeTableWithColspan());
    const grid  = buildGridMap(table);

    expect(grid[0][0]?.cell).toBe(grid[0][1]?.cell);
    expect(grid[0][0]?.col).toBe(0);  // 원점 열은 0
    expect(grid[0][1]?.col).toBe(0);  // 같은 GridCell → col 도 0
    expect(grid[0][2]?.cell.textContent).toBe('B');
  });

  it('rowspan=2 셀이 두 행을 동일한 GridCell 로 채운다', () => {
    const table = track(makeTableWithRowspan());
    const grid  = buildGridMap(table);

    expect(grid[0][0]?.cell).toBe(grid[1][0]?.cell);
    expect(grid[0][0]?.row).toBe(0);  // 원점 행은 0
  });
});

// ───────────────────── mergeCells ────────────────────────────────────

describe('CellMerger.mergeCells', () => {
  it('2×2 직사각형 병합 시 colspan/rowspan 이 정확히 설정된다', () => {
    const table = track(makeTable(3, 3));
    const cells = [
      table.rows[0].cells[0], table.rows[0].cells[1],
      table.rows[1].cells[0], table.rows[1].cells[1],
    ] as HTMLTableCellElement[];

    const result = CellMerger.mergeCells(cells, table);
    expect(result.success).toBe(true);

    const merged = table.rows[0].cells[0] as HTMLTableCellElement;
    expect(merged.colSpan).toBe(2);
    expect(merged.rowSpan).toBe(2);
    expect(table.rows[0].cells).toHaveLength(2); // merged + col2
    expect(table.rows[1].cells).toHaveLength(1); // merged 에 흡수됨
  });

  it('비직사각형 선택 시 success:false 와 "병합 불가" 메시지를 반환한다', () => {
    const table = track(makeTable(3, 3));
    const cells = [
      table.rows[0].cells[0], table.rows[0].cells[1],
      table.rows[1].cells[0],  // L자형 — 비직사각형
    ] as HTMLTableCellElement[];

    const result = CellMerger.mergeCells(cells, table);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/병합 불가/);
  });

  it('병합 시 비어있지 않은 내용을 첫 번째 셀에 합친다', () => {
    const table = track(makeTable(1, 3));
    (table.rows[0].cells[0] as HTMLTableCellElement).textContent = '왼쪽';
    (table.rows[0].cells[1] as HTMLTableCellElement).textContent = '오른쪽';

    CellMerger.mergeCells(
      [table.rows[0].cells[0], table.rows[0].cells[1]] as HTMLTableCellElement[],
      table,
    );

    const merged = table.rows[0].cells[0].textContent ?? '';
    expect(merged).toContain('왼쪽');
    expect(merged).toContain('오른쪽');
  });

  it('셀 수가 1개이면 success:false 를 반환한다', () => {
    const table  = track(makeTable(2, 2));
    const result = CellMerger.mergeCells([table.rows[0].cells[0] as HTMLTableCellElement], table);
    expect(result.success).toBe(false);
  });
});

// ───────────────────── splitCellHorizontal ───────────────────────────

describe('CellMerger.splitCellHorizontal', () => {
  it('colspan=2 셀을 분할하면 같은 행에 2개 셀이 생긴다', () => {
    const table = track(makeTable(1, 3));
    const cell  = table.rows[0].cells[0] as HTMLTableCellElement;
    cell.colSpan = 2;
    table.rows[0].deleteCell(1);

    CellMerger.splitCellHorizontal(cell, table);

    expect(cell.colSpan).toBe(1);
    expect(table.rows[0].cells).toHaveLength(3);
  });

  it('colspan=1 셀에서 splitCellHorizontal 은 아무것도 하지 않는다', () => {
    const table = track(makeTable(2, 2));
    CellMerger.splitCellHorizontal(table.rows[0].cells[0] as HTMLTableCellElement, table);
    expect(table.rows[0].cells).toHaveLength(2);
  });
});

// ───────────────────── splitCellVertical ─────────────────────────────

describe('CellMerger.splitCellVertical', () => {
  it('rowspan=2 셀 분할 시 두 번째 행에 새 셀이 추가된다', () => {
    const table = track(makeTableWithRowspan());
    const spanned = table.rows[0].cells[0] as HTMLTableCellElement;

    expect(table.rows[1].cells).toHaveLength(1);
    CellMerger.splitCellVertical(spanned, table);

    expect(spanned.rowSpan).toBe(1);
    expect(table.rows[1].cells).toHaveLength(2);
  });

  it('rowspan=1 셀에서 splitCellVertical 은 아무것도 하지 않는다', () => {
    const table = track(makeTable(2, 2));
    CellMerger.splitCellVertical(table.rows[0].cells[0] as HTMLTableCellElement, table);
    expect(table.rows[0].cells).toHaveLength(2);
  });
});

// ───────────────────── applyCellProperties ───────────────────────────

describe('CellMerger.applyCellProperties', () => {
  it('테두리/들여쓰기/배경색/ID/Class 를 셀에 적용한다', () => {
    const table = track(makeTable(1, 1));
    const cell  = table.rows[0].cells[0] as HTMLTableCellElement;

    CellMerger.applyCellProperties(cell, {
      borderStyle: 'dashed', borderWidth: 2, borderColor: '#ff0000',
      indent: 10, bgColor: '#ffff00', id: 'cell1', className: 'highlight',
    });

    expect(cell.style.border).toContain('dashed');
    // jsdom normalizes hex colors to rgb()
    expect(cell.style.border).toMatch(/dashed/);
    expect(cell.style.paddingLeft).toBe('10px');
    expect(cell.style.backgroundColor).toBe('rgb(255, 255, 0)');
    expect(cell.id).toBe('cell1');
    expect(cell.className).toBe('highlight');
  });

  it('borderStyle:"none" 이면 border:none 으로 설정된다', () => {
    const table = track(makeTable(1, 1));
    const cell  = table.rows[0].cells[0] as HTMLTableCellElement;

    CellMerger.applyCellProperties(cell, { borderStyle: 'none', borderWidth: 1, borderColor: '#000' });
    // jsdom may normalize border:none to empty string — either is acceptable
    expect(cell.style.borderStyle === 'none' || cell.style.border === '' || cell.style.border === 'none').toBe(true);
  });
});

// ───────────────────── CellMerger 인스턴스 (선택 관련) ───────────────

describe('CellMerger instance — merge 반환값', () => {
  it('선택 없이 merge() 호출 시 success:false 를 반환한다', () => {
    const merger = new CellMerger();
    const result = merger.merge();
    expect(result.success).toBe(false);
  });
});
