import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableResizer } from '../../src/modules/table/TableResizer.js';

// ── 헬퍼 ──────────────────────────────────────────────────────────

interface TableFixture {
  table: HTMLTableElement;
  rows:  HTMLTableRowElement[];
  cells: HTMLTableCellElement[][];  // [rowIdx][colIdx]
}

function makeTable(numRows = 2, numCols = 3): TableFixture {
  const table  = document.createElement('table');
  const tbody  = document.createElement('tbody');
  const rows:  HTMLTableRowElement[]    = [];
  const cells: HTMLTableCellElement[][] = [];

  for (let r = 0; r < numRows; r++) {
    const tr: HTMLTableRowElement = document.createElement('tr');
    const rowCells: HTMLTableCellElement[] = [];
    for (let c = 0; c < numCols; c++) {
      const td: HTMLTableCellElement = document.createElement('td');
      // offsetWidth/offsetHeight는 jsdom에서 항상 0 → 직접 setter 모킹
      Object.defineProperty(td, 'offsetWidth',  { configurable: true, get: () => 100 });
      Object.defineProperty(td, 'offsetHeight', { configurable: true, get: () => 40 });
      tr.appendChild(td);
      rowCells.push(td);
    }
    tbody.appendChild(tr);
    rows.push(tr);
    cells.push(rowCells);
  }
  table.appendChild(tbody);

  // table.offsetWidth 모킹
  Object.defineProperty(table, 'offsetWidth', { configurable: true, get: () => 300 });

  // tr.offsetHeight 모킹
  for (const tr of rows) {
    Object.defineProperty(tr, 'offsetHeight', { configurable: true, get: () => 40 });
  }

  document.body.appendChild(table);
  return { table, rows, cells };
}

function mockCellBCR(
  cell: HTMLTableCellElement,
  x: number, y: number, w: number, h: number,
): void {
  vi.spyOn(cell, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(x, y, w, h),
  );
}

function fireMousedown(target: HTMLElement, x: number, y: number): void {
  target.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y, button: 0 }),
  );
}

function fireMousemove(x: number, y: number): void {
  document.dispatchEvent(
    new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }),
  );
}

