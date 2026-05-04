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
}

type MenuSeparator = '---';
type MenuEntry = { label: string; action: () => void; disabled?: boolean } | MenuSeparator;

/**
 * 테이블 키보드 탐색 + 우클릭 컨텍스트 메뉴.
 *
 * contentEl 에 이벤트를 위임하므로 동적으로 삽입된 테이블도 자동 처리된다.
 * TableNavigatorCallbacks 를 통해 병합/분할/속성 편집을 PoaEditor 에 위임한다.
 */
export class TableNavigator {
  private contentEl: HTMLElement | null = null;
  private menuEl: HTMLElement | null = null;
  private readonly cb: TableNavigatorCallbacks;

  constructor(callbacks: TableNavigatorCallbacks = {}) {
    this.cb = callbacks;
  }

  private readonly keydownHandler = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    e.preventDefault();
    e.shiftKey ? this.navigatePrev(cell) : this.navigateNext(cell);
  };

  private readonly contextmenuHandler = (e: MouseEvent): void => {
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    e.preventDefault();
    this.showContextMenu(e.clientX, e.clientY, cell);
  };

  private readonly dismissMenu = (e: MouseEvent): void => {
    if (this.menuEl && !this.menuEl.contains(e.target as Node)) this.hideContextMenu();
  };

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('keydown', this.keydownHandler);
    contentEl.addEventListener('contextmenu', this.contextmenuHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('keydown', this.keydownHandler);
      this.contentEl.removeEventListener('contextmenu', this.contextmenuHandler);
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
      { label: '셀 병합',     action: () => this.doMerge(ownerDoc),           disabled: !canMerge },
      { label: '수평 분할',   action: () => this.doSplitH(cell, table),       disabled: !canSplitH },
      { label: '수직 분할',   action: () => this.doSplitV(cell, table),       disabled: !canSplitV },
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

  private doMerge(ownerDoc: Document): void {
    if (!this.cb.onMerge) return;
    const result = this.cb.onMerge();
    if (!result.success && result.message) {
      ownerDoc.defaultView?.alert(result.message);
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
      // colspan/rowspan 셀이 이 위치를 점유 중이면 skip
      const gc = grid[rIdx]?.[c];
      if (gc && gc.row !== rIdx) continue;  // 위 행 rowspan 이 이 행을 덮음 — 실제 rowspan 조정 필요시 복잡
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

  // ── 셀 속성 모달 ─────────────────────────────────────────────────

  private showCellPropsModal(cell: HTMLTableCellElement): void {
    const ownerDoc = cell.ownerDocument;
    const current  = CellMerger.readCellProperties(cell);

    const overlay = ownerDoc.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const dlg = ownerDoc.createElement('div');
    dlg.style.cssText = 'background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:280px;font-size:13px;';

    dlg.innerHTML = `
<h4 style="margin:0 0 14px;font-size:14px;">셀 속성</h4>
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 10px;align-items:center;margin-bottom:14px;">
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

    const close = () => overlay.remove();

    dlg.querySelector('#cp-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    dlg.querySelector('#cp-ok')?.addEventListener('click', () => {
      const props: CellProperties = {
        borderStyle:  (dlg.querySelector('#cp-bstyle') as HTMLSelectElement).value as CellProperties['borderStyle'],
        borderWidth:  parseInt((dlg.querySelector('#cp-bwidth') as HTMLInputElement).value, 10) || 0,
        borderColor:  (dlg.querySelector('#cp-bcolor') as HTMLInputElement).value,
        indent:       parseInt((dlg.querySelector('#cp-indent') as HTMLInputElement).value, 10) || 0,
        bgColor:      (dlg.querySelector('#cp-bg')     as HTMLInputElement).value,
        id:           (dlg.querySelector('#cp-id')     as HTMLInputElement).value.trim(),
        className:    (dlg.querySelector('#cp-class')  as HTMLInputElement).value.trim(),
      };
      CellMerger.applyCellProperties(cell, props);
      this.cb.onModified?.();
      close();
    });
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
