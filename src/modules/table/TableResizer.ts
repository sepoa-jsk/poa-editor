const BORDER_THRESHOLD = 6;   // 테두리 감지 영역 (px)
const DRAG_THRESHOLD   = 5;   // 드래그 인정 최소 이동 거리 (px)
const MIN_COL_WIDTH    = 30;  // 열 최소 너비 (px)
const MIN_ROW_HEIGHT   = 20;  // 행 최소 높이 (px)
const MAX_DELTA        = 500; // 비정상 delta 감지 임계값 (px)

interface PendingDrag {
  type:        'col' | 'row';
  cell:        HTMLTableCellElement;
  table:       HTMLTableElement;
  startX:      number;
  startY:      number;
  /** mousedown 시점의 셀 offsetWidth (col 모드) */
  startWidth:  number;
  /** mousedown 시점의 tr.offsetHeight (row 모드) */
  startHeight: number;
  /** row 모드 전용: mousedown 시점에 바인딩된 tr */
  rowEl:       HTMLTableRowElement | null;
}

interface ColDragState {
  type:       'col';
  startX:     number;
  startWidth: number;
  colCells:   HTMLTableCellElement[];
  table:      HTMLTableElement;
  onModified: () => void;
}

interface RowDragState {
  type:        'row';
  startY:      number;
  startHeight: number;
  rowEl:       HTMLTableRowElement;
  rowCells:    HTMLTableCellElement[];
  table:       HTMLTableElement;
  onModified:  () => void;
}

type DragState = ColDragState | RowDragState;

/**
 * 셀 우측/하단 경계 드래그로 열 너비·행 높이를 조절한다.
 *
 * 설계 원칙:
 * - offsetWidth/offsetHeight 만 사용 (getBoundingClientRect 는 경계 감지에만 사용)
 * - 열 리사이즈: cell.style.width 만 변경, table.style.width 는 절대 변경 안 함
 * - 행 리사이즈: tr.style.height + 행 내 모든 td/th.style.height 동기화
 *   (tr.style.height 단독은 브라우저에서 min-height로만 동작)
 * - startWidth/startHeight 는 mousedown 시점에 저장 (threshold 초과 시점 X)
 * - clientX/clientY 만 사용 (pageX/pageY/screenX 혼용 금지)
 */
export class TableResizer {
  private contentEl:      HTMLElement | null = null;
  private dragState:      DragState | null = null;
  private pendingDrag:    PendingDrag | null = null;
  private lastCursorCell: HTMLTableCellElement | null = null;
  private onModified:     () => void = () => { /* noop */ };

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

  // ── 마우스 다운: mousedown 시점 기준값 저장, 테이블 절대 수정 금지 ─

  private readonly mdownHandler = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    const table = cell.closest('table') as HTMLTableElement | null;
    if (!table) return;

    const { nearR, nearB } = this.detectBorder(e, cell);
    if (!nearR && !nearB) return;

    e.preventDefault();

    // rowEl 과 startHeight 를 mousedown 시점에 바인딩 (threshold 초과 후 재조회 금지)
    const rowEl = cell.closest('tr') as HTMLTableRowElement | null;
    this.pendingDrag = {
      type:        nearR ? 'col' : 'row',
      cell, table,
      startX:      e.clientX,
      startY:      e.clientY,
      startWidth:  cell.offsetWidth,             // mousedown 시점 고정
      startHeight: rowEl ? rowEl.offsetHeight : cell.offsetHeight,  // mousedown 시점 고정
      rowEl,
    };
    document.body.style.userSelect = 'none';
  };

  // ── 드래그 중 ────────────────────────────────────────────────────

  private readonly dragHandler = (e: MouseEvent): void => {
    // pendingDrag → DRAG_THRESHOLD 초과 시 실제 dragState 로 전환
    if (!this.dragState && this.pendingDrag) {
      const { type, cell, table, startX, startY, startWidth, startHeight, rowEl } = this.pendingDrag;
      const moved = Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY);
      if (moved < DRAG_THRESHOLD) return;

      if (type === 'col') {
        // 표 전체 너비를 현재값으로 고정 (col 리사이즈 중 table 팽창 방지)
        table.style.width       = `${table.offsetWidth}px`;
        table.style.tableLayout = 'fixed';
        this.dragState = {
          type:       'col',
          startX,
          startWidth,
          colCells:   this.getColumnCells(cell, table),
          table,
          onModified: this.onModified,
        };
        document.body.style.cursor = 'col-resize';

      } else if (rowEl) {
        // row 모드: rowEl 은 mousedown 시점 참조 사용 (재조회 금지)
        const rowCells = Array.from(rowEl.cells) as HTMLTableCellElement[];
        this.dragState = {
          type:        'row',
          startY,
          startHeight,
          rowEl,
          rowCells,
          table,
          onModified:  this.onModified,
        };
        document.body.style.cursor = 'row-resize';
      }
      this.pendingDrag = null;
    }

    if (!this.dragState) return;

    if (this.dragState.type === 'col') {
      this.applyColResize(e, this.dragState);
    } else {
      this.applyRowResize(e, this.dragState);
    }
  };

  private applyColResize(e: MouseEvent, state: ColDragState): void {
    const deltaX = e.clientX - state.startX;  // clientX 고정 사용
    if (Math.abs(deltaX) > MAX_DELTA) {
      console.warn('[TableResizer] 비정상 col delta 감지, resize 중단');
      this.cancelDrag();
      return;
    }
    const maxW = this.contentEl ? this.contentEl.offsetWidth : 9999;
    const newW = Math.min(maxW, Math.max(MIN_COL_WIDTH, state.startWidth + deltaX));
    // cell.style.width 만 변경 — table.style.width 는 절대 건드리지 않음
    for (const c of state.colCells) c.style.width = `${newW}px`;
  }

  private applyRowResize(e: MouseEvent, state: RowDragState): void {
    const deltaY = e.clientY - state.startY;  // clientY 고정 사용
    if (Math.abs(deltaY) > MAX_DELTA) {
      console.warn('[TableResizer] 비정상 row delta 감지, resize 중단');
      this.cancelDrag();
      return;
    }
    const newH = Math.max(MIN_ROW_HEIGHT, state.startHeight + deltaY);

    // tr.style.height 단독 적용은 브라우저에서 min-height 로만 동작하므로
    // 행 내 모든 td/th 에 height 를 동기화해야 실제 높이가 변경됨
    state.rowEl.style.height = `${newH}px`;
    for (const c of state.rowCells) (c as HTMLElement).style.height = `${newH}px`;
  }

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

    // targetCell 의 실제 열 시작 인덱스 (colSpan 누적 기준)
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
