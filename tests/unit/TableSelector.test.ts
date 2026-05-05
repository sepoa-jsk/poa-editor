import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CellMerger } from '../../src/modules/table/CellMerger.js';
import { TableSelector } from '../../src/modules/table/TableSelector.js';

// ── 헬퍼 ──────────────────────────────────────────────────────────────────────

function makeTable(rows: number, cols: number): {
  table: HTMLTableElement;
  cells: HTMLTableCellElement[][];
} {
  const table = document.createElement('table');
  const cells: HTMLTableCellElement[][] = [];
  for (let r = 0; r < rows; r++) {
    const tr = document.createElement('tr');
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const td = document.createElement('td');
      td.textContent = `${r},${c}`;
      tr.appendChild(td);
      cells[r]![c] = td;
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
  return { table, cells };
}

function makeMergedTable(): {
  table: HTMLTableElement;
  A: HTMLTableCellElement;
  C: HTMLTableCellElement;
  D: HTMLTableCellElement;
  F: HTMLTableCellElement;
} {
  // [A(colspan=2)][C]
  // [D][E][F]
  const table = document.createElement('table');
  const row0  = document.createElement('tr');
  const A     = document.createElement('td'); A.colSpan = 2; A.textContent = 'A';
  const C     = document.createElement('td');              C.textContent = 'C';
  row0.append(A, C);

  const row1 = document.createElement('tr');
  const D    = document.createElement('td'); D.textContent = 'D';
  const E    = document.createElement('td'); E.textContent = 'E';
  const F    = document.createElement('td'); F.textContent = 'F';
  row1.append(D, E, F);

  table.append(row0, row1);
  document.body.appendChild(table);
  return { table, A, C, D, F };
}

/** 단순 클릭: mousedown → mouseup → click */
function click(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, buttons: 1 }));
  document.dispatchEvent(new MouseEvent('mouseup',   { bubbles: true }));
  el.dispatchEvent(new MouseEvent('click',     { bubbles: true }));
}

/**
 * 드래그 시뮬레이션 (click 없음).
 * jsdom은 elementFromPoint를 미지원하므로 직접 할당으로 목킹한다.
 * mmoveHandler는 document에 등록되어 있으므로 document에 mousemove를 발사한다.
 */
function dragOnly(
  from: HTMLTableCellElement,
  to: HTMLTableCellElement,
): void {
  const doc = document as unknown as Record<string, unknown>;
  const orig = doc['elementFromPoint'];
  doc['elementFromPoint'] = () => to;
  try {
    from.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, button: 0, buttons: 1 }),
    );
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, buttons: 1, clientX: 100, clientY: 100 }),
    );
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  } finally {
    doc['elementFromPoint'] = orig;
  }
}

/**
 * 드래그 + 브라우저가 자동 발사하는 click까지 포함한 전체 시뮬레이션.
 * click이 clickGuard에 의해 차단되는지 검증할 때 사용한다.
 */
