import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableResizer } from '../../src/modules/table/TableResizer.js';

// ── 픽스처 헬퍼 ────────────────────────────────────────────────────

interface Fixture {
  table: HTMLTableElement;
  rows:  HTMLTableRowElement[];
  cells: HTMLTableCellElement[][];  // [row][col]
}

/** N행 M열 단순 표 생성, offsetWidth/offsetHeight/offsetHeight(tr) 모킹 */
function makeTable(numRows = 3, numCols = 3): Fixture {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const rows:  HTMLTableRowElement[]    = [];
  const cells: HTMLTableCellElement[][] = [];

  for (let r = 0; r < numRows; r++) {
    const tr = document.createElement('tr');
    const rowCells: HTMLTableCellElement[] = [];
    for (let c = 0; c < numCols; c++) {
      const td = document.createElement('td');
      mockOffset(td, 100, 40);
      tr.appendChild(td);
      rowCells.push(td);
    }
    mockTrHeight(tr, 40);
    tbody.appendChild(tr);
    rows.push(tr);
    cells.push(rowCells);
  }

  table.appendChild(tbody);
  document.body.appendChild(table);
  return { table, rows, cells };
}

function mockOffset(el: HTMLElement, w: number, h: number): void {
  Object.defineProperty(el, 'offsetWidth',  { configurable: true, get: () => w });
  Object.defineProperty(el, 'offsetHeight', { configurable: true, get: () => h });
}

function mockTrHeight(tr: HTMLTableRowElement, h: number): void {
  Object.defineProperty(tr, 'offsetHeight', { configurable: true, get: () => h });
}

/** 셀의 getBoundingClientRect 를 x,y,w,h 로 모킹 */
function mockBCR(el: HTMLElement, x: number, y: number, w: number, h: number): void {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue(new DOMRect(x, y, w, h));
}

function down(target: HTMLElement, x: number, y: number): void {
  target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y, button: 0 }));
}

function move(x: number, y: number): void {
  document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
}

