import type { TextAlign, ToolbarState } from '../core/types.js';
import { Icons } from '../utils/icons.js';

const FONT_FAMILIES: Array<{ label: string; value: string }> = [
  { label: '기본',             value: 'inherit' },
  // 한글 폰트
  { label: '맑은 고딕',       value: '맑은 고딕, sans-serif' },
  { label: '나눔고딕',        value: '나눔고딕, sans-serif' },
  { label: '나눔명조',        value: '나눔명조, serif' },
  { label: '굴림',            value: '굴림, sans-serif' },
  { label: '돋움',            value: '돋움, sans-serif' },
  { label: '바탕',            value: '바탕, serif' },
  { label: '궁서',            value: '궁서, serif' },
  // 영문 폰트
  { label: 'Arial',           value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Courier New',     value: 'Courier New, monospace' },
  { label: 'Georgia',         value: 'Georgia, serif' },
  { label: 'Verdana',         value: 'Verdana, sans-serif' },
  { label: 'Tahoma',          value: 'Tahoma, sans-serif' },
];
const FONT_SIZES       = ['8','9','10','11','12','14','16','18','20','24','28','32','36','48','72'];
const LINE_HEIGHTS     = ['1','1.2','1.4','1.5','1.6','1.8','2.0','2.5'];
const LETTER_SPACINGS  = ['0px','0.5px','1px','1.5px','2px','3px','4px'];

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
:host {
  display: block;
  --icon-color:         #374151;
  --icon-hover-bg:      #F3F4F6;
  --icon-hover-color:   #111827;
  --icon-active-bg:     #EFF6FF;
  --icon-active-color:  #2563EB;
  --icon-active-border: #BFDBFE;
  --toolbar-bg:         #FFFFFF;
  --toolbar-border:     #E5E7EB;
  --sep-color:          #D1D5DB;
}
.toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 2px;
  padding: 4px 8px;
  background: var(--toolbar-bg);
  border-bottom: 1px solid var(--toolbar-border);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep {
  width: 1px; height: 20px;
  background: var(--sep-color);
  margin: 0 4px; flex-shrink: 0;
}
.btn {
  position: relative;
  width: 32px; height: 32px; padding: 0;
  border: 1px solid transparent; border-radius: 6px;
  background: transparent;
  color: var(--icon-color);
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.12s, color 0.12s;
  flex-shrink: 0;
}
.btn svg { pointer-events: none; display: block; }
.btn:hover:not(:disabled) {
  background: var(--icon-hover-bg);
  color: var(--icon-hover-color);
}
.btn.active {
  background: var(--icon-active-bg);
  color: var(--icon-active-color);
  border-color: var(--icon-active-border);
}
.btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* 다크 툴팁 — 600ms 지연 */
.btn::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1F2937;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease 0s;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.btn:hover:not(:disabled)::after {
  opacity: 1;
  transition-delay: 0.6s;
}

/* 색상 버튼 */
select {
  height: 32px; padding: 0 6px;
  border: 1px solid var(--toolbar-border); border-radius: 6px;
  background: #fff; color: var(--icon-color);
  font-size: 12px; cursor: pointer;
  outline: none;
  transition: border-color 0.12s;
}
select:focus { border-color: var(--icon-active-color); }
.sel-family { width: 96px; }
.sel-size   { width: 52px; }
.sel-lh     { width: 76px; }
.sel-ls     { width: 76px; }

/* 색상 버튼 — 아이콘 + 컬러바 */
.color-wrap  { position: relative; display: inline-flex; }
.color-btn   {
  flex-direction: column; gap: 2px;
  width: 32px; height: 32px; padding: 6px 8px;
}
.c-icon      { display: flex; align-items: center; justify-content: center; pointer-events: none; }
.c-bar       { width: 16px; height: 3px; border-radius: 1px; pointer-events: none; }
.color-input {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: 0; cursor: pointer; border: none; padding: 0; margin: 0;
}
`;

/* ── HTML ────────────────────────────────────────────────────────────────── */
const HTML = `
<div class="toolbar">
  <div class="group">
    <select class="sel-family" id="sel-family" title="글꼴"></select>
    <select class="sel-size"   id="sel-size"   title="글자 크기 (pt)"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-bold"      data-tip="굵게 (Ctrl+B)">${Icons.bold}</button>
    <button class="btn" id="btn-italic"    data-tip="기울임 (Ctrl+I)">${Icons.italic}</button>
    <button class="btn" id="btn-underline" data-tip="밑줄 (Ctrl+U)">${Icons.underline}</button>
    <button class="btn" id="btn-strike"    data-tip="취소선">${Icons.strike}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <div class="color-wrap" data-tip="글자색">
      <button class="btn color-btn" id="btn-fore" data-tip="글자색">
        <span class="c-icon">${Icons.foreColor}</span>
        <span class="c-bar" id="fore-bar" style="background:#000000"></span>
      </button>
      <input type="color" class="color-input" id="fore-input" value="#000000">
    </div>
    <div class="color-wrap">
      <button class="btn color-btn" id="btn-back" data-tip="배경 강조색">
        <span class="c-icon">${Icons.backColor}</span>
        <span class="c-bar" id="back-bar" style="background:#FBBF24"></span>
      </button>
      <input type="color" class="color-input" id="back-input" value="#FBBF24">
    </div>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-al-left"    data-tip="왼쪽 정렬">${Icons.alignLeft}</button>
    <button class="btn" id="btn-al-center"  data-tip="가운데 정렬">${Icons.alignCenter}</button>
    <button class="btn" id="btn-al-right"   data-tip="오른쪽 정렬">${Icons.alignRight}</button>
    <button class="btn" id="btn-al-justify" data-tip="양쪽 정렬">${Icons.alignJustify}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-indent"  data-tip="들여쓰기">${Icons.indent}</button>
    <button class="btn" id="btn-outdent" data-tip="내어쓰기">${Icons.outdent}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <select class="sel-lh" id="sel-lh" title="줄 간격"></select>
    <select class="sel-ls" id="sel-ls" title="자간"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-undo" data-tip="실행 취소 (Ctrl+Z)">${Icons.undo}</button>
    <button class="btn" id="btn-redo" data-tip="다시 실행 (Ctrl+Y)">${Icons.redo}</button>
  </div>
</div>
`;

export class PoaToolbar extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>${HTML}`;
    this.populateSelects();
    this.bindEvents();
  }

  private populateSelects(): void {
    const s = this.shadow;

    const selFamily = s.getElementById('sel-family') as HTMLSelectElement;
    for (const { label, value } of FONT_FAMILIES) {
      const opt = document.createElement('option');
      opt.value = value; opt.textContent = label;
      selFamily.appendChild(opt);
    }

    const selSize = s.getElementById('sel-size') as HTMLSelectElement;
    for (const sz of FONT_SIZES) {
      const opt = document.createElement('option');
      opt.value = `${sz}pt`; opt.textContent = sz;
      selSize.appendChild(opt);
    }
    selSize.value = '12pt';

    const selLh = s.getElementById('sel-lh') as HTMLSelectElement;
    for (const v of LINE_HEIGHTS) {
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = `줄간 ${v}`;
      selLh.appendChild(opt);
    }
    selLh.value = '1.5';

    const selLs = s.getElementById('sel-ls') as HTMLSelectElement;
    for (const v of LETTER_SPACINGS) {
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = `자간 ${v}`;
      selLs.appendChild(opt);
    }
    selLs.value = '0px';
  }

  private bindEvents(): void {
    const s = this.shadow;

    const dispatch = (type: string, value?: string): void => {
      this.dispatchEvent(new CustomEvent('poa-action', {
        bubbles: true, composed: true,
        detail: { type, value },
      }));
    };

    const bindFormat = (id: string, value: string): void => {
      s.getElementById(id)?.addEventListener('mousedown', (e) => {
        e.preventDefault(); dispatch('format', value);
      });
    };
    bindFormat('btn-bold',      'bold');
    bindFormat('btn-italic',    'italic');
    bindFormat('btn-underline', 'underline');
    bindFormat('btn-strike',    'strike');

    s.getElementById('fore-input')?.addEventListener('change', (e) => {
      const v = (e.target as HTMLInputElement).value;
      (s.getElementById('fore-bar') as HTMLElement).style.background = v;
      dispatch('foreColor', v);
    });
    s.getElementById('back-input')?.addEventListener('change', (e) => {
      const v = (e.target as HTMLInputElement).value;
      (s.getElementById('back-bar') as HTMLElement).style.background = v;
      dispatch('backColor', v);
    });

    const bindAlign = (id: string, value: TextAlign): void => {
      s.getElementById(id)?.addEventListener('mousedown', (e) => {
        e.preventDefault(); dispatch('align', value);
      });
    };
    bindAlign('btn-al-left',    'left');
    bindAlign('btn-al-center',  'center');
    bindAlign('btn-al-right',   'right');
    bindAlign('btn-al-justify', 'justify');

    s.getElementById('btn-indent')?.addEventListener('mousedown',  (e) => { e.preventDefault(); dispatch('indent'); });
    s.getElementById('btn-outdent')?.addEventListener('mousedown', (e) => { e.preventDefault(); dispatch('outdent'); });
    s.getElementById('btn-undo')?.addEventListener('mousedown',    (e) => { e.preventDefault(); dispatch('undo'); });
    s.getElementById('btn-redo')?.addEventListener('mousedown',    (e) => { e.preventDefault(); dispatch('redo'); });

    (s.getElementById('sel-family') as HTMLSelectElement).addEventListener('change', (e) =>
      dispatch('fontFamily', (e.target as HTMLSelectElement).value));
    (s.getElementById('sel-size') as HTMLSelectElement).addEventListener('change', (e) =>
      dispatch('fontSize', (e.target as HTMLSelectElement).value));
    (s.getElementById('sel-lh') as HTMLSelectElement).addEventListener('change', (e) =>
      dispatch('lineHeight', (e.target as HTMLSelectElement).value));
    (s.getElementById('sel-ls') as HTMLSelectElement).addEventListener('change', (e) =>
      dispatch('letterSpacing', (e.target as HTMLSelectElement).value));
  }

  setState(state: ToolbarState): void {
    const s = this.shadow;

    const toggle = (id: string, active: boolean): void => {
      s.getElementById(id)?.classList.toggle('active', active);
    };

    const setDisabled = (id: string, disabled: boolean): void => {
      const el = s.getElementById(id) as HTMLButtonElement | null;
      if (el) el.disabled = disabled;
    };

    toggle('btn-bold',      state.bold);
    toggle('btn-italic',    state.italic);
    toggle('btn-underline', state.underline);
    toggle('btn-strike',    state.strike);

    toggle('btn-al-left',    state.align === 'left');
    toggle('btn-al-center',  state.align === 'center');
    toggle('btn-al-right',   state.align === 'right');
    toggle('btn-al-justify', state.align === 'justify');

    setDisabled('btn-undo', !state.canUndo);
    setDisabled('btn-redo', !state.canRedo);

    if (state.fontFamily) {
      // 브라우저가 공백 포함 폰트명에 따옴표를 자동 삽입하므로 제거 후 비교
      // e.g. '"맑은 고딕", sans-serif' → '맑은 고딕, sans-serif'
      const normalized = state.fontFamily.replace(/['"]/g, '').replace(/\s*,\s*/g, ', ').trim();
      (s.getElementById('sel-family') as HTMLSelectElement).value = normalized;
    }
    if (state.fontSize)   (s.getElementById('sel-size')   as HTMLSelectElement).value = state.fontSize;
    if (state.lineHeight) (s.getElementById('sel-lh')      as HTMLSelectElement).value = state.lineHeight;
    if (state.letterSpacing) (s.getElementById('sel-ls')   as HTMLSelectElement).value = state.letterSpacing;

    if (state.foreColor) {
      (s.getElementById('fore-bar')   as HTMLElement).style.background = state.foreColor;
      (s.getElementById('fore-input') as HTMLInputElement).value = state.foreColor;
    }
    if (state.backColor) {
      (s.getElementById('back-bar')   as HTMLElement).style.background = state.backColor;
      (s.getElementById('back-input') as HTMLInputElement).value = state.backColor;
    }
  }

  setHistoryState(canUndo: boolean, canRedo: boolean): void {
    const s = this.shadow;
    const u = s.getElementById('btn-undo') as HTMLButtonElement | null;
    const r = s.getElementById('btn-redo') as HTMLButtonElement | null;
    if (u) u.disabled = !canUndo;
    if (r) r.disabled = !canRedo;
  }

  /** 사용자 모드 적용: 서식 툴바 전체 비활성화 */
  applyUserMode(): void {
    const toolbar = this.shadow.querySelector<HTMLElement>('.toolbar');
    if (toolbar) toolbar.style.opacity = '0.5';
    this.shadow.querySelectorAll<HTMLButtonElement | HTMLSelectElement | HTMLInputElement>(
      'button, select, input',
    ).forEach(el => { el.disabled = true; });
  }
}
