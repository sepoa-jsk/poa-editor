import DOMPurify from 'dompurify';

export type ControlType = 'text' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'button' | 'date';
export type ButtonType  = 'submit' | 'reset' | 'button';
export type ButtonStyle = 'default' | 'primary' | 'danger';
export type ResizeMode  = 'none' | 'vertical' | 'horizontal' | 'both';

export interface RadioOption  { label: string; value: string; defaultChecked?: boolean; }
export interface SelectOption { label: string; value: string; selected?: boolean; }

export interface BaseControl {
  type:             ControlType;
  label?:           string;
  name?:            string;
  id?:              string;
  class?:           string;
  disabled?:        boolean;
  readonly?:        boolean;
  autoLabel?:       boolean; // default: true
  ariaRequired?:    boolean;
  ariaDescribedBy?: string;
}

export interface TextControl     extends BaseControl { type: 'text';     placeholder?: string; maxlength?: number; value?: string; }
export interface TextareaControl extends BaseControl { type: 'textarea'; placeholder?: string; rows?: number; cols?: number; resize?: ResizeMode; }
export interface CheckboxControl extends BaseControl { type: 'checkbox'; checked?: boolean; checkLabel?: string; value?: string; }
export interface RadioControl    extends BaseControl { type: 'radio';    groupName?: string;  options?: RadioOption[]; }
export interface SelectControl   extends BaseControl { type: 'select';   multiple?: boolean;  options?: SelectOption[]; }
export interface ButtonControl   extends BaseControl { type: 'button';   text?: string;       btnType?: ButtonType; btnStyle?: ButtonStyle; }
export interface DateControl     extends BaseControl { type: 'date';     min?: string;        max?: string; value?: string; }

export type FormControl =
  | TextControl | TextareaControl | CheckboxControl
  | RadioControl | SelectControl | ButtonControl | DateControl;

// ── 유틸 ──────────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let _seq = 0;
export function generateControlId(type: ControlType): string {
  return `poa-${type}-${(++_seq).toString(36)}`;
}

function boolAttrs(c: BaseControl): string {
  return [
    c.disabled       ? 'disabled'              : '',
    c.readonly       ? 'readonly'              : '',
    c.ariaRequired   ? 'aria-required="true"'  : '',
    c.ariaDescribedBy ? `aria-describedby="${esc(c.ariaDescribedBy)}"` : '',
  ].filter(Boolean).join(' ');
}

// ── HTML 빌더 ─────────────────────────────────────────────────────────────────

/**
 * FormControl 설정으로 .poa-form-group HTML 문자열을 반환한다.
 * label이 없으면 접근성 주의가 필요하다 (호출자가 경고 처리).
 */