function up(): void {
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

function contentMove(target: HTMLElement, x: number, y: number): void {
  target.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
}

// ── 테스트 ─────────────────────────────────────────────────────────

describe('TableResizer', () => {
  let contentEl: HTMLDivElement;
  let resizer:   TableResizer;
  let modified:  ReturnType<typeof vi.fn>;

  beforeEach(() => {
    contentEl = document.createElement('div');
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

  // ────────────────────────────────────────────────────────────────
  // 테스트 1 — 컬럼 리사이즈
  // ────────────────────────────────────────────────────────────────

  describe('테스트 1 - 컬럼 리사이즈', () => {
    it('우측 5px 안에서 mousedown 시 col-resize 커서 표시', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);  // right=100

      contentMove(cell, 97, 20);  // right-5=95, clientX=97 → 97≥95 → col-resize
      expect(cell.style.cursor).toBe('col-resize');
    });

    it('1열 우측 경계 50px 드래그 → 1열만 넓어짐 (startW=100, delta=50 → 150px)', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 97, 20);   // startX=97, startW=100
      move(147, 20);        // delta=+50 → 100+50=150

      expect(cell.style.width).toBe('150px');
      expect(cell.style.minWidth).toBe('150px');
    });

    it('1열 드래그 시 2열, 3열 변화 없음', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell0 = cells[0]![0]!;
      const cell1 = cells[0]![1]!;
      const cell2 = cells[0]![2]!;
      mockBCR(cell0, 0, 0, 100, 40);

      down(cell0, 97, 20);
      move(147, 20);

      expect(cell0.style.width).toBe('150px');
      expect(cell1.style.width).toBe('');
      expect(cell2.style.width).toBe('');
    });

    it('드래그 후 mouseup 시 onModified 호출 + state 초기화(재드래그 가능)', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 97, 20);
      move(140, 20);
      up();
      expect(modified).toHaveBeenCalledTimes(1);

      // 두 번째 드래그 — state 가 초기화됐으므로 새 startW 로 동작해야 함
      mockOffset(cell, 143, 40);  // 이제 offsetWidth = 143 (실제 변경됐다 가정)
      down(cell, 97, 20);
      move(107, 20);  // delta=+10 → 143+10=153
      expect(cell.style.width).toBe('153px');
    });
  });

  // ────────────────────────────────────────────────────────────────
  // 테스트 2 — 행 리사이즈
  // ────────────────────────────────────────────────────────────────

  describe('테스트 2 - 행 리사이즈', () => {
    it('하단 5px 안에서 mousemove 시 row-resize 커서 표시', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);  // bottom=40

      contentMove(cell, 50, 37);  // bottom-5=35, clientY=37 → 37≥35 → row-resize
      expect(cell.style.cursor).toBe('row-resize');
    });

    it('1행 하단 경계 30px 드래그 → tr.style.height 변경', () => {
      const { rows, cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 37);   // startY=37, startH=40
      move(50, 67);         // delta=+30 → 40+30=70

      expect(rows[0]!.style.height).toBe('70px');
    });

    it('1행 드래그 시 행 내 모든 td 에 height 동기화', () => {
      const { rows, cells } = makeTable(3, 3);
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 37);
      move(50, 60);  // delta=+23 → 40+23=63

      expect(rows[0]!.style.height).toBe('63px');
      expect(cells[0]![0]!.style.height).toBe('63px');
      expect(cells[0]![1]!.style.height).toBe('63px');
      expect(cells[0]![2]!.style.height).toBe('63px');
      // 2행, 3행 변화 없음
      expect(rows[1]!.style.height).toBe('');
      expect(rows[2]!.style.height).toBe('');
    });

    it('행 드래그 후 mouseup 시 onModified 호출', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 37);
      move(50, 60);
      up();
      expect(modified).toHaveBeenCalledTimes(1);
    });
  });

  // ────────────────────────────────────────────────────────────────
  // 테스트 3 — 단순 클릭 (크기 변화 없음)
  // ────────────────────────────────────────────────────────────────

  describe('테스트 3 - 단순 클릭', () => {
    it('셀 중앙 클릭 시 width 변화 없음', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);  // right=100, bottom=40

      down(cell, 50, 20);  // 중앙 (right-5=95, 50<95 → col-resize 아님)
      up();

      expect(cell.style.width).toBe('');
      expect(modified).not.toHaveBeenCalled();
    });

    it('셀 중앙 클릭 후 mousemove 해도 크기 변화 없음', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 20);
      move(150, 20);  // 100px 이동해도 state.type=null 이므로 무시

      expect(cell.style.width).toBe('');
    });
  });

  // ────────────────────────────────────────────────────────────────
  // 테스트 4 — 연속 리사이즈
  // ────────────────────────────────────────────────────────────────

  describe('테스트 4 - 연속 리사이즈', () => {
    it('같은 셀 3번 연속 리사이즈 — 매번 올바른 크기', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      // 1회: startW=100, delta=+20 → 120
      down(cell, 97, 20); move(117, 20); up();
      expect(cell.style.width).toBe('120px');

      // 2회: startW 갱신 (offsetWidth 모킹을 새 값으로)
      mockOffset(cell, 120, 40);
      mockBCR(cell, 0, 0, 120, 40);
      down(cell, 117, 20); move(127, 20); up();  // delta=+10 → 120+10=130
      expect(cell.style.width).toBe('130px');

      // 3회
      mockOffset(cell, 130, 40);
      mockBCR(cell, 0, 0, 130, 40);
      down(cell, 127, 20); move(112, 20); up();  // delta=-15 → 130-15=115
      expect(cell.style.width).toBe('115px');
    });
  });

  // ────────────────────────────────────────────────────────────────
  // 테스트 5 — 비정상 케이스
  // ────────────────────────────────────────────────────────────────

  describe('테스트 5 - 비정상 케이스', () => {
    it('MAX_DELTA(300) 초과 col delta 는 차단됨', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 97, 20);  // startX=97
      move(400, 20);       // delta=303 > 300 → 차단

      expect(cell.style.width).toBe('');
    });

    it('MAX_DELTA(300) 초과 row delta 는 차단됨', () => {
      const { rows, cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 37);  // startY=37
      move(50, 340);       // delta=303 > 300 → 차단

      expect(rows[0]!.style.height).toBe('');
    });

    it('MIN_COL_W(30) 미만으로 축소되지 않음', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 97, 20);  // startX=97, startW=100
      move(10, 20);        // delta=-87 → 100-87=13 < 30 → 클램프

      expect(cell.style.width).toBe('30px');
    });

    it('MIN_ROW_H(20) 미만으로 축소되지 않음', () => {
      const { rows, cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 50, 37);
      move(50, 10);  // delta=-27 → 40-27=13 < 20 → 클램프

      expect(rows[0]!.style.height).toBe('20px');
    });

    it('경계 감지 이전 mousedown (col-resize 아님) → 드래그해도 변화 없음', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);  // right=100, right-5=95

      down(cell, 90, 20);  // 90 < 95 → col-resize 영역 아님
      move(200, 20);

      expect(cell.style.width).toBe('');
    });

    it('detach 후 이벤트 완전 비활성화', () => {
      const { cells } = makeTable();
      contentEl.appendChild(cells[0]![0]!.closest('table')!);
      const cell = cells[0]![0]!;
      mockBCR(cell, 0, 0, 100, 40);

      down(cell, 97, 20);
      resizer.detach();
      move(200, 20);

      expect(cell.style.width).toBe('');
    });
  });
});
