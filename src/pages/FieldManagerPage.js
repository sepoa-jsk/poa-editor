import { loadFieldDefinitions, loadFieldCategories, saveFieldDefinitions, saveFieldCategories, NUMBER_FORMAT_OPTIONS, DATE_FORMAT_OPTIONS, } from '../modules/insert/DocumentFields.js';
// ── Icon helpers (inline SVG strings) ────────────────────────────────────────
const IC = {
    grip: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>`,
    edit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    del: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`,
    plus: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    save: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    box: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    reset: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
};
// ── State ─────────────────────────────────────────────────────────────────────
export class FieldManagerPage {
    fields = [];
    categories = [];
    activeCatId = '';
    selectedFieldId = null;
    editingField = null;
    isNew = false;
    dragSrcId = null;
    toastTimer = null;
    // DOM refs
    catList;
    fieldList;
    fieldToolbarTitle;
    fieldCount;
    editPanel;
    epTitle;
    epBody;
    init() {
        this.fields = loadFieldDefinitions();
        this.categories = loadFieldCategories();
        // Ensure default active category
        if (this.categories.length > 0) {
            this.activeCatId = this.categories[0].id;
        }
        this._buildSkeleton();
        this._renderCategories();
        this._renderFields();
        // Global click to close context menus
        document.addEventListener('mousedown', (e) => {
            const menu = document.getElementById('ctx-menu');
            if (menu && !menu.contains(e.target))
                menu.remove();
        });
    }
    // ── Skeleton ───────────────────────────────────────────────────────────────
    _buildSkeleton() {
        document.body.innerHTML = `
<header class="fm-header">
  <h1>양식 필드 관리</h1>
  <span class="fm-header-spacer"></span>
  <button class="btn-header" id="btn-reset">${IC.reset} 기본값 복원</button>
  <button class="btn-header primary" id="btn-save-all">${IC.save} 저장</button>
</header>

<div class="fm-body">
  <aside class="fm-cat-panel">
    <div class="fm-cat-header">
      <span>카테고리</span>
      <button class="btn-icon-sm" id="btn-add-cat" title="카테고리 추가">${IC.plus}</button>
    </div>
    <div class="fm-cat-list" id="cat-list"></div>
  </aside>

  <main class="fm-field-area">
    <div class="fm-field-toolbar">
      <span class="fm-field-title" id="field-title">-</span>
      <span class="fm-field-count" id="field-count"></span>
      <span class="fm-spacer"></span>
      <button class="btn-sm primary" id="btn-add-field">${IC.plus} 필드 추가</button>
    </div>
    <div class="fm-field-list" id="field-list"></div>
  </main>
</div>

<aside class="fm-edit-panel" id="edit-panel">
  <div class="ep-header">
    <span class="ep-title" id="ep-title">필드 편집</span>
    <button class="btn-icon-sm" id="ep-close">${IC.x}</button>
  </div>
  <div class="ep-body" id="ep-body"></div>
  <div class="ep-footer">
    <button class="btn-sm" id="ep-cancel">취소</button>
    <button class="btn-sm primary" id="ep-apply">${IC.save} 저장</button>
  </div>
</aside>

<div class="fm-toast" id="fm-toast"></div>`;
        // Cache refs
        this.catList = document.getElementById('cat-list');
        this.fieldList = document.getElementById('field-list');
        this.fieldToolbarTitle = document.getElementById('field-title');
        this.fieldCount = document.getElementById('field-count');
        this.editPanel = document.getElementById('edit-panel');
        this.epTitle = document.getElementById('ep-title');
        this.epBody = document.getElementById('ep-body');
        // Wire header buttons
        document.getElementById('btn-save-all').addEventListener('click', () => this._saveAll());
        document.getElementById('btn-reset').addEventListener('click', () => this._resetToDefaults());
        document.getElementById('btn-add-cat').addEventListener('click', () => this._openAddCategoryModal());
        document.getElementById('btn-add-field').addEventListener('click', () => this._openAddField());
        // Edit panel close/cancel/apply
        document.getElementById('ep-close').addEventListener('click', () => this._closeEditPanel());
        document.getElementById('ep-cancel').addEventListener('click', () => this._closeEditPanel());
        document.getElementById('ep-apply').addEventListener('click', () => this._applyEdit());
    }
    // ── Category Rendering ────────────────────────────────────────────────────
    _renderCategories() {
        this.catList.innerHTML = this.categories
            .map(cat => {
            const count = this.fields.filter(f => f.category === cat.id).length;
            const isActive = cat.id === this.activeCatId;
            const dot = cat.builtIn ? `<span class="builtin-dot"></span>` : '';
            return `
<div class="fm-cat-item${isActive ? ' active' : ''}" data-cat="${cat.id}">
  ${dot}
  <span>${cat.label}</span>
  <span class="fm-cat-badge">${count}</span>
</div>`;
        })
            .join('');
        this.catList.querySelectorAll('.fm-cat-item').forEach(el => {
            el.addEventListener('click', () => {
                this.activeCatId = el.dataset.cat;
                this._renderCategories();
                this._renderFields();
            });
            el.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this._showCatContextMenu(e, el.dataset.cat);
            });
        });
    }
    // ── Field Rendering ───────────────────────────────────────────────────────
    _renderFields() {
        const cat = this.categories.find(c => c.id === this.activeCatId);
        this.fieldToolbarTitle.textContent = cat ? cat.label : '-';
        const catFields = this.fields
            .filter(f => f.category === this.activeCatId)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        this.fieldCount.textContent = `(${catFields.length}개)`;
        if (catFields.length === 0) {
            this.fieldList.innerHTML = `
<div class="fm-empty">
  ${IC.box}
  <p>이 카테고리에 필드가 없습니다.</p>
  <small>상단의 "필드 추가" 버튼을 눌러 첫 번째 필드를 추가하세요.</small>
</div>`;
            return;
        }
        this.fieldList.innerHTML = catFields.map(f => this._fieldRowHtml(f)).join('');
        this.fieldList.querySelectorAll('.fm-field-row').forEach(row => {
            const fid = row.dataset.fid;
            row.addEventListener('click', (e) => {
                if (e.target.closest('.fm-field-actions'))
                    return;
                this.selectedFieldId = fid;
                this._openEditField(fid);
            });
            // Edit/Delete action buttons
            row.querySelector('[data-edit]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this._openEditField(fid);
            });
            row.querySelector('[data-del]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this._deleteField(fid);
            });
            // Drag-and-drop
            row.setAttribute('draggable', 'true');
            row.addEventListener('dragstart', (e) => {
                this.dragSrcId = fid;
                row.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            row.addEventListener('dragend', () => {
                row.classList.remove('dragging');
                this.dragSrcId = null;
                this.fieldList.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            });
            row.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (fid !== this.dragSrcId) {
                    this.fieldList.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                    row.classList.add('drag-over');
                }
            });
            row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
            row.addEventListener('drop', (e) => {
                e.preventDefault();
                row.classList.remove('drag-over');
                if (this.dragSrcId && this.dragSrcId !== fid) {
                    this._reorderField(this.dragSrcId, fid);
                }
            });
        });
    }
    _fieldRowHtml(f) {
        const typeBadge = `<span class="type-badge ${f.type}">${this._typeLabel(f.type)}</span>`;
        const builtIn = f.builtIn ? `<span class="builtin-badge">기본</span>` : '';
        return `
<div class="fm-field-row" data-fid="${f.id}">
  <span class="drag-handle">${IC.grip}</span>
  <span class="fm-field-label">${f.label}</span>
  <span class="fm-field-placeholder">${f.placeholder}</span>
  ${typeBadge}
  ${builtIn}
  <div class="fm-field-actions">
    <button class="btn-icon-sm" data-edit title="편집">${IC.edit}</button>
    ${f.builtIn ? '' : `<button class="btn-icon-sm danger" data-del title="삭제">${IC.del}</button>`}
  </div>
</div>`;
    }
    _typeLabel(type) {
        return type === 'text' ? '텍스트' : type === 'number' ? '숫자' : '날짜';
    }
    // ── Edit Panel ────────────────────────────────────────────────────────────
    _openAddField() {
        const maxOrder = Math.max(0, ...this.fields.map(f => f.order ?? 0));
        this.editingField = {
            id: '',
            label: '',
            placeholder: '',
            type: 'text',
            category: this.activeCatId,
            builtIn: false,
            order: maxOrder + 1,
        };
        this.isNew = true;
        this.epTitle.textContent = '필드 추가';
        this._renderEditForm();
        this.editPanel.classList.add('open');
    }
    _openEditField(fid) {
        const field = this.fields.find(f => f.id === fid);
        if (!field)
            return;
        this.editingField = { ...field };
        this.isNew = false;
        this.epTitle.textContent = '필드 편집';
        this._renderEditForm();
        this.editPanel.classList.add('open');
    }
    _renderEditForm() {
        if (!this.editingField)
            return;
        const f = this.editingField;
        const catOptions = this.categories
            .map(c => `<option value="${c.id}"${c.id === f.category ? ' selected' : ''}>${c.label}</option>`)
            .join('');
        const typeOptions = ['text', 'number', 'date']
            .map(t => `<option value="${t}"${t === f.type ? ' selected' : ''}>${this._typeLabel(t)}</option>`)
            .join('');
        const formatSection = f.type === 'number'
            ? `<div class="form-group">
           <label>숫자 포맷</label>
           <select id="ep-fmt">
             ${NUMBER_FORMAT_OPTIONS.map(([v, l]) => `<option value="${v}"${f.defaultNumberFormat === v ? ' selected' : ''}>${l}</option>`).join('')}
           </select>
         </div>`
            : f.type === 'date'
                ? `<div class="form-group">
             <label>날짜 포맷</label>
             <select id="ep-fmt">
               ${DATE_FORMAT_OPTIONS.map(([v, l]) => `<option value="${v}"${f.defaultNumberFormat === v ? ' selected' : ''}>${l}</option>`).join('')}
             </select>
           </div>`
                : '';
        this.epBody.innerHTML = `
<div class="form-group">
  <label>ID (영문·숫자·밑줄)</label>
  <input id="ep-id" value="${f.id}" ${f.builtIn ? 'readonly' : ''} placeholder="예) my_field" />
  ${f.builtIn ? '' : '<span class="form-hint">생성 후 변경 불가. 영문 소문자, 숫자, 밑줄만 허용.</span>'}
</div>
<div class="form-group">
  <label>표시 이름</label>
  <input id="ep-label" value="${f.label}" placeholder="예) 계약 금액" />
</div>
<div class="form-group">
  <label>플레이스홀더</label>
  <input id="ep-placeholder" value="${f.placeholder}" placeholder="예) $.{my_field}" />
</div>
<div class="form-group">
  <label>카테고리</label>
  <select id="ep-cat">${catOptions}</select>
</div>
<hr class="form-divider" />
<div class="form-group">
  <label>필드 유형</label>
  <select id="ep-type">${typeOptions}</select>
</div>
${formatSection}`;
        // Live type change — re-render format section
        this.epBody.querySelector('#ep-type')?.addEventListener('change', (e) => {
            if (!this.editingField)
                return;
            this.editingField.type = e.target.value;
            this.editingField.defaultNumberFormat = undefined;
            this._syncEditFormToState();
            this._renderEditForm();
        });
    }
    _syncEditFormToState() {
        if (!this.editingField)
            return;
        const get = (id) => (this.epBody.querySelector(`#${id}`)?.value ?? '').trim();
        if (!this.editingField.builtIn)
            this.editingField.id = get('ep-id');
        this.editingField.label = get('ep-label');
        this.editingField.placeholder = get('ep-placeholder');
        this.editingField.category = get('ep-cat');
        this.editingField.type = get('ep-type');
        const fmt = this.epBody.querySelector('#ep-fmt');
        if (fmt)
            this.editingField.defaultNumberFormat = fmt.value;
    }
    _applyEdit() {
        this._syncEditFormToState();
        if (!this.editingField)
            return;
        const f = this.editingField;
        if (!f.label.trim()) {
            this._toast('표시 이름을 입력하세요.', 'error');
            return;
        }
        if (!f.id.trim()) {
            this._toast('ID를 입력하세요.', 'error');
            return;
        }
        if (!/^[a-z0-9_]+$/.test(f.id)) {
            this._toast('ID는 영문 소문자, 숫자, 밑줄만 허용됩니다.', 'error');
            return;
        }
        if (this.isNew) {
            if (this.fields.some(x => x.id === f.id)) {
                this._toast(`ID "${f.id}" 이(가) 이미 존재합니다.`, 'error');
                return;
            }
            this.fields.push({ ...f });
        }
        else {
            const idx = this.fields.findIndex(x => x.id === f.id);
            if (idx !== -1)
                this.fields[idx] = { ...f };
        }
        this._closeEditPanel();
        this._renderCategories();
        this._renderFields();
        this._toast(this.isNew ? '필드가 추가되었습니다.' : '필드가 수정되었습니다.', 'success');
    }
    _closeEditPanel() {
        this.editPanel.classList.remove('open');
        this.editingField = null;
    }
    // ── Delete Field ──────────────────────────────────────────────────────────
    _deleteField(fid) {
        const field = this.fields.find(f => f.id === fid);
        if (!field)
            return;
        if (field.builtIn) {
            this._toast('기본 제공 필드는 삭제할 수 없습니다.', 'error');
            return;
        }
        if (!confirm(`"${field.label}" 필드를 삭제하시겠습니까?`))
            return;
        this.fields = this.fields.filter(f => f.id !== fid);
        if (this.selectedFieldId === fid)
            this.selectedFieldId = null;
        this._renderCategories();
        this._renderFields();
        this._toast('필드가 삭제되었습니다.', 'success');
    }
    // ── Reorder ───────────────────────────────────────────────────────────────
    _reorderField(srcId, targetId) {
        const catFields = this.fields
            .filter(f => f.category === this.activeCatId)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        const srcIdx = catFields.findIndex(f => f.id === srcId);
        const tgtIdx = catFields.findIndex(f => f.id === targetId);
        if (srcIdx === -1 || tgtIdx === -1)
            return;
        const [moved] = catFields.splice(srcIdx, 1);
        catFields.splice(tgtIdx, 0, moved);
        catFields.forEach((f, i) => {
            const field = this.fields.find(x => x.id === f.id);
            if (field)
                field.order = i * 10 + (this.categories.findIndex(c => c.id === this.activeCatId)) * 1000;
        });
        this._renderFields();
    }
    // ── Category Context Menu ─────────────────────────────────────────────────
    _showCatContextMenu(e, catId) {
        const existing = document.getElementById('ctx-menu');
        if (existing)
            existing.remove();
        const cat = this.categories.find(c => c.id === catId);
        if (!cat)
            return;
        const menu = document.createElement('div');
        menu.id = 'ctx-menu';
        menu.className = 'ctx-menu';
        menu.innerHTML = `
<div class="ctx-menu-item" data-action="rename">이름 변경</div>
${cat.builtIn ? '' : `<hr class="ctx-menu-sep"><div class="ctx-menu-item danger" data-action="delete">카테고리 삭제</div>`}`;
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;
        document.body.appendChild(menu);
        menu.addEventListener('click', (ev) => {
            const action = ev.target.closest('[data-action]')?.dataset.action;
            menu.remove();
            if (action === 'rename')
                this._renameCategory(catId);
            if (action === 'delete')
                this._deleteCategory(catId);
        });
    }
    _renameCategory(catId) {
        const cat = this.categories.find(c => c.id === catId);
        if (!cat)
            return;
        const newLabel = prompt('새 카테고리 이름:', cat.label);
        if (!newLabel || !newLabel.trim())
            return;
        cat.label = newLabel.trim();
        this._renderCategories();
        this._renderFields();
        this._toast('카테고리 이름이 변경되었습니다.', 'success');
    }
    _deleteCategory(catId) {
        const cat = this.categories.find(c => c.id === catId);
        if (!cat)
            return;
        if (cat.builtIn) {
            this._toast('기본 제공 카테고리는 삭제할 수 없습니다.', 'error');
            return;
        }
        const fieldCount = this.fields.filter(f => f.category === catId).length;
        if (fieldCount > 0) {
            if (!confirm(`"${cat.label}" 카테고리에 ${fieldCount}개의 필드가 있습니다.\n카테고리를 삭제하면 필드도 함께 삭제됩니다. 계속하시겠습니까?`))
                return;
            this.fields = this.fields.filter(f => f.category !== catId);
        }
        else {
            if (!confirm(`"${cat.label}" 카테고리를 삭제하시겠습니까?`))
                return;
        }
        this.categories = this.categories.filter(c => c.id !== catId);
        if (this.activeCatId === catId) {
            this.activeCatId = this.categories[0]?.id ?? '';
        }
        this._renderCategories();
        this._renderFields();
        this._toast('카테고리가 삭제되었습니다.', 'success');
    }
    // ── Add Category Modal ────────────────────────────────────────────────────
    _openAddCategoryModal() {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.innerHTML = `
<div class="modal-box" id="add-cat-box">
  <div class="modal-title">카테고리 추가</div>
  <div class="form-group">
    <label>카테고리 ID (영문·숫자·밑줄)</label>
    <input id="new-cat-id" placeholder="예) my_category" />
    <span class="form-hint">영문 소문자, 숫자, 밑줄만 허용됩니다.</span>
  </div>
  <div class="form-group">
    <label>표시 이름</label>
    <input id="new-cat-label" placeholder="예) 내 카테고리" />
  </div>
  <div class="modal-actions">
    <button class="btn-sm" id="cat-modal-cancel">취소</button>
    <button class="btn-sm primary" id="cat-modal-ok">${IC.plus} 추가</button>
  </div>
</div>`;
        document.body.appendChild(backdrop);
        backdrop.querySelector('#new-cat-id').focus();
        const close = () => backdrop.remove();
        backdrop.addEventListener('mousedown', (e) => { if (e.target === backdrop)
            close(); });
        backdrop.querySelector('#cat-modal-cancel')?.addEventListener('click', close);
        backdrop.querySelector('#cat-modal-ok')?.addEventListener('click', () => {
            const id = (backdrop.querySelector('#new-cat-id').value).trim();
            const label = (backdrop.querySelector('#new-cat-label').value).trim();
            if (!id) {
                this._toast('카테고리 ID를 입력하세요.', 'error');
                return;
            }
            if (!/^[a-z0-9_]+$/.test(id)) {
                this._toast('ID는 영문 소문자, 숫자, 밑줄만 허용됩니다.', 'error');
                return;
            }
            if (!label) {
                this._toast('표시 이름을 입력하세요.', 'error');
                return;
            }
            if (this.categories.some(c => c.id === id)) {
                this._toast(`ID "${id}" 이(가) 이미 존재합니다.`, 'error');
                return;
            }
            const maxOrder = Math.max(0, ...this.categories.map(c => c.order));
            this.categories.push({ id, label, order: maxOrder + 1, builtIn: false });
            this.activeCatId = id;
            close();
            this._renderCategories();
            this._renderFields();
            this._toast('카테고리가 추가되었습니다.', 'success');
        });
    }
    // ── Save / Reset ──────────────────────────────────────────────────────────
    _saveAll() {
        saveFieldDefinitions(this.fields);
        saveFieldCategories(this.categories);
        this._toast('저장되었습니다.', 'success');
    }
    _resetToDefaults() {
        if (!confirm('모든 사용자 정의 필드와 카테고리를 삭제하고 기본값으로 복원하시겠습니까?'))
            return;
        localStorage.removeItem('poa-field-definitions');
        localStorage.removeItem('poa-field-categories');
        this.fields = loadFieldDefinitions();
        this.categories = loadFieldCategories();
        this.activeCatId = this.categories[0]?.id ?? '';
        this._renderCategories();
        this._renderFields();
        this._toast('기본값으로 복원되었습니다.', 'success');
    }
    // ── Toast ─────────────────────────────────────────────────────────────────
    _toast(msg, type = 'info') {
        const el = document.getElementById('fm-toast');
        if (this.toastTimer !== null)
            clearTimeout(this.toastTimer);
        el.textContent = msg;
        el.className = `fm-toast ${type} show`;
        this.toastTimer = window.setTimeout(() => {
            el.classList.remove('show');
            this.toastTimer = null;
        }, 2500);
    }
}
