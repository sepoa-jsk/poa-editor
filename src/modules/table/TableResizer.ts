const BORDER_THRESHOLD = 6;   // 테두리 감지 영역 (px)
const DRAG_THRESHOLD   = 5;   // 드래그 인정 최소 이동 거리 (px)
const MIN_COL_WIDTH    = 30;  // 열 최소 너비 (px)
const MIN_ROW_HEIGHT   = 20;  // 행 최소 높이 (px)
const MAX_DELTA        = 500; // 비정상 delta 감지 임계값 (px)

interface PendingDrag {
  type:   'col' | 'row';
  cell:   HTMLTableCellElement;
  table:  HTMLTableElement;
  startX: number;
  startY: number;
}

interface DragState {
  type:       'col' | 'row';
  startCoord: number;                   // clientX (col) 또는 clientY (row)
  startSize:  number;                   // offsetWidth 또는 offsetHeight
  colCells:   HTMLTableCellElement[];   // col 모드: 같은 열의 모든 셀
  rowEl:      HTMLTableRowElement | null; // row 모드: 대상 tr
  table:      HTMLTableElement;
  onModified: () => void;
}

/**
 * 셀 우측/하단 경계 드래그로 열 너비·행 높이를 조절한다.
 *
 * 설계 원칙:
 * - offsetWidth/offsetHeight 만 사용 (getBoundingClientRect 는 경계 감지에만 사용)
 * - 열 리사이즈: cell.style.width 만 변경
 * - 행 리사이즈: tr.style.height 만 변경
 * - table.style.width 는 드래그 시작 시 현재값으로 잠금하고 이후 절대 변경 안 함
 * - <colgroup>/<col> 조작 완전 불사용 (getBoundingClientRect width = 0 문제 회피)
 */
export class TableResizer {
  private contentEl:       HTMLElement | null = null;
  private dragState:       DragState | null = null;
  private pendingDrag:     PendingDrag | null = null;
  private lastCursorCell:  HTMLTableCellElement | null = null;
  private onModified:      () => void = () => { /* noop */ };

