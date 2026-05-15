import { DocumentApiClient } from '../../modules/document/DocumentApiClient.js';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-static';
import { pxN } from '../../utils/icons.js';
const SEARCH_ICON_14 = pxN(Search, 14);
const ICON_ASC = pxN(ChevronUp, 12);
const ICON_DESC = pxN(ChevronDown, 12);
const ICON_NONE = pxN(ChevronsUpDown, 12);
const HDR_LABELS = { index: '번호', title: '제목', updatedAt: '수정일' };
const CSS = `
:host { display: none; }
:host([open]) { display: block; }

.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
}

.dialog {
  background: #fff; border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 640px; max-width: 95vw; height: 480px; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
  animation: dlgIn .15s ease;
}

@keyframes dlgIn {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
  font-size: 15px; font-weight: 600; color: #111827;
}

.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #9CA3AF; line-height: 1; padding: 0 4px;
  border-radius: 4px; font-family: inherit;
}
.close-btn:hover { color: #374151; background: #F3F4F6; }

.search-wrap {
  padding: 12px 20px; border-bottom: 1px solid #F3F4F6; flex-shrink: 0;
}

.search-field {
  position: relative;
}

.search-icon {
  position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
  color: #9CA3AF; display: flex; align-items: center; pointer-events: none;
}

.search-input {
  width: 100%; height: 32px; padding: 0 10px 0 32px;
  border: 1px solid #D1D5DB; border-radius: 6px;
  font-size: 13px; outline: none; box-sizing: border-box;
  font-family: inherit; color: #374151;
}
.search-input:focus { border-color: #2563EB; }

.table-wrap { flex: 1; overflow-y: auto; }

.table-hdr {
  display: grid; grid-template-columns: 48px 1fr 100px 100px;
  padding: 0 20px; height: 36px;
  font-size: 13px; font-weight: normal; color: #374151;
  align-items: stretch;
  border-bottom: 1px solid #F3F4F6;
  position: sticky; top: 0; background: #fff; z-index: 1;
}

.col-hdr {
  display: flex; align-items: center; justify-content: center; gap: 4px;
  cursor: pointer; user-select: none;
  padding: 0 4px; border-radius: 4px;
  color: #374151; transition: color .1s, background .1s;
}
.col-hdr:hover { color: #2563EB; background: #F8FAFC; }
.col-hdr.active { color: #2563EB; font-weight: 600; }

.doc-row {
  display: grid; grid-template-columns: 48px 1fr 100px 100px;
  padding: 0 20px; height: 44px;
  border-bottom: 1px solid #F3F4F6; align-items: center;
  transition: background .1s;
}
.doc-row:hover { background: #F9FAFB; }
.doc-row:last-child { border-bottom: none; }

.doc-num {
  font-size: 13px; font-weight: normal; color: #6B7280;
  text-align: center;
}

.doc-title {
  font-size: 15px; font-weight: normal; color: #111827;
  cursor: pointer; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; padding: 0 8px; text-align: left;
}
.doc-title:hover { color: #2563EB; text-decoration: underline; }

.doc-date {
  font-size: 13px; font-weight: normal; color: #374151;
  text-align: center;
}

.doc-actions { display: flex; gap: 6px; justify-content: center; }

.btn-open {
  height: 28px; padding: 0 10px;
  font-size: 12px; cursor: pointer; font-family: inherit;
  background: #EFF6FF; color: #2563EB;
  border: 1px solid #BFDBFE; border-radius: 4px;
  transition: background .1s;
}
.btn-open:hover { background: #DBEAFE; }

.btn-delete {
  height: 28px; padding: 0 10px;
  font-size: 12px; cursor: pointer; font-family: inherit;
  background: transparent; color: #EF4444;
  border: 1px solid #FCA5A5; border-radius: 4px;
  transition: background .1s;
}
.btn-delete:hover { background: #FEF2F2; }

.empty-msg {
  color: #9CA3AF; font-size: 13px;
  text-align: center; padding: 48px 0;
}

.footer {
  display: flex; align-items: center; justify-content: flex-start;
  padding: 10px 20px; border-top: 1px solid #F3F4F6; flex-shrink: 0;
  font-size: 13px; font-weight: normal; color: #374151;
}
`;
function formatDate(iso) {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}
export class PoaDocumentListDialog extends HTMLElement {
    shadow;
    onLoad = null;
    documents = [];
    filterQuery = '';
    sortKey = 'updatedAt';
    sortOrder = 'desc';
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog">
    <div class="header">
      <span>문서 목록</span>
      <button class="close-btn" id="btn-close">✕</button>
    </div>
    <div class="search-wrap">
      <div class="search-field">
        <span class="search-icon">${SEARCH_ICON_14}</span>
        <input class="search-input" id="search-inp" type="text" placeholder="문서 검색...">
      </div>
    </div>
    <div class="table-wrap" id="table-wrap">
      <div class="table-hdr">
        <span class="col-hdr" id="hdr-index"></span>
        <span class="col-hdr" id="hdr-title"></span>
        <span class="col-hdr" id="hdr-date"></span>
        <span></span>
      </div>
      <div id="list"></div>
    </div>
    <div class="footer" id="footer">총 0개 문서</div>
  </div>
</div>`;
        this.shadow.getElementById('btn-close')?.addEventListener('click', () => this._close());
        this.shadow.getElementById('backdrop')?.addEventListener('click', (e) => {
            if (e.target.id === 'backdrop')
                this._close();
        });
        const inp = this.shadow.getElementById('search-inp');
        inp.addEventListener('input', () => {
            this.filterQuery = inp.value.trim().toLowerCase();
            this._renderList();
        });
        inp.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                this._close();
            }
            e.stopPropagation();
        });
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Escape')
                this._close();
        });
        this.shadow.getElementById('hdr-index')?.addEventListener('click', () => this._onSort('index'));
        this.shadow.getElementById('hdr-title')?.addEventListener('click', () => this._onSort('title'));
        this.shadow.getElementById('hdr-date')?.addEventListener('click', () => this._onSort('updatedAt'));
    }
    setup(onLoad) {
        this.onLoad = onLoad;
    }
    async open() {
        this.filterQuery = '';
        const inp = this.shadow.getElementById('search-inp');
        if (inp)
            inp.value = '';
        this.setAttribute('open', '');
        try {
            this.documents = await DocumentApiClient.getDocuments();
        }
        catch {
            this.documents = [];
        }
        this._renderList();
        requestAnimationFrame(() => {
            this.shadow.getElementById('search-inp')?.focus();
        });
    }
    _onSort(key) {
        if (this.sortKey === key) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        }
        else {
            this.sortKey = key;
            this.sortOrder = 'asc';
        }
        this._renderList();
    }
    _sortedFiltered() {
        const q = this.filterQuery;
        const filtered = q
            ? this.documents.filter(d => d.title.toLowerCase().includes(q))
            : [...this.documents];
        filtered.sort((a, b) => {
            let cmp = 0;
            if (this.sortKey === 'index') {
                cmp = a.id - b.id;
            }
            else if (this.sortKey === 'title') {
                cmp = a.title.localeCompare(b.title, 'ko');
            }
            else {
                cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            }
            return this.sortOrder === 'asc' ? cmp : -cmp;
        });
        return filtered;
    }
    _renderList() {
        const sorted = this._sortedFiltered();
        const listEl = this.shadow.getElementById('list');
        const footerEl = this.shadow.getElementById('footer');
        footerEl.textContent = `총 ${sorted.length}개 문서`;
        this._updateHeaders();
        if (sorted.length === 0) {
            listEl.innerHTML = `<p class="empty-msg">${this.filterQuery ? '검색 결과가 없습니다.' : '저장된 문서가 없습니다.'}</p>`;
            return;
        }
        const N = sorted.length;
        listEl.innerHTML = '';
        sorted.forEach((doc, i) => {
            const num = this.sortOrder === 'asc' ? i + 1 : N - i;
            const row = document.createElement('div');
            row.className = 'doc-row';
            const numEl = document.createElement('span');
            numEl.className = 'doc-num';
            numEl.textContent = String(num);
            const titleEl = document.createElement('span');
            titleEl.className = 'doc-title';
            titleEl.title = doc.title;
            titleEl.textContent = doc.title;
            titleEl.addEventListener('click', () => void this._loadDoc(doc.docKey));
            const dateEl = document.createElement('span');
            dateEl.className = 'doc-date';
            dateEl.textContent = formatDate(doc.updatedAt);
            const actionsEl = document.createElement('div');
            actionsEl.className = 'doc-actions';
            const openBtn = document.createElement('button');
            openBtn.className = 'btn-open';
            openBtn.textContent = '열기';
            openBtn.addEventListener('click', () => void this._loadDoc(doc.docKey));
            const delBtn = document.createElement('button');
            delBtn.className = 'btn-delete';
            delBtn.textContent = '삭제';
            delBtn.addEventListener('click', () => void this._deleteDoc(doc.docKey));
            actionsEl.append(openBtn, delBtn);
            row.append(numEl, titleEl, dateEl, actionsEl);
            listEl.appendChild(row);
        });
    }
    _updateHeaders() {
        const cols = [
            { id: 'hdr-index', key: 'index' },
            { id: 'hdr-title', key: 'title' },
            { id: 'hdr-date', key: 'updatedAt' },
        ];
        for (const { id, key } of cols) {
            const el = this.shadow.getElementById(id);
            if (!el)
                continue;
            const active = this.sortKey === key;
            el.className = `col-hdr${active ? ' active' : ''}`;
            const icon = active ? (this.sortOrder === 'asc' ? ICON_ASC : ICON_DESC) : ICON_NONE;
            const color = active ? '#2563EB' : '#D1D5DB';
            el.innerHTML = `${HDR_LABELS[key]}<span style="display:flex;align-items:center;color:${color};pointer-events:none">${icon}</span>`;
        }
    }
    async _loadDoc(docKey) {
        try {
            const doc = await DocumentApiClient.getDocument(docKey);
            this._close();
            this.onLoad?.(doc);
        }
        catch (e) {
            console.error('문서 불러오기 실패:', e);
        }
    }
    async _deleteDoc(docKey) {
        if (!confirm('이 문서를 삭제하시겠습니까?'))
            return;
        try {
            await DocumentApiClient.deleteDocument(docKey);
            this.documents = this.documents.filter(d => d.docKey !== docKey);
            this._renderList();
        }
        catch (e) {
            console.error('문서 삭제 실패:', e);
        }
    }
    _close() {
        this.removeAttribute('open');
    }
}
