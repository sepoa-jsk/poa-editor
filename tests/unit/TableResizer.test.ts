import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableResizer } from '../../src/modules/table/TableResizer.js';

// ── 헬퍼 ──────────────────────────────────────────────────────────

function makeTable(): { table: HTMLTableElement; cells: HTMLTableCellElement[] } {
  const table = document.createElement('table');
  const tr    = document.createElement('tr');
  const cells: HTMLTableCellElement[] = [];
  for (let i = 0; i < 3; i++) {
    const td = document.createElement('td');
    td.style.width  = '100px';
    td.style.height = '40px';
    tr.appendChild(td);
    cells.push(td);
  }
  const tbody = document.createElement('tbody');
  tbody.appendChild(tr);
  table.appendChild(tbody);
  document.body.appendChild(table);
  return { table, cells };
}

function mockCellRect(cell: HTMLTableCellElement, rect: DOMRect): void {
  vi.spyOn(cell, 'getBoundingClientRect').mockReturnValue(rect);
}

function fireMousedown(target: HTMLElement, x: number, y: number): void {
  target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y, button: 0 }));
}

function fireMousemove(x: number, y: number): void {
  document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
}

function fireMouseup(): void {
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

// ── 테스트 ─────────────────────────────────────────────────────────

describe('TableResizer', () => {
  let contentEl: HTMLDivElement;
  let resizer: TableResizer;
  let modified: ReturnType<typeof vi.fn>;

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

  it('경계선 클릭만으로는 테이블에 colgroup이 생성되지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    // right=100, bottom=40 으로 모킹
    mockCellRect(cell, new DOMRect(0, 0, 100, 40));

    fireMousedown(cell, 100, 20); // 우측 경계선 클릭

    expect(table.querySelector('colgroup')).toBeNull();
    expect(table.style.tableLayout).not.toBe('fixed');
  });

  it('경계선 클릭 후 mouseup 시 onModified가 호출되지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    mockCellRect(cell, new DOMRect(0, 0, 100, 40));

    fireMousedown(cell, 100, 20);
    fireMouseup();

    expect(modified).not.toHaveBeenCalled();
  });

  it('DRAG_THRESHOLD 미만 이동 시에는 colgroup이 생성되지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    mockCellRect(cell, new DOMRect(0, 0, 100, 40));

    fireMousedown(cell, 100, 20);
    fireMousemove(103, 20); // 3px 이동 — 임계값(5) 미만

    expect(table.querySelector('colgroup')).toBeNull();
  });

  it('DRAG_THRESHOLD 초과 후 colgroup이 생성된다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    // 첫 번째 행의 모든 셀에 getBoundingClientRect 모킹 필요 (ensureColgroup이 row[0] 순회)
    for (const c of cells) {
      mockCellRect(c, new DOMRect(0, 0, 100, 40));
    }

    fireMousedown(cell, 100, 20);
    fireMousemove(108, 20); // 8px 이동 — 임계값(5) 초과

    expect(table.querySelector('colgroup')).not.toBeNull();
    expect(table.style.tableLayout).toBe('fixed');
  });

  it('열 드래그 완료 후 onModified가 호출된다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    for (const c of cells) {
      mockCellRect(c, new DOMRect(0, 0, 100, 40));
    }

    fireMousedown(cells[0]!, 100, 20);
    fireMousemove(108, 20); // 드래그 시작
    fireMousemove(120, 20); // 계속 드래그
    fireMouseup();

    expect(modified).toHaveBeenCalledTimes(1);
  });

  it('행 하단 경계 드래그 시 DRAG_THRESHOLD 초과 후 row-resize 커서 적용', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    for (const c of cells) {
      mockCellRect(c, new DOMRect(0, 0, 100, 40));
    }

    fireMousedown(cell, 50, 40); // 하단 경계
    fireMousemove(50, 48);       // 8px 아래 이동 — 임계값 초과

    expect(document.body.style.cursor).toBe('row-resize');
  });

  it('경계선 감지 영역 밖 클릭은 pendingDrag를 설정하지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    mockCellRect(cell, new DOMRect(0, 0, 100, 40));

    fireMousedown(cell, 50, 20); // 중앙 클릭 — 경계선 아님
    fireMousemove(60, 20);       // 충분히 이동

    // 경계가 아니므로 colgroup이 생성되지 않아야 함
    expect(table.querySelector('colgroup')).toBeNull();
  });

  it('detach 후 mousemove가 발생해도 드래그가 시작되지 않는다', () => {
    const { table, cells } = makeTable();
    contentEl.appendChild(table);

    const cell = cells[0]!;
    for (const c of cells) {
      mockCellRect(c, new DOMRect(0, 0, 100, 40));
    }

    fireMousedown(cell, 100, 20);
    resizer.detach();
    fireMousemove(120, 20); // detach 후 이동

    expect(table.querySelector('colgroup')).toBeNull();
  });
});