export function buildFormControlHtml(control: FormControl): string {
  const autoLabel = control.autoLabel !== false;
  const id        = control.id || generateControlId(control.type);
  const labelTxt  = control.label ? esc(control.label) : '';
  const bool      = boolAttrs(control);
  const nameAttr  = control.name ? ` name="${esc(control.name)}"` : '';
  const clsExtra  = control.class ? ` ${esc(control.class)}` : '';

  function labelFor(forId: string): string {
    if (!labelTxt) return '';
    return autoLabel ? `<label for="${forId}">${labelTxt}</label>` : `<label>${labelTxt}</label>`;
  }

  const wrap = (inner: string): string =>
    `<div class="poa-form-group">\n  ${inner}\n</div>`;

  switch (control.type) {
    case 'text': {
      const ph = control.placeholder ? ` placeholder="${esc(control.placeholder)}"` : '';
      const ml = control.maxlength   ? ` maxlength="${control.maxlength}"`           : '';
      const v  = control.value       ? ` value="${esc(control.value)}"`              : '';
      return wrap(
        `${labelFor(id)}\n  ` +
        `<input type="text" id="${id}"${nameAttr} class="poa-input${clsExtra}"${ph}${ml}${v}${bool ? ' ' + bool : ''}>`
      );
    }

    case 'textarea': {
      const rows   = control.rows   ?? 4;
      const cols   = control.cols   ?? 40;
      const resize = control.resize ?? 'both';
      const ph = control.placeholder ? ` placeholder="${esc(control.placeholder)}"` : '';
      return wrap(
        `${labelFor(id)}\n  ` +
        `<textarea id="${id}"${nameAttr} class="poa-textarea${clsExtra}" ` +
        `rows="${rows}" cols="${cols}" style="resize:${resize}"${ph}${bool ? ' ' + bool : ''}></textarea>`
      );
    }

    case 'checkbox': {
      const checkLbl = control.checkLabel ? esc(control.checkLabel) : labelTxt;
      const checked  = control.checked  ? ' checked' : '';
      const v        = control.value    ? ` value="${esc(control.value)}"` : '';
      return wrap(
        `<label class="poa-checkbox-label">\n    ` +
        `<input type="checkbox" id="${id}"${nameAttr}${v}${checked}${bool ? ' ' + bool : ''}>\n    ` +
        `${checkLbl}\n  </label>`
      );
    }

    case 'radio': {
      const groupName = control.groupName ?? control.name ?? id;
      const opts      = control.options ?? [];
      const outerLbl  = labelTxt ? `<label>${labelTxt}</label>` : '';
      const optRows   = opts.map(o =>
        `    <label>\n      <input type="radio" name="${esc(groupName)}" value="${esc(o.value)}"` +
        `${o.defaultChecked ? ' checked' : ''}> ${esc(o.label)}\n    </label>`
      ).join('\n');
      return wrap(
        `${outerLbl}\n  <div class="poa-radio-group">\n${optRows}\n  </div>`
      );
    }

    case 'select': {
      const multiple = control.multiple ? ' multiple' : '';
      const opts     = control.options ?? [];
      const optRows  = opts.map(o =>
        `    <option value="${esc(o.value)}"${o.selected ? ' selected' : ''}>${esc(o.label)}</option>`
      ).join('\n');
      return wrap(
        `${labelFor(id)}\n  ` +
        `<select id="${id}"${nameAttr} class="poa-select${clsExtra}"${multiple}${bool ? ' ' + bool : ''}>\n${optRows}\n  </select>`
      );
    }

    case 'button': {
      const text     = control.text    ? esc(control.text) : '버튼';
      const btnType  = control.btnType  ?? 'button';
      const styleMap: Record<string, string> = {
        default: 'poa-btn',
        primary: 'poa-btn poa-btn-primary',
        danger:  'poa-btn poa-btn-danger',
      };
      const cls = styleMap[control.btnStyle ?? 'default'] + clsExtra;
      const idAttr = control.id ? ` id="${id}"` : '';
      return wrap(
        `<button type="${btnType}"${idAttr}${nameAttr} class="${cls}"${bool ? ' ' + bool : ''}>${text}</button>`
      );
    }

    case 'date': {
      const minAttr = control.min   ? ` min="${esc(control.min)}"`     : '';
      const maxAttr = control.max   ? ` max="${esc(control.max)}"`     : '';
      const v       = control.value ? ` value="${esc(control.value)}"` : '';
      return wrap(
        `${labelFor(id)}\n  ` +
        `<input type="date" id="${id}"${nameAttr} class="poa-input${clsExtra}"${minAttr}${maxAttr}${v}${bool ? ' ' + bool : ''}>`
      );
    }
  }
}

// ── DOMPurify 설정 ────────────────────────────────────────────────────────────

const PURIFY_CONFIG = {
  ADD_ATTR: [
    'disabled', 'readonly', 'checked', 'selected', 'multiple', 'required',
    'placeholder', 'maxlength', 'rows', 'cols', 'min', 'max', 'for',
    'aria-required', 'aria-describedby',
    'style',
  ],
};

// ── 삽입 클래스 ───────────────────────────────────────────────────────────────

/** contenteditable 영역에 폼 컨트롤을 삽입한다 */
export class FormControlInserter {
  constructor(private readonly contentEl: HTMLElement) {}

  /** config를 정제된 DOM 노드로 변환한다 (삽입은 호출자가 담당) */
  buildElement(config: FormControl): HTMLElement | null {
    const html  = buildFormControlHtml(config);
    const clean = String(DOMPurify.sanitize(html, PURIFY_CONFIG));
    const tmp = document.createElement('div');
    tmp.innerHTML = clean;
    const groupEl = tmp.firstElementChild as HTMLElement | null;
    if (groupEl) groupEl.dataset.poaForm = JSON.stringify(config);
    return groupEl;
  }

  /**
   * 컨트롤 HTML을 DOMPurify로 정제 후 삽입하고,
   * 컨테이너에 원본 config를 data-poa-form 으로 저장한다.
   */
  insert(config: FormControl): void {
    const groupEl = this.buildElement(config);
    if (!groupEl) return;

    // 커서 위치에 삽입
    const sel = window.getSelection();
    if (sel?.rangeCount && this.contentEl.contains(sel.getRangeAt(0).commonAncestorContainer)) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(groupEl);
      range.collapse(false);
    } else {
      this.contentEl.appendChild(groupEl);
    }
  }
}
