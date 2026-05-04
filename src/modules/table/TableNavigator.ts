import { buildGridMap } from './CellMerger.js';

interface ContextMenuAction {
  label: string;
  action: () => void;
}

/**
 * 테이블 내 키보드 탐색(Tab/Shift+Tab, 자동 행 추가)과
 * 우클릭 컨텍스트 메뉴(행/열 삽입·삭제, 셀 속성)를 담당한다.
 *
 * contentEl에 이벤트를 위임하므로 동적으로 삽입된 테이블도 자동 처리된다.
 */
export class TableNavigator {
  private contentEl: HTMLElement | null = null;
  private menuEl: HTMLElement | null = null;

  private readonly keydownHandler = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    const cell = this.findCell(e.target as Node);
    if (!cell) return;

    e.preventDefault();
    if (e.shiftKey) {
      this.navigatePrev(cell);
    } else {
      this.navigateNext(cell);
    }
  };

  private readonly contextmenuHandler = (e: MouseEvent): void => {
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    e.preventDefault();
    this.showContextMenu(e.clientX, e.clientY, cell);
  };

  private readonly dismissMenu = (e: MouseEvent): void => {
    if (this.menuEl && !this.menuEl.contains(e.target as Node)) {
      this.hideContextMenu();
    }
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

  // ── Tab navigation ────────────────────────────────────────────────

  private navigateNext(cell: HTMLTableCellElement): void {
    const table = cell.closest('table') as HTMLTableElement;
    const cells = this.getAllCells(table);
    const idx = cells.indexOf(cell);

    if (idx < cells.length - 1) {
      this.focusCell(cells[idx + 1]);
    } else {
      // 마지막 셀에서 Tab → 새 행 추가
      this.appendRow(table);
      const updated = this.getAllCells(table);
      this.focusCell(updated[idx + 1] ?? updated[updated.length - 1]);
    }
  }

  private navigatePrev(cell: HTMLTableCellElement): void {
    const table = cell.closest('table') as HTMLTableElement;
    const cells = this.getAllCells(table);
    const idx = cells.indexOf(cell);
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

  /** 마지막 tbody 행을 복제(빈 내용)하여 추가한다 */
  private appendRow(table: HTMLTableElement): void {
    const tbody = table.querySelector('tbody') ?? table;
    const lastRow = tbody.querySelector('tr:last-child') as HTMLTableRowElement | null;
    if (!lastRow) return;

    const ownerDoc = table.ownerDocument;
    const newRow = ownerDoc.createElement('tr');
    const colCount = Array.from(lastRow.cells).reduce(
      (sum, c) => sum + Math.max(c.colSpan, 1), 0,
    );
    for (let i = 0; i < colCount; i++) {
      const td = ownerDoc.createElement('td');
      td.style.cssText = (lastRow.cells[0] as HTMLTableCellElement).style.cssText;
      td.innerHTML = '&nbsp;';
      newRow.appendChild(td);
    }
    tbody.appendChild(newRow);
  }

  // ── Context menu ─────────────────────────────────────────────────

  private showContextMenu(x: number, y: number, cell: HTMLTableCellElement): void {
    this.hideContextMenu();

    const table = cell.closest('table') as HTMLTableElement;
    const ownerDoc = cell.ownerDocument;

    const actions: ContextMenuAction[] = [
      { label: '위에 행 삽입', action: () => this.insertRowAbove(cell) },
      { label: '아래에 행 삽입', action: () => this.insertRowBelow(cell) },
      { label: '왼쪽에 열 삽입', action: () => this.insertColLeft(cell, table) },
      { label: '오른쪽에 열 삽입', action: () => this.insertColRight(cell, table) },
      { label: '행 삭제', action: () => this.deleteRow(cell) },
      { label: '열 삭제', action: () => this.deleteCol(cell, table) },
      { label: '셀 속성', action: () => this.editCellAttrs(cell) },
    ];

    const menu = ownerDoc.createElement('div');
    menu.style.cssText = [
      'position:fixed', `left:${x}px`, `top:${y}px`,
      'background:#fff', 'border:1px solid #ccc', 'border-radius:4px',
      'box-shadow:0 2px 8px rgba(0,0,0,0.15)', 'z-index:9999',
      'font-size:13px', 'user-select:none', 'min-width:150px',
    ].join(';');

    for (const { label, action } of actions) {
      const item = ownerDoc.createElement('div');
      item.textContent = label;
      item.style.cssText = 'padding:6px 14px;cursor:pointer;';
      item.addEventListener('mouseenter', () => { item.style.background = '#f0f0f0'; });
      item.addEventListener('mouseleave', () => { item.style.background = ''; });
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.hideContextMenu();
        action();
        ownerDoc.dispatchEvent(new Event('poa-table-modified', { bubbles: true }));
      });
      menu.appendChild(item);
    }

    ownerDoc.body.appendChild(menu);
    this.menuEl = menu;

    // 화면 경계 보정
    const rect = menu.getBoundingClientRect();
    const vw = ownerDoc.defaultView?.innerWidth ?? 0;
    const vh = ownerDoc.defaultView?.innerHeight ?? 0;
    if (rect.right > vw) menu.style.left = `${x - rect.width}px`;
    if (rect.bottom > vh) menu.style.top = `${y - rect.height}px`;

    ownerDoc.addEventListener('mousedown', this.dismissMenu, { once: false });
  }

  private hideContextMenu(): void {
    if (this.menuEl) {
      this.menuEl.remove();
      this.menuEl = null;
      this.contentEl?.ownerDocument.removeEventListener('mousedown', this.dismissMenu);
    }
  }

  // ── Row/Col operations ────────────────────────────────────────────

  private insertRowAbove(cell: HTMLTableCellElement): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;
    const newRow = this.cloneEmptyRow(row);
    row.insertAdjacentElement('beforebegin', newRow);
  }

  private insertRowBelow(cell: HTMLTableCellElement): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;
    const newRow = this.cloneEmptyRow(row);
    row.insertAdjacentElement('afterend', newRow);
  }

  private cloneEmptyRow(srcRow: HTMLTableRowElement): HTMLTableRowElement {
    const ownerDoc = srcRow.ownerDocument;
    const newRow = ownerDoc.createElement('tr');
    const colCount = Array.from(srcRow.cells).reduce(
      (sum, c) => sum + Math.max(c.colSpan, 1), 0,
    );
    for (let i = 0; i < colCount; i++) {
      const td = ownerDoc.createElement('td');
      td.style.cssText = (srcRow.cells[0] as HTMLTableCellElement).style.cssText;
      td.innerHTML = '&nbsp;';
      newRow.appendChild(td);
    }
    return newRow;
  }

  private insertColLeft(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid = buildGridMap(table);
    const colIdx = this.findCellCol(grid, cell);
    if (colIdx === -1) return;
    this.insertColAt(table, grid, colIdx, cell);
  }

  private insertColRight(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid = buildGridMap(table);
    const colIdx = this.findCellCol(grid, cell);
    if (colIdx === -1) return;
    const colspan = Math.max(cell.colSpan, 1);
    this.insertColAt(table, grid, colIdx + colspan, cell);
  }

  private insertColAt(
    table: HTMLTableElement,
    grid: ReturnType<typeof buildGridMap>,
    atCol: number,
    refCell: HTMLTableCellElement,
  ): void {
    const rows = Array.from(table.rows);
    const ownerDoc = table.ownerDocument;
    const srcStyle = refCell.style.cssText;

    for (let r = 0; r < rows.length; r++) {
      const newCell = ownerDoc.createElement('td');
      newCell.style.cssText = srcStyle;
      newCell.innerHTML = '&nbsp;';

      let insertBefore: Element | null = null;
      for (let c = atCol; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc && gc.row === r && gc.col === c && gc.cell.parentElement === rows[r]) {
          insertBefore = gc.cell;
          break;
        }
      }

      if (insertBefore) {
        rows[r].insertBefore(newCell, insertBefore);
      } else {
        rows[r].appendChild(newCell);
      }
    }
  }

  private deleteRow(cell: HTMLTableCellElement): void {
    const row = cell.closest('tr') as HTMLTableRowElement | null;
    if (!row) return;
    const table = cell.closest('table') as HTMLTableElement;
    if (table.rows.length <= 1) return;
    row.remove();
  }

  private deleteCol(cell: HTMLTableCellElement, table: HTMLTableElement): void {
    const grid = buildGridMap(table);
    const colIdx = this.findCellCol(grid, cell);
    if (colIdx === -1) return;

    const rows = Array.from(table.rows);
    let colCount = 0;
    for (let c = 0; c < (grid[0]?.length ?? 0); c++) {
      if (grid[0]?.[c]) colCount = c + 1;
    }
    if (colCount <= 1) return;

    for (let r = 0; r < rows.length; r++) {
      const gc = grid[r]?.[colIdx];
      if (!gc || gc.col !== colIdx) continue;
      if (gc.row !== r) continue;
      // 셀이 이 열에서 시작하는 경우만 제거
      if (gc.cell.parentElement === rows[r]) {
        if (gc.cell.colSpan > 1) {
          gc.cell.colSpan -= 1;
        } else {
          gc.cell.remove();
        }
      }
    }
  }

  private editCellAttrs(cell: HTMLTableCellElement): void {
    const ownerDoc = cell.ownerDocument;

    const width = ownerDoc.defaultView?.prompt('셀 너비 (예: 100px, 20%)', cell.style.width || '') ?? null;
    if (width === null) return;

    const bgColor = ownerDoc.defaultView?.prompt('배경색 (예: #ffff00)', cell.style.backgroundColor || '') ?? null;

    if (width !== null) cell.style.width = width.trim();
    if (bgColor !== null) cell.style.backgroundColor = bgColor.trim();
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

  private findCellCol(
    grid: ReturnType<typeof buildGridMap>,
    cell: HTMLTableCellElement,
  ): number {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[r]?.length ?? 0); c++) {
        const gc = grid[r]?.[c];
        if (gc?.cell === cell && gc.row === r && gc.col === c) return c;
      }
    }
    return -1;
  }
}
