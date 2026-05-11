import { buildGridMap, CellMerger } from './CellMerger.js';
import type { CellProperties, MergeResult } from './CellMerger.js';

export interface TableNavigatorCallbacks {
  /** 현재 선택 셀 병합 — CellMerger.merge() 결과를 반환한다 */
  onMerge?: () => MergeResult;
  /** colspan 기준 수평 분할 */
  onSplitH?: (cell: HTMLTableCellElement, table: HTMLTableElement) => void;
  /** rowspan 기준 수직 분할 */
  onSplitV?: (cell: HTMLTableCellElement, table: HTMLTableElement) => void;
  /** 표 속성 다이얼로그 열기 */
  onOpenTableProps?: (table: HTMLTableElement) => void;
  /** 행/열/셀 조작 후 히스토리 캡처 트리거 */
  onModified?: () => void;
  /** 오류 메시지 표시 — 미제공 시 무시 */
  onError?: (message: string) => void;
}

type MenuSeparator = '---';
type MenuEntry = { label: string; action: () => void; disabled?: boolean } | MenuSeparator;

// ── 드래그 상태 타입 ─────────────────────────────────────────────────────────

interface ColDragState {
  type: 'col';
  table: HTMLTableElement;
  colIdx: number;
  nextColIdx: number;
  startX: number;
  startWidth1: number;
  startWidth2: number;
  col1: HTMLElement | null;
  col2: HTMLElement | null;
  grid: ReturnType<typeof buildGridMap>;
}

interface RowDragState {
  type: 'row';
  table: HTMLTableElement;
  row: HTMLTableRowElement;
  startY: number;
  startHeight: number;
}

type DragState = ColDragState | RowDragState;

/**
 * 테이블 키보드 탐색 + 우클릭 컨텍스트 메뉴 + 열/행 크기 드래그 조정.
 *
 * contentEl 에 이벤트를 위임하므로 동적으로 삽입된 테이블도 자동 처리된다.
 * TableNavigatorCallbacks 를 통해 병합/분할/속성 편집을 PoaEditor 에 위임한다.
 */
export class TableNavigator {
  private contentEl: HTMLElement | null = null;
  private menuEl: HTMLElement | null = null;
  private readonly cb: TableNavigatorCallbacks;
  /** true 면 내장 우클릭 메뉴를 표시하지 않는다 (TableContextMenu 가 대신 처리) */
  private readonly noMenu: boolean;

  // ── 리사이즈 상태 ────────────────────────────────────────────────
  private dragState: DragState | null = null;
  private pendingResize: { type: 'col' | 'row'; cell: HTMLTableCellElement; table: HTMLTableElement } | null = null;
  private lastCursorCell: HTMLElement | null = null;

  constructor(callbacks: TableNavigatorCallbacks = {}, options: { noMenu?: boolean } = {}) {
    this.cb = callbacks;
    this.noMenu = options.noMenu ?? false;
  }

