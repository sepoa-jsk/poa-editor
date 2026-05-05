const CSS = `
/* ── 호스트 슬라이드 애니메이션 ── */
:host {
  display: block;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.2s ease, opacity 0.15s ease;
}
:host([open]) {
  max-height: 125px;   /* find-only 높이 */
  opacity: 1;
}
:host([open][replace]) {
  max-height: 165px;   /* find + replace 높이 */
}

/* ── 전체 바 ── */
.bar {
  background: #FAFBFF;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ── 탭 행 ── */
.tab-row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 12px;
  background: #FAFBFF;
}
.tab {
  padding: 6px 14px;
  font-size: 13px; font-weight: 500;
  color: #6B7280;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color 0.12s, background 0.12s;
  border-radius: 4px 4px 0 0;
}
.tab:hover {
  color: #374151;
  background: #F3F4F6;
}
.tab.active {
  color: #2563EB;
  border-bottom-color: #2563EB;
}

/* ── 바디 (탭 아래) ── */
.body {
  padding: 5px 12px 7px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #DBEAFE;
}

/* ── 공통 행 ── */
.row {
  display: flex;
  align-items: center;
  gap: 7px;
}

/* ── 바꾸기 행 슬라이드 (grid 애니메이션) ── */
.replace-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}
:host([replace]) .replace-wrap {
  grid-template-rows: 1fr;
}
.replace-row {
  overflow: hidden;
  min-height: 0;
  /* grid-item이므로 gap은 부모 grid에서 제어되지 않음 — 위 margin으로 보정 */
  padding-top: 4px;
}

/* ── 라벨 (바꾸기 탭에서만 표시) ── */
.lbl {
  font-size: 12px; color: #6B7280;
  width: 44px; flex-shrink: 0;
  display: none;
}
:host([replace]) .lbl {
  display: inline-flex;
  align-items: center;
}

/* ── 입력란 ── */
input[type=text] {
  height: 30px;
  border: 1px solid #CBD5E1; border-radius: 6px;
  padding: 0 10px; font-size: 13px;
  background: #FFFFFF; flex: 1; max-width: 400px;
  outline: none; box-sizing: border-box;
  transition: border-color 0.12s, box-shadow 0.12s;
}
input[type=text]:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
input[type=text].no-match {
  border-color: #FCA5A5;
  background: #FFF5F5;
}

/* ── 매치 카운터 ── */
.count {
  font-size: 12px; color: #94A3B8;
  min-width: 36px; text-align: center;
  flex-shrink: 0; white-space: nowrap;
}
.count.empty { color: #EF4444; }

/* ── 이전/다음 버튼 ── */
.nav-btn {
  width: 26px; height: 26px; flex-shrink: 0;
  border: 1px solid #E2E8F0; border-radius: 5px;
  background: #FFFFFF; cursor: pointer;
  color: #475569; font-size: 11px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.1s, border-color 0.1s;
}
.nav-btn:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

/* ── 닫기 버튼 ── */
.close-btn {
  width: 26px; height: 26px; flex-shrink: 0;
  border: none; background: transparent; cursor: pointer;
  color: #94A3B8; font-size: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 5px;
  transition: color 0.1s, background 0.1s;
}
.close-btn:hover {
  color: #EF4444;
  background: #FEE2E2;
}

/* ── 바꾸기 버튼 ── */
.btn-replace {
  height: 28px; padding: 0 14px;
  background: #FFFFFF; border: 1px solid #3B82F6;
  color: #3B82F6; border-radius: 6px; cursor: pointer;
  font-size: 12px; font-weight: 500; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace:hover { background: #EFF6FF; }

/* ── 모두 바꾸기 버튼 ── */
.btn-replace-all {
  height: 28px; padding: 0 14px;
  background: #3B82F6; color: #FFFFFF;
  border: none; border-radius: 6px; cursor: pointer;
  font-size: 12px; font-weight: 500; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace-all:hover { background: #2563EB; }

/* ── 옵션 행 ── */
.opts-row {
  display: flex; align-items: center; gap: 16px;
  padding: 2px 0;
}
.opts-row label {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: #64748B; cursor: pointer;
  user-select: none; -webkit-user-select: none;
}
.opts-row input[type=checkbox] {
  width: 14px; height: 14px; flex-shrink: 0;
  border-radius: 3px; cursor: pointer;
  accent-color: #3B82F6;
}
`;

const HTML = `
<div class="bar">
  <div class="tab-row">
    <button class="tab active" id="tab-find">찾기</button>
    <button class="tab"        id="tab-replace">바꾸기</button>
  </div>
  <div class="body">
    <div class="row">
      <span class="lbl" id="lbl-find">찾기</span>
      <input type="text" id="inp-find" placeholder="찾을 내용" autocomplete="off" aria-label="찾을 내용">
      <span class="count" id="count-label" aria-live="polite"></span>
      <button class="nav-btn" id="btn-prev" title="이전 (Shift+Enter)">∧</button>
      <button class="nav-btn" id="btn-next" title="다음 (Enter)">∨</button>
      <button class="close-btn" id="btn-close" title="닫기 (Esc)">✕</button>
    </div>
    <div class="replace-wrap">
      <div class="replace-row">
        <div class="row">
          <span class="lbl">바꾸기</span>
          <input type="text" id="inp-replace" placeholder="바꿀 내용" autocomplete="off" aria-label="바꿀 내용">
          <button class="btn-replace"     id="btn-replace">바꾸기</button>
          <button class="btn-replace-all" id="btn-replace-all">모두 바꾸기</button>
        </div>
      </div>
    </div>
    <div class="opts-row">
      <label><input type="checkbox" id="chk-case"> 대소문자 구분</label>
      <label><input type="checkbox" id="chk-word"> 전체 단어 일치</label>
    </div>
  </div>
</div>
`;

