const THRESHOLD = 6; // 테두리 감지 거리 (px)
const MIN_SIZE  = 24; // 열 너비 / 행 높이 최솟값 (px)

interface DragState {
  type:       'col' | 'row';
  startCoord: number;       // clientX (col) 또는 clientY (row)
  startSize:  number;       // 드래그 시작 시 해당 col/row 크기 (px)
  adjStart:   number;       // 인접 col 시작 크기 (col 모드, 오른쪽 열)
  colEl:      HTMLElement | null;  // <col> 또는 null
  adjColEl:   HTMLElement | null;
  rowCells:   HTMLTableCellElement[];
  table:      HTMLTableElement;
  onModified: () => void;
}

/**
 * 열/행 경계에 마우스를 올리면 resize 커서를 표시하고,
 * 드래그로 열 너비·행 높이를 실시간 조절한다.
 *
 * - col resize: 오른쪽 경계 ±THRESHOLD px 감지
 * - row resize: 하단 경계 ±THRESHOLD px 감지
 * - table-layout:fixed + <colgroup> 을 전제로 동작
 */
export class TableResizer {
  private contentEl: HTMLElement | null = null;
  private dragState: DragState | null = null;
  private lastCursor = '';
  private onModified: () => void = () => { /* noop */ };

  constructor(onModified: () => void = () => { /* noop */ }) {
    this.onModified = onModified;
  }

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('mousemove', this.mmoveHandler);
    contentEl.addEventListener('mousedown', this.mdownHandler);
    document.addEventListener('mousemove', this.dragHandler);
    document.addEventListener('mouseup',   this.mupHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('mousemove', this.mmoveHandler);
      this.contentEl.removeEventListener('mousedown', this.mdownHandler);
      this.contentEl = null;
    }
    document.removeEventListener('mousemove', this.dragHandler);
    document.removeEventListener('mouseup',   this.mupHandler);
    this.dragState = null;
  }

  // ── 마우스 이동: 커서 모양 결정 ─────────────────────────────────

  private readonly mmoveHandler = (e: MouseEvent): void => {
    if (this.dragState) return;
    const cell = this.findCell(e.target as Node);
    if (!cell) { this.resetCursor(e.target as HTMLElement); return; }

    const rect = cell.getBoundingClientRect();
    const nearR = e.clientX >= rect.right  - THRESHOLD && e.clientX <= rect.right  + THRESHOLD;
    const nearB = e.clientY >= rect.bottom - THRESHOLD && e.clientY <= rect.bottom + THRESHOLD;

    const cursor = nearR ? 'col-resize' : nearB ? 'row-resize' : '';
    if (cursor !== this.lastCursor) {
      cell.style.cursor = cursor;
      this.lastCursor = cursor;
    }
  };

  private resetCursor(el: HTMLElement): void {
    if (this.lastCursor) {
      const cell = this.findCell(el);
      if (cell) cell.style.cursor = '';
      this.lastCursor = '';
    }
  }

  // ── 마우스 다운: 드래그 시작 ────────────────────────────────────

  private readonly mdownHandler = (e: MouseEvent): void => {
    const cell  = this.findCell(e.target as Node);
    if (!cell) return;
    const table = cell.closest('table') as HTMLTableElement | null;
    if (!table) return;

    const rect = cell.getBoundingClientRect();
    const nearR = e.clientX >= rect.right  - THRESHOLD && e.clientX <= rect.right  + THRESHOLD;
    const nearB = e.clientY >= rect.bottom - THRESHOLD && e.clientY <= rect.bottom + THRESHOLD;
    if (!nearR && !nearB) return;

    e.preventDefault();
    this.ensureColgroup(table);

    if (nearR) {
      const { colEl, adjColEl, startPx, adjStartPx } = this.getColData(cell, table);
      this.dragState = {
        type: 'col', startCoord: e.clientX,
        startSize: startPx, adjStart: adjStartPx,
        colEl, adjColEl, rowCells: [], table, onModified: this.onModified,
      };
    } else {
      const rowCells = Array.from(cell.closest('tr')!.cells) as HTMLTableCellElement[];
      const rowH = Math.round(cell.getBoundingClientRect().height);
      this.dragState = {
        type: 'row', startCoord: e.clientY,
        startSize: rowH, adjStart: 0,
        colEl: null, adjColEl: null, rowCells, table, onModified: this.onModified,
      };
    }
    document.body.style.cursor = nearR ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  // ── 드래그 중 ────────────────────────────────────────────────────

  private readonly dragHandler = (e: MouseEvent): void => {
    if (!this.dragState) return;
    const { type, startCoord, startSize, adjStart, colEl, adjColEl, rowCells } = this.dragState;

    if (type === 'col') {
      const delta    = e.clientX - startCoord;
      const newW     = Math.max(MIN_SIZE, startSize + delta);
      const adjNewW  = Math.max(MIN_SIZE, adjStart  - delta);
      if (colEl)    (colEl    as HTMLElement).style.width = `${newW}px`;
      if (adjColEl) (adjColEl as HTMLElement).style.width = `${adjNewW}px`;
    } else {
      const newH = Math.max(MIN_SIZE, startSize + (e.clientY - startCoord));
      for (const c of rowCells) c.style.height = `${newH}px`;
    }
  };

  // ── 마우스 업: 드래그 완료 ──────────────────────────────────────

  private readonly mupHandler = (): void => {
    if (!this.dragState) return;
    this.dragState.onModified();
    this.dragState = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // ── 헬퍼 ────────────────────────────────────────────────────────

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

  /** 테이블에 <colgroup> 이 없으면 현재 셀 너비 기반으로 생성 */
  private ensureColgroup(table: HTMLTableElement): void {
    if (table.querySelector('colgroup')) return;
    const firstRow = table.rows[0];
    if (!firstRow) return;
    const cg = table.ownerDocument.createElement('colgroup');
    for (const cell of Array.from(firstRow.cells)) {
      const col = table.ownerDocument.createElement('col');
      col.style.width = `${Math.round(cell.getBoundingClientRect().width)}px`;
      cg.appendChild(col);
    }
    table.insertBefore(cg, table.firstChild);
    table.style.tableLayout = 'fixed';
  }

  /** 셀의 <col> 요소와 인접 <col> 을 반환 (우측 경계 기준) */
  private getColData(cell: HTMLTableCellElement, table: HTMLTableElement): {
    colEl: HTMLElement | null; adjColEl: HTMLElement | null;
    startPx: number; adjStartPx: number;
  } {
    const cols = Array.from(table.querySelectorAll<HTMLElement>('col'));
    const row0 = table.rows[0];
    if (!row0) return { colEl: null, adjColEl: null, startPx: 0, adjStartPx: 0 };

    let cellIdx = 0;
    for (let i = 0; i < row0.cells.length; i++) {
      if (row0.cells[i] === cell || (cell.closest('tr') === row0 && row0.cells[i] === cell)) break;
      cellIdx++;
    }
    // cell이 헤더행 기준 몇 번째 col인지 getBoundingClientRect로 유추
    const cells0 = Array.from(row0.cells);
    const colIdx = cells0.findIndex((c) => {
      const cr = c.getBoundingClientRect();
      const dr = cell.getBoundingClientRect();
      return Math.abs(cr.right - dr.right) < 2;
    });
    const idx = colIdx >= 0 ? colIdx : cells0.length - 1;

    const colEl    = cols[idx]    ?? null;
    const adjColEl = cols[idx + 1] ?? null;
    const startPx    = colEl    ? Math.round(colEl.getBoundingClientRect().width)    : Math.round(cell.getBoundingClientRect().width);
    const adjStartPx = adjColEl ? Math.round(adjColEl.getBoundingClientRect().width) : 0;
    return { colEl, adjColEl, startPx, adjStartPx };
  }
}
