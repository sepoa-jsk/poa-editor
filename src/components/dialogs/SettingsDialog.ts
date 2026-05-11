export interface PoaSettings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  autoSaveEnabled: boolean;
  autoSaveInterval: number;
  spellCheck: boolean;
  changeWarning: boolean;
}

const SETTINGS_KEY = 'poa-settings';

const DEFAULTS: PoaSettings = {
  fontFamily: '맑은 고딕',
  fontSize: 11,
  lineHeight: 1.5,
  autoSaveEnabled: true,
  autoSaveInterval: 5,
  spellCheck: false,
  changeWarning: true,
};

export function loadSettings(): PoaSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<PoaSettings>) };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings(s: PoaSettings): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

const FONT_FAMILIES = [
  '맑은 고딕', '나눔고딕', '나눔명조', '굴림', '돋움', '바탕', '궁서',
  'Arial', 'Georgia', 'Times New Roman', 'Verdana',
];

const FONT_SIZES  = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32];
const LINE_HEIGHTS = [1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 2.5];
const SAVE_INTERVALS = [1, 2, 3, 5, 10, 15, 30];

const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 420px; max-width: 95vw; max-height: 85vh;
  display: flex; flex-direction: column;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #e8eaed;
  font-size: 15px; font-weight: 600; color: #1e293b;
  flex-shrink: 0;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #94a3b8; line-height: 1; padding: 0 4px;
}
.close-btn:hover { color: #334155; }
.body { flex: 1; overflow-y: auto; padding: 4px 0 8px; }
.section { padding: 12px 20px; }
.section + .section { border-top: 1px solid #f1f5f9; }
.section-title {
  font-size: 11px; font-weight: 600; color: #64748b;
  text-transform: uppercase; letter-spacing: .08em;
  margin: 0 0 12px;
}
.row {
  display: flex; align-items: center;
  justify-content: space-between;
  min-height: 32px; margin-bottom: 8px;
}
.row:last-child { margin-bottom: 0; }
.row-label {
  font-size: 13px; color: #334155;
}
.row-ctrl { display: flex; align-items: center; gap: 8px; }
select {
  padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px;
  font-size: 13px; color: #334155; background: #fff; cursor: pointer;
  outline: none;
}
select:focus { border-color: #3b82f6; }
.toggle {
  position: relative; display: inline-block;
  width: 36px; height: 20px; cursor: pointer;
}
.toggle input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; inset: 0;
  background: #cbd5e1; border-radius: 20px;
  transition: background .2s;
}
.slider::before {
  content: ''; position: absolute;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; top: 3px; left: 3px;
  transition: transform .2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}
input:checked + .slider { background: #3b82f6; }
input:checked + .slider::before { transform: translateX(16px); }
.footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 20px; border-top: 1px solid #e8eaed;
  flex-shrink: 0;
}
.btn {
  padding: 7px 18px; border-radius: 5px; font-size: 13px;
  cursor: pointer; border: 1px solid #cbd5e1; background: #fff; color: #334155;
}
.btn:hover { background: #f8fafc; }
.btn.primary {
  background: #3b82f6; border-color: #2563eb; color: #fff;
}
.btn.primary:hover { background: #2563eb; }
`;

function option(value: string, label: string, selected: boolean): string {
  return `<option value="${value}"${selected ? ' selected' : ''}>${label}</option>`;
}

export class PoaSettingsDialog extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="환경설정">
    <div class="header">
      <span>환경설정</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="body">
      <div class="section">
        <p class="section-title">편집기 글꼴</p>
        <div class="row">
          <span class="row-label">글꼴</span>
          <div class="row-ctrl">
            <select id="sel-font-family">${FONT_FAMILIES.map(f => option(f, f, false)).join('')}</select>
          </div>
        </div>
        <div class="row">
          <span class="row-label">글자 크기</span>
          <div class="row-ctrl">
            <select id="sel-font-size">${FONT_SIZES.map(n => option(String(n), `${n}pt`, false)).join('')}</select>
          </div>
        </div>
        <div class="row">
          <span class="row-label">줄 간격</span>
          <div class="row-ctrl">
            <select id="sel-line-height">${LINE_HEIGHTS.map(n => option(String(n), String(n), false)).join('')}</select>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="section-title">자동저장</p>
        <div class="row">
          <span class="row-label">자동저장 사용</span>
          <label class="toggle">
            <input type="checkbox" id="chk-autosave">
            <span class="slider"></span>
          </label>
        </div>
        <div class="row" id="row-interval">
          <span class="row-label">저장 주기</span>
          <div class="row-ctrl">
            <select id="sel-interval">${SAVE_INTERVALS.map(n => option(String(n), `${n}분`, false)).join('')}</select>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="section-title">편집 옵션</p>
        <div class="row">
          <span class="row-label">맞춤법 검사</span>
          <label class="toggle">
            <input type="checkbox" id="chk-spellcheck">
            <span class="slider"></span>
          </label>
        </div>
        <div class="row">
          <span class="row-label">닫기 전 변경 경고</span>
          <label class="toggle">
            <input type="checkbox" id="chk-change-warning">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-save">저장</button>
    </div>
  </div>
</div>`;

    this.bindEvents();
  }

  show(): void {
    this.populateForm(loadSettings());
    this.setAttribute('open', '');
    this.shadow.getElementById('btn-save')?.focus();
  }

  close(): void {
    this.removeAttribute('open');
  }

  private populateForm(s: PoaSettings): void {
    const sh = this.shadow;
    const setSelect = (id: string, val: string): void => {
      const el = sh.getElementById(id) as HTMLSelectElement | null;
      if (el) el.value = val;
    };
    const setCheck = (id: string, val: boolean): void => {
      const el = sh.getElementById(id) as HTMLInputElement | null;
      if (el) el.checked = val;
    };
    setSelect('sel-font-family', s.fontFamily);
    setSelect('sel-font-size', String(s.fontSize));
    setSelect('sel-line-height', String(s.lineHeight));
    setCheck('chk-autosave', s.autoSaveEnabled);
    setSelect('sel-interval', String(s.autoSaveInterval));
    setCheck('chk-spellcheck', s.spellCheck);
    setCheck('chk-change-warning', s.changeWarning);
    this.toggleIntervalRow(s.autoSaveEnabled);
  }

  private readForm(): PoaSettings {
    const sh = this.shadow;
    const getSelect = (id: string): string =>
      (sh.getElementById(id) as HTMLSelectElement | null)?.value ?? '';
    const getCheck = (id: string): boolean =>
      (sh.getElementById(id) as HTMLInputElement | null)?.checked ?? false;
    return {
      fontFamily: getSelect('sel-font-family') || DEFAULTS.fontFamily,
      fontSize: Number(getSelect('sel-font-size')) || DEFAULTS.fontSize,
      lineHeight: Number(getSelect('sel-line-height')) || DEFAULTS.lineHeight,
      autoSaveEnabled: getCheck('chk-autosave'),
      autoSaveInterval: Number(getSelect('sel-interval')) || DEFAULTS.autoSaveInterval,
      spellCheck: getCheck('chk-spellcheck'),
      changeWarning: getCheck('chk-change-warning'),
    };
  }

  private toggleIntervalRow(enabled: boolean): void {
    const row = this.shadow.getElementById('row-interval') as HTMLElement | null;
    if (row) row.style.opacity = enabled ? '1' : '0.4';
  }

  private bindEvents(): void {
    const sh = this.shadow;
    sh.getElementById('backdrop')?.addEventListener('click', (e) => {
      if (e.target === sh.getElementById('backdrop')) this.close();
    });
    sh.getElementById('btn-close')?.addEventListener('click',  () => this.close());
    sh.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
    sh.getElementById('btn-save')?.addEventListener('click',   () => this.handleSave());
    (sh.getElementById('chk-autosave') as HTMLInputElement | null)
      ?.addEventListener('change', (e) => {
        this.toggleIntervalRow((e.target as HTMLInputElement).checked);
      });
  }

  private handleSave(): void {
    const s = this.readForm();
    saveSettings(s);
    this.dispatchEvent(new CustomEvent('poa-settings-changed', {
      bubbles: true,
      composed: true,
      detail: s,
    }));
    this.close();
  }
}

// legacy stubs so PoaEditor.ts still compiles during transition
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Object.assign(PoaSettingsDialog.prototype, {
  setAutoSave(_: unknown): void { /* noop — use PoaFileManagerDialog */ },
  setFileManager(_: unknown): void { /* noop — use PoaFileManagerDialog */ },
});
