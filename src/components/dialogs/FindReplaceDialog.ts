const CSS = `
:host {
  display: block;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.2s ease, opacity 0.15s ease;
}
:host([open]) {
  max-height: 200px;
  opacity: 1;
}
.bar {
  background: #F0F7FF;
  border-bottom: 1px solid #BFDBFE;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-btn {
  width: 28px; height: 28px; flex-shrink: 0;
  border: 1px solid #D1D5DB; border-radius: 5px;
  background: #FFFFFF; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; color: #374151;
  transition: background 0.1s;
}
.icon-btn:hover { background: #F3F4F6; }
.icon-btn.active {
  background: #EFF6FF; border-color: #93C5FD; color: #2563EB;
}
input[type=text] {
  height: 28px;
  border: 1px solid #93C5FD; border-radius: 5px;
  padding: 0 8px; font-size: 13px;
  background: #FFFFFF; flex: 1; max-width: 320px;
  outline: none; box-sizing: border-box;
  transition: border-color 0.1s;
}
input[type=text]:focus { border-color: #2563EB; }
.count {
  font-size: 12px; color: #6B7280;
  min-width: 32px; text-align: center;
  flex-shrink: 0; white-space: nowrap;
}
.count.empty { color: #DC2626; }
.nav-btn {
  width: 28px; height: 28px; flex-shrink: 0;
  border: 1px solid #D1D5DB; border-radius: 5px;
  background: #FFFFFF; cursor: pointer; font-size: 12px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.1s;
}
.nav-btn:hover { background: #F3F4F6; }
.close-btn {
  width: 28px; height: 28px; flex-shrink: 0;
  border: none; background: transparent; cursor: pointer;
  font-size: 16px; color: #6B7280;
  display: inline-flex; align-items: center; justify-content: center;
  transition: color 0.1s;
}
.close-btn:hover { color: #111827; }
.replace-row { display: none; }
:host([replace]) .replace-row { display: flex; }
.btn-replace {
  height: 28px; padding: 0 12px;
  background: #FFFFFF; border: 1px solid #2563EB;
  color: #2563EB; border-radius: 5px; cursor: pointer;
  font-size: 12px; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace:hover { background: #EFF6FF; }
.btn-replace-all {
  height: 28px; padding: 0 12px;
  background: #2563EB; color: #FFFFFF;
  border: none; border-radius: 5px; cursor: pointer;
  font-size: 12px; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace-all:hover { background: #1D4ED8; }
.opts-row {
  display: flex; align-items: center; gap: 12px;
  padding-left: 36px;
}
.opts-row label {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: #4B5563; cursor: pointer;
  user-select: none; -webkit-user-select: none;
}
`;

const HTML = `
<div class="bar" role="search" aria-label="찾기/바꾸기">
  <div class="row">
    <button class="icon-btn" id="btn-toggle" title="찾기/바꾸기 전환" aria-pressed="false">🔍</button>
    <input type="text" id="inp-find" placeholder="찾을 내용" autocomplete="off" aria-label="찾을 내용">
    <span class="count" id="count-label" aria-live="polite"></span>
    <button class="nav-btn" id="btn-prev" title="이전 (Shift+Enter)">∧</button>
    <button class="nav-btn" id="btn-next" title="다음 (Enter)">∨</button>
    <button class="close-btn" id="btn-close" title="닫기 (Esc)">✕</button>
  </div>
  <div class="row replace-row">
    <button class="icon-btn active" id="btn-replace-icon" title="바꾸기 모드">↔</button>
    <input type="text" id="inp-replace" placeholder="바꿀 내용" autocomplete="off" aria-label="바꿀 내용">
    <button class="btn-replace" id="btn-replace">바꾸기</button>
    <button class="btn-replace-all" id="btn-replace-all">모두 바꾸기</button>
  </div>
  <div class="opts-row">
    <label><input type="checkbox" id="chk-case"> 대소문자 구분</label>
    <label><input type="checkbox" id="chk-word"> 전체 단어 일치</label>
  </div>
</div>
`;

/**
 * <poa-find-replace-dialog> — 서식 툴바 아래 인라인 슬라이드 찾기/바꾸기 바.
 *
 * Ctrl+F → open('find'), Ctrl+H → open('replace')
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
   * @param mode 'find' = 찾기만 표시, 'replace' = 바꾸기 행도 표시
   */
  open(mode: 'find' | 'replace' = 'find'): void {
    this.setAttribute('open', '');
    const isReplace = mode === 'replace';
    if (isReplace) {
      this.setAttribute('replace', '');
    } else {
      this.removeAttribute('replace');
    }
    this.updateToggleBtn(isReplace);
    // 애니메이션 시작 후 포커스
    setTimeout(() => {
      (this.shadow.getElementById('inp-find') as HTMLInputElement | null)?.focus();
    }, 50);
  }

  close(): void {
    this.removeAttribute('open');
    this.removeAttribute('replace');
    this.updateToggleBtn(false);
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.dispatch('find-clear', {});
  }

  /** FindReplace.find() 결과를 받아 카운트 표시를 갱신한다 */
  updateResult(count: number, current: number): void {
    const label = this.shadow.getElementById('count-label');
    if (!label) return;
    if (count === 0) {
      label.textContent = '0/0';
      label.className = 'count empty';
    } else {
      label.textContent = `${current + 1}/${count}`;
      label.className = 'count';
    }
  }

  private updateToggleBtn(replaceMode: boolean): void {
    const btn = this.shadow.getElementById('btn-toggle') as HTMLButtonElement | null;
    if (!btn) return;
    btn.textContent = replaceMode ? '↔' : '🔍';
    btn.classList.toggle('active', replaceMode);
    btn.setAttribute('aria-pressed', String(replaceMode));
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
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
      }
      this.dispatch('find-search', getOpts());
    };

    s.getElementById('btn-close')?.addEventListener('click', () => this.close());

    s.getElementById('btn-toggle')?.addEventListener('click', () => {
      const isReplace = this.hasAttribute('replace');
      if (isReplace) {
        this.removeAttribute('replace');
        this.updateToggleBtn(false);
      } else {
        this.setAttribute('replace', '');
        this.updateToggleBtn(true);
      }
    });

    findInput.addEventListener('input', scheduleSearch);

    findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        flushSearch();
        if (e.shiftKey) {
          this.dispatch('find-prev', {});
        } else {
          this.dispatch('find-next', {});
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });

    caseChk.addEventListener('change', scheduleSearch);
    wordChk.addEventListener('change', scheduleSearch);

    s.getElementById('btn-prev')?.addEventListener('click', () => {
      flushSearch();
      this.dispatch('find-prev', {});
    });
    s.getElementById('btn-next')?.addEventListener('click', () => {
      flushSearch();
      this.dispatch('find-next', {});
    });

    replaceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); this.close(); }
    });

    s.getElementById('btn-replace')?.addEventListener('click', () =>
      this.dispatch('find-replace', { replacement: replaceInput.value }));

    s.getElementById('btn-replace-all')?.addEventListener('click', () =>
      this.dispatch('find-replace-all', {
        ...getOpts(),
        replacement: replaceInput.value,
      }));
  }

  private dispatch(type: string, detail: object): void {
    this.dispatchEvent(
      new CustomEvent(`poa-${type}`, { bubbles: true, composed: true, detail }),
    );
  }
}