  private readonly keydownHandler = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    // e.target은 contenteditable div이므로 Selection의 startContainer로 셀을 찾는다.
    const ownerDoc = (e.target as HTMLElement).ownerDocument;
    const sel = ownerDoc?.getSelection();
    const anchor = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : (e.target as Node);
    const cell = this.findCell(anchor);
    if (!cell) return;
    e.preventDefault();
    e.shiftKey ? this.navigatePrev(cell) : this.navigateNext(cell);
  };

  private readonly contextmenuHandler = (e: MouseEvent): void => {
    if (this.noMenu) return;
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    e.preventDefault();
    this.showContextMenu(e.clientX, e.clientY, cell);
  };

  private readonly dismissMenu = (e: MouseEvent): void => {
    if (this.menuEl && !this.menuEl.contains(e.target as Node)) this.hideContextMenu();
  };

  // ── 열/행 크기 조절 이벤트 핸들러 ──────────────────────────────

  private readonly mousemoveResizeHandler = (e: MouseEvent): void => {
    if (this.dragState) return;

    const target = e.target as HTMLElement;
    const tag = target.tagName;
    if (tag !== 'TD' && tag !== 'TH') {
      this.clearResizeCursor();
      return;
    }

    const cell = target as HTMLTableCellElement;
    const table = cell.closest('table') as HTMLTableElement | null;
    if (!table) { this.clearResizeCursor(); return; }

    const rect = cell.getBoundingClientRect();
    const fromRight  = rect.right  - e.clientX;
    const fromBottom = rect.bottom - e.clientY;

    // col-resize 우선
    if (fromRight >= 0 && fromRight <= 4) {
      const grid    = buildGridMap(table);
      const colIdx  = this.findCellCol(grid, cell);
      const maxCol  = Math.max(...grid.map((r) => r.length));
      if (colIdx !== -1 && colIdx + cell.colSpan < maxCol) {
        this.setCursorOnCell(cell, 'col-resize');
        this.pendingResize = { type: 'col', cell, table };
        return;
      }
    }

    if (fromBottom >= 0 && fromBottom <= 4) {
      this.setCursorOnCell(cell, 'row-resize');
      this.pendingResize = { type: 'row', cell, table };
      return;
    }

    this.clearResizeCursor();
  };

  private readonly mousedownResizeHandler = (e: MouseEvent): void => {
    if (!this.pendingResize || e.button !== 0) return;
    const { type, cell, table } = this.pendingResize;
    e.preventDefault();
    if (type === 'col') {
      this.startColResize(cell, table, e.clientX);
    } else {
      this.startRowResize(cell, table, e.clientY);
    }
  };

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('keydown',      this.keydownHandler);
    contentEl.addEventListener('contextmenu',  this.contextmenuHandler);
    contentEl.addEventListener('mousemove',    this.mousemoveResizeHandler);
    contentEl.addEventListener('mousedown',    this.mousedownResizeHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('keydown',     this.keydownHandler);
      this.contentEl.removeEventListener('contextmenu', this.contextmenuHandler);
      this.contentEl.removeEventListener('mousemove',   this.mousemoveResizeHandler);
      this.contentEl.removeEventListener('mousedown',   this.mousedownResizeHandler);
      this.contentEl = null;
    }
    this.hideContextMenu();
  }

  // ── Tab 탐색 ─────────────────────────────────────────────────────

  private navigateNext(cell: HTMLTableCellElement): void {
    const table = cell.closest('table') as HTMLTableElement;
    const cells = this.getAllCells(table);
    const idx   = cells.indexOf(cell);
    if (idx < cells.length - 1) {
      this.focusCell(cells[idx + 1]);
    } else {
      this.appendRow(table);
      const updated = this.getAllCells(table);
      this.focusCell(updated[idx + 1] ?? updated[updated.length - 1]);
      this.cb.onModified?.();
    }
  }

  private navigatePrev(cell: HTMLTableCellElement): void {
    const table = cell.closest('table') as HTMLTableElement;
    const cells = this.getAllCells(table);
    const idx   = cells.indexOf(cell);
    if (idx > 0) this.focusCell(cells[idx - 1]);
  }

  private focusCell(cell: HTMLTableCellElement): void {
    cell.focus();
    const ownerDoc = cell.ownerDocument;
    const range = ownerDoc.createRange();
    range.selectNodeContents(cell);
    range.collapse(false);
    const sel = ownerDoc.getSelection();
    if (sel) { sel.removeAllRanges(); sel.addRange(range); }
  }

  private getAllCells(table: HTMLTableElement): HTMLTableCellElement[] {
    return Array.from(table.querySelectorAll<HTMLTableCellElement>('td, th'));
  }

  private appendRow(table: HTMLTableElement): void {
    const tbody   = table.querySelector('tbody') ?? table;
    const lastRow = tbody.querySelector('tr:last-child') as HTMLTableRowElement | null;
    if (!lastRow) return;
    const ownerDoc = table.ownerDocument;
    const newRow   = ownerDoc.createElement('tr');
    const colCount = Array.from(lastRow.cells).reduce((s, c) => s + Math.max(c.colSpan, 1), 0);
    const refStyle = (lastRow.cells[0] as HTMLTableCellElement).style.cssText;
    for (let i = 0; i < colCount; i++) {
      const td = ownerDoc.createElement('td');
      td.style.cssText = refStyle;
      td.innerHTML = '&nbsp;';
      newRow.appendChild(td);
    }
    tbody.appendChild(newRow);
  }

  // ── Context menu ─────────────────────────────────────────────────

  private showContextMenu(x: number, y: number, cell: HTMLTableCellElement): void {
    this.hideContextMenu();
    const table    = cell.closest('table') as HTMLTableElement;
    const ownerDoc = cell.ownerDocument;

    const selectedCount = table.querySelectorAll('.poa-cell-selected').length;
    const canMerge      = selectedCount >= 2;
    const canSplitH     = cell.colSpan > 1;
    const canSplitV     = cell.rowSpan > 1;
    const grid          = buildGridMap(table);
    const colCount      = Math.max(...grid.map((r) => r.length));
    const rowCount      = table.rows.length;

    const entries: MenuEntry[] = [
      { label: '위에 행 삽입',     action: () => this.insertRowAbove(cell, table) },
      { label: '아래에 행 삽입',   action: () => this.insertRowBelow(cell, table) },
      { label: '왼쪽에 열 삽입',   action: () => this.insertColLeft(cell, table) },
      { label: '오른쪽에 열 삽입', action: () => this.insertColRight(cell, table) },
      '---',
      { label: '행 삭제', action: () => this.deleteRow(cell, table), disabled: rowCount <= 1 },
      { label: '열 삭제', action: () => this.deleteCol(cell, table), disabled: colCount <= 1 },
      { label: '표 삭제', action: () => this.deleteTable(table) },
      '---',
      { label: '셀 병합',   action: () => this.doMerge(),             disabled: !canMerge  },
      { label: '수평 분할', action: () => this.doSplitH(cell, table), disabled: !canSplitH },
      { label: '수직 분할', action: () => this.doSplitV(cell, table), disabled: !canSplitV },
      '---',
      { label: '세로 정렬: 위쪽',   action: () => this.applyCellVerticalAlign(cell, table, 'top')    },
      { label: '세로 정렬: 가운데', action: () => this.applyCellVerticalAlign(cell, table, 'middle') },
      { label: '세로 정렬: 아래쪽', action: () => this.applyCellVerticalAlign(cell, table, 'bottom') },
      '---',
      { label: '표 왼쪽 정렬',   action: () => this.applyTableAlign(table, 'left')   },
      { label: '표 가운데 정렬', action: () => this.applyTableAlign(table, 'center') },
      { label: '표 오른쪽 정렬', action: () => this.applyTableAlign(table, 'right')  },
      '---',
      { label: '셀 속성', action: () => this.showCellPropsModal(cell) },
      { label: '표 속성', action: () => this.cb.onOpenTableProps?.(table) },
    ];

    const menu = ownerDoc.createElement('div');
    menu.style.cssText = [
      'position:fixed', `left:${x}px`, `top:${y}px`,
      'background:#fff', 'border:1px solid #ccc', 'border-radius:4px',
      'box-shadow:0 4px 12px rgba(0,0,0,0.15)', 'z-index:9999',
      'font-size:13px', 'user-select:none', 'min-width:160px', 'padding:4px 0',
    ].join(';');

    for (const entry of entries) {
      if (entry === '---') {
        const sep = ownerDoc.createElement('hr');
        sep.style.cssText = 'border:none;border-top:1px solid #eee;margin:4px 0;';
        menu.appendChild(sep);
        continue;
      }
      const item = ownerDoc.createElement('div');
      item.textContent = entry.label;
      if (entry.disabled) {
        item.style.cssText = 'padding:6px 16px;color:#aaa;cursor:default;';
      } else {
        item.style.cssText = 'padding:6px 16px;cursor:pointer;';
        item.addEventListener('mouseenter', () => { item.style.background = '#f0f4ff'; });
        item.addEventListener('mouseleave', () => { item.style.background = '';        });
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          this.hideContextMenu();
          entry.action();
        });
      }
      menu.appendChild(item);
    }

    ownerDoc.body.appendChild(menu);
    this.menuEl = menu;

    // 화면 경계 보정
    requestAnimationFrame(() => {
      if (!this.menuEl) return;
      const rect = this.menuEl.getBoundingClientRect();
      const vw   = ownerDoc.defaultView?.innerWidth  ?? 0;
      const vh   = ownerDoc.defaultView?.innerHeight ?? 0;
      if (rect.right  > vw) this.menuEl.style.left = `${x - rect.width}px`;
      if (rect.bottom > vh) this.menuEl.style.top  = `${y - rect.height}px`;
    });

    ownerDoc.addEventListener('mousedown', this.dismissMenu);
  }

  private hideContextMenu(): void {
    if (this.menuEl) {
      this.menuEl.remove();
      this.menuEl = null;
      this.contentEl?.ownerDocument.removeEventListener('mousedown', this.dismissMenu);
    }
  }

  // ── 병합 / 분할 ──────────────────────────────────────────────────

  private doMerge(): void {
    if (!this.cb.onMerge) return;
    const result = this.cb.onMerge();
    if (!result.success && result.message) {
      this.cb.onError?.(result.message);
    } else if (result.success) {
      this.cb.onModified?.();
    }
  }

  private doSplitH(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    if (this.cb.onSplitH) {
      this.cb.onSplitH(cell, table);
    } else {
      CellMerger.splitCellHorizontal(cell, table);
    }
    this.cb.onModified?.();
  }

  private doSplitV(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    if (this.cb.onSplitV) {
      this.cb.onSplitV(cell, table);
    } else {
      CellMerger.splitCellVertical(cell, table);
    }
    this.cb.onModified?.();
  }

  // ── 행/열/표 조작 ────────────────────────────────────────────────

  private insertRowAbove(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;
    row.insertAdjacentElement('beforebegin', this.makeEmptyRow(row, table));
    this.cb.onModified?.();
  }

  private insertRowBelow(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;
    row.insertAdjacentElement('afterend', this.makeEmptyRow(row, table));
    this.cb.onModified?.();
  }

  private makeEmptyRow(srcRow: HTMLTableRowElement, table: HTMLTableElement): HTMLTableRowElement {
    const ownerDoc = table.ownerDocument;
    const grid     = buildGridMap(table);
    const rows     = Array.from(table.rows);
    const rIdx     = rows.indexOf(srcRow);
    const colCount = Math.max(...grid.map((r) => r.length));
    const refStyle = (srcRow.cells[0] as HTMLTableCellElement | null)?.style.cssText ?? '';

    const newRow = ownerDoc.createElement('tr');
    for (let c = 0; c < colCount; c++) {
      const gc = grid[rIdx]?.[c];
      if (gc && gc.row !== rIdx) continue;
      const td = ownerDoc.createElement('td');
      td.style.cssText = refStyle;
      td.innerHTML = '&nbsp;';
      newRow.appendChild(td);
    }
    return newRow;
  }

  private insertColLeft(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid   = buildGridMap(table);
    const colIdx = this.findCellCol(grid, cell);
    if (colIdx !== -1) this.insertColAt(table, grid, colIdx, cell);
    this.cb.onModified?.();
  }

  private insertColRight(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid   = buildGridMap(table);
    const colIdx = this.findCellCol(grid, cell);
    if (colIdx !== -1) this.insertColAt(table, grid, colIdx + Math.max(cell.colSpan, 1), cell);
    this.cb.onModified?.();
  }

  private insertColAt(
    table: HTMLTableElement,
    grid: ReturnType<typeof buildGridMap>,
    atCol: number,
    refCell: HTMLTableCellElement,
  ): void {
    const rows     = Array.from(table.rows);
    const ownerDoc = table.ownerDocument;
    for (let r = 0; r < rows.length; r++) {
      const nc = ownerDoc.createElement('td');
      nc.style.cssText = refCell.style.cssText;
      nc.innerHTML = '&nbsp;';
      let insertBefore: Element | null = null;
      for (let c = atCol; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c && gc.cell.parentElement === rows[r]) {
          insertBefore = gc.cell; break;
        }
      }
      if (insertBefore) rows[r].insertBefore(nc, insertBefore);
      else              rows[r].appendChild(nc);
    }
  }

  private deleteRow(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    if (table.rows.length <= 1) return;
    cell.closest('tr')?.remove();
    this.cb.onModified?.();
  }

  private deleteCol(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid    = buildGridMap(table);
    const colIdx  = this.findCellCol(grid, cell);
    const colCount = Math.max(...grid.map((r) => r.length));
    if (colIdx === -1 || colCount <= 1) return;

    const rows = Array.from(table.rows);
    for (let r = 0; r < rows.length; r++) {
      const gc = grid[r]?.[colIdx];
      if (!gc || gc.row !== r || gc.col !== colIdx) continue;
      if (gc.cell.parentElement !== rows[r]) continue;
      if (gc.cell.colSpan > 1) gc.cell.colSpan -= 1;
      else gc.cell.remove();
    }
    this.cb.onModified?.();
  }

  private deleteTable(table: HTMLTableElement): void {
    table.remove();
    this.cb.onModified?.();
  }

  // ── 셀/표 정렬 ──────────────────────────────────────────────────

  /** 셀 세로 정렬 적용 (선택된 셀 전체 또는 단일 셀) */
  private applyCellVerticalAlign(
    cell: HTMLTableCellElement,
    table: HTMLTableElement,
    align: 'top' | 'middle' | 'bottom',
  ): void {
    const selected = table.querySelectorAll<HTMLTableCellElement>('.poa-cell-selected');
    if (selected.length > 0) {
      selected.forEach((c) => { c.style.verticalAlign = align; });
    } else {
      cell.style.verticalAlign = align;
    }
    this.cb.onModified?.();
  }

  /** 표 전체 가로 정렬 적용 */
  applyTableAlign(table: HTMLTableElement, align: 'left' | 'center' | 'right'): void {
    if (align === 'center') {
      table.style.marginLeft  = 'auto';
      table.style.marginRight = 'auto';
    } else if (align === 'right') {
      table.style.marginLeft  = 'auto';
      table.style.marginRight = '0';
    } else {
      table.style.marginLeft  = '0';
      table.style.marginRight = 'auto';
    }
    this.cb.onModified?.();
  }

  // ── 셀 속성 모달 ─────────────────────────────────────────────────

  private showCellPropsModal(cell: HTMLTableCellElement): void {
    const ownerDoc = cell.ownerDocument;
    const current  = CellMerger.readCellProperties(cell);
    const initVa   = current.verticalAlign ?? 'middle';

    const overlay = ownerDoc.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const dlg = ownerDoc.createElement('div');
    dlg.style.cssText = 'background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:300px;font-size:13px;';

    const vaBtn = (va: 'top' | 'middle' | 'bottom', icon: string, label: string): string => {
      const active = initVa === va;
      return `<button class="cp-va-btn" data-va="${va}" style="` +
        `display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 10px;` +
        `border:1.5px solid ${active ? '#1565c0' : '#ccc'};border-radius:3px;` +
        `background:${active ? '#e3f0ff' : '#fff'};color:${active ? '#1565c0' : '#374151'};` +
        `font-size:12px;cursor:pointer;font-weight:${active ? '600' : '400'};` +
        `">${icon} ${label}</button>`;
    };

    dlg.innerHTML = `
<h4 style="margin:0 0 14px;font-size:14px;">셀 속성</h4>
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 10px;align-items:center;margin-bottom:14px;">
  <label>세로 정렬</label>
  <div id="cp-va-wrap" style="display:flex;gap:5px;">
    ${vaBtn('top', '⬆', '위쪽')}
    ${vaBtn('middle', '⬛', '가운데')}
    ${vaBtn('bottom', '⬇', '아래쪽')}
  </div>
  <label>테두리 종류</label>
  <select id="cp-bstyle" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 4px;">
    <option value="solid">실선 (solid)</option>
    <option value="dashed">파선 (dashed)</option>
    <option value="dotted">점선 (dotted)</option>
    <option value="double">이중선 (double)</option>
    <option value="none">없음 (none)</option>
  </select>
  <label>테두리 두께</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-bwidth" type="number" value="${current.borderWidth ?? 1}" min="0" max="20" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>테두리 색</label>
  <input id="cp-bcolor" type="color" value="${current.borderColor ?? '#000000'}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-indent" type="number" value="${current.indent ?? 0}" min="0" max="100" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${current.bgColor || '#ffffff'}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>ID</label>
  <input id="cp-id" type="text" value="${current.id ?? ''}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-class" type="text" value="${current.className ?? ''}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;font-size:13px;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;font-size:13px;">적용</button>
</div>`;

    overlay.appendChild(dlg);
    ownerDoc.body.appendChild(overlay);

    // 초기값 설정
    (dlg.querySelector('#cp-bstyle') as HTMLSelectElement).value = current.borderStyle ?? 'solid';

    // 세로 정렬 토글 버튼
    let selectedVa: 'top' | 'middle' | 'bottom' = initVa;
    dlg.querySelector('#cp-va-wrap')!.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.cp-va-btn');
      if (!btn) return;
      const va = btn.dataset.va as 'top' | 'middle' | 'bottom';
      selectedVa = va;
      dlg.querySelectorAll<HTMLButtonElement>('.cp-va-btn').forEach((b) => {
        const isActive = b.dataset.va === va;
        b.style.borderColor = isActive ? '#1565c0' : '#ccc';
        b.style.background  = isActive ? '#e3f0ff' : '#fff';
        b.style.color       = isActive ? '#1565c0' : '#374151';
        b.style.fontWeight  = isActive ? '600' : '400';
      });
    });

    const close = (): void => overlay.remove();

    dlg.querySelector('#cp-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    dlg.querySelector('#cp-ok')?.addEventListener('click', () => {
      const props: CellProperties = {
        verticalAlign: selectedVa,
        borderStyle:   (dlg.querySelector('#cp-bstyle') as HTMLSelectElement).value as CellProperties['borderStyle'],
        borderWidth:   parseInt((dlg.querySelector('#cp-bwidth') as HTMLInputElement).value, 10) || 0,
        borderColor:   (dlg.querySelector('#cp-bcolor') as HTMLInputElement).value,
        indent:        parseInt((dlg.querySelector('#cp-indent') as HTMLInputElement).value, 10) || 0,
        bgColor:       (dlg.querySelector('#cp-bg')     as HTMLInputElement).value,
        id:            (dlg.querySelector('#cp-id')     as HTMLInputElement).value.trim(),
        className:     (dlg.querySelector('#cp-class')  as HTMLInputElement).value.trim(),
      };
      CellMerger.applyCellProperties(cell, props);
      this.cb.onModified?.();
      close();
    });
  }

  // ── Public action dispatcher (컨텍스트 툴바에서 호출) ────────────

  /**
   * 컨텍스트 툴바 버튼 클릭 시 PoaEditor가 호출한다.
   * action 문자열로 내부 private 메서드를 분기한다.
   */
  executeAction(
    action: string,
    cell: HTMLTableCellElement,
    table: HTMLTableElement,
  ): void {
    switch (action) {
      case 'table:row-above':  this.insertRowAbove(cell, table);  break;
      case 'table:row-below':  this.insertRowBelow(cell, table);  break;
      case 'table:col-left':   this.insertColLeft(cell, table);   break;
      case 'table:col-right':  this.insertColRight(cell, table);  break;
      case 'table:row-delete': this.deleteRow(cell, table);       break;
      case 'table:col-delete': this.deleteCol(cell, table);       break;
      case 'table:delete':     this.deleteTable(table);           break;
      case 'table:merge':      this.doMerge();                    break;
      case 'table:split-h':    this.doSplitH(cell, table);        break;
      case 'table:split-v':    this.doSplitV(cell, table);        break;
      case 'table:cell-props': this.showCellPropsModal(cell);     break;
      case 'table:table-props': this.cb.onOpenTableProps?.(table); break;
      case 'table:align-left':   this.applyTableAlign(table, 'left');   break;
      case 'table:align-center': this.applyTableAlign(table, 'center'); break;
      case 'table:align-right':  this.applyTableAlign(table, 'right');  break;
    }
  }

  // ── 열 너비 드래그 조정 ──────────────────────────────────────────

  private startColResize(cell: HTMLTableCellElement, table: HTMLTableElement, startX: number): void {
    const grid     = buildGridMap(table);
    const colIdx   = this.findCellCol(grid, cell);
    if (colIdx === -1) return;
    const nextColIdx = colIdx + cell.colSpan;
    const maxCol   = Math.max(...grid.map((r) => r.length));
    if (nextColIdx >= maxCol) return;

    const startWidth1 = cell.getBoundingClientRect().width;
    let startWidth2 = 60;
    for (let r = 0; r < grid.length; r++) {
      const gc = grid[r]?.[nextColIdx];
      if (gc && gc.col === nextColIdx) {
        startWidth2 = gc.cell.getBoundingClientRect().width;
        break;
      }
    }

    const colgroup = table.querySelector('colgroup');
    const cols = colgroup ? Array.from(colgroup.children) as HTMLElement[] : [];

    this.dragState = {
      type: 'col', table, colIdx, nextColIdx,
      startX, startWidth1, startWidth2,
      col1: cols[colIdx] ?? null,
      col2: cols[nextColIdx] ?? null,
      grid,
    };

    const ownerDoc = table.ownerDocument;
    ownerDoc.body.style.userSelect = 'none';
    table.classList.add('col-resizing');

    const onMove = (mv: MouseEvent): void => this.handleColDragMove(mv);
    const onUp   = (): void => {
      ownerDoc.removeEventListener('mousemove', onMove);
      ownerDoc.removeEventListener('mouseup',   onUp);
      ownerDoc.body.style.userSelect = '';
      table.classList.remove('col-resizing');
      this.dragState = null;
      this.cb.onModified?.();
    };
    ownerDoc.addEventListener('mousemove', onMove);
    ownerDoc.addEventListener('mouseup',   onUp);
  }

  private handleColDragMove(e: MouseEvent): void {
    if (!this.dragState || this.dragState.type !== 'col') return;
    const s   = this.dragState;
    const dx  = e.clientX - s.startX;
    const MIN = 30;

    let w1 = s.startWidth1 + dx;
    let w2 = s.startWidth2 - dx;

    if (w1 < MIN) { w2 -= (MIN - w1); w1 = MIN; }
    if (w2 < MIN) { w1 -= (MIN - w2); w2 = MIN; }
    w1 = Math.max(MIN, w1);
    w2 = Math.max(MIN, w2);

    if (s.col1) s.col1.style.width = `${w1}px`;
    if (s.col2) s.col2.style.width = `${w2}px`;

    this.applyColCellWidths(s.grid, s.colIdx,     w1);
    this.applyColCellWidths(s.grid, s.nextColIdx, w2);
  }

  private applyColCellWidths(
    grid: ReturnType<typeof buildGridMap>,
    colIdx: number,
    width: number,
  ): void {
    for (let r = 0; r < grid.length; r++) {
      const gc = grid[r]?.[colIdx];
      if (gc && gc.row === r && gc.col === colIdx && gc.cell.colSpan === 1) {
        gc.cell.style.width = `${width}px`;
      }
    }
  }

  // ── 행 높이 드래그 조정 ──────────────────────────────────────────

  private startRowResize(cell: HTMLTableCellElement, table: HTMLTableElement, startY: number): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;

    const startHeight = row.getBoundingClientRect().height;

    this.dragState = { type: 'row', table, row, startY, startHeight };

    const ownerDoc = table.ownerDocument;
    ownerDoc.body.style.userSelect = 'none';
    table.classList.add('row-resizing');

    const onMove = (mv: MouseEvent): void => this.handleRowDragMove(mv);
    const onUp   = (): void => {
      ownerDoc.removeEventListener('mousemove', onMove);
      ownerDoc.removeEventListener('mouseup',   onUp);
      ownerDoc.body.style.userSelect = '';
      table.classList.remove('row-resizing');
      this.dragState = null;
      this.cb.onModified?.();
    };
    ownerDoc.addEventListener('mousemove', onMove);
    ownerDoc.addEventListener('mouseup',   onUp);
  }

  private handleRowDragMove(e: MouseEvent): void {
    if (!this.dragState || this.dragState.type !== 'row') return;
    const s         = this.dragState;
    const newHeight = Math.max(20, s.startHeight + (e.clientY - s.startY));

    s.row.style.height = `${newHeight}px`;
    Array.from(s.row.cells).forEach((c) => {
      (c as HTMLTableCellElement).style.height = `${newHeight}px`;
    });
  }

  // ── 커서 관리 ────────────────────────────────────────────────────

  private setCursorOnCell(el: HTMLElement, cursor: string): void {
    if (this.lastCursorCell && this.lastCursorCell !== el) {
      this.lastCursorCell.style.cursor = '';
    }
    el.style.cursor = cursor;
    this.lastCursorCell = el;
  }

  private clearResizeCursor(): void {
    if (this.lastCursorCell) {
      this.lastCursorCell.style.cursor = '';
      this.lastCursorCell = null;
    }
    this.pendingResize = null;
  }

  // ── Utilities ────────────────────────────────────────────────────

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

  private findCellCol(grid: ReturnType<typeof buildGridMap>, cell: HTMLTableCellElement): number {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc?.cell === cell && gc.row === r && gc.col === c) return c;
      }
    }
    return -1;
  }
}
