import { PrivacyChecker } from '../../modules/privacy/PrivacyChecker.js';
const RISK_ICON = {
    'very-high': '🔴',
    'high': '🟠',
    'medium': '🟡',
};
const RISK_LABEL = {
    'very-high': '매우높음',
    'high': '높음',
    'medium': '중간',
};
const CSS = `
:host { display: none; }
:host([open]) { display: block; }

* { box-sizing: border-box; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dialog {
  background: #fff;
  border-radius: 8px;
  width: 520px; max-width: 96vw;
  max-height: 80vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  overflow: hidden;
}

.header {
  background: #1F2937;
  color: #fff;
  padding: 14px 18px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { margin: 0; font-size: 15px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; line-height: 1; padding: 2px 6px;
}
.header button:hover { color: #fff; }

.summary {
  padding: 12px 18px;
  background: #FFF7ED;
  border-bottom: 1px solid #FED7AA;
  font-size: 13px; color: #92400E;
  flex-shrink: 0;
}
.summary.clean {
  background: #F0FDF4; border-color: #86EFAC; color: #166534;
}

.toolbar {
  padding: 10px 18px;
  border-bottom: 1px solid #E5E7EB;
  display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.toolbar select {
  padding: 4px 8px; border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 12px; background: #fff; cursor: pointer;
}
.toolbar-spacer { flex: 1; }
.btn {
  padding: 5px 12px; border-radius: 4px; font-size: 12px;
  cursor: pointer; border: 1px solid #D1D5DB;
  background: #fff; color: #374151;
  white-space: nowrap;
}
.btn:hover { background: #F3F4F6; }
.btn.danger { background: #FEF2F2; border-color: #FCA5A5; color: #B91C1C; }
.btn.danger:hover { background: #FEE2E2; }
.btn.mask { background: #EFF6FF; border-color: #93C5FD; color: #1D4ED8; }
.btn.mask:hover { background: #DBEAFE; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.list {
  overflow-y: auto;
  flex: 1;
  padding: 8px 0;
}
.list::-webkit-scrollbar { width: 6px; }
.list::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.card {
  margin: 4px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  overflow: hidden;
}
.card[data-level="very-high"] { border-color: #FCA5A5; }
.card[data-level="high"]      { border-color: #FCD34D; }
.card[data-level="medium"]    { border-color: #93C5FD; }

.card-header {
  padding: 9px 12px;
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  user-select: none;
  background: #F9FAFB;
}
.card[data-level="very-high"] .card-header { background: #FFF5F5; }
.card[data-level="high"]      .card-header { background: #FFFBEB; }
.card-header:hover { filter: brightness(0.97); }

.card-icon { font-size: 14px; }
.card-label { font-size: 13px; font-weight: 600; color: #1F2937; flex: 1; }
.card-risk {
  font-size: 10px; padding: 2px 6px; border-radius: 10px;
  font-weight: 600;
}
.card[data-level="very-high"] .card-risk { background: #FEE2E2; color: #B91C1C; }
.card[data-level="high"]      .card-risk { background: #FEF3C7; color: #92400E; }
.card[data-level="medium"]    .card-risk { background: #EFF6FF; color: #1D4ED8; }
.card-toggle { font-size: 11px; color: #6B7280; }

.card-body {
  padding: 10px 14px;
  border-top: 1px solid #E5E7EB;
  background: #fff;
}
.card-body.hidden { display: none; }

.raw-text {
  font-family: 'Courier New', monospace;
  font-size: 12px; color: #DC2626;
  background: #FFF5F5; padding: 4px 8px;
  border-radius: 3px; margin-bottom: 6px;
  word-break: break-all;
}
.location { font-size: 11px; color: #6B7280; margin-bottom: 8px; }

.card-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.card-actions .btn { font-size: 11px; padding: 4px 10px; }

.empty {
  text-align: center; padding: 40px 20px;
  color: #6B7280; font-size: 13px;
}

.loading {
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px; gap: 10px; color: #6B7280; font-size: 13px;
}
.spinner {
  width: 20px; height: 20px;
  border: 2px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
`;
export class PoaPrivacyDialog extends HTMLElement {
    shadow;
    items = [];
    filteredType = 'all';
    onModified = null;
    onConfirmFn = null;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${CSS}</style><slot></slot>`;
    }
    /**
     * @param modifiedCb - 삭제/마스킹 후 Undo 스택 등록 콜백
     * @param confirmFn  - 확인 다이얼로그 (전체 삭제 시 사용)
     */
    setup(modifiedCb, confirmFn) {
        this.onModified = modifiedCb;
        this.onConfirmFn = confirmFn;
    }
    startLoading() {
        this.setAttribute('open', '');
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay">
  <div class="dialog">
    <div class="header">
      <h2>개인정보 검사</h2>
      <button id="btn-close">✕</button>
    </div>
    <div class="loading"><div class="spinner"></div>검사 중…</div>
  </div>
</div>`;
        this.shadow.getElementById('btn-close')?.addEventListener('click', () => this.close());
    }
    show(matches) {
        this.items = matches;
        this.filteredType = 'all';
        this.setAttribute('open', '');
        this.render();
    }
    close() {
        this.removeAttribute('open');
        this.items = [];
    }
    // ── 렌더 ─────────────────────────────────────────────────────────────────────
    render() {
        const typeOptions = this.buildTypeOptions();
        const visible = this.visibleMatches();
        const total = this.items.length;
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>개인정보 검사 결과</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="summary ${total === 0 ? 'clean' : ''}">
      ${total === 0
            ? '✅ 개인정보가 발견되지 않았습니다.'
            : `⚠ 총 <strong>${total}개</strong>의 개인정보가 발견됐습니다.`}
    </div>

    ${total > 0 ? `
    <div class="toolbar">
      <select id="filter-type">
        <option value="all">전체 (${total})</option>
        ${typeOptions}
      </select>
      <div class="toolbar-spacer"></div>
      <button class="btn danger" id="btn-delete-all">전체 삭제</button>
      <button class="btn mask"   id="btn-mask-all">전체 마스킹</button>
    </div>` : ''}

    <div class="list" id="list">
      ${total === 0
            ? '<div class="empty">검사할 내용이 없거나 개인정보가 없습니다.</div>'
            : visible.map(m => this.buildCard(m)).join('')}
    </div>
  </div>
</div>`;
        this.bindEvents();
    }
    buildTypeOptions() {
        const counts = new Map();
        for (const m of this.items) {
            counts.set(m.label, (counts.get(m.label) ?? 0) + 1);
        }
        return Array.from(counts.entries())
            .map(([label, cnt]) => `<option value="${label}">${label} (${cnt})</option>`)
            .join('');
    }
    buildCard(m) {
        return `
<div class="card" data-level="${m.riskLevel}" data-id="${m.id}">
  <div class="card-header" data-toggle="${m.id}">
    <span class="card-icon">${RISK_ICON[m.riskLevel]}</span>
    <span class="card-label">${m.label}</span>
    <span class="card-risk">${RISK_LABEL[m.riskLevel]}</span>
    <span class="card-toggle">∨</span>
  </div>
  <div class="card-body" id="body-${m.id}">
    <div class="raw-text">"${escapeHtml(m.raw)}"</div>
    <div class="location">위치: ${m.locationLabel}</div>
    <div class="card-actions">
      <button class="btn" data-action="navigate" data-id="${m.id}">이동</button>
      <button class="btn danger" data-action="delete" data-id="${m.id}">삭제</button>
      <button class="btn mask"   data-action="mask"   data-id="${m.id}">마스킹 (${escapeHtml(m.masked)})</button>
    </div>
  </div>
</div>`;
    }
    visibleMatches() {
        if (this.filteredType === 'all')
            return this.items;
        return this.items.filter(m => m.label === this.filteredType);
    }
    // ── 이벤트 바인딩 ─────────────────────────────────────────────────────────────
    bindEvents() {
        const sd = this.shadow;
        sd.getElementById('btn-close')?.addEventListener('click', () => this.close());
        // overlay 바깥 클릭 → 닫기 (dialog 클릭은 전파 차단)
        sd.getElementById('overlay')?.addEventListener('click', () => this.close());
        sd.getElementById('dialog')?.addEventListener('click', e => e.stopPropagation());
        // 필터 드롭다운
        sd.getElementById('filter-type')?.addEventListener('change', (e) => {
            this.filteredType = e.target.value;
            this.renderList();
        });
        // 전체 삭제
        sd.getElementById('btn-delete-all')?.addEventListener('click', async () => {
            const ok = await (this.onConfirmFn?.(`탐지된 ${this.visibleMatches().length}개 항목을 모두 삭제할까요?`) ?? Promise.resolve(true));
            if (!ok)
                return;
            PrivacyChecker.deleteAll(this.visibleMatches());
            this.items = this.items.filter(m => m.highlightEl !== null);
            this.onModified?.();
            this.render();
        });
        // 전체 마스킹
        sd.getElementById('btn-mask-all')?.addEventListener('click', () => {
            PrivacyChecker.maskAll(this.visibleMatches());
            this.items = this.items.filter(m => m.highlightEl !== null);
            this.onModified?.();
            this.render();
        });
        // 카드 아코디언 토글
        sd.querySelectorAll('[data-toggle]').forEach(header => {
            header.addEventListener('click', () => {
                const id = header.dataset.toggle;
                const body = sd.getElementById(`body-${id}`);
                const toggle = header.querySelector('.card-toggle');
                if (!body)
                    return;
                const expanded = !body.classList.contains('hidden');
                body.classList.toggle('hidden', expanded);
                if (toggle)
                    toggle.textContent = expanded ? '›' : '∨';
            });
        });
        // 개별 액션 위임
        sd.getElementById('list')?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn)
                return;
            const id = btn.dataset.id;
            const match = this.items.find(m => m.id === id);
            if (!match)
                return;
            const action = btn.dataset.action;
            if (action === 'navigate') {
                this.navigateTo(match);
            }
            else if (action === 'delete') {
                PrivacyChecker.deleteMatch(match);
                this.items = this.items.filter(m => m.id !== id);
                this.onModified?.();
                this.render();
            }
            else if (action === 'mask') {
                PrivacyChecker.maskMatch(match);
                this.items = this.items.filter(m => m.id !== id);
                this.onModified?.();
                this.render();
            }
        });
    }
    renderList() {
        const list = this.shadow.getElementById('list');
        if (!list)
            return;
        const visible = this.visibleMatches();
        list.innerHTML = visible.length === 0
            ? '<div class="empty">해당 유형의 항목이 없습니다.</div>'
            : visible.map(m => this.buildCard(m)).join('');
        // 이벤트 재바인딩 (list 내부만)
        list.querySelectorAll('[data-toggle]').forEach(header => {
            header.addEventListener('click', () => {
                const id = header.dataset.toggle;
                const body = this.shadow.getElementById(`body-${id}`);
                const toggle = header.querySelector('.card-toggle');
                if (!body)
                    return;
                const expanded = !body.classList.contains('hidden');
                body.classList.toggle('hidden', expanded);
                if (toggle)
                    toggle.textContent = expanded ? '›' : '∨';
            });
        });
    }
    navigateTo(match) {
        const el = match.highlightEl;
        if (!el)
            return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const prev = el.style.outline;
        el.style.outline = '2px solid #F59E0B';
        el.style.outlineOffset = '2px';
        setTimeout(() => {
            el.style.outline = prev;
            el.style.outlineOffset = '';
        }, 2000);
    }
}
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
