const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.panel {
  position: absolute; top: 48px; right: 12px; z-index: 200;
  background: #fff; border: 1px solid #ccc; border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,.18);
  padding: 12px 14px; width: 320px;
  font-size: 13px;
}
.row { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; }
.row:last-child { margin-bottom: 0; }
.row input[type=text] {
  flex: 1; padding: 5px 8px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none;
}
.row input[type=text]:focus { border-color: #1976d2; }
.row label { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #555; }
.count { font-size: 12px; color: #888; min-width: 48px; text-align: right; }
.btns { display: flex; gap: 5px; flex-wrap: wrap; }
.btns button {
  padding: 4px 10px; border: 1px solid #ccc; border-radius: 3px;
  background: #fff; cursor: pointer; font-size: 12px;
}
.btns button:hover { background: #f0f0f0; }
.btns button.primary {
  border-color: #1976d2; color: #1976d2;
}
.btns button.primary:hover { background: #e3f2fd; }
.close-btn {
  position: absolute; top: 8px; right: 10px;
  border: none; background: transparent; font-size: 16px;
  cursor: pointer; color: #888; line-height: 1; padding: 0;
}
.close-btn:hover { color: #333; }
.sep { border: none; border-top: 1px solid #eee; margin: 8px 0; }
`;

/**
 * <poa-find-replace-dialog> — 찾기/바꾸기 플로팅 패널.
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

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="panel" role="dialog" aria-label="찾기/바꾸기">
  <button class="close-btn" id="btn-close" title="닫기">×</button>
  <div class="row">
    <input type="text" id="inp-find" placeholder="찾을 내용" autocomplete="off">
    <span class="count" id="count-label"></span>
  </div>
  <div class="row">
    <label><input type="checkbox" id="chk-case"> 대소문자</label>
    <label><input type="checkbox" id="chk-word"> 전체 단어</label>
  </div>
  <div class="row btns">
    <button id="btn-prev">◀ 이전</button>
    <button id="btn-next">다음 ▶</button>
    <button class="primary" id="btn-search">찾기</button>
  </div>
  <hr class="sep">
  <div class="row">
    <input type="text" id="inp-replace" placeholder="바꿀 내용" autocomplete="off">
  </div>
  <div class="row btns">
    <button id="btn-replace">바꾸기</button>
    <button class="primary" id="btn-replace-all">모두 바꾸기</button>
  </div>
</div>`;

    this.bindEvents();
  }

  open(): void {
    this.setAttribute('open', '');
    this.shadow.getElementById('inp-find')?.focus();
  }

  close(): void {
    this.removeAttribute('open');
    this.dispatch('find-clear', {});
  }

  /** FindReplace.find() 결과를 받아 카운트 표시를 갱신 */
  updateResult(count: number, current: number): void {
    const label = this.shadow.getElementById('count-label');
    if (!label) return;
    label.textContent = count === 0 ? '없음' : `${current + 1} / ${count}`;
  }

  private bindEvents(): void {
    const s = this.shadow;
    s.getElementById('btn-close')?.addEventListener('click', () => this.close());

    const findInput    = s.getElementById('inp-find')    as HTMLInputElement;
    const replaceInput = s.getElementById('inp-replace') as HTMLInputElement;
    const caseChk      = s.getElementById('chk-case')   as HTMLInputElement;
    const wordChk      = s.getElementById('chk-word')   as HTMLInputElement;

    const getOpts = () => ({
      query: findInput.value,
      caseSensitive: caseChk.checked,
      wholeWord: wordChk.checked,
    });

    findInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.dispatch('find-search', getOpts());
      if (e.key === 'Escape') this.close();
    });

    s.getElementById('btn-search')?.addEventListener('click', () =>
      this.dispatch('find-search', getOpts()));

    s.getElementById('btn-next')?.addEventListener('click', () =>
      this.dispatch('find-next', {}));

    s.getElementById('btn-prev')?.addEventListener('click', () =>
      this.dispatch('find-prev', {}));

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