  constructor(onModified: () => void = () => { /* noop */ }) {
    this.onModified = onModified;
  }

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('mousemove', this.mmoveHandler);
    contentEl.addEventListener('mousedown', this.mdownHandler);
    document.addEventListener('mousemove',  this.dragHandler);
    document.addEventListener('mouseup',    this.mupHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('mousemove', this.mmoveHandler);
      this.contentEl.removeEventListener('mousedown', this.mdownHandler);
      this.contentEl = null;
    }
    document.removeEventListener('mousemove', this.dragHandler);
    document.removeEventListener('mouseup',   this.mupHandler);
    this.dragState   = null;
    this.pendingDrag = null;
    this.clearCursor();
  }

  // ── 커서 표시 ────────────────────────────────────────────────────

  private readonly mmoveHandler = (e: MouseEvent): void => {
    if (this.dragState || this.pendingDrag) return;
    const cell = this.findCell(e.target as Node);
    if (!cell) { this.clearCursor(); return; }

    const { nearR, nearB } = this.detectBorder(e, cell);
    const cursor = nearR ? 'col-resize' : nearB ? 'row-resize' : '';
    if (cursor) {
      cell.style.cursor = cursor;
      this.lastCursorCell = cell;
    } else {
      this.clearCursor();
    }
  };

  private clearCursor(): void {
    if (this.lastCursorCell) {
      this.lastCursorCell.style.cursor = '';
      this.lastCursorCell = null;
    }
  }

  // ── 마우스 다운: 대기 상태만 기록, 테이블 절대 수정 금지 ─────────

  private readonly mdownHandler = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    const table = cell.closest('table') as HTMLTableElement | null;
    if (!table) return;

    const { nearR, nearB } = this.detectBorder(e, cell);
    if (!nearR && !nearB) return;

    e.preventDefault();
    this.pendingDrag = {
      type:   nearR ? 'col' : 'row',
      cell, table,
      startX: e.clientX,
      startY: e.clientY,
    };
    document.body.style.userSelect = 'none';
  };

  // ── 드래그 중: 임계값 초과 시 시작, offsetWidth/Height 기반 계산 ─

  private readonly dragHandler = (e: MouseEvent): void => {
    // pendingDrag → DRAG_THRESHOLD 초과 시 실제 드래그 상태로 전환
    if (!this.dragState && this.pendingDrag) {
      const { type, cell, table, startX, startY } = this.pendingDrag;
      const moved = Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY);
      if (moved < DRAG_THRESHOLD) return;

      // 표 전체 너비를 현재값으로 고정 (드래그 중 table 팽창 방지)
      table.style.width       = `${table.offsetWidth}px`;
      table.style.tableLayout = 'fixed';

      if (type === 'col') {
        const colCells = this.getColumnCells(cell, table);
        this.dragState = {
          type:       'col',
          startCoord: startX,
          startSize:  cell.offsetWidth,  // offsetWidth 고정 사용
          colCells,
          rowEl:      null,
          table,
          onModified: this.onModified,
        };
      } else {
        const rowEl = cell.closest('tr') as HTMLTableRowElement | null;
        this.dragState = {
          type:       'row',
          startCoord: startY,
          startSize:  rowEl ? rowEl.offsetHeight : cell.offsetHeight,  // offsetHeight 고정 사용
          colCells:   [],
          rowEl,
          table,
          onModified: this.onModified,
        };
      }
      this.pendingDrag = null;
      document.body.style.cursor = type === 'col' ? 'col-resize' : 'row-resize';
    }

    if (!this.dragState) return;
    const { type, startCoord, startSize, colCells, rowEl } = this.dragState;

    if (type === 'col') {
      const deltaX = e.clientX - startCoord;  // clientX 고정 사용
      if (Math.abs(deltaX) > MAX_DELTA) {
        console.warn('[TableResizer] 비정상 col delta 감지, resize 중단');
        this.cancelDrag();
        return;
      }
      const maxW  = this.contentEl ? this.contentEl.offsetWidth : 9999;
      const newW  = Math.min(maxW, Math.max(MIN_COL_WIDTH, startSize + deltaX));
      // cell.style.width 만 변경 — table.style.width 는 절대 건드리지 않음
      for (const c of colCells) c.style.width = `${newW}px`;

    } else {
      const deltaY = e.clientY - startCoord;  // clientY 고정 사용
      if (Math.abs(deltaY) > MAX_DELTA) {
        console.warn('[TableResizer] 비정상 row delta 감지, resize 중단');
        this.cancelDrag();
        return;
      }
      const newH = Math.max(MIN_ROW_HEIGHT, startSize + deltaY);
      // tr.style.height 만 변경 — table.style.height 는 절대 건드리지 않음
      if (rowEl) rowEl.style.height = `${newH}px`;
    }
  };

  // ── 마우스 업 ────────────────────────────────────────────────────

  private readonly mupHandler = (): void => {
    this.pendingDrag = null;
    if (!this.dragState) {
      document.body.style.userSelect = '';
      return;
    }
    this.dragState.onModified();
    this.dragState = null;
    document.body.style.cursor    = '';
    document.body.style.userSelect = '';
  };

  // ── 헬퍼 ────────────────────────────────────────────────────────

  private cancelDrag(): void {
    this.dragState   = null;
    this.pendingDrag = null;
    document.body.style.cursor    = '';
    document.body.style.userSelect = '';
  }

  /** e.clientX/Y 기준으로 셀의 우측·하단 경계 근접 여부 반환 */
  private detectBorder(e: MouseEvent, cell: HTMLTableCellElement): { nearR: boolean; nearB: boolean } {
    const rect = cell.getBoundingClientRect();
    return {
      nearR: e.clientX >= rect.right  - BORDER_THRESHOLD && e.clientX <= rect.right  + BORDER_THRESHOLD,
      nearB: e.clientY >= rect.bottom - BORDER_THRESHOLD && e.clientY <= rect.bottom + BORDER_THRESHOLD,
    };
  }

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

  /**
   * 대상 셀과 같은 열(colSpan 포함)의 모든 셀을 반환한다.
   * table-layout:fixed 는 첫 행 셀 너비를 기준으로 열 너비를 결정하므로
   * 모든 행의 셀에 동일하게 적용해야 일관성이 유지된다.
   */
  private getColumnCells(targetCell: HTMLTableCellElement, table: HTMLTableElement): HTMLTableCellElement[] {
    const row = targetCell.parentElement as HTMLTableRowElement | null;
    if (!row) return [targetCell];

    // targetCell의 실제 열 시작 인덱스(colSpan 누적 기준)
    let colIdx = -1;
    let span   = 0;
    for (let i = 0; i < row.cells.length; i++) {
      const c = row.cells[i]!;
      if (c === targetCell) { colIdx = span; break; }
      span += c.colSpan > 1 ? c.colSpan : 1;
    }
    if (colIdx < 0) return [targetCell];

    // 모든 행에서 해당 열 인덱스의 셀 수집
    const result: HTMLTableCellElement[] = [];
    for (const tr of Array.from(table.rows)) {
      let s = 0;
      for (let i = 0; i < tr.cells.length; i++) {
        const c = tr.cells[i]!;
        if (s === colIdx) { result.push(c); break; }
        if (s > colIdx)   break;
        s += c.colSpan > 1 ? c.colSpan : 1;
      }
    }
    return result.length > 0 ? result : [targetCell];
  }
}
