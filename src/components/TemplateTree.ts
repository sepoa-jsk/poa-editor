import type { TemplateManager, TemplateNode } from '../modules/template/TemplateManager.js';

const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: block; height: 100%; overflow-y: auto; }
.tree  { padding: 6px 0; }
.node-row {
  display: flex; align-items: center; gap: 4px;
  height: 32px; padding: 0 8px;
  cursor: pointer; font-size: 13px; color: #374151;
  border-radius: 4px; user-select: none;
  white-space: nowrap; overflow: hidden;
}
.node-row:hover   { background: #f3f4f6; }
.node-row.selected { background: #eff6ff; color: #2563eb; }
.arrow       { width: 14px; font-size: 9px; flex-shrink: 0; color: #9ca3af; }
.arrow-spacer { width: 14px; flex-shrink: 0; }
.icon  { flex-shrink: 0; font-size: 14px; }
.label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
.inline-input {
  flex: 1; min-width: 0; border: 1.5px solid #2563eb; border-radius: 4px;
  padding: 1px 6px; font-size: 13px; outline: none; background: #fff;
}
.add-btn {
  display: block; width: calc(100% - 16px); margin: 6px 8px 2px;
  padding: 5px 10px; border: 1.5px dashed #d1d5db; border-radius: 6px;
  background: none; cursor: pointer; font-size: 12px; color: #6b7280; text-align: left;
}
.add-btn:hover { background: #f9fafb; border-color: #9ca3af; }
.ctx-menu {
  position: fixed; background: #fff; border: 1px solid #e5e7eb;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.15);
  padding: 4px; z-index: 10001; min-width: 120px;
}
.ctx-menu button {
  display: block; width: 100%; text-align: left;
  padding: 7px 12px; border: none; background: none;
  cursor: pointer; font-size: 13px; color: #374151; border-radius: 4px;
}
.ctx-menu button:hover  { background: #f3f4f6; }
.ctx-menu button.danger { color: #ef4444; }
.ctx-menu button.danger:hover { background: #fee2e2; }
`;

export class PoaTemplateTree extends HTMLElement {
  private shadow!: ShadowRoot;
  private mgr!: TemplateManager;
  private expanded  = new Set<string>();
  private selectedId: string | null = null;
  private editingId:  string | null = null;
  private ctxMenu:    HTMLElement | null = null;

  connectedCallback(): void {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `<style>${STYLE}</style><div class="tree" id="tree"></div>`;
  }

  setManager(mgr: TemplateManager): void {
    this.mgr = mgr;
    mgr.getRoots().filter(n => n.type === 'folder').forEach(n => this.expanded.add(n.id));
    this.render();
  }

  render(): void {
    if (!this.mgr) return;
    const tree = this.shadow.getElementById('tree')!;
    tree.innerHTML = '';
    this.mgr.getRoots().forEach(n => tree.appendChild(this._renderNode(n, 0)));

    const btn = document.createElement('button');
    btn.className = 'add-btn';
    btn.textContent = '📁 폴더 추가';
    btn.addEventListener('click', () => this.addFolder(null));
    tree.appendChild(btn);
  }

  getSelected(): TemplateNode | null {
    return this.selectedId ? this.mgr.getById(this.selectedId) : null;
  }

  /** 외부(TemplateDialog)에서 호출 가능한 폴더 추가 */
  addFolder(parentId: string | null): void {
    if (parentId) this.expanded.add(parentId);
    const node = this.mgr.addFolder('새 폴더', parentId);
    this.editingId = node.id;
    this.render();
  }

  // ── 트리 렌더링 (재귀) ──────────────────────────────────────────────────

  private _renderNode(node: TemplateNode, depth: number): HTMLElement {
    const wrap = document.createElement('div');
    const row  = document.createElement('div');
    row.className  = `node-row${this.selectedId === node.id ? ' selected' : ''}`;
    row.style.paddingLeft = `${8 + depth * 16}px`;

    const arrowEl = document.createElement('span');
    if (node.type === 'folder') {
      arrowEl.className   = 'arrow';
      arrowEl.textContent = this.expanded.has(node.id) ? '▼' : '▶';
    } else {
      arrowEl.className = 'arrow-spacer';
    }

    const iconEl = document.createElement('span');
    iconEl.className   = 'icon';
    iconEl.textContent = node.type === 'folder' ? '📁' : '📄';

    row.appendChild(arrowEl);
    row.appendChild(iconEl);

    if (this.editingId === node.id) {
      const inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'inline-input'; inp.value = node.name;
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter')  this._commitEdit(node.id, inp.value);
        if (e.key === 'Escape') { this.editingId = null; this.render(); }
        e.stopPropagation();
      });
      inp.addEventListener('blur', () => this._commitEdit(node.id, inp.value));
      row.appendChild(inp);
      requestAnimationFrame(() => { inp.focus(); inp.select(); });
    } else {
      const lbl = document.createElement('span');
      lbl.className = 'label'; lbl.textContent = node.name;
      row.appendChild(lbl);
    }

    row.addEventListener('click', e => { e.stopPropagation(); this._select(node); });
    row.addEventListener('dblclick', e => {
      e.stopPropagation();
      if (node.type === 'template') this._emit('poa-tmpl-dblclick', { node });
    });
    row.addEventListener('contextmenu', e => {
      e.preventDefault(); e.stopPropagation();
      this._showCtx(node, e.clientX, e.clientY);
    });

    wrap.appendChild(row);

    if (node.type === 'folder' && this.expanded.has(node.id)) {
      this.mgr.getChildren(node.id).forEach(c => wrap.appendChild(this._renderNode(c, depth + 1)));
    }
    return wrap;
  }

  // ── 선택 / 펼치기 ────────────────────────────────────────────────────────

  private _select(node: TemplateNode): void {
    if (node.type === 'folder') {
      this.expanded.has(node.id) ? this.expanded.delete(node.id) : this.expanded.add(node.id);
    }
    this.selectedId = node.id;
    this.render();
    this._emit('poa-tmpl-select', { node });
  }

  // ── 인라인 편집 ─────────────────────────────────────────────────────────

  private _commitEdit(id: string, name: string): void {
    if (name.trim()) this.mgr.rename(id, name.trim());
    this.editingId = null;
    this.render();
  }

  // ── 컨텍스트 메뉴 ───────────────────────────────────────────────────────

  private _showCtx(node: TemplateNode, x: number, y: number): void {
    this._hideCtx();
    const m = document.createElement('div');
    m.className = 'ctx-menu';
    m.style.left = `${x}px`; m.style.top = `${y}px`;

    const renameBtn = document.createElement('button');
    renameBtn.textContent = '이름 변경';
    renameBtn.addEventListener('click', () => {
      this._hideCtx(); this.editingId = node.id; this.render();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제'; delBtn.className = 'danger';
    delBtn.addEventListener('click', () => {
      this._hideCtx();
      this.mgr.delete(node.id);
      this.expanded.delete(node.id);
      if (this.selectedId === node.id) this.selectedId = null;
      this.render();
      this._emit('poa-tmpl-delete', { id: node.id });
    });

    m.appendChild(renameBtn);
    m.appendChild(delBtn);
    this.shadow.appendChild(m);
    this.ctxMenu = m;
    setTimeout(() => document.addEventListener('click', () => this._hideCtx(), { once: true }), 0);
  }

  private _hideCtx(): void { this.ctxMenu?.remove(); this.ctxMenu = null; }

  private _emit(name: string, detail: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }
}