function fireMouseup(): void {
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

// ── 테스트 ─────────────────────────────────────────────────────────

describe('TableResizer', () => {
  let contentEl: HTMLDivElement;
  let resizer:   TableResizer;
  let modified:  ReturnType<typeof vi.fn>;

  beforeEach(() => {
    contentEl = document.createElement('div');
    Object.defineProperty(contentEl, 'offsetWidth', { configurable: true, get: () => 800 });
    document.body.appendChild(contentEl);
    modified = vi.fn();
    resizer  = new TableResizer(modified);
    resizer.attach(contentEl);
  });

  afterEach(() => {
    resizer.detach();
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  // ── 경계선 클릭 (드래그 없음) ──────────────────────────────────

  it('경계선 단순 클릭 시 table.style.width 변경 없음', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);  // right=100, bottom=40

    fireMousedown(cell, 100, 20);  // 우측 경계
    fireMouseup();

    expect(table.style.width).toBe('');
    expect(table.style.tableLayout).toBe('');
  });

  it('경계선 단순 클릭 시 onModified 호출 안 함', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMouseup();

    expect(modified).not.toHaveBeenCalled();
  });

  // ── DRAG_THRESHOLD 미만 ─────────────────────────────────────────

  it('DRAG_THRESHOLD 미만 이동 시 table 변경 없음', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMousemove(103, 20);  // 3px — 임계값(5) 미만

    expect(table.style.tableLayout).toBe('');
  });

  // ── 열 리사이즈 ────────────────────────────────────────────────

  it('열 드래그 시 table.style.width 가 먼저 잠금된다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMousemove(108, 20);  // 8px → 임계값 초과

    expect(table.style.width).toBe('300px');
    expect(table.style.tableLayout).toBe('fixed');
  });

  it('열 드래그 시 같은 열(cellIndex 기준)의 모든 셀 너비가 변경된다', () => {
    const { table, cells } = makeTable(2, 3);  // 2행 3열
    contentEl.appendChild(table);

    const cell00 = cells[0]![0]!;  // cellIndex = 0
    const cell10 = cells[1]![0]!;  // cellIndex = 0, 같은 열
    mockCellBCR(cell00, 0, 0, 100, 40);

    fireMousedown(cell00, 100, 20);
    fireMousemove(120, 20);  // 20px 오른쪽 이동

    // startWidth(100) + delta(20) = 120px
    expect(cell00.style.width).toBe('120px');
    expect(cell10.style.width).toBe('120px');  // 같은 열도 변경
  });

  it('열 드래그 시 다른 열(cellIndex 1, 2)은 변경되지 않는다', () => {
    const { table, cells } = makeTable(2, 3);  // 2행 3열
    contentEl.appendChild(table);

    const cell00 = cells[0]![0]!;  // 0번 열 — 드래그 대상
    const cell01 = cells[0]![1]!;  // 1번 열 — 변경 없어야 함
    const cell02 = cells[0]![2]!;  // 2번 열 — 변경 없어야 함
    mockCellBCR(cell00, 0, 0, 100, 40);

    fireMousedown(cell00, 100, 20);
    fireMousemove(130, 20);  // 30px 이동

    expect(cell00.style.width).toBe('130px');
    expect(cell01.style.width).toBe('');  // 변경 없음
    expect(cell02.style.width).toBe('');  // 변경 없음
  });

  it('중간 열(cellIndex 1) 드래그 시 해당 열만 변경된다', () => {
    const { table, cells } = makeTable(2, 3);
    contentEl.appendChild(table);

    const cell01 = cells[0]![1]!;  // 1번 열 (B열)
    const cell11 = cells[1]![1]!;  // 1번 열 row2
    const cell00 = cells[0]![0]!;  // 0번 열 (A열) — 변경 없어야 함
    mockCellBCR(cell01, 100, 0, 100, 40);  // right=200

    fireMousedown(cell01, 200, 20);  // B열 우측 경계
    fireMousemove(215, 20);          // 15px 이동

    expect(cell01.style.width).toBe('115px');
    expect(cell11.style.width).toBe('115px');
    expect(cell00.style.width).toBe('');  // A열은 변경 없음
  });

  it('열 드래그 후 mouseup 시 onModified 호출', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMousemove(115, 20);
    fireMouseup();

    expect(modified).toHaveBeenCalledTimes(1);
  });

  it('열 너비 MIN_COL_WIDTH(30) 미만으로 축소되지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMousemove(20, 20);  // -80px 이동 → 100 - 80 = 20 < 30

    expect(cell.style.width).toBe('30px');
  });

  it('열 너비 MAX(contentEl.offsetWidth) 초과하지 않는다', () => {
    // contentEl.offsetWidth = 150 으로 줄여서 delta 가 MAX_DELTA(500) 이내로 유지
    Object.defineProperty(contentEl, 'offsetWidth', { configurable: true, get: () => 150 });
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    fireMousemove(310, 20);  // delta = +210px → startSize(100) + 210 = 310 > 150 → 클램프

    expect(cell.style.width).toBe('150px');
  });

  it('500px 초과 비정상 col delta 감지 시 드래그 중단', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => { /* noop */ });

    fireMousedown(cell, 100, 20);
    fireMousemove(115, 20);    // 정상 드래그 시작
    fireMousemove(620, 20);    // delta = 520 → 비정상

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('비정상 col delta'), expect.any(Object));
    // 이후 추가 이동에도 width 변경 없어야 함
    const prevWidth = cell.style.width;
    fireMousemove(640, 20);
    expect(cell.style.width).toBe(prevWidth);
  });

  // ── 행 리사이즈 ────────────────────────────────────────────────

  it('행 하단 경계 드래그 시 tr.style.height 변경', () => {
    const { table, rows, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);  // bottom = 40

    fireMousedown(cell, 50, 40);  // 하단 경계
    fireMousemove(50, 55);        // 15px 아래

    // startHeight(40) + delta(15) = 55px
    expect(rows[0]!.style.height).toBe('55px');
  });

  it('행 드래그 시 행 내 모든 td 에도 height 동기화된다', () => {
    const { table, rows, cells } = makeTable(2, 3);  // 2행 3열
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 50, 40);
    fireMousemove(50, 60);  // +20px → 40 + 20 = 60px

    // tr 과 같은 행의 모든 td 에 높이 동기화
    expect(rows[0]!.style.height).toBe('60px');
    expect(cells[0]![0]!.style.height).toBe('60px');
    expect(cells[0]![1]!.style.height).toBe('60px');
    expect(cells[0]![2]!.style.height).toBe('60px');
    // 다른 행은 변경 없음
    expect(rows[1]!.style.height).toBe('');
  });

  it('startHeight 는 mousedown 시점 tr.offsetHeight 를 사용한다', () => {
    const { table, rows, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    // mousedown 시 tr.offsetHeight = 40 (mocked)
    fireMousedown(cell, 50, 40);
    // threshold 초과 후 첫 이동: delta = 55 - 40 = 15
    fireMousemove(50, 55);

    // startHeight(mousedown 시 40) + delta(15) = 55
    expect(rows[0]!.style.height).toBe('55px');
  });

  it('행 드래그 후 mouseup 시 onModified 호출', () => {
    const { table, rows, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 50, 40);
    fireMousemove(50, 55);
    fireMouseup();

    expect(modified).toHaveBeenCalledTimes(1);
  });

  it('행 높이 MIN_ROW_HEIGHT(20) 미만으로 축소되지 않는다', () => {
    const { table, rows, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 50, 40);
    fireMousemove(50, 15);  // -25px → 40 - 25 = 15 < 20

    expect(rows[0]!.style.height).toBe('20px');
    // 셀에도 동일하게 적용
    expect(cells[0]![0]!.style.height).toBe('20px');
  });

  it('500px 초과 비정상 row delta 감지 시 드래그 중단', () => {
    const { table, rows, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => { /* noop */ });

    fireMousedown(cell, 50, 40);
    fireMousemove(50, 50);   // 정상 드래그 시작
    fireMousemove(50, 560);  // delta = 520 → 비정상

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('비정상 row delta'));
    const prevH = rows[0]!.style.height;
    fireMousemove(50, 580);
    expect(rows[0]!.style.height).toBe(prevH);
  });

  // ── 경계 외 클릭 ───────────────────────────────────────────────

  it('셀 중앙 클릭 시 pendingDrag 없음 (테이블 미변경)', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 50, 20);  // 중앙 클릭
    fireMousemove(70, 20);        // 충분히 이동

    expect(table.style.tableLayout).toBe('');
  });

  // ── detach 후 안전 ─────────────────────────────────────────────

  it('detach 후 mousemove 에도 드래그 시작되지 않음', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);
    const cell = cells[0]![0]!;
    mockCellBCR(cell, 0, 0, 100, 40);

    fireMousedown(cell, 100, 20);
    resizer.detach();
    fireMousemove(120, 20);

    expect(table.style.tableLayout).toBe('');
  });
});