/**
 * <poa-find-replace-dialog> — 서식 툴바 아래 인라인 슬라이드 찾기/바꾸기 바.
 *
 * - Ctrl+F → open('find'), Ctrl+H → open('replace')
 * - 탭 클릭으로 찾기 ↔ 바꾸기 전환 (grid 슬라이드 애니메이션)
 *
 * 발송 이벤트 (bubbles + composed):
 *   poa-find-search    { query, caseSensitive, wholeWord }
 *   poa-find-next      {}
 *   poa-find-prev      {}
 *   poa-find-replace   { replacement }
 *   poa-find-replace-all { query, replacement, caseSensitive, wholeWord }
 *   poa-find-clear     {}
 */
export class PoaFindReplaceDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>${HTML}`;
    this.bindEvents();
  }

  /**
   * 찾기/바꾸기 바를 열고 입력란에 포커스를 준다.
   * @param mode 'find' | 'replace' — 탭 초기 선택
   */
  open(mode: 'find' | 'replace' = 'find'): void {
    this.setAttribute('open', '');
    this.setMode(mode);
    setTimeout(() => {
      (this.shadow.getElementById('inp-find') as HTMLInputElement | null)?.focus();
    }, 50);
  }

  close(): void {
    this.removeAttribute('open');
    this.removeAttribute('replace');
    this.updateTabUI(false);
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.clearInputState();
    this.dispatch('find-clear', {});
  }

  /** FindReplace.find() 결과를 받아 카운트 및 입력란 상태를 갱신 */
  updateResult(count: number, current: number): void {
    const label    = this.shadow.getElementById('count-label');
    const findInp  = this.shadow.getElementById('inp-find') as HTMLInputElement | null;
    if (!label) return;

    const hasQuery = (findInp?.value.trim().length ?? 0) > 0;
    if (!hasQuery) {
      label.textContent = '';
      label.className = 'count';
      findInp?.classList.remove('no-match');
      return;
    }
    if (count === 0) {
      label.textContent = '0 / 0';
      label.className = 'count empty';
      findInp?.classList.add('no-match');
    } else {
      label.textContent = `${current + 1} / ${count}`;
      label.className = 'count';
      findInp?.classList.remove('no-match');
    }
  }

  // ── 내부 ────────────────────────────────────────────────

  private setMode(mode: 'find' | 'replace'): void {
    const isReplace = mode === 'replace';
    if (isReplace) {
      this.setAttribute('replace', '');
    } else {
      this.removeAttribute('replace');
    }
    this.updateTabUI(isReplace);
  }

  private updateTabUI(replaceMode: boolean): void {
    const s = this.shadow;
    s.getElementById('tab-find')?.classList.toggle('active', !replaceMode);
    s.getElementById('tab-replace')?.classList.toggle('active', replaceMode);
  }

  private clearInputState(): void {
    const findInp = this.shadow.getElementById('inp-find') as HTMLInputElement | null;
    const label   = this.shadow.getElementById('count-label');
    if (findInp) findInp.classList.remove('no-match');
    if (label) { label.textContent = ''; label.className = 'count'; }
  }

  private bindEvents(): void {
    const s = this.shadow;
    const findInput    = s.getElementById('inp-find')    as HTMLInputElement;
    const replaceInput = s.getElementById('inp-replace') as HTMLInputElement;
    const caseChk      = s.getElementById('chk-case')   as HTMLInputElement;
    const wordChk      = s.getElementById('chk-word')   as HTMLInputElement;

    const getOpts = () => ({
      query: findInput.value,
      caseSensitive: caseChk.checked,
      wholeWord: wordChk.checked,
    });

    const scheduleSearch = (): void => {
      if (this.debounceTimer !== null) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null;
        this.dispatch('find-search', getOpts());
      }, 300);
    };

    const flushSearch = (): void => {
      if (this.debounceTimer !== null) { clearTimeout(this.debounceTimer); this.debounceTimer = null; }
      this.dispatch('find-search', getOpts());
    };

    // 탭 전환
    s.getElementById('tab-find')?.addEventListener('click', () => this.setMode('find'));
    s.getElementById('tab-replace')?.addEventListener('click', () => this.setMode('replace'));

    // 닫기
    s.getElementById('btn-close')?.addEventListener('click', () => this.close());

    // 찾기 입력
    findInput.addEventListener('input', scheduleSearch);
    findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        flushSearch();
        e.shiftKey ? this.dispatch('find-prev', {}) : this.dispatch('find-next', {});
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    });

    // 옵션 체크박스
    caseChk.addEventListener('change', scheduleSearch);
    wordChk.addEventListener('change', scheduleSearch);

    // 이전/다음
    s.getElementById('btn-prev')?.addEventListener('click', () => { flushSearch(); this.dispatch('find-prev', {}); });
    s.getElementById('btn-next')?.addEventListener('click', () => { flushSearch(); this.dispatch('find-next', {}); });

    // 바꾸기 입력
    replaceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    });

    // 바꾸기 버튼
    s.getElementById('btn-replace')?.addEventListener('click', () =>
      this.dispatch('find-replace', { replacement: replaceInput.value }));
    s.getElementById('btn-replace-all')?.addEventListener('click', () =>
      this.dispatch('find-replace-all', { ...getOpts(), replacement: replaceInput.value }));
  }

  private dispatch(type: string, detail: object): void {
    this.dispatchEvent(new CustomEvent(`poa-${type}`, { bubbles: true, composed: true, detail }));
  }
}
