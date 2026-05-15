import DOMPurify from 'dompurify';
import { SignatureManager, buildSignatureHtml, MAX_LOGO_BYTES } from '../../modules/signature/SignatureManager.js';
const LAYOUT_LABELS = {
    1: '기본형', 2: '로고(좌)', 3: '로고(상)', 4: '구분선형', 5: '2단형', 6: '컬러헤더',
};
const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  position: relative; background: #fff; border-radius: 12px;
  width: min(880px, 96vw); height: min(680px, 92vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 22px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { display: flex; flex: 1; overflow: hidden; }

.left {
  width: 200px; flex-shrink: 0; border-right: 1px solid #f3f4f6;
  display: flex; flex-direction: column; overflow: hidden;
}
.sig-list { flex: 1; overflow-y: auto; padding: 6px 0; }
.sig-item {
  padding: 8px 12px; cursor: pointer; font-size: 13px; color: #374151;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  border-radius: 4px; margin: 0 6px 2px;
}
.sig-item:hover   { background: #f3f4f6; }
.sig-item.selected { background: #eff6ff; color: #2563eb; font-weight: 600; }
.left-btns { padding: 8px; border-top: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 4px; }
.left-btn {
  width: 100%; padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151; text-align: left;
}
.left-btn:hover { background: #f9fafb; }
.left-btn.danger { color: #ef4444; border-color: #fecaca; }
.left-btn.danger:hover { background: #fee2e2; }

.right { flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 14px 16px; gap: 12px; min-width: 0; }

.section-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }

.layout-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.layout-card {
  border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 8px 4px;
  cursor: pointer; text-align: center; font-size: 11px; color: #6b7280;
  background: #fff; user-select: none;
}
.layout-card:hover  { border-color: #9ca3af; }
.layout-card.active { border-color: #2563eb; background: #eff6ff; color: #2563eb; font-weight: 600; }
.layout-num { font-size: 16px; font-weight: 700; display: block; margin-bottom: 2px; }

.color-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #374151; }
.color-row input[type=color] { width: 40px; height: 26px; border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px; cursor: pointer; }

.fields { display: flex; flex-direction: column; gap: 6px; }
.field-row { display: flex; align-items: center; gap: 8px; }
.field-row label { width: 62px; font-size: 12px; color: #6b7280; flex-shrink: 0; text-align: right; }
.field-row input {
  flex: 1; padding: 6px 8px; border: 1.5px solid #e5e7eb; border-radius: 6px;
  font-size: 13px; outline: none; font-family: inherit; min-width: 0;
}
.field-row input:focus { border-color: #2563eb; }

.logo-area { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.logo-btn {
  padding: 5px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151;
}
.logo-btn:hover { background: #f9fafb; }
.logo-hint { font-size: 11px; color: #9ca3af; flex-basis: 100%; }
.logo-error { font-size: 11px; color: #ef4444; flex-basis: 100%; }
.logo-preview img { max-width: 80px; max-height: 60px; border: 1px solid #e5e7eb; border-radius: 4px; margin-top: 4px; }

.preview-box {
  border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 12px; background: #fafafa; min-height: 80px; font-size: 14px;
}
.preview-empty { color: #d1d5db; font-size: 13px; text-align: center; padding: 20px 0; }

.action-row { display: flex; gap: 8px; padding-top: 4px; flex-shrink: 0; }
.btn-save {
  flex: 1; padding: 8px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151; font-weight: 500;
}
.btn-save:hover { background: #f9fafb; }
.btn-insert {
  flex: 1; padding: 8px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-insert:hover { background: #1d4ed8; }
.hidden { display: none !important; }
`;
const TPL = `
<div class="dlg">
  <div class="hdr">
    <h3>서명 템플릿</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="left">
      <div class="sig-list" id="sig-list"></div>
      <div class="left-btns">
        <button class="left-btn" id="btn-new">+ 새 서명</button>
        <button class="left-btn danger" id="btn-delete">삭제</button>
      </div>
    </div>
    <div class="right">
      <div class="section-label">레이아웃 선택</div>
      <div class="layout-grid" id="layout-grid"></div>

      <div class="color-row hidden" id="color-row">
        <label>헤더 색상</label>
        <input type="color" id="f-hdr-color" value="#2563eb">
      </div>

      <div class="section-label">입력 정보</div>
      <div class="fields">
        <div class="field-row"><label>서명 이름</label><input type="text" id="f-signame" placeholder="서명 이름 (필수)"></div>
        <div class="field-row"><label>이름</label>    <input type="text" id="f-name"></div>
        <div class="field-row"><label>직책</label>    <input type="text" id="f-title"></div>
        <div class="field-row"><label>부서</label>    <input type="text" id="f-dept"></div>
        <div class="field-row"><label>회사</label>    <input type="text" id="f-company"></div>
        <div class="field-row"><label>전화</label>    <input type="text" id="f-phone"></div>
        <div class="field-row"><label>이메일</label>  <input type="text" id="f-email"></div>
        <div class="field-row"><label>웹사이트</label><input type="text" id="f-website"></div>
      </div>

      <div class="section-label">로고 이미지</div>
      <div class="logo-area">
        <button class="logo-btn" id="btn-logo">이미지 업로드</button>
        <button class="logo-btn" id="btn-logo-rm">제거</button>
        <input type="file" id="logo-input" accept="image/png,image/svg+xml,image/jpeg" style="display:none;">
        <div class="logo-hint">PNG / SVG / JPG, 최대 200KB</div>
        <div class="logo-error hidden" id="logo-error"></div>
        <div class="logo-preview hidden" id="logo-preview"></div>
      </div>

      <div class="section-label">미리보기</div>
      <div class="preview-box" id="preview-box">
        <div class="preview-empty">정보를 입력하면 미리보기가 표시됩니다</div>
      </div>

      <div class="action-row">
        <button class="btn-save"   id="btn-save">저장</button>
        <button class="btn-insert" id="btn-insert">에디터에 삽입</button>
      </div>
    </div>
  </div>
</div>
`;
export class PoaSignatureDialog extends HTMLElement {
    shadow;
    mgr;
    selectedId = null;
    currentLayout = 1;
    currentLogo;
    currentHeaderColor = '#2563eb';
    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${STYLE}</style>${TPL}`;
        this.mgr = new SignatureManager();
        this._buildLayoutGrid();
        this._bind();
    }
    open() {
        this.mgr = new SignatureManager();
        this._renderList();
        const all = this.mgr.getAll();
        if (all.length > 0) {
            this._loadSignature(all[0].id);
        }
        else {
            this._newSignature();
        }
        this.setAttribute('open', '');
    }
    close() { this.removeAttribute('open'); }
    // ── 빌드 ──────────────────────────────────────────────────────────────────
    _buildLayoutGrid() {
        const grid = this.shadow.getElementById('layout-grid');
        grid.innerHTML = '';
        [1, 2, 3, 4, 5, 6].forEach(n => {
            const card = document.createElement('button');
            card.className = `layout-card${n === this.currentLayout ? ' active' : ''}`;
            card.dataset.layout = String(n);
            card.innerHTML = `<span class="layout-num">${n}</span>${LAYOUT_LABELS[n]}`;
            card.addEventListener('click', () => this._setLayout(n));
            grid.appendChild(card);
        });
    }
    // ── 바인딩 ───────────────────────────────────────────────────────────────
    _bind() {
        this.shadow.querySelector('.x-btn').addEventListener('click', () => this.close());
        this.addEventListener('click', e => { if (e.composedPath()[0] === this)
            this.close(); });
        this.shadow.getElementById('btn-new').addEventListener('click', () => this._newSignature());
        this.shadow.getElementById('btn-delete').addEventListener('click', () => {
            if (!this.selectedId)
                return;
            this.mgr.delete(this.selectedId);
            this.selectedId = null;
            this._renderList();
            const all = this.mgr.getAll();
            all.length > 0 ? this._loadSignature(all[0].id) : this._newSignature();
        });
        this.shadow.getElementById('f-hdr-color').addEventListener('input', e => {
            this.currentHeaderColor = e.target.value;
            this._refreshPreview();
        });
        const liveFields = ['f-name', 'f-title', 'f-dept', 'f-company', 'f-phone', 'f-email', 'f-website', 'f-signame'];
        for (const id of liveFields) {
            this.shadow.getElementById(id).addEventListener('input', () => this._refreshPreview());
        }
        this.shadow.getElementById('btn-logo').addEventListener('click', () => {
            this.shadow.getElementById('logo-input').click();
        });
        this.shadow.getElementById('btn-logo-rm').addEventListener('click', () => {
            this.currentLogo = undefined;
            (this.shadow.getElementById('logo-preview')).classList.add('hidden');
            (this.shadow.getElementById('logo-preview')).innerHTML = '';
            this._refreshPreview();
        });
        this.shadow.getElementById('logo-input').addEventListener('change', e => {
            const file = e.target.files?.[0];
            if (file)
                this._handleLogoUpload(file);
        });
        this.shadow.getElementById('btn-save').addEventListener('click', () => this._doSave());
        this.shadow.getElementById('btn-insert').addEventListener('click', () => this._doInsert());
    }
    // ── 목록 렌더 ─────────────────────────────────────────────────────────────
    _renderList() {
        const list = this.shadow.getElementById('sig-list');
        list.innerHTML = '';
        for (const sig of this.mgr.getAll()) {
            const item = document.createElement('div');
            item.className = `sig-item${sig.id === this.selectedId ? ' selected' : ''}`;
            item.textContent = sig.name || '(이름 없음)';
            item.dataset.id = sig.id;
            item.addEventListener('click', () => this._loadSignature(sig.id));
            list.appendChild(item);
        }
    }
    // ── 로드 / 새 서명 ────────────────────────────────────────────────────────
    _loadSignature(id) {
        const sig = this.mgr.getById(id);
        if (!sig)
            return;
        this.selectedId = id;
        this.currentLayout = sig.layout;
        this.currentLogo = sig.logo;
        this.currentHeaderColor = sig.headerColor ?? '#2563eb';
        this._val('f-signame', sig.name);
        this._val('f-name', sig.fields.displayName);
        this._val('f-title', sig.fields.title);
        this._val('f-dept', sig.fields.department);
        this._val('f-company', sig.fields.company);
        this._val('f-phone', sig.fields.phone);
        this._val('f-email', sig.fields.email);
        this._val('f-website', sig.fields.website);
        this.shadow.getElementById('f-hdr-color').value = this.currentHeaderColor;
        this._syncLayoutCards();
        this._syncColorRow();
        this._syncLogoPreview();
        this._renderList();
        this._refreshPreview();
    }
    _newSignature() {
        this.selectedId = null;
        this.currentLayout = 1;
        this.currentLogo = undefined;
        this.currentHeaderColor = '#2563eb';
        ['f-signame', 'f-name', 'f-title', 'f-dept', 'f-company', 'f-phone', 'f-email', 'f-website'].forEach(id => this._val(id, ''));
        this.shadow.getElementById('f-hdr-color').value = '#2563eb';
        this._syncLayoutCards();
        this._syncColorRow();
        this.shadow.getElementById('logo-preview').classList.add('hidden');
        this.shadow.getElementById('logo-preview').innerHTML = '';
        this._renderList();
        this._refreshPreview();
        setTimeout(() => this.shadow.getElementById('f-signame').focus(), 50);
    }
    // ── 레이아웃 ─────────────────────────────────────────────────────────────
    _setLayout(n) {
        this.currentLayout = n;
        this._syncLayoutCards();
        this._syncColorRow();
        this._refreshPreview();
    }
    _syncLayoutCards() {
        this.shadow.querySelectorAll('.layout-card').forEach(card => {
            card.classList.toggle('active', card.dataset.layout === String(this.currentLayout));
        });
    }
    _syncColorRow() {
        this.shadow.getElementById('color-row').classList.toggle('hidden', this.currentLayout !== 6);
    }
    // ── 미리보기 ──────────────────────────────────────────────────────────────
    _refreshPreview() {
        const html = buildSignatureHtml({
            layout: this.currentLayout,
            fields: this._collectFields(),
            logo: this.currentLogo,
            headerColor: this.currentHeaderColor,
        });
        const clean = DOMPurify.sanitize(html, {
            FORCE_BODY: false,
            ADD_DATA_URI_TAGS: ['img'],
            ALLOWED_TAGS: ['table', 'tbody', 'tr', 'td', 'strong', 'span', 'img', 'hr', 'br'],
            ALLOWED_ATTR: ['style', 'class', 'alt', 'src', 'colspan'],
        });
        const box = this.shadow.getElementById('preview-box');
        box.innerHTML = clean || '<div class="preview-empty">정보를 입력하면 미리보기가 표시됩니다</div>';
    }
    // ── 로고 ─────────────────────────────────────────────────────────────────
    _handleLogoUpload(file) {
        const errEl = this.shadow.getElementById('logo-error');
        if (file.size > MAX_LOGO_BYTES) {
            errEl.textContent = `파일 크기가 200KB를 초과합니다. (${Math.round(file.size / 1024)}KB)`;
            errEl.classList.remove('hidden');
            return;
        }
        errEl.classList.add('hidden');
        const reader = new FileReader();
        reader.onload = () => {
            this.currentLogo = reader.result;
            this._syncLogoPreview();
            this._refreshPreview();
        };
        reader.readAsDataURL(file);
    }
    _syncLogoPreview() {
        const wrap = this.shadow.getElementById('logo-preview');
        if (this.currentLogo) {
            wrap.innerHTML = `<img src="${this.currentLogo}" alt="로고 미리보기">`;
            wrap.classList.remove('hidden');
        }
        else {
            wrap.innerHTML = '';
            wrap.classList.add('hidden');
        }
    }
    // ── 저장 ─────────────────────────────────────────────────────────────────
    _doSave() {
        const sigName = this.shadow.getElementById('f-signame').value.trim();
        if (!sigName) {
            this.shadow.getElementById('f-signame').focus();
            return;
        }
        const data = {
            name: sigName,
            layout: this.currentLayout,
            fields: this._collectFields(),
            logo: this.currentLogo,
            headerColor: this.currentHeaderColor,
        };
        try {
            if (this.selectedId) {
                this.mgr.update(this.selectedId, data);
            }
            else {
                const sig = this.mgr.add(data);
                this.selectedId = sig.id;
            }
            this._renderList();
        }
        catch (err) {
            const errEl = this.shadow.getElementById('logo-error');
            errEl.textContent = err.message;
            errEl.classList.remove('hidden');
        }
    }
    // ── 삽입 ─────────────────────────────────────────────────────────────────
    _doInsert() {
        const html = buildSignatureHtml({
            layout: this.currentLayout,
            fields: this._collectFields(),
            logo: this.currentLogo,
            headerColor: this.currentHeaderColor,
        });
        if (!html)
            return;
        this.dispatchEvent(new CustomEvent('poa-signature-insert', {
            bubbles: true, composed: true,
            detail: { html },
        }));
        this.close();
    }
    // ── 헬퍼 ─────────────────────────────────────────────────────────────────
    _val(id, value) {
        this.shadow.getElementById(id).value = value;
    }
    _collectFields() {
        return {
            displayName: this.shadow.getElementById('f-name').value.trim(),
            title: this.shadow.getElementById('f-title').value.trim(),
            department: this.shadow.getElementById('f-dept').value.trim(),
            company: this.shadow.getElementById('f-company').value.trim(),
            phone: this.shadow.getElementById('f-phone').value.trim(),
            email: this.shadow.getElementById('f-email').value.trim(),
            website: this.shadow.getElementById('f-website').value.trim(),
        };
    }
}
