import { buildGridMap, CellMerger } from './CellMerger.js';
import type { CellProperties, MergeResult } from './CellMerger.js';
import type { TableNavigator } from './TableNavigator.js';

export interface TableContextCallbacks {
  onMerge?:          () => MergeResult;
  onSplitH?:         (cell: HTMLTableCellElement, table: HTMLTableElement) => void;
  onSplitV?:         (cell: HTMLTableCellElement, table: HTMLTableElement) => void;
  onOpenTableProps?: (table: HTMLTableElement) => void;
  onModified?:       () => void;
  canMerge?:         () => boolean;
}

type MenuEntry =
  | { label: string; action: () => void; disabled?: boolean }
  | '---';

/**
 * 표 셀 우클릭 컨텍스트 메뉴.
 * TableNavigator 의 contextmenu 핸들러를 대체한다.
 * navigator.executeAction() 을 통해 행/열 조작을 위임한다.
 */
export class TableContextMenu {
  private contentEl: HTMLElement | null = null;
  private menuEl: HTMLElement | null = null;
  private navigator: TableNavigator;
  private cb: TableContextCallbacks;

  constructor(navigator: TableNavigator, callbacks: TableContextCallbacks = {}) {
    this.navigator = navigator;
    this.cb = callbacks;
  }

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('contextmenu', this.cmHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('contextmenu', this.cmHandler);
      this.contentEl = null;
    }
    this.hide();
  }

  // ── 컨텍스트 메뉴 표시 ──────────────────────────────────────────

  private readonly cmHandler = (e: MouseEvent): void => {
    const cell = this.findCell(e.target as Node);
    if (!cell) return;
    e.preventDefault();
    this.show(e.clientX, e.clientY, cell);
  };

  private show(x: number, y: number, cell: HTMLTableCellElement): void {
    this.hide();
    const table = cell.closest('table') as HTMLTableElement;
    if (!table) return;
    const ownerDoc = cell.ownerDocument;

    const grid     = buildGridMap(table);
    const colCount = Math.max(...grid.map((r) => r.length));
    const rowCount = table.rows.length;
    const selected = table.querySelectorAll('.poa-cell-selected, .poa-cell-sel-ok').length;
    const canMerge = (this.cb.canMerge?.() ?? selected >= 2);
    const canSplitH = cell.colSpan > 1;
    const canSplitV = cell.rowSpan > 1;

    const nav = this.navigator;

    const entries: MenuEntry[] = [
      { label: '셀 병합',    action: () => this.doMerge(ownerDoc),              disabled: !canMerge },
      { label: '수평 분할',  action: () => nav.executeAction('table:split-h', cell, table), disabled: !canSplitH },
      { label: '수직 분할',  action: () => nav.executeAction('table:split-v', cell, table), disabled: !canSplitV },
      '---',
      { label: '위에 행 삽입',      action: () => nav.executeAction('table:row-above',  cell, table) },
      { label: '아래에 행 삽입',    action: () => nav.executeAction('table:row-below',  cell, table) },
      { label: '왼쪽에 열 삽입',    action: () => nav.executeAction('table:col-left',   cell, table) },
      { label: '오른쪽에 열 삽입',  action: () => nav.executeAction('table:col-right',  cell, table) },
      '---',
      { label: '행 삭제',  action: () => nav.executeAction('table:row-delete', cell, table), disabled: rowCount <= 1 },
      { label: '열 삭제',  action: () => nav.executeAction('table:col-delete', cell, table), disabled: colCount <= 1 },
      { label: '표 삭제',  action: () => nav.executeAction('table:delete',     cell, table) },
      '---',
      { label: '셀 속성',  action: () => this.showCellProps(cell) },
      { label: '표 속성',  action: () => this.cb.onOpenTableProps?.(table) },
    ];

    const menu = ownerDoc.createElement('div');
    menu.style.cssText = [
      'position:fixed', `left:${x}px`, `top:${y}px`,
      'background:#fff', 'border:1px solid #ccc', 'border-radius:5px',
      'box-shadow:0 4px 14px rgba(0,0,0,0.18)', 'z-index:9999',
      'font-size:13px', 'min-width:170px', 'padding:5px 0',
      'user-select:none',
    ].join(';');

    for (const entry of entries) {
      if (entry === '---') {
        const sep = ownerDoc.createElement('div');
        sep.style.cssText = 'border-top:1px solid #eee;margin:4px 6px;';
        menu.appendChild(sep);
        continue;
      }
      const item = ownerDoc.createElement('div');
      item.textContent = entry.label;
      if (entry.disabled) {
        item.style.cssText = 'padding:6px 18px;color:#bbb;cursor:default;';
      } else {
        item.style.cssText = 'padding:6px 18px;cursor:pointer;color:#222;';
        item.addEventListener('mouseenter', () => { item.style.background = '#eef3ff'; });
        item.addEventListener('mouseleave', () => { item.style.background = ''; });
        item.addEventListener('mousedown', (ev) => {
          ev.preventDefault(); this.hide(); entry.action();
        });
      }
      menu.appendChild(item);
    }

    ownerDoc.body.appendChild(menu);
    this.menuEl = menu;

    // 화면 경계 보정
    requestAnimationFrame(() => {
      if (!this.menuEl) return;
      const r  = this.menuEl.getBoundingClientRect();
      const vw = ownerDoc.defaultView?.innerWidth  ?? 0;
      const vh = ownerDoc.defaultView?.innerHeight ?? 0;
      if (r.right  > vw) this.menuEl.style.left = `${x - r.width}px`;
      if (r.bottom > vh) this.menuEl.style.top  = `${y - r.height}px`;
    });

    ownerDoc.addEventListener('mousedown', this.dismissHandler);
  }

  private readonly dismissHandler = (e: MouseEvent): void => {
    if (this.menuEl && !this.menuEl.contains(e.target as Node)) this.hide();
  };

  private hide(): void {
    if (this.menuEl) {
      this.menuEl.remove(); this.menuEl = null;
      this.contentEl?.ownerDocument.removeEventListener('mousedown', this.dismissHandler);
    }
  }

  // ── 셀 병합 ─────────────────────────────────────────────────────

  private doMerge(ownerDoc: Document): void {
    if (!this.cb.onMerge) return;
    const result = this.cb.onMerge();
    if (!result.success && result.message) ownerDoc.defaultView?.alert(result.message);
    if (result.success) this.cb.onModified?.();
  }

  // ── 셀 속성 모달 ─────────────────────────────────────────────────

  private showCellProps(cell: HTMLTableCellElement): void {
    const ownerDoc = cell.ownerDocument;
    const cur = CellMerger.readCellProperties(cell);

    const overlay = ownerDoc.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.38);display:flex;align-items:center;justify-content:center;z-index:10000;';

    const dlg = ownerDoc.createElement('div');
    dlg.style.cssText = 'background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:280px;font-size:13px;';
    dlg.innerHTML = `
<h4 style="margin:0 0 14px;font-size:14px;font-weight:600;">셀 속성</h4>
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 12px;align-items:center;">
  <label>테두리 종류</label>
  <select id="cp-bs" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;">
    ${['solid','dashed','dotted','double','none'].map((v) => `<option value="${v}">${v}</option>`).join('')}
  </select>
  <label>테두리 두께</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-bw" type="number" value="${cur.borderWidth ?? 1}" min="0" max="20"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span></div>
  <label>테두리 색</label>
  <input id="cp-bc" type="color" value="${cur.borderColor ?? '#000000'}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-ind" type="number" value="${cur.indent ?? 0}" min="0"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span></div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${cur.bgColor || '#ffffff'}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>ID</label>
  <input id="cp-id" type="text" value="${cur.id ?? ''}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-cls" type="text" value="${cur.className ?? ''}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;">적용</button>
</div>`;

    overlay.appendChild(dlg);
    ownerDoc.body.appendChild(overlay);
    (dlg.querySelector('#cp-bs') as HTMLSelectElement).value = cur.borderStyle ?? 'solid';

    const close = (): void => overlay.remove();
    dlg.querySelector('#cp-cancel')!.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    dlg.querySelector('#cp-ok')!.addEventListener('click', () => {
      const props: CellProperties = {
        borderStyle: (dlg.querySelector('#cp-bs')  as HTMLSelectElement).value as CellProperties['borderStyle'],
        borderWidth: parseInt((dlg.querySelector('#cp-bw')  as HTMLInputElement).value, 10) || 0,
        borderColor: (dlg.querySelector('#cp-bc')  as HTMLInputElement).value,
        indent:      parseInt((dlg.querySelector('#cp-ind') as HTMLInputElement).value, 10) || 0,
        bgColor:     (dlg.querySelector('#cp-bg')  as HTMLInputElement).value,
        id:          (dlg.querySelector('#cp-id')  as HTMLInputElement).value.trim(),
        className:   (dlg.querySelector('#cp-cls') as HTMLInputElement).value.trim(),
      };
      CellMerger.applyCellProperties(cell, props);
      this.cb.onModified?.();
      close();
    });
  }

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
}
