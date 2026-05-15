/** Intl.DateTimeFormat 프리셋 5종 */
const DATETIME_PRESETS = [
    {
        label: '날짜 (2025-05-05)',
        fn: () => new Date().toISOString().slice(0, 10),
    },
    {
        label: '시간 (14:30:05)',
        fn: () => new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        }).format(new Date()),
    },
    {
        label: '날짜·시간 (2025-05-05 14:30)',
        fn: () => {
            const d = new Date();
            const date = d.toISOString().slice(0, 10);
            const time = new Intl.DateTimeFormat('ko-KR', {
                hour: '2-digit', minute: '2-digit', hour12: false,
            }).format(d);
            return `${date} ${time}`;
        },
    },
    {
        label: '한국어 날짜 (2025년 5월 5일)',
        fn: () => new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric',
        }).format(new Date()),
    },
    {
        label: '한국어 날짜·시간 (2025년 5월 5일 월요일 오후 2:30)',
        fn: () => new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric',
            weekday: 'long', hour: 'numeric', minute: '2-digit',
        }).format(new Date()),
    },
];
const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 1050; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 520px; max-width: 96vw; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 20px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 9px 20px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666; border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.body { flex: 1; overflow-y: auto; padding: 16px 20px; }
.panel { display: none; }
.panel.active { display: block; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 4px; font-weight: 500; }
.field input, .field select, .field textarea {
  width: 100%; box-sizing: border-box;
  padding: 6px 9px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none; font-family: inherit;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.rel-hint {
  font-size: 11px; color: #388e3c; margin-top: 4px;
  background: #f1f8e9; border-radius: 3px; padding: 3px 8px; display: none;
}
.rel-hint.show { display: block; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 12px 20px; border-top: 1px solid #eee;
}
.btn { padding: 7px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer; font-size: 13px; }
.btn:hover { background: #f5f5f5; }
.btn.primary { border-color: #1976d2; background: #1976d2; color: #fff; }
.btn.primary:hover { background: #1565c0; }
.btn.danger { border-color: #d32f2f; background: #fff; color: #d32f2f; }
.btn.danger:hover { background: #fce4ec; }
.btn.sm { padding: 4px 10px; font-size: 12px; }
.btn:disabled { opacity: .45; cursor: default; }

/* 책갈피 탭 */
.bm-create { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 16px; }
.bm-create .field { margin-bottom: 0; flex: 1; }
.bm-list-header {
  font-size: 12px; font-weight: 600; color: #555;
  margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #eee;
}
.bm-list { list-style: none; margin: 0; padding: 0; max-height: 200px; overflow-y: auto; }
.bm-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 0; border-bottom: 1px solid #f5f5f5; font-size: 13px;
}
.bm-item:last-child { border-bottom: none; }
.bm-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bm-id { font-size: 11px; color: #999; font-family: monospace; }
.bm-edit-row { display: flex; gap: 6px; margin-top: 4px; }
.bm-edit-row input { flex: 1; padding: 4px 6px; border: 1px solid #1976d2; border-radius: 3px; font-size: 12px; }
.bm-empty { font-size: 13px; color: #999; padding: 12px 0; text-align: center; }

/* 날짜·시간 탭 */
.dt-preset {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; border: 1px solid #eee; border-radius: 4px;
  margin-bottom: 8px; font-size: 13px;
}
.dt-preview { flex: 1; color: #333; }
.dt-format { font-size: 11px; color: #999; margin-left: 8px; }
`;
/**
 * <poa-link-dialog> — 링크 삽입 / 책갈피 관리 / 날짜·시간 삽입 다이얼로그.
 *
 * 발송 이벤트 (bubbles + composed):
 *   poa-link-insert           { attrs: LinkAttributes }
 *   poa-link-update           { anchor: HTMLAnchorElement; attrs: LinkAttributes }
 *   poa-bookmark-link-insert  { bookmarkId: string; text: string }
 *   poa-bookmark-create       { label: string }
 *   poa-bookmark-update       { id: string; label: string }
 *   poa-bookmark-delete       { id: string }
 *   poa-datetime-insert       { text: string }
 */
export class PoaLinkDialog extends HTMLElement {
    shadow;
    bookmarks = [];
    editingId = null;
    editingAnchor = null;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="링크 삽입">
    <div class="header">
      <span id="dialog-title">링크 삽입</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="link">하이퍼링크</button>
      <button class="tab-btn" data-tab="bookmark">책갈피</button>
      <button class="tab-btn" data-tab="datetime">날짜·시간</button>
    </div>
    <div class="body">

      <!-- 하이퍼링크 탭 -->
      <div class="panel active" id="panel-link">
        <div class="field">
          <label>URL *</label>
          <input id="inp-href" type="url" placeholder="https://example.com">
          <div class="err" id="err-href">유효한 URL을 입력하세요.</div>
        </div>
        <div class="field">
          <label>링크 텍스트 *</label>
          <input id="inp-text" type="text" placeholder="링크에 표시할 텍스트">
          <div class="err" id="err-text">링크 텍스트를 입력하세요.</div>
        </div>
        <div class="field">
          <label>제목 (title)</label>
          <input id="inp-title" type="text" placeholder="마우스 오버 시 표시">
        </div>
        <div class="row2">
          <div class="field">
            <label>열기 방식</label>
            <select id="sel-target">
              <option value="">현재 탭</option>
              <option value="_blank">새 탭 (_blank)</option>
            </select>
          </div>
        </div>
        <div class="rel-hint" id="rel-hint">
          rel="noopener noreferrer" 자동 추가됩니다 (보안)
        </div>
      </div>

      <!-- 책갈피 탭 -->
      <div class="panel" id="panel-bookmark">
        <div class="bm-create">
          <div class="field">
            <label>새 책갈피 레이블</label>
            <input id="inp-bm-label" type="text" placeholder="책갈피 이름">
          </div>
          <button class="btn primary sm" id="btn-bm-create">만들기</button>
        </div>

        <div class="bm-list-header">책갈피 목록</div>
        <ul class="bm-list" id="bm-list"></ul>
      </div>

      <!-- 날짜·시간 탭 -->
      <div class="panel" id="panel-datetime">
        <div id="dt-presets"></div>
      </div>

    </div>
    <div class="footer">
      <button class="btn" id="btn-cancel">닫기</button>
      <button class="btn primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>`;
        this.buildDatetimePresets();
        this.bindEvents();
    }
    /** 현재 문서의 책갈피 목록을 주입한다 (open() 전에 호출) */
    setBookmarks(entries) {
        this.bookmarks = entries;
        if (this.isConnected)
            this.renderBookmarkList();
    }
    open(tab = 'link', anchor) {
        this.reset();
        this.editingAnchor = anchor ?? null;
        this.setAttribute('open', '');
        this.switchTab(tab);
        if (tab === 'link') {
            if (anchor) {
                // 수정 모드: 기존 앵커 값으로 폼 채우기
                const s = this.shadow;
                s.getElementById('inp-href').value = anchor.getAttribute('href') ?? '';
                s.getElementById('inp-text').value = anchor.textContent ?? '';
                s.getElementById('inp-title').value = anchor.title ?? '';
                const target = anchor.target === '_blank' ? '_blank' : '';
                s.getElementById('sel-target').value = target;
                s.getElementById('rel-hint')?.classList.toggle('show', target === '_blank');
                s.getElementById('dialog-title').textContent = '링크 수정';
                s.getElementById('btn-confirm').textContent = '수정';
            }
            this.shadow.getElementById('inp-href')?.focus();
        }
        else if (tab === 'bookmark') {
            this.shadow.getElementById('inp-bm-label')?.focus();
        }
    }
    close() {
        this.removeAttribute('open');
        this.editingId = null;
        this.editingAnchor = null;
    }
    reset() {
        const s = this.shadow;
        s.getElementById('inp-href').value = '';
        s.getElementById('inp-text').value = '';
        s.getElementById('inp-title').value = '';
        s.getElementById('sel-target').value = '';
        s.getElementById('inp-bm-label').value = '';
        s.getElementById('err-href')?.classList.remove('show');
        s.getElementById('err-text')?.classList.remove('show');
        s.getElementById('rel-hint')?.classList.remove('show');
        s.getElementById('dialog-title').textContent = '링크 삽입';
        s.getElementById('btn-confirm').textContent = '삽입';
        this.editingId = null;
        this.editingAnchor = null;
        this.renderBookmarkList();
    }
    bindEvents() {
        const s = this.shadow;
        s.getElementById('backdrop')?.addEventListener('click', (e) => {
            if (e.target === s.getElementById('backdrop'))
                this.close();
        });
        s.getElementById('btn-close')?.addEventListener('click', () => this.close());
        s.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
        s.getElementById('btn-confirm')?.addEventListener('click', () => this.onConfirm());
        // 탭 전환
        s.querySelectorAll('.tab-btn').forEach((btn) => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        // 새 탭 선택 시 rel 힌트 표시
        s.getElementById('sel-target')?.addEventListener('change', () => {
            const blank = s.getElementById('sel-target').value === '_blank';
            s.getElementById('rel-hint')?.classList.toggle('show', blank);
        });
        // 책갈피 만들기
        s.getElementById('btn-bm-create')?.addEventListener('click', () => this.onBookmarkCreate());
        s.getElementById('inp-bm-label')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                this.onBookmarkCreate();
        });
    }
    switchTab(tab) {
        const s = this.shadow;
        s.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
        s.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${tab}`));
        const titles = {
            link: '링크 삽입',
            bookmark: '책갈피 관리',
            datetime: '날짜·시간 삽입',
        };
        s.getElementById('dialog-title').textContent = titles[tab];
        const confirmBtn = s.getElementById('btn-confirm');
        if (tab === 'bookmark') {
            confirmBtn.style.display = 'none';
        }
        else {
            confirmBtn.style.display = '';
            confirmBtn.textContent = tab === 'datetime' ? '삽입' : '삽입';
        }
    }
    onConfirm() {
        const activePanel = this.shadow.querySelector('.panel.active');
        if (activePanel?.id === 'panel-link')
            this.confirmLink();
    }
    confirmLink() {
        const s = this.shadow;
        const href = s.getElementById('inp-href').value.trim();
        const text = s.getElementById('inp-text').value.trim();
        const title = s.getElementById('inp-title').value.trim();
        const targetVal = s.getElementById('sel-target').value;
        let valid = true;
        // href 유효성: URL 생성자 검사 또는 #bookmark
        const hrefOk = href.startsWith('#') ? href.length > 1 : (() => {
            try {
                new URL(href);
                return true;
            }
            catch {
                return false;
            }
        })();
        if (!href || !hrefOk) {
            s.getElementById('err-href').classList.add('show');
            s.getElementById('inp-href').focus();
            valid = false;
        }
        else {
            s.getElementById('err-href').classList.remove('show');
        }
        if (!text) {
            s.getElementById('err-text').classList.add('show');
            if (valid)
                s.getElementById('inp-text').focus();
            valid = false;
        }
        else {
            s.getElementById('err-text').classList.remove('show');
        }
        if (!valid)
            return;
        const attrs = {
            href,
            text,
            title: title || undefined,
            target: (targetVal === '_blank') ? '_blank' : '_self',
        };
        if (this.editingAnchor) {
            this.dispatch('poa-link-update', { anchor: this.editingAnchor, attrs });
        }
        else {
            this.dispatch('poa-link-insert', { attrs });
        }
        this.close();
    }
    onBookmarkCreate() {
        const input = this.shadow.getElementById('inp-bm-label');
        const label = input.value.trim();
        if (!label) {
            input.focus();
            return;
        }
        this.dispatch('poa-bookmark-create', { label });
        input.value = '';
        input.focus();
    }
    renderBookmarkList() {
        const ul = this.shadow.getElementById('bm-list');
        if (!ul)
            return;
        if (this.bookmarks.length === 0) {
            ul.innerHTML = '<li class="bm-empty">책갈피가 없습니다.</li>';
            return;
        }
        ul.innerHTML = this.bookmarks.map((bm) => `
      <li class="bm-item" data-id="${bm.id}">
        <span class="bm-label" title="${bm.label}">${bm.label}</span>
        <span class="bm-id">#${bm.id}</span>
        <button class="btn sm" data-action="link" data-id="${bm.id}" title="이 책갈피로 링크 삽입">링크</button>
        <button class="btn sm" data-action="edit" data-id="${bm.id}" title="수정">수정</button>
        <button class="btn sm danger" data-action="delete" data-id="${bm.id}" title="삭제">삭제</button>
      </li>
      ${this.editingId === bm.id ? `
      <li class="bm-item" style="padding:4px 0;">
        <div class="bm-edit-row" style="flex:1;">
          <input id="inp-bm-edit" type="text" value="${bm.label}" placeholder="새 레이블">
          <button class="btn sm primary" data-action="save" data-id="${bm.id}">저장</button>
          <button class="btn sm" data-action="cancel-edit">취소</button>
        </div>
      </li>` : ''}
    `).join('');
        // 이벤트 위임으로 버튼 클릭 처리
        ul.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn)
                return;
            const action = btn.dataset.action;
            const id = btn.dataset.id ?? '';
            if (action === 'link')
                this.onBookmarkLink(id);
            else if (action === 'edit')
                this.onBookmarkEditStart(id);
            else if (action === 'save')
                this.onBookmarkSave(id);
            else if (action === 'delete')
                this.onBookmarkDelete(id);
            else if (action === 'cancel-edit') {
                this.editingId = null;
                this.renderBookmarkList();
            }
        }, { once: true }); // re-rendered each time so remove old listener
    }
    onBookmarkLink(id) {
        const bm = this.bookmarks.find((b) => b.id === id);
        if (!bm)
            return;
        this.dispatch('poa-bookmark-link-insert', { bookmarkId: id, text: bm.label });
        this.close();
    }
    onBookmarkEditStart(id) {
        this.editingId = id;
        this.renderBookmarkList();
        this.shadow.getElementById('inp-bm-edit')?.focus();
    }
    onBookmarkSave(id) {
        const input = this.shadow.getElementById('inp-bm-edit');
        const label = input?.value.trim() ?? '';
        if (!label) {
            input?.focus();
            return;
        }
        this.dispatch('poa-bookmark-update', { id, label });
        this.editingId = null;
    }
    onBookmarkDelete(id) {
        this.dispatch('poa-bookmark-delete', { id });
    }
    buildDatetimePresets() {
        const container = this.shadow.getElementById('dt-presets');
        if (!container)
            return;
        container.innerHTML = DATETIME_PRESETS.map((p, i) => `
      <div class="dt-preset">
        <span class="dt-preview" id="dt-prev-${i}"></span>
        <span class="dt-format">${p.label}</span>
        <button class="btn sm primary" data-preset="${i}">삽입</button>
      </div>
    `).join('');
        // 현재 시각으로 미리보기 채우기
        this.refreshDatetimePreviews();
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-preset]');
            if (!btn)
                return;
            const idx = parseInt(btn.dataset.preset ?? '0');
            const text = DATETIME_PRESETS[idx]?.fn() ?? '';
            this.dispatch('poa-datetime-insert', { text });
            this.close();
        });
    }
    refreshDatetimePreviews() {
        DATETIME_PRESETS.forEach((p, i) => {
            const el = this.shadow.getElementById(`dt-prev-${i}`);
            if (el)
                el.textContent = p.fn();
        });
    }
    dispatch(type, detail) {
        this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
    }
}
