const LEVEL_ICON = {
    error: '●',
    warning: '▲',
    info: 'ℹ',
};
const LEVEL_COLOR = {
    error: '#DC2626',
    warning: '#D97706',
    info: '#2563EB',
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
  background: #FFFFFF;
  border-radius: 10px;
  width: 580px; max-width: 96vw;
  max-height: 82vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: dlgIn 0.15s ease;
}
@keyframes dlgIn {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

/* ── 헤더 ── */
.header {
  background: #1F2937; color: #FFFFFF;
  padding: 14px 20px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { margin: 0; font-size: 15px; font-weight: 600; }
.close-btn {
  width: 28px; height: 28px; border: none; background: transparent;
  color: #9CA3AF; font-size: 18px; cursor: pointer; border-radius: 5px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.1s, color 0.1s;
}
.close-btn:hover { background: rgba(255,255,255,0.1); color: #FFFFFF; }

/* ── 요약 바 ── */
.summary-bar {
  display: flex; gap: 8px; padding: 12px 16px;
  background: #F9FAFB; border-bottom: 1px solid #E5E7EB;
  flex-shrink: 0;
}
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
}
.badge-error   { background: #FEE2E2; color: #DC2626; }
.badge-warning { background: #FEF3C7; color: #D97706; }
.badge-info    { background: #EFF6FF; color: #2563EB; }
.badge-pass    { background: #DCFCE7; color: #16A34A; }

/* ── 툴바 ── */
.toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
}
.filter-select {
  height: 30px; padding: 0 8px; border: 1px solid #D1D5DB; border-radius: 6px;
  background: #FFFFFF; font-size: 13px; cursor: pointer; outline: none;
}
.btn-fix-all {
  height: 30px; padding: 0 14px;
  background: #1F2937; color: #FFFFFF; border: none;
  border-radius: 6px; font-size: 13px; cursor: pointer;
  transition: background 0.1s;
}
.btn-fix-all:hover { background: #374151; }
.btn-fix-all:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── 로딩 ── */
.loading {
  display: none; flex-direction: column; align-items: center;
  justify-content: center; gap: 12px; padding: 40px;
  color: #6B7280; font-size: 14px;
}
:host([loading]) .loading  { display: flex; }
:host([loading]) .issue-list { display: none; }

/* ── 이슈 목록 ── */
.issue-list { overflow-y: auto; flex: 1; }

.issue-card {
  border-bottom: 1px solid #F3F4F6;
}
.issue-card[hidden] { display: none; }

.issue-header {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px; cursor: pointer;
  border-left: 4px solid #E5E7EB;
  transition: background 0.1s;
  user-select: none;
}
.issue-header:hover { background: #F9FAFB; }

.issue-card[data-level="error"]   .issue-header { border-left-color: #DC2626; }
.issue-card[data-level="warning"] .issue-header { border-left-color: #D97706; }
.issue-card[data-level="info"]    .issue-header { border-left-color: #2563EB; }

.issue-icon  { font-size: 13px; flex-shrink: 0; }
.issue-title { font-size: 13px; font-weight: 500; color: #111827; flex: 1; }
.issue-arrow { color: #9CA3AF; font-size: 11px; flex-shrink: 0; transition: transform 0.15s; }
.issue-card.expanded .issue-arrow { transform: rotate(180deg); }

.issue-body {
  display: none; padding: 0 16px 12px 30px;
}
.issue-card.expanded .issue-body { display: block; }

.issue-message {
  font-size: 12px; color: #6B7280; margin: 0 0 10px;
  font-family: 'Courier New', monospace; word-break: break-all;
}
.issue-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.btn {
  height: 26px; padding: 0 12px; font-size: 12px; font-weight: 500;
  border-radius: 5px; cursor: pointer; transition: background 0.1s;
}
.btn-nav {
  background: #FFFFFF; border: 1px solid #D1D5DB; color: #374151;
}
.btn-nav:hover { background: #F9FAFB; }
.btn-fix {
  background: #EFF6FF; border: 1px solid #BFDBFE; color: #2563EB;
}
.btn-fix:hover { background: #DBEAFE; }

/* ── 인라인 수정 패널 ── */
.fix-panel {
  display: none; margin-top: 10px; padding: 12px;
  background: #F9FAFB; border-radius: 6px; border: 1px solid #E5E7EB;
}
.fix-panel.open { display: block; }
.fix-panel label {
  display: block; font-size: 12px; color: #374151; margin-bottom: 6px;
}
.fix-input {
  width: 100%; height: 30px; padding: 0 8px;
  border: 1px solid #CBD5E1; border-radius: 5px;
  font-size: 13px; outline: none;
  transition: border-color 0.12s;
}
.fix-input:focus { border-color: #3B82F6; }
.fix-row { display: flex; gap: 8px; margin-top: 8px; }
.btn-apply {
  height: 28px; padding: 0 14px;
  background: #2563EB; color: #FFFFFF; border: none;
  border-radius: 5px; font-size: 12px; font-weight: 500; cursor: pointer;
  transition: background 0.1s;
}
.btn-apply:hover { background: #1D4ED8; }
.btn-auto-fix {
  height: 28px; padding: 0 14px;
  background: #16A34A; color: #FFFFFF; border: none;
  border-radius: 5px; font-size: 12px; font-weight: 500; cursor: pointer;
  transition: background 0.1s;
}
.btn-auto-fix:hover { background: #15803D; }
.no-fix-msg { font-size: 12px; color: #9CA3AF; }

/* ── 결과 없음 ── */
.empty {
  display: none; padding: 32px; text-align: center;
  color: #6B7280; font-size: 14px;
}
.empty-icon { font-size: 32px; margin-bottom: 8px; }
`;
/**
 * <poa-accessibility-dialog> — WCAG 2.2 접근성 검사 결과 다이얼로그.
 *
 * 사용:
 *   dialog.setup(contentEl, rerunFn);
 *   dialog.show(result);
 */
export class PoaAccessibilityDialog extends HTMLElement {
    shadow;
    issues = [];
    contentEl = null;
    rerunFn = null;
    currentFilter = 'all';
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog">
    <div class="header">
      <h2>웹 접근성 검사 결과</h2>
      <button class="close-btn" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="summary-bar" id="summary-bar"></div>
    <div class="toolbar">
      <select class="filter-select" id="filter-select">
        <option value="all">전체</option>
        <option value="error">오류만</option>
        <option value="warning">경고만</option>
        <option value="info">정보만</option>
      </select>
      <button class="btn-fix-all" id="btn-fix-all">모두 수정</button>
    </div>
    <div class="loading" id="loading">
      <div>⏳</div>
      <div>접근성 검사 중...</div>
    </div>
    <div class="issue-list" id="issue-list"></div>
  </div>
</div>`;
        this.bindEvents();
    }
    /** 에디터 contentEl과 재검사 콜백을 연결한다. */
    setup(contentEl, rerunFn) {
        this.contentEl = contentEl;
        this.rerunFn = rerunFn;
    }
    /** 로딩 인디케이터를 표시하고 다이얼로그를 연다. */
    startLoading() {
        this.setAttribute('open', '');
        this.setAttribute('loading', '');
    }
    /** 검사 결과를 표시한다. */
    show(result) {
        this.issues = result.issues;
        this.currentFilter = 'all';
        this.setAttribute('open', '');
        this.removeAttribute('loading');
        this.renderSummary(result);
        this.renderIssues();
        this.syncFilterSelect();
    }
    close() {
        this.removeAttribute('open');
        this.removeAttribute('loading');
    }
    // ── 렌더링 ─────────────────────────────────────────────────────────────────
    renderSummary(result) {
        const bar = this.shadow.getElementById('summary-bar');
        if (!bar)
            return;
        if (result.errorCount === 0 && result.warningCount === 0 && result.infoCount === 0) {
            bar.innerHTML = `<span class="badge badge-pass">✓ 문제 없음</span>`;
            return;
        }
        bar.innerHTML = [
            result.errorCount > 0 ? `<span class="badge badge-error">   ${LEVEL_ICON.error}   오류 ${result.errorCount}개</span>` : '',
            result.warningCount > 0 ? `<span class="badge badge-warning">${LEVEL_ICON.warning} 경고 ${result.warningCount}개</span>` : '',
            result.infoCount > 0 ? `<span class="badge badge-info">   ${LEVEL_ICON.info}   정보 ${result.infoCount}개</span>` : '',
        ].join('');
    }
    renderIssues() {
        const list = this.shadow.getElementById('issue-list');
        if (!list)
            return;
        const fixAllBtn = this.shadow.getElementById('btn-fix-all');
        const hasAutoFix = this.issues.some(i => i.autoFix);
        if (fixAllBtn)
            fixAllBtn.disabled = !hasAutoFix;
        if (this.issues.length === 0) {
            list.innerHTML = `<div class="empty" style="display:block">
        <div class="empty-icon">✅</div>
        <div>접근성 문제가 없습니다!</div>
      </div>`;
            return;
        }
        list.innerHTML = this.issues.map((issue, idx) => this.renderCard(issue, idx)).join('');
        this.applyFilter();
        this.bindCardEvents();
    }
    renderCard(issue, idx) {
        const color = LEVEL_COLOR[issue.level];
        const icon = LEVEL_ICON[issue.level];
        const fixPanel = this.buildFixPanelHTML(issue, idx);
        return `
<div class="issue-card" data-level="${issue.level}" data-idx="${idx}">
  <div class="issue-header">
    <span class="issue-icon" style="color:${color}">${icon}</span>
    <span class="issue-title">${escHtml(issue.title)}</span>
    <span class="issue-arrow">∨</span>
  </div>
  <div class="issue-body">
    <p class="issue-message">${escHtml(issue.message)}</p>
    <div class="issue-actions">
      ${issue.element ? `<button class="btn btn-nav" data-idx="${idx}">해당 요소로 이동</button>` : ''}
      <button class="btn btn-fix" data-idx="${idx}">직접 수정</button>
    </div>
    <div class="fix-panel" id="fp-${idx}">${fixPanel}</div>
  </div>
</div>`;
    }
    buildFixPanelHTML(issue, idx) {
        if (issue.id === 'img-alt-missing' || issue.id === 'img-alt-empty') {
            return `<label>alt 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${idx}" placeholder="이미지 설명 입력">
          <button class="btn-apply" data-idx="${idx}" data-action="set-alt">적용</button>
        </div>`;
        }
        if (issue.id === 'table-caption-missing') {
            return `<label>표 캡션</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${idx}" placeholder="표 제목 입력">
          <button class="btn-apply" data-idx="${idx}" data-action="set-caption">적용</button>
        </div>`;
        }
        if (issue.id === 'link-vague-text' || issue.id === 'link-no-text') {
            return `<label>링크 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${idx}" placeholder="링크 설명 입력">
          <button class="btn-apply" data-idx="${idx}" data-action="set-link-text">적용</button>
        </div>`;
        }
        if (issue.autoFix) {
            return `<button class="btn-auto-fix" data-idx="${idx}" data-action="auto-fix">자동 수정</button>`;
        }
        return `<span class="no-fix-msg">자동 수정을 지원하지 않습니다.</span>`;
    }
    // ── 이벤트 ─────────────────────────────────────────────────────────────────
    bindEvents() {
        this.shadow.getElementById('btn-close')?.addEventListener('click', () => this.close());
        this.shadow.getElementById('overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'overlay')
                this.close();
        });
        this.shadow.getElementById('filter-select')?.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.applyFilter();
        });
        this.shadow.getElementById('btn-fix-all')?.addEventListener('click', () => this.doFixAll());
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
            }
        });
    }
    bindCardEvents() {
        const list = this.shadow.getElementById('issue-list');
        if (!list)
            return;
        list.addEventListener('click', (e) => {
            const target = e.target;
            // accordion 헤더 토글
            const header = target.closest('.issue-header');
            if (header) {
                header.closest('.issue-card')?.classList.toggle('expanded');
                return;
            }
            // 해당 요소로 이동
            const navBtn = target.closest('.btn-nav');
            if (navBtn) {
                const idx = parseInt(navBtn.dataset.idx ?? '-1');
                this.navigateTo(this.issues[idx]?.element ?? null);
                return;
            }
            // 직접 수정 패널 토글
            const fixBtn = target.closest('.btn-fix');
            if (fixBtn) {
                const idx = fixBtn.dataset.idx;
                const panel = this.shadow.getElementById(`fp-${idx}`);
                panel?.classList.toggle('open');
                return;
            }
            // 적용 (set-alt / set-caption / set-link-text)
            const applyBtn = target.closest('.btn-apply');
            if (applyBtn) {
                const idx = parseInt(applyBtn.dataset.idx ?? '-1');
                const action = applyBtn.dataset.action ?? '';
                const inp = this.shadow.getElementById(`fi-${idx}`);
                const val = inp?.value.trim() ?? '';
                this.applyFix(idx, action, val);
                return;
            }
            // 자동 수정
            const autoBtn = target.closest('[data-action="auto-fix"]');
            if (autoBtn) {
                const idx = parseInt(autoBtn.dataset.idx ?? '-1');
                this.applyFix(idx, 'auto-fix', '');
            }
        });
    }
    navigateTo(el) {
        if (!el || !this.contentEl)
            return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.outline = '3px solid #F59E0B';
        el.style.outlineOffset = '2px';
        setTimeout(() => {
            el.style.outline = '';
            el.style.outlineOffset = '';
        }, 2000);
    }
    applyFix(idx, action, value) {
        const issue = this.issues[idx];
        if (!issue)
            return;
        switch (action) {
            case 'set-alt':
                issue.element?.setAttribute('alt', value || '이미지');
                break;
            case 'set-caption': {
                const table = issue.element;
                if (table) {
                    let cap = table.querySelector('caption');
                    if (!cap) {
                        cap = table.ownerDocument.createElement('caption');
                        table.prepend(cap);
                    }
                    cap.textContent = value || '표';
                }
                break;
            }
            case 'set-link-text':
                if (issue.element)
                    issue.element.textContent = value;
                break;
            case 'auto-fix':
                issue.autoFix?.();
                break;
        }
        this.rerunFn?.();
    }
    doFixAll() {
        const visible = this.currentFilter === 'all'
            ? this.issues
            : this.issues.filter(i => i.level === this.currentFilter);
        visible.forEach(i => i.autoFix?.());
        this.rerunFn?.();
    }
    applyFilter() {
        const cards = this.shadow.querySelectorAll('.issue-card');
        cards.forEach(card => {
            const level = card.dataset.level;
            card.hidden = this.currentFilter !== 'all' && level !== this.currentFilter;
        });
    }
    syncFilterSelect() {
        const sel = this.shadow.getElementById('filter-select');
        if (sel)
            sel.value = 'all';
    }
}
function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