function drag(
  from: HTMLTableCellElement,
  to: HTMLTableCellElement,
): void {
  dragOnly(from, to);
  // 브라우저는 mouseup 직후 click을 자동 발사한다
  to.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

// ── 테스트 ────────────────────────────────────────────────────────────────────

describe('TableSelector', () => {
  let merger: CellMerger;
  let selector: TableSelector;
  let contentEl: HTMLDivElement;

  beforeEach(() => {
    contentEl = document.createElement('div');
    document.body.appendChild(contentEl);
    merger   = new CellMerger();
    selector = new TableSelector(merger);
    merger.attach(contentEl);
    selector.attach(contentEl);
  });

  afterEach(() => {
    selector.detach();
    merger.detach();
    document.body.querySelectorAll('table, div').forEach((el) => el.remove());
    vi.restoreAllMocks();
  });

  // ── 시나리오 1: 단순 셀 클릭 ──────────────────────────────────────

  it('셀 단일 클릭 → 해당 셀만 poa-cell-selected 추가', () => {
    const { cells, table } = makeTable(3, 3);
    contentEl.appendChild(table);

    click(cells[1]![1]!);

    expect(cells[1]![1]!.classList.contains('poa-cell-selected')).toBe(true);
    expect(cells[0]![0]!.classList.contains('poa-cell-selected')).toBe(false);
    expect(cells[2]![2]!.classList.contains('poa-cell-selected')).toBe(false);
  });

  it('다른 셀 클릭 시 기존 선택 해제 후 새 셀 선택', () => {
    const { cells, table } = makeTable(3, 3);
    contentEl.appendChild(table);

    click(cells[0]![0]!);
    expect(cells[0]![0]!.classList.contains('poa-cell-selected')).toBe(true);

    click(cells[2]![2]!);
    expect(cells[0]![0]!.classList.contains('poa-cell-selected')).toBe(false);
    expect(cells[2]![2]!.classList.contains('poa-cell-selected')).toBe(true);
  });

  // ── 시나리오 2: canMerge / getCellSelection ────────────────────────

  it('단일 셀 선택 시 canMerge는 false', () => {
    const { cells, table } = makeTable(2, 2);
    contentEl.appendChild(table);

    click(cells[0]![0]!);
    expect(selector.canMerge).toBe(false);
  });

  it('getCellSelection()은 현재 선택된 셀 배열을 반환한다', () => {
    const { cells, table } = makeTable(2, 2);
    contentEl.appendChild(table);

    click(cells[1]![0]!);
    const sel = selector.getCellSelection();
    expect(sel).toHaveLength(1);
    expect(sel[0]).toBe(cells[1]![0]!);
  });

  // ── 시나리오 3: 드래그 후 다중 선택이 유지되어야 한다 (핵심 버그 수정 검증) ──

  it('드래그 후 click 이벤트가 다중 선택을 덮어쓰지 않는다', () => {
    const { cells, table } = makeTable(2, 3);
    contentEl.appendChild(table);

    // (0,0) → (1,2) 드래그
    drag(cells[0]![0]!, cells[1]![2]!);

    // 드래그 직후 click이 차단되어 다중 선택이 그대로여야 함
    const sel = selector.getCellSelection();
    expect(sel.length).toBeGreaterThan(1);
  });

  it('드래그 완료 후 두 번째 일반 클릭은 단일 셀 선택으로 복귀한다', () => {
    const { cells, table } = makeTable(2, 2);
    contentEl.appendChild(table);

    // 드래그 → 다중 선택
    drag(cells[0]![0]!, cells[1]![1]!);
    expect(selector.getCellSelection().length).toBeGreaterThan(1);

    // justDragged 플래그가 소비된 후 일반 클릭은 정상 동작
    click(cells[0]![1]!);
    const sel = selector.getCellSelection();
    expect(sel).toHaveLength(1);
    expect(sel[0]).toBe(cells[0]![1]!);
  });

  it('드래그 후 click 차단 플래그는 한 번만 소비된다', () => {
    const { cells, table } = makeTable(2, 2);
    contentEl.appendChild(table);

    // dragOnly: 브라우저 자동 click을 포함하지 않아 justDragged가 아직 소비 안 됨
    dragOnly(cells[0]![0]!, cells[1]![1]!);

    // 첫 번째 click → justDragged 소비, CellMerger.clickHandler 차단 → 다중 선택 유지
    cells[1]![1]!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(selector.getCellSelection().length).toBeGreaterThan(1);

    // 두 번째 click → justDragged = false, 차단 안 됨 → 단일 셀 선택
    cells[0]![0]!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(selector.getCellSelection()).toHaveLength(1);
  });

  // ── 시나리오 4: 병합 셀 포함 표 ────────────────────────────────────

  it('colspan=2 셀 클릭 → 해당 셀만 선택, 인접 셀 변화 없음', () => {
    const { table, A, C } = makeMergedTable();
    contentEl.appendChild(table);

    click(A);
    const sel = selector.getCellSelection();
    expect(sel).toHaveLength(1);
    expect(sel[0]).toBe(A);
    expect(A.classList.contains('poa-cell-selected')).toBe(true);
    expect(C.classList.contains('poa-cell-selected')).toBe(false);
  });

  it('병합 셀 포함 표에서 드래그 선택 후 다중 선택 유지', () => {
    const { table, D, F } = makeMergedTable();
    contentEl.appendChild(table);

    // D → F 드래그 (2행 3셀)
    drag(D, F);

    const sel = selector.getCellSelection();
    expect(sel.length).toBeGreaterThan(1);
  });
});
