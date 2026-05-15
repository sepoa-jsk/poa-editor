const STYLE = `
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  background: #fff; border-radius: 12px;
  width: min(480px, 96vw); max-height: min(560px, 90vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 15px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 20px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }

.anchor-box {
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 10px 12px; font-size: 13px; color: #374151;
}
.anchor-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }

.field-label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
.field-input {
  width: 100%; padding: 8px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit; resize: vertical;
}
.field-input:focus { border-color: #2563eb; }

.preview-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }
.preview-tip {
  display: inline-block; background: #1F2937; color: #fff;
  border-radius: 6px; padding: 8px 12px; font-size: 13px; max-width: 240px;
  line-height: 1.5;
}
.preview-tip-title { font-weight: 500; margin-bottom: 4px; }
.preview-tip-body  { color: #D1D5DB; }

.footer { display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid #f3f4f6; flex-shrink: 0; justify-content: flex-end; }
.btn-cancel {
  padding: 8px 20px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151;
}
.btn-ok {
  padding: 8px 20px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-ok:hover { background: #1d4ed8; }

/* 목록 모드 */
.list-summary { font-size: 13px; color: #6b7280; padding-bottom: 4px; }
.list-empty   { text-align: center; color: #d1d5db; font-size: 13px; padding: 24px 0; }
.tt-item {
  border: 1px solid #f3f4f6; border-radius: 8px; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.tt-anchor { font-size: 13px; font-weight: 600; color: #111827; }
.tt-content { font-size: 12px; color: #6b7280; }
.tt-actions { display: flex; gap: 6px; align-items: center; margin-top: 4px; }
.tt-edit-btn {
  padding: 4px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151;
}
.tt-del-btn {
  padding: 4px 10px; border: 1px solid #fecaca; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #ef4444;
}
.btn-del-all {
  padding: 7px 16px; border: 1px solid #fecaca; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #ef4444;
}
.hidden { display: none !important; }
`;
export class PoaTooltipDialog extends HTMLElement {
    shadow;
    mode = 'add';
    editId = null;
    entries = [];
    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${STYLE}</style>
<div class="dlg">
  <div class="hdr">
    <h3 id="dlg-title">툴팁 추가</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>

  <!-- 편집 패널 -->
  <div class="body" id="edit-panel">
    <div id="anchor-wrap">
      <div class="anchor-label">선택한 텍스트</div>
      <div class="anchor-box" id="anchor-text"></div>
    </div>
    <div>
      <div class="field-label">툴팁 제목 (선택)</div>
      <input class="field-input" id="f-title" type="text" placeholder="제목을 입력하세요">
    </div>
    <div>
      <div class="field-label">툴팁 내용 *</div>
      <textarea class="field-input" id="f-content" rows="3" placeholder="내용을 입력하세요"></textarea>
    </div>
    <div id="preview-wrap">
      <div class="preview-label">미리보기</div>
      <div class="preview-tip" id="preview-tip">
        <div class="preview-tip-title hidden" id="preview-title"></div>
        <div class="preview-tip-body" id="preview-body"></div>
      </div>
    </div>
  </div>

  <!-- 목록 패널 -->
  <div class="body hidden" id="list-panel">
    <div class="list-summary" id="list-summary"></div>
    <div id="list-items"></div>
  </div>

