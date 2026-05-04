import type { TextAlign, ToolbarState } from '../core/types.js';

const FONT_FAMILIES: Array<{ label: string; value: string }> = [
  { label: '기본', value: 'inherit' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: '바탕', value: '바탕, serif' },
  { label: '굴림', value: '굴림, sans-serif' },
  { label: '맑은 고딕', value: '맑은 고딕, sans-serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
];
const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];
const LINE_HEIGHTS = ['1', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '2.5'];
const LETTER_SPACINGS = ['0px', '0.5px', '1px', '1.5px', '2px', '3px', '4px'];

const CSS = `
:host { display: block; box-sizing: border-box; }
.toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 2px;
  padding: 4px 8px;
  background: var(--poa-toolbar-bg, #f5f5f5);
  border-bottom: 1px solid var(--poa-toolbar-border, #ddd);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep { width: 1px; height: 22px; background: var(--poa-toolbar-border, #ddd); margin: 0 4px; flex-shrink: 0; }
.btn {
  min-width: 28px; height: 28px; padding: 0 5px;
  border: 1px solid transparent; border-radius: 3px;
  background: transparent; color: var(--poa-btn-color, #333);
  font-size: 13px; line-height: 1; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.btn:hover:not(:disabled) {
  background: var(--poa-btn-hover-bg, #e0e0e0);
  border-color: var(--poa-toolbar-border, #ddd);
}
.btn.active {
  background: var(--poa-btn-active-bg, #c8d8f0);
  color: var(--poa-btn-active-color, #1565c0);
  border-color: var(--poa-btn-active-color, #1565c0);
}
.btn:disabled { opacity: 0.35; cursor: default; }
select {
  height: 28px; padding: 0 4px;
  border: 1px solid var(--poa-toolbar-border, #ddd); border-radius: 3px;
  background: #fff; color: var(--poa-btn-color, #333); font-size: 12px; cursor: pointer;
}
.sel-family { width: 96px; }
.sel-size   { width: 52px; }
.sel-lh     { width: 62px; }
.sel-ls     { width: 62px; }
.color-wrap { position: relative; display: inline-flex; }
.color-btn  { flex-direction: column; gap: 1px; height: 28px; padding: 3px 5px; }
.c-letter   { font-size: 13px; font-weight: bold; line-height: 1; pointer-events: none; }
.c-bar      { width: 18px; height: 3px; border-radius: 1px; pointer-events: none; }
.color-input {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: 0; cursor: pointer; border: none; padding: 0; margin: 0;
}
`;

