import { describe, it, expect, afterEach } from 'vitest';
import { buildGridMap, CellMerger } from '../../src/modules/table/CellMerger';

// ───────────────────── 헬퍼 ──────────────────────────────────────────

function makeTable(rowDefs: number[]): HTMLTableElement {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  for (const cols of rowDefs) {
    const tr = document.createElement('tr');
    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.textContent = `r${rowDefs.indexOf(cols)}c${c}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}

function makeTableWithSpan(): HTMLTableElement {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  // Row 0: [td(colspan=2), td]  → 3 logical columns
  const tr0 = document.createElement('tr');
  const td00 = document.createElement('td'); td00.colSpan = 2; td00.textContent = 'A';
  const td02 = document.createElement('td'); td02.textContent = 'B';
  tr0.append(td00, td02);

  // Row 1: [td, td, td]
  const tr1 = document.createElement('tr');
  const td10 = document.createElement('td'); td10.textContent = 'C';
  const td11 = document.createElement('td'); td11.textContent = 'D';
  const td12 = document.createElement('td'); td12.textContent = 'E';
  tr1.append(td10, td11, td12);

  tbody.append(tr0, tr1);
  table.appendChild(tbody);
  document.body.appendChild(table);
  return table;
}

// ───────────────────── buildGridMap ──────────────────────────────────

describe('buildGridMap', () => {
  let table: HTMLTableElement;

  afterEach(() => {
    table?.remove();
  });

  it('2×2 단순 테이블의 그리드를 정확히 구축한다', () => {
    table = makeTable([2, 2]);
    const grid = buildGridMap(table);

    expect(grid).toHaveLength(2);
    expect(grid[0][0]?.cell).toBe(table.rows[0].cells[0]);
    expect(grid[0][1]?.cell).toBe(table.rows[0].cells[1]);
    expect(grid[1][0]?.cell).toBe(table.rows[1].cells[0]);
    expect(grid[1][1]?.cell).toBe(table.rows[1].cells[1]);
  });

  it('colspan=2인 셀이 두 열에 걸쳐 같은 GridCell을 참조한다', () => {
    table = makeTableWithSpan();
    const grid = buildGridMap(table);

    // grid[0][0]과 grid[0][1]은 동일한 GridCell(td00)을 가리킨다
    expect(grid[0][0]?.cell).toBe(grid[0][1]?.cell);
    expect(grid[0][0]?.cell.textContent).toBe('A');
    // grid[0][2]는 td02
    expect(grid[0][2]?.cell.textContent).toBe('B');
  });

  it('colspan 셀의 GridCell.col은 원점 열 인덱스이다', () => {
    table = makeTableWithSpan();
    const grid = buildGridMap(table);

    expect(grid[0][0]?.col).toBe(0);
    expect(grid[0][1]?.col).toBe(0); // 같은 셀, 원점은 col=0
    expect(grid[0][2]?.col).toBe(2);
  });
});

// ───────────────────── CellMerger.mergeCells ─────────────────────────

describe('CellMerger.mergeCells', () => {
  let table: HTMLTableElement;

  afterEach(() => {
    table?.remove();
  });

  it('2×2 블록 선택 시 네 셀을 하나로 병합한다', () => {
    table = makeTable([3, 3]);
    const cells = [
      table.rows[0].cells[0],
      table.rows[0].cells[1],
      table.rows[1].cells[0],
      table.rows[1].cells[1],
    ] as HTMLTableCellElement[];

    CellMerger.mergeCells(cells, table);

    const merged = table.rows[0].cells[0] as HTMLTableCellElement;
    expect(merged.colSpan).toBe(2);
    expect(merged.rowSpan).toBe(2);
    // row0에는 merged + cells[2] 두 개 (원래 3개에서 2개 제거)
    expect(table.rows[0].cells).toHaveLength(2);
    // row1에는 1개 남음 (cells[0] 제거됨)
    expect(table.rows[1].cells).toHaveLength(1);
  });

  it('직사각형이 아닌 선택에서 오류가 발생한다', () => {
    table = makeTable([3, 3]);
    // L자형 선택 — (0,0), (0,1), (1,0) → non-rectangular
    const cells = [
      table.rows[0].cells[0],
      table.rows[0].cells[1],
      table.rows[1].cells[0],
    ] as HTMLTableCellElement[];

    expect(() => CellMerger.mergeCells(cells, table)).toThrow('직사각형');
  });

  it('병합 시 비어있지 않은 셀 내용을 첫 번째 셀에 합친다', () => {
    table = makeTable([2, 2]);
    (table.rows[0].cells[0] as HTMLTableCellElement).textContent = '왼쪽';
    (table.rows[0].cells[1] as HTMLTableCellElement).textContent = '오른쪽';

    const cells = [
      table.rows[0].cells[0],
      table.rows[0].cells[1],
    ] as HTMLTableCellElement[];
    CellMerger.mergeCells(cells, table);

    expect(table.rows[0].cells[0].textContent).toContain('왼쪽');
    expect(table.rows[0].cells[0].textContent).toContain('오른쪽');
  });
});

// ───────────────────── CellMerger.splitCell ──────────────────────────

describe('CellMerger.splitCell', () => {
  let table: HTMLTableElement;

  afterEach(() => {
    table?.remove();
  });

  it('colspan=2 셀을 분할하면 같은 행에 셀 2개가 된다', () => {
    table = makeTable([2, 2]);
    const cell = table.rows[0].cells[0] as HTMLTableCellElement;
    cell.colSpan = 2;
    table.rows[0].deleteCell(1); // 병합 상태 시뮬레이션

    CellMerger.splitCell(cell, table);

    expect(cell.colSpan).toBe(1);
    expect(table.rows[0].cells).toHaveLength(2);
  });

  it('colspan=1, rowspan=1 셀에서 splitCell은 아무것도 하지 않는다', () => {
    table = makeTable([2, 2]);
    const cell = table.rows[0].cells[0] as HTMLTableCellElement;

    expect(cell.colSpan).toBe(1);
    expect(cell.rowSpan).toBe(1);
    CellMerger.splitCell(cell, table); // no-op

    expect(table.rows[0].cells).toHaveLength(2);
  });

  it('rowspan=2 셀 분할 시 두 번째 행에 새 셀이 추가된다', () => {
    table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Row 0: [td(rowspan=2), td]
    const tr0 = document.createElement('tr');
    const spanned = document.createElement('td'); spanned.rowSpan = 2;
    const td01 = document.createElement('td');
    tr0.append(spanned, td01);

    // Row 1: [td] (spanned cell "occupies" col 0)
    const tr1 = document.createElement('tr');
    const td10 = document.createElement('td');
    tr1.append(td10);

    tbody.append(tr0, tr1);
    table.appendChild(tbody);
    document.body.appendChild(table);

    expect(table.rows[1].cells).toHaveLength(1);

    CellMerger.splitCell(spanned, table);

    expect(spanned.rowSpan).toBe(1);
    expect(table.rows[1].cells).toHaveLength(2);
  });
});
