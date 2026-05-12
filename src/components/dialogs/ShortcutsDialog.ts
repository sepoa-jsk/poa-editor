type ShortcutTab = '파일' | '편집' | '서식' | '표' | '보기';

interface Shortcut {
  keys: string[];
  note?: string;
  desc: string;
}

const SHORTCUTS: Record<ShortcutTab, Shortcut[]> = {
  '파일': [
    { keys: ['Ctrl', 'N'],           desc: '새 문서' },
    { keys: ['Ctrl', 'O'],           desc: '열기' },
    { keys: ['Ctrl', 'S'],           desc: '저장' },
    { keys: ['Ctrl', 'Shift', 'S'],  desc: '다른 이름으로 저장' },
    { keys: ['Ctrl', 'P'],           desc: '인쇄' },
  ],
  '편집': [
    { keys: ['Ctrl', 'Z'],           desc: '실행 취소' },
    { keys: ['Ctrl', 'Y'],           desc: '다시 실행' },
    { keys: ['Ctrl', 'X'],           desc: '잘라내기' },
    { keys: ['Ctrl', 'C'],           desc: '복사' },
    { keys: ['Ctrl', 'V'],           desc: '붙여넣기' },
    { keys: ['Ctrl', 'Shift', 'V'],  desc: '서식 없이 붙여넣기' },
    { keys: ['Ctrl', 'A'],           desc: '전체 선택' },
    { keys: ['Ctrl', 'F'],           desc: '찾기' },
    { keys: ['Ctrl', 'H'],           desc: '찾기·바꾸기' },
  ],
  '서식': [
    { keys: ['Ctrl', 'B'],           desc: '굵게' },
    { keys: ['Ctrl', 'I'],           desc: '기울임' },
    { keys: ['Ctrl', 'U'],           desc: '밑줄' },
    { keys: ['Ctrl', 'Shift', 'X'],  desc: '취소선' },
    { keys: ['Ctrl', 'L'],           desc: '왼쪽 정렬' },
    { keys: ['Ctrl', 'E'],           desc: '가운데 정렬' },
    { keys: ['Ctrl', 'R'],           desc: '오른쪽 정렬' },
    { keys: ['Ctrl', 'J'],           desc: '양쪽 정렬' },
  ],
  '표': [
    { keys: ['Tab'],                            desc: '다음 셀 이동' },
    { keys: ['Shift', 'Tab'],                   desc: '이전 셀 이동' },
    { keys: ['Tab'], note: '(마지막 셀)',       desc: '새 행 추가' },
  ],
  '보기': [
    { keys: ['F11'],              desc: '전체화면' },
    { keys: ['Ctrl', '+'],        desc: '확대' },
    { keys: ['Ctrl', '-'],        desc: '축소' },
    { keys: ['Ctrl', '0'],        desc: '100% 초기화' },
  ],
};

const SC_TABS: ShortcutTab[] = ['파일', '편집', '서식', '표', '보기'];

function buildKeyHtml(keys: string[], note?: string): string {
  const kbds = keys.map(k => `<kbd>${k}</kbd>`).join('<span class="plus">+</span>');
  return `${kbds}${note ? `<span class="sc-note">&nbsp;${note}</span>` : ''}`;
}

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
  width: 560px; max-width: 95vw; height: 480px; max-height: 90vh;
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

.tabs {
  display: flex; align-items: stretch; height: 36px;
  border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
  padding: 0 8px;
}

.tab-btn {
  font-size: 13px; color: #6B7280; padding: 0 16px;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  font-family: inherit; white-space: nowrap;
  transition: color .1s;
}
.tab-btn:hover { color: #374151; }
.tab-btn.active { color: #2563EB; border-bottom-color: #2563EB; font-weight: 600; }

.content { flex: 1; overflow-y: auto; }

.sc-row {
  display: flex; align-items: center; justify-content: space-between;
  height: 44px; padding: 0 20px;
  border-bottom: 1px solid #F9FAFB;
  transition: background .1s;
}
.sc-row:hover { background: #F9FAFB; }
.sc-row:last-child { border-bottom: none; }

.sc-keys { display: inline-flex; align-items: center; gap: 4px; }

kbd {
  font-family: 'Consolas', 'Monaco', monospace;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-bottom: 2px solid #D1D5DB;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px; color: #374151;
  display: inline-flex; align-items: center;
}

.plus { color: #9CA3AF; font-size: 11px; }

.sc-note { color: #9CA3AF; font-size: 11px; }

.sc-desc { font-size: 13px; color: #4B5563; }
`;

export class PoaShortcutsDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private activeTab: ShortcutTab = '파일';

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog">
    <div class="header">
      <span>단축키</span>
      <button class="close-btn" id="btn-close">✕</button>
    </div>
    <div class="tabs" id="tabs"></div>
    <div class="content" id="content"></div>
  </div>
</div>`;

    this.shadow.getElementById('btn-close')?.addEventListener('click', () => this._close());
    this.shadow.getElementById('backdrop')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'backdrop') this._close();
    });
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._close();
    });
    this.shadow.getElementById('tabs')?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-tab]');
      if (!btn) return;
      this.activeTab = btn.dataset.tab as ShortcutTab;
      this._renderTabs();
      this._renderContent();
    });
  }

  open(): void {
    this.activeTab = '파일';
    this.setAttribute('open', '');
    this._renderTabs();
    this._renderContent();
    requestAnimationFrame(() => this.shadow.getElementById('btn-close')?.focus());
  }

  private _renderTabs(): void {
    this.shadow.getElementById('tabs')!.innerHTML = SC_TABS
      .map(t => `<button class="tab-btn${t === this.activeTab ? ' active' : ''}" data-tab="${t}">${t}</button>`)
      .join('');
  }

  private _renderContent(): void {
    this.shadow.getElementById('content')!.innerHTML = SHORTCUTS[this.activeTab]
      .map(({ keys, note, desc }) => `
<div class="sc-row">
  <div class="sc-keys">${buildKeyHtml(keys, note)}</div>
  <span class="sc-desc">${desc}</span>
</div>`)
      .join('');
  }

  private _close(): void {
    this.removeAttribute('open');
  }
}
