import { buildUserModeUrl, isAdmin, isWriteMode } from '../core/AppMode.js';
import { Icons } from '../utils/icons.js';
function isVisible(n) {
    if (n.isTemp)
        return false;
    if (!n.name || n.name.trim().length === 0)
        return false;
    if (n.name.startsWith('임시_'))
        return false;
    if (n.name.startsWith('preview_'))
        return false;
    if (n.name.startsWith('__'))
        return false;
    if (n.type === 'template' && n.content == null)
        return false;
    return true;
}
const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: block; height: 100%; }

.section-hdr {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 8px 4px;
  font-size: 11px; font-weight: 700; color: #9ca3af;
  letter-spacing: .08em; text-transform: uppercase;
  user-select: none;
}
.readonly-badge {
  font-size: 11px; font-weight: 400; color: #9ca3af;
  letter-spacing: 0; text-transform: none; margin-left: 2px;
}
.section-hdr svg { flex-shrink: 0; opacity: .7; }
.section-private { margin-top: 16px; }

.node-row {
  display: flex; align-items: center; gap: 4px;
  padding: 0 8px; cursor: pointer;
  border-radius: 6px; user-select: none;
  white-space: nowrap; position: relative;
}
.node-row.folder-row  { height: 34px; font-size: 13px; font-weight: 600; color: #374151; }
.node-row.tmpl-row    { height: 32px; font-size: 13px; color: #4b5563; }
.node-row:hover       { background: #f1f5f9; }
.node-row.selected    { background: #eff6ff; color: #2563eb; }

.drag-handle {
  width: 14px; height: 14px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #d1d5db; cursor: grab; opacity: 0;
}
.node-row:hover .drag-handle { opacity: 1; }
.node-row.dragging { opacity: .4; }
.node-row.drop-before::before {
  content: ''; position: absolute;
  left: 0; right: 0; top: -1px; height: 2px;
  background: #2563eb; z-index: 1; pointer-events: none;
}
.node-row.drop-after::after {
  content: ''; position: absolute;
  left: 0; right: 0; bottom: -1px; height: 2px;
  background: #2563eb; z-index: 1; pointer-events: none;
}
.node-row.drop-inside { box-shadow: inset 0 0 0 2px #93c5fd; background: #eff6ff; }

.chevron { width: 12px; flex-shrink: 0; display: flex; align-items: center; color: #9ca3af; }
.chevron-spacer { width: 12px; flex-shrink: 0; }
.node-icon { flex-shrink: 0; display: flex; align-items: center; color: #94a3b8; }
/* 폴더 아이콘 색상: 내용 있음 */
.node-icon.folder-has { color: #2563EB; }
.node-icon.folder-has.open { color: #1D4ED8; }
/* 폴더 아이콘 색상: 비어있음 */
.node-icon.folder-empty { color: #D1D5DB; }
.node-row:hover .node-icon.folder-empty { color: #9CA3AF; }
/* 선택 상태: 항상 파란색 */
.node-row.selected .node-icon { color: #2563eb; }
.label { flex: 1; overflow: hidden; text-overflow: ellipsis; }

.inline-input {
  flex: 1; min-width: 0; border: 1.5px solid #2563eb; border-radius: 4px;
  padding: 1px 6px; font-size: 13px; outline: none; background: #fff;
  font-family: inherit;
}

.ctx-menu {
  position: fixed; background: #fff; border: 1px solid #e5e7eb;
  border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,.14);
  padding: 4px; z-index: 10001; min-width: 140px;
}
.ctx-item {
  display: flex; align-items: center; gap: 8px; width: 100%;
  text-align: left; padding: 7px 12px; border: none; background: none;
  cursor: pointer; font-size: 13px; color: #374151; border-radius: 6px;
  font-family: inherit;
}
.ctx-item:hover  { background: #f3f4f6; }
.ctx-item.danger { color: #ef4444; }
.ctx-item.danger:hover { background: #fee2e2; }
.ctx-item.disabled { opacity: .4; cursor: not-allowed; pointer-events: none; }
.ctx-sep { height: 1px; background: #f3f4f6; margin: 3px 0; }

.empty-section {
  padding: 12px 8px;
  font-size: 12px; color: #9ca3af;
}
`;
export class PoaTemplateTree extends HTMLElement {
    shadow;
    mgr;
    expanded = new Set();
    selectedId = null;
    editingId = null;
    ctxMenu = null;
    filterQuery = '';
    dragId = null;
    dragOverId = null;
    dropPos = null;
    rowMap = new Map();
    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${STYLE}</style><div id="tree"></div>`;
    }
    setManager(mgr) {
        this.mgr = mgr;
        mgr.getRoots().filter(n => n.type === 'folder').forEach(n => this.expanded.add(n.id));
        this.render();
    }
    setFilter(query) {
        this.filterQuery = query.trim().toLowerCase();
        this.render();
    }
    render() {
        if (!this.mgr)
            return;
        const tree = this.shadow.getElementById('tree');
        tree.innerHTML = '';
        this.rowMap.clear();
        const allNodes = this.mgr.getAll().filter(isVisible);
        const q = this.filterQuery;
        const matches = (node) => !q || node.name.toLowerCase().includes(q);
        const publicRoots = allNodes.filter(n => n.parentId === null && n.isPublic);
        const privateRoots = allNodes.filter(n => n.parentId === null && !n.isPublic);
        tree.appendChild(this._renderSection('공용 템플릿', 'public', publicRoots, q));
        tree.appendChild(this._renderSection('내 템플릿', 'private', privateRoots, q));
        void matches; // used inside _renderSection
    }
    getSelected() {
        return this.selectedId ? this.mgr.getById(this.selectedId) : null;
    }
    addFolder(parentId, isPublic = false) {
        if (parentId)
            this.expanded.add(parentId);
        const node = this.mgr.addFolder('새 폴더', parentId, isPublic);
        this.editingId = node.id;
        this.render();
    }
    // ── 섹션 렌더링 ───────────────────────────────────────────────────────────
    _renderSection(label, kind, roots, q) {
        const wrap = document.createElement('div');
        if (kind === 'private')
            wrap.classList.add('section-private');
        const hdr = document.createElement('div');
        hdr.className = 'section-hdr';
        const icon = kind === 'public' ? Icons.users12 : Icons.user12;
        const readonlyBadge = (kind === 'public' && isWriteMode())
            ? '<span class="readonly-badge">(읽기 전용)</span>' : '';
        hdr.innerHTML = `${icon}<span>${label}</span>${readonlyBadge}`;
        wrap.appendChild(hdr);
        const visibleRoots = q
            ? roots.filter(n => this._subtreeMatches(n, q))
            : roots;
        if (visibleRoots.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-section';
            if (q) {
                empty.textContent = '검색 결과 없음';
            }
            else {
                empty.textContent = kind === 'public'
                    ? '등록된 공용 템플릿이 없습니다.'
                    : '등록된 개인 템플릿이 없습니다.';
            }
            wrap.appendChild(empty);
        }
        else {
            visibleRoots.forEach(n => wrap.appendChild(this._renderNode(n, 0, q)));
        }
        return wrap;
    }
    /** 노드 또는 그 하위에 검색어 일치 항목이 있는지 확인 */
    _subtreeMatches(node, q) {
        if (node.name.toLowerCase().includes(q))
            return true;
        return this.mgr.getChildren(node.id).filter(isVisible).some(c => this._subtreeMatches(c, q));
    }
    // ── 노드 렌더링 (재귀) ──────────────────────────────────────────────────
    _renderNode(node, depth, q) {
        const wrap = document.createElement('div');
        const row = document.createElement('div');
        const isFolder = node.type === 'folder';
        const isOpen = this.expanded.has(node.id);
        row.className = `node-row ${isFolder ? 'folder-row' : 'tmpl-row'}${this.selectedId === node.id ? ' selected' : ''}`;
        row.style.paddingLeft = `${(depth * 20) + 8}px`;
        row.draggable = true;
        this.rowMap.set(node.id, row);
        // 드래그 핸들
        const handle = document.createElement('span');
        handle.className = 'drag-handle';
        handle.innerHTML = Icons.grip14;
        row.appendChild(handle);
        // 화살표
        const chevron = document.createElement('span');
        if (isFolder) {
            chevron.className = 'chevron';
            chevron.innerHTML = isOpen ? Icons.chevronDown12 : Icons.chevronRight12;
        }
        else {
            chevron.className = 'chevron-spacer';
        }
        row.appendChild(chevron);
        // 아이콘
        const iconEl = document.createElement('span');
        if (isFolder) {
            const children = this.mgr.getChildren(node.id).filter(isVisible);
            const templateCount = children.filter(c => c.type === 'template').length;
            const hasTemplates = templateCount > 0;
            iconEl.className = `node-icon${isOpen ? ' open' : ''} ${hasTemplates ? 'folder-has' : 'folder-empty'}`;
            iconEl.innerHTML = hasTemplates ? Icons.folderOpen14 : Icons.folder14;
            row.title = hasTemplates
                ? `${node.name} (${templateCount}개)`
                : `${node.name} (비어있음)`;
        }
        else {
            iconEl.className = 'node-icon';
            iconEl.innerHTML = node.isPublic ? Icons.fileText14 : Icons.file14;
        }
        row.appendChild(iconEl);
        // 라벨 또는 인라인 편집
        if (this.editingId === node.id) {
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.className = 'inline-input';
            inp.value = node.name;
            inp.addEventListener('keydown', e => {
                if (e.key === 'Enter')
                    this._commitEdit(node.id, inp.value);
                if (e.key === 'Escape') {
                    this.editingId = null;
                    this.render();
                }
                e.stopPropagation();
            });
            inp.addEventListener('blur', () => this._commitEdit(node.id, inp.value));
            row.appendChild(inp);
            requestAnimationFrame(() => { inp.focus(); inp.select(); });
        }
        else {
            const lbl = document.createElement('span');
            lbl.className = 'label';
            lbl.textContent = node.name;
            row.appendChild(lbl);
        }
        row.addEventListener('click', e => { e.stopPropagation(); this._select(node); });
        row.addEventListener('dblclick', e => {
            e.stopPropagation();
            if (node.type === 'template')
                this._emit('poa-tmpl-dblclick', { node });
        });
        row.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
            this._showCtx(node, e.clientX, e.clientY);
        });
        row.addEventListener('dragstart', e => {
            e.stopPropagation();
            this.dragId = node.id;
            row.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', node.id);
        });
        row.addEventListener('dragend', () => {
            if (this.dragId === null)
                return; // drop already handled
            this.dragId = null;
            this.dragOverId = null;
            this.dropPos = null;
            this.render();
        });
        row.addEventListener('dragover', e => {
            if (!this.dragId || this.dragId === node.id)
                return;
            if (this._wouldCreateCycle(this.dragId, node.id))
                return;
            e.preventDefault();
            e.stopPropagation();
            const rect = row.getBoundingClientRect();
            const ratio = (e.clientY - rect.top) / rect.height;
            const pos = node.type === 'folder'
                ? ratio < 0.33 ? 'before' : ratio > 0.67 ? 'after' : 'inside'
                : ratio < 0.5 ? 'before' : 'after';
            if (this.dragOverId !== node.id || this.dropPos !== pos) {
                this.dragOverId = node.id;
                this.dropPos = pos;
                this._updateDropIndicators();
            }
            e.dataTransfer.dropEffect = 'move';
        });
        row.addEventListener('drop', e => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.dragId || !this.dragOverId || !this.dropPos)
                return;
            const targetNode = this.mgr.getById(this.dragOverId);
            if (!targetNode)
                return;
            const draggedId = this.dragId;
            const pos = this.dropPos;
            const newParentId = pos === 'inside' ? this.dragOverId : targetNode.parentId;
            const targetId = pos === 'inside' ? null : this.dragOverId;
            this.dragId = null;
            this.dragOverId = null;
            this.dropPos = null;
            this.mgr.moveNode(draggedId, newParentId, pos, targetId);
            this.render();
            this._emit('poa-tmpl-moved', { id: draggedId });
        });
        wrap.appendChild(row);
        if (isFolder && isOpen) {
            const children = this.mgr.getChildren(node.id).filter(isVisible);
            const visibleChildren = q
                ? children.filter(c => this._subtreeMatches(c, q))
                : children;
            visibleChildren.forEach(c => wrap.appendChild(this._renderNode(c, depth + 1, q)));
        }
        return wrap;
    }
    // ── 선택 / 펼치기 ────────────────────────────────────────────────────────
    _select(node) {
        if (node.type === 'folder') {
            this.expanded.has(node.id) ? this.expanded.delete(node.id) : this.expanded.add(node.id);
        }
        this.selectedId = node.id;
        this.render();
        this._emit('poa-tmpl-select', { node });
    }
    // ── 인라인 편집 ─────────────────────────────────────────────────────────
    _commitEdit(id, name) {
        if (name.trim())
            this.mgr.rename(id, name.trim());
        this.editingId = null;
        this.render();
    }
    // ── 컨텍스트 메뉴 ───────────────────────────────────────────────────────
    _showCtx(node, x, y) {
        this._hideCtx();
        const admin = isAdmin();
        const canEdit = node.isPublic ? admin : true;
        const m = document.createElement('div');
        m.className = 'ctx-menu';
        m.style.left = `${x}px`;
        m.style.top = `${y}px`;
        const renameBtn = document.createElement('button');
        renameBtn.className = `ctx-item${canEdit ? '' : ' disabled'}`;
        renameBtn.innerHTML = `${Icons.pencil} 이름 변경`;
        renameBtn.addEventListener('click', () => {
            this._hideCtx();
            this.editingId = node.id;
            this.render();
        });
        m.appendChild(renameBtn);
        if (node.type === 'template') {
            const sep = document.createElement('div');
            sep.className = 'ctx-sep';
            m.appendChild(sep);
            const linkBtn = document.createElement('button');
            linkBtn.className = 'ctx-item';
            linkBtn.innerHTML = `${Icons.link16} 사용자 링크 복사`;
            linkBtn.addEventListener('click', () => {
                this._hideCtx();
                const url = buildUserModeUrl(node.id);
                navigator.clipboard.writeText(url)
                    .then(() => this._emit('poa-tmpl-copy-link', { id: node.id, url }))
                    .catch(() => this._emit('poa-tmpl-copy-link', { id: node.id, url }));
            });
            m.appendChild(linkBtn);
        }
        const sep2 = document.createElement('div');
        sep2.className = 'ctx-sep';
        m.appendChild(sep2);
        const delBtn = document.createElement('button');
        delBtn.className = `ctx-item danger${canEdit ? '' : ' disabled'}`;
        delBtn.innerHTML = `${Icons.trash} 삭제`;
        delBtn.addEventListener('click', () => {
            this._hideCtx();
            this.mgr.delete(node.id);
            this.expanded.delete(node.id);
            if (this.selectedId === node.id)
                this.selectedId = null;
            this.render();
            this._emit('poa-tmpl-delete', { id: node.id });
        });
        m.appendChild(delBtn);
        this.shadow.appendChild(m);
        this.ctxMenu = m;
        setTimeout(() => document.addEventListener('click', () => this._hideCtx(), { once: true }), 0);
    }
    _hideCtx() { this.ctxMenu?.remove(); this.ctxMenu = null; }
    _emit(name, detail) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
    }
    // ── 드래그 앤 드롭 ─────────────────────────────────────────────────────────
    _updateDropIndicators() {
        this.rowMap.forEach(r => r.classList.remove('drop-before', 'drop-inside', 'drop-after'));
        if (this.dragOverId && this.dropPos) {
            const r = this.rowMap.get(this.dragOverId);
            if (r)
                r.classList.add(`drop-${this.dropPos}`);
        }
    }
    _wouldCreateCycle(draggedId, targetId) {
        const dragged = this.mgr.getById(draggedId);
        if (!dragged || dragged.type !== 'folder')
            return false;
        let current = this.mgr.getById(targetId);
        while (current) {
            if (current.id === draggedId)
                return true;
            current = current.parentId ? this.mgr.getById(current.parentId) : null;
        }
        return false;
    }
}