const HTML = `
<div class="toolbar">
  <div class="group">
    <select class="sel-family" id="sel-family" title="글꼴"></select>
    <select class="sel-size"   id="sel-size"   title="글자 크기 (pt)"></select>
  </div>
  <div class="sep"></div>
  <div class="group">
    <button class="btn" id="btn-bold"      title="굵게 (Ctrl+B)"><b>B</b></button>
    <button class="btn" id="btn-italic"    title="기울임 (Ctrl+I)"><em style="font-style:italic">I</em></button>
    <button class="btn" id="btn-underline" title="밑줄 (Ctrl+U)" style="text-decoration:underline">U</button>
    <button class="btn" id="btn-strike"    title="취소선" style="text-decoration:line-through">S</button>
  </div>
  <div class="sep"></div>
  <div class="group">
    <div class="color-wrap" title="글자색">
      <button class="btn color-btn" id="btn-fore">
        <span class="c-letter">A</span>
        <span class="c-bar" id="fore-bar" style="background:#000000"></span>
      </button>
      <input type="color" class="color-input" id="fore-input" value="#000000">
    </div>
    <div class="color-wrap" title="배경 강조색">
      <button class="btn color-btn" id="btn-back">
        <span class="c-letter" style="background:#ffff00;padding:0 2px">H</span>
        <span class="c-bar" id="back-bar" style="background:#ffff00"></span>
      </button>
      <input type="color" class="color-input" id="back-input" value="#ffff00">
    </div>
  </div>
  <div class="sep"></div>
  <div class="group">
    <button class="btn" id="btn-al-left"    title="왼쪽 정렬">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
        <rect x="0" y="0" width="14" height="2"/>
        <rect x="0" y="5" width="10" height="2"/>
        <rect x="0" y="10" width="12" height="2"/>
      </svg>
    </button>
    <button class="btn" id="btn-al-center"  title="가운데 정렬">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
        <rect x="0" y="0" width="14" height="2"/>
        <rect x="2" y="5" width="10" height="2"/>
        <rect x="1" y="10" width="12" height="2"/>
      </svg>
    </button>
    <button class="btn" id="btn-al-right"   title="오른쪽 정렬">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
        <rect x="0" y="0" width="14" height="2"/>
        <rect x="4" y="5" width="10" height="2"/>
        <rect x="2" y="10" width="12" height="2"/>
      </svg>
    </button>
    <button class="btn" id="btn-al-justify" title="양쪽 정렬">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
        <rect x="0" y="0" width="14" height="2"/>
        <rect x="0" y="5" width="14" height="2"/>
        <rect x="0" y="10" width="14" height="2"/>
      </svg>
    </button>
  </div>
  <div class="sep"></div>
  <div class="group">
    <button class="btn" id="btn-indent"  title="들여쓰기">⇥</button>
    <button class="btn" id="btn-outdent" title="내어쓰기">⇤</button>
  </div>
  <div class="sep"></div>
  <div class="group">
    <select class="sel-lh" id="sel-lh" title="줄 간격"></select>
    <select class="sel-ls" id="sel-ls" title="자간"></select>
  </div>
  <div class="sep"></div>
  <div class="group">
    <button class="btn" id="btn-undo" title="실행 취소 (Ctrl+Z)">↩</button>
    <button class="btn" id="btn-redo" title="다시 실행 (Ctrl+Y)">↪</button>
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
      opt.value = value;
      opt.textContent = label;
      selFamily.appendChild(opt);
    }

    const selSize = s.getElementById('sel-size') as HTMLSelectElement;
    for (const sz of FONT_SIZES) {
      const opt = document.createElement('option');
      opt.value = `${sz}pt`;
      opt.textContent = sz;
      selSize.appendChild(opt);
    }
    selSize.value = '12pt';

    const selLh = s.getElementById('sel-lh') as HTMLSelectElement;
    for (const v of LINE_HEIGHTS) {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = `줄간 ${v}`;
      selLh.appendChild(opt);
    }
    selLh.value = '1.5';

    const selLs = s.getElementById('sel-ls') as HTMLSelectElement;
    for (const v of LETTER_SPACINGS) {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = `자간 ${v}`;
      selLs.appendChild(opt);
    }
    selLs.value = '0px';
  }

  private bindEvents(): void {
    const s = this.shadow;

    const dispatch = (type: string, value?: string): void => {
      this.dispatchEvent(
        new CustomEvent('poa-action', {
          bubbles: true,
          composed: true,
          detail: { type, value },
        }),
      );
    };

    // Format — mousedown + preventDefault keeps selection intact
    const bindFormat = (id: string, value: string) => {
      const el = s.getElementById(id);
      el?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dispatch('format', value);
      });
    };
    bindFormat('btn-bold', 'bold');
    bindFormat('btn-italic', 'italic');
    bindFormat('btn-underline', 'underline');
    bindFormat('btn-strike', 'strike');

    // Color inputs — overlay captures click directly
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

    // Alignment — mousedown + preventDefault
    const bindAlign = (id: string, value: TextAlign) => {
      s.getElementById(id)?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dispatch('align', value);
      });
    };
    bindAlign('btn-al-left', 'left');
    bindAlign('btn-al-center', 'center');
    bindAlign('btn-al-right', 'right');
    bindAlign('btn-al-justify', 'justify');

    s.getElementById('btn-indent')?.addEventListener('mousedown', (e) => { e.preventDefault(); dispatch('indent'); });
    s.getElementById('btn-outdent')?.addEventListener('mousedown', (e) => { e.preventDefault(); dispatch('outdent'); });
    s.getElementById('btn-undo')?.addEventListener('mousedown', (e) => { e.preventDefault(); dispatch('undo'); });
    s.getElementById('btn-redo')?.addEventListener('mousedown', (e) => { e.preventDefault(); dispatch('redo'); });

    (s.getElementById('sel-family') as HTMLSelectElement).addEventListener('change', (e) => {
      dispatch('fontFamily', (e.target as HTMLSelectElement).value);
    });
    (s.getElementById('sel-size') as HTMLSelectElement).addEventListener('change', (e) => {
      dispatch('fontSize', (e.target as HTMLSelectElement).value);
    });
    (s.getElementById('sel-lh') as HTMLSelectElement).addEventListener('change', (e) => {
      dispatch('lineHeight', (e.target as HTMLSelectElement).value);
    });
    (s.getElementById('sel-ls') as HTMLSelectElement).addEventListener('change', (e) => {
      dispatch('letterSpacing', (e.target as HTMLSelectElement).value);
    });
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

    toggle('btn-bold', state.bold);
    toggle('btn-italic', state.italic);
    toggle('btn-underline', state.underline);
    toggle('btn-strike', state.strike);

    toggle('btn-al-left',    state.align === 'left');
    toggle('btn-al-center',  state.align === 'center');
    toggle('btn-al-right',   state.align === 'right');
    toggle('btn-al-justify', state.align === 'justify');

    setDisabled('btn-undo', !state.canUndo);
    setDisabled('btn-redo', !state.canRedo);

    if (state.fontFamily) (s.getElementById('sel-family') as HTMLSelectElement).value = state.fontFamily;
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

  /** selection 없이 undo/redo 버튼만 갱신 — 입력 디바운스 후 호출 */
  setHistoryState(canUndo: boolean, canRedo: boolean): void {
    const s = this.shadow;
    const btn = (id: string) => s.getElementById(id) as HTMLButtonElement | null;
    const u = btn('btn-undo');
    const r = btn('btn-redo');
    if (u) u.disabled = !canUndo;
    if (r) r.disabled = !canRedo;
  }
}