  <div class="footer" id="edit-footer">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-ok"     id="btn-ok">추가</button>
  </div>
  <div class="footer hidden" id="list-footer">
    <button class="btn-del-all" id="btn-del-all">전체 삭제</button>
    <button class="btn-cancel"  id="btn-close-list">닫기</button>
  </div>
</div>`;
        this._bind();
    }
    openAdd(selectedText) {
        this.mode = 'add';
        this.editId = null;
        this._val('f-title', '');
        this._val('f-content', '');
        this._showEditPanel('툴팁 추가', '추가');
        (this.shadow.getElementById('anchor-wrap')).classList.remove('hidden');
        this.shadow.getElementById('anchor-text').textContent = `"${selectedText}"`;
        this._updatePreview();
        this.setAttribute('open', '');
        setTimeout(() => this.shadow.getElementById('f-title').focus(), 50);
    }
    openEdit(entry) {
        this.mode = 'edit';
        this.editId = entry.id;
        this._val('f-title', entry.title);
        this._val('f-content', entry.content);
        this._showEditPanel('툴팁 수정', '저장');
        (this.shadow.getElementById('anchor-wrap')).classList.remove('hidden');
        this.shadow.getElementById('anchor-text').textContent = `"${entry.anchorText}"`;
        this._updatePreview();
        this.setAttribute('open', '');
        setTimeout(() => this.shadow.getElementById('f-content').focus(), 50);
    }
    openList(entries) {
        this.mode = 'list';
        this.entries = entries;
        this._showListPanel();
        this._renderList();
        this.setAttribute('open', '');
    }
    close() { this.removeAttribute('open'); }
    // ── 패널 전환 ────────────────────────────────────────────────────────────
    _showEditPanel(title, okLabel) {
        this.shadow.getElementById('dlg-title').textContent = title;
        this.shadow.getElementById('edit-panel').classList.remove('hidden');
        this.shadow.getElementById('list-panel').classList.add('hidden');
        this.shadow.getElementById('edit-footer').classList.remove('hidden');
        this.shadow.getElementById('list-footer').classList.add('hidden');
        this.shadow.getElementById('btn-ok').textContent = okLabel;
    }
    _showListPanel() {
        this.shadow.getElementById('dlg-title').textContent = '툴팁 목록';
        this.shadow.getElementById('edit-panel').classList.add('hidden');
        this.shadow.getElementById('list-panel').classList.remove('hidden');
        this.shadow.getElementById('edit-footer').classList.add('hidden');
        this.shadow.getElementById('list-footer').classList.remove('hidden');
    }
    // ── 목록 렌더 ─────────────────────────────────────────────────────────────
    _renderList() {
        const n = this.entries.length;
        this.shadow.getElementById('list-summary').textContent = `문서 내 툴팁 ${n}개`;
        const container = this.shadow.getElementById('list-items');
        container.innerHTML = '';
        if (n === 0) {
            const empty = document.createElement('div');
            empty.className = 'list-empty';
            empty.textContent = '툴팁이 없습니다';
            container.appendChild(empty);
            return;
        }
        for (const entry of this.entries) {
            const item = document.createElement('div');
            item.className = 'tt-item';
            item.innerHTML =
                `<div class="tt-anchor">"${entry.anchorText}"</div>` +
                    `<div class="tt-content">→ ${entry.content}</div>` +
                    `<div class="tt-actions">` +
                    `<button class="tt-edit-btn" data-id="${entry.id}">수정</button>` +
                    `<button class="tt-del-btn"  data-id="${entry.id}">삭제</button>` +
                    `</div>`;
            item.querySelector('.tt-edit-btn').addEventListener('click', () => this.openEdit(entry));
            item.querySelector('.tt-del-btn').addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('poa-tooltip-remove', {
                    bubbles: true, composed: true, detail: { id: entry.id },
                }));
                this.entries = this.entries.filter(e => e.id !== entry.id);
                this._renderList();
            });
            container.appendChild(item);
        }
    }
    // ── 미리보기 ──────────────────────────────────────────────────────────────
    _updatePreview() {
        const title = this.shadow.getElementById('f-title').value.trim();
        const content = this.shadow.getElementById('f-content').value.trim();
        const titleEl = this.shadow.getElementById('preview-title');
        const bodyEl = this.shadow.getElementById('preview-body');
        titleEl.textContent = title;
        titleEl.classList.toggle('hidden', !title);
        bodyEl.textContent = content || '내용을 입력하세요';
    }
    // ── 바인딩 ───────────────────────────────────────────────────────────────
    _bind() {
        this.shadow.querySelector('.x-btn').addEventListener('click', () => this.close());
        this.addEventListener('click', e => { if (e.composedPath()[0] === this)
            this.close(); });
        this.shadow.getElementById('btn-cancel').addEventListener('click', () => this.close());
        this.shadow.getElementById('btn-close-list').addEventListener('click', () => this.close());
        this.shadow.getElementById('btn-del-all').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('poa-tooltip-remove-all', { bubbles: true, composed: true }));
            this.entries = [];
            this._renderList();
        });
        this.shadow.getElementById('btn-ok').addEventListener('click', () => this._doOk());
        const liveUpdate = () => this._updatePreview();
        this.shadow.getElementById('f-title').addEventListener('input', liveUpdate);
        this.shadow.getElementById('f-content').addEventListener('input', liveUpdate);
        this.shadow.getElementById('f-content').addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter')
                this._doOk();
            if (e.key === 'Escape') {
                e.stopPropagation();
                this.close();
            }
        });
    }
    // ── 저장/추가 ─────────────────────────────────────────────────────────────
    _doOk() {
        const title = this.shadow.getElementById('f-title').value.trim();
        const content = this.shadow.getElementById('f-content').value.trim();
        if (!content) {
            this.shadow.getElementById('f-content').focus();
            return;
        }
        if (this.mode === 'edit' && this.editId) {
            this.dispatchEvent(new CustomEvent('poa-tooltip-update', {
                bubbles: true, composed: true,
                detail: { id: this.editId, title, content },
            }));
        }
        else {
            this.dispatchEvent(new CustomEvent('poa-tooltip-insert', {
                bubbles: true, composed: true,
                detail: { title, content },
            }));
        }
        this.close();
    }
    _val(id, value) {
        this.shadow.getElementById(id).value = value;
    }
}
