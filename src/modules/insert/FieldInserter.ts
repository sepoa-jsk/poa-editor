import type { DocumentField } from './DocumentFields.js';

const ATTR = {
  fieldId:      'data-field-id',
  placeholder:  'data-placeholder',
  prefix:       'data-prefix',
  suffix:       'data-suffix',
  multiline:    'data-multiline',
  fontSize:     'data-font-size',
  textAlign:    'data-text-align',
  fontFamily:   'data-font-family',
  sizeFixed:    'data-size-fixed',
  fieldType:    'data-field-type',
  numberFormat: 'data-number-format',
} as const;

const NUMBER_FORMAT_LABELS: ReadonlyArray<readonly [string, string]> = [
  ['none',        '포맷 없음'],
  ['comma',       '천 단위 (1,000,000)'],
  ['comma_won',   '천 단위 + 원 (1,000,000원)'],
  ['korean',      '한국식 단위 (100만)'],
  ['korean_full', '한국식 전체 (일백만원)'],
  ['decimal2',    '소수점 2자리 (1,000,000.00)'],
  ['percent',     '퍼센트 (10.5%)'],
  ['percent2',    '퍼센트 소수점 2자리 (10.50%)'],
];

const FIELD_INPUT_STYLE = [
  'border:1px solid #93C5FD',
  'border-radius:4px',
  'padding:2px 8px',
  'font-size:inherit',
  'background:#EFF6FF',
  'color:#1E40AF',
  'min-width:120px',
  'outline:none',
  'font-family:inherit',
  'vertical-align:middle',
  'box-sizing:border-box',
].join(';');

/**
 * 에디터에 문서 양식 필드(<span.poa-field>)를 삽입하고
 * 필드 클릭 시 속성 팝업을 표시한다.
 */
export class FieldInserter {
  private contentEl: HTMLElement | null = null;
  private popupEl:   HTMLElement | null = null;

  private readonly clickHandler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('poa-field-input')) return;
    e.preventDefault();
    e.stopPropagation();
    this.openPopup(target as HTMLInputElement);
  };

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('click', this.clickHandler);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('click', this.clickHandler);
      this.contentEl = null;
    }
    this.closePopup();
  }

  /** savedRange(또는 현재 커서) 위치에 필드를 삽입한다 */
  insertField(field: DocumentField, savedRange: Range | null): void {
    if (!this.contentEl) return;
    const ownerDoc = this.contentEl.ownerDocument;
    const sel = ownerDoc.getSelection();

    let range: Range;
    if (savedRange) {
      range = savedRange.cloneRange();
    } else if (sel && sel.rangeCount > 0) {
      range = sel.getRangeAt(0);
    } else {
      range = ownerDoc.createRange();
      range.selectNodeContents(this.contentEl);
      range.collapse(false);
    }

    const span = ownerDoc.createElement('span');
    span.className = 'poa-field';
    span.setAttribute(ATTR.fieldId,     field.id);
    span.setAttribute(ATTR.placeholder, field.placeholder);
    span.setAttribute(ATTR.prefix,      '');
    span.setAttribute(ATTR.suffix,      '');
    span.setAttribute(ATTR.fieldType,   field.type);
    span.contentEditable = 'false';

    const inputType =
      field.type === 'date'   ? 'date'   :
      field.type === 'number' ? 'number' : 'text';

    const input = ownerDoc.createElement('input');
    input.type      = inputType;
    input.className = 'poa-field-input';
    input.placeholder = field.label;
    input.setAttribute(ATTR.fieldId, field.id);
    input.style.cssText = FIELD_INPUT_STYLE;

    span.appendChild(input);
    range.deleteContents();
    range.insertNode(span);
    range.setStartAfter(span);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  // ── 속성 팝업 ──────────────────────────────────────────────────────────────

  private openPopup(input: HTMLInputElement): void {
    this.closePopup();

    const span = input.closest('.poa-field') as HTMLElement | null;
    if (!span) return;
    const ownerDoc = input.ownerDocument;
    const rect = input.getBoundingClientRect();

    const prefix       = span.getAttribute(ATTR.prefix)       ?? '';
    const suffix       = span.getAttribute(ATTR.suffix)       ?? '';
    const multiline    = span.getAttribute(ATTR.multiline)    ?? '0';
    const fontSize     = span.getAttribute(ATTR.fontSize)     ?? '0';
    const textAlign    = span.getAttribute(ATTR.textAlign)    ?? 'left';
    const fontFamily   = span.getAttribute(ATTR.fontFamily)   ?? '';
    const sizeFixed    = span.getAttribute(ATTR.sizeFixed)    ?? '0';
    const fieldType    = span.getAttribute(ATTR.fieldType)    ?? 'text';
    const numberFormat = span.getAttribute(ATTR.numberFormat) ?? 'none';
    const label        = input.placeholder;
    const isNumber     = fieldType === 'number';

    const popup = ownerDoc.createElement('div');
    popup.className = 'poa-field-popup';
    popup.style.cssText = [
      'position:fixed',
      `left:${Math.round(rect.left)}px`,
      `top:${Math.round(rect.bottom + 4)}px`,
      'width:260px',
      'background:#fff',
      'border:1px solid #E5E7EB',
      'border-radius:6px',
      'box-shadow:0 4px 16px rgba(0,0,0,.16)',
      'z-index:99999',
      'font-size:13px',
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
    ].join(';');

    const inputStyle = 'width:100%;box-sizing:border-box;padding:4px 7px;border:1px solid #D1D5DB;border-radius:3px;font-size:13px;outline:none;';
    const selectStyle = inputStyle;
    const fsLabel = fontSize === '0' ? '상속' : fontSize;

    const opt = (val: string, cur: string, text: string): string =>
      `<option value="${val}"${val === cur ? ' selected' : ''}>${text}</option>`;

    const numFormatRow = isNumber ? `
  <label style="font-size:12px;color:#6B7280;">숫자 포맷</label>
  <select id="pf-numformat" style="${selectStyle}">
    ${NUMBER_FORMAT_LABELS.map(([v, t]) => opt(v, numberFormat, t)).join('')}
  </select>` : '';

    popup.innerHTML = `
<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #E5E7EB;font-weight:600;color:#111827;">
  <span>${label}</span>
  <button id="pf-close" style="border:none;background:transparent;font-size:16px;cursor:pointer;color:#9CA3AF;padding:0 2px;line-height:1;" title="닫기">✕</button>
</div>
<div style="padding:10px 12px;display:grid;grid-template-columns:90px 1fr;gap:7px 10px;align-items:center;">
  <label style="font-size:12px;color:#6B7280;">값</label>
  <input id="pf-value" type="${input.type}" value="${input.value}" placeholder="${label}" style="${inputStyle}">${numFormatRow}
  <label style="font-size:12px;color:#6B7280;">접두사</label>
  <input id="pf-prefix" type="text" value="${prefix}" style="${inputStyle}">
  <label style="font-size:12px;color:#6B7280;">접미사</label>
  <input id="pf-suffix" type="text" value="${suffix}" style="${inputStyle}">
  <label style="font-size:12px;color:#6B7280;">줄바꿈 허용</label>
  <select id="pf-multiline" style="${selectStyle}">
    ${opt('0', multiline, '비활성화')}${opt('1', multiline, '활성화')}
  </select>
  <label style="font-size:12px;color:#6B7280;">글자 크기</label>
  <div style="display:flex;align-items:center;gap:6px;">
    <input id="pf-fontsize" type="range" min="0" max="72" value="${fontSize}" style="flex:1;accent-color:#3B82F6;">
    <span id="pf-fontsize-val" style="font-size:12px;color:#374151;min-width:32px;text-align:right;">${fsLabel}</span>
  </div>
  <label style="font-size:12px;color:#6B7280;">글자 정렬</label>
  <select id="pf-align" style="${selectStyle}">
    ${opt('left','',    '왼쪽')}${opt('center','','가운데')}
    ${opt('right','',   '오른쪽')}${opt('justify','','양쪽')}
  </select>
  <label style="font-size:12px;color:#6B7280;">글자 폰트</label>
  <select id="pf-font" style="${selectStyle}">
    ${opt('',              fontFamily, '상속')}
    ${opt("'Dotum'",       fontFamily, '돋움체')}
    ${opt("'Gulim'",       fontFamily, '굴림체')}
    ${opt("'Malgun Gothic'",fontFamily,'맑은 고딕')}
    ${opt("'Batang'",      fontFamily, '바탕체')}
    ${opt("'Arial'",       fontFamily, 'Arial')}
  </select>
  <label style="font-size:12px;color:#6B7280;">글자 크기 고정</label>
  <select id="pf-size-fixed" style="${selectStyle}">
    ${opt('0', sizeFixed, '미사용')}${opt('1', sizeFixed, '사용')}
  </select>
</div>`;

    // 텍스트 정렬 옵션 직접 설정 (선택 값 누락 방지)
    (popup.querySelector('#pf-align') as HTMLSelectElement).value = textAlign;

    ownerDoc.body.appendChild(popup);
    this.popupEl = popup;

    // 화면 경계 보정
    requestAnimationFrame(() => {
      if (!this.popupEl) return;
      const pr = this.popupEl.getBoundingClientRect();
      const vw = ownerDoc.defaultView?.innerWidth  ?? 0;
      const vh = ownerDoc.defaultView?.innerHeight ?? 0;
      if (pr.right  > vw) this.popupEl.style.left = `${Math.max(0, rect.right - 260)}px`;
      if (pr.bottom > vh) this.popupEl.style.top  = `${Math.max(0, rect.top - pr.height - 4)}px`;
    });

    // 실시간 반영 이벤트
    const q = <T extends HTMLElement>(id: string) => popup.querySelector<T>(`#${id}`)!;
    const pfValue     = q<HTMLInputElement>('pf-value');
    const pfPrefix    = q<HTMLInputElement>('pf-prefix');
    const pfSuffix    = q<HTMLInputElement>('pf-suffix');
    const pfMulti     = q<HTMLSelectElement>('pf-multiline');
    const pfFontSize  = q<HTMLInputElement>('pf-fontsize');
    const pfFsVal     = q<HTMLElement>('pf-fontsize-val');
    const pfAlign     = q<HTMLSelectElement>('pf-align');
    const pfFont      = q<HTMLSelectElement>('pf-font');
    const pfSizeFixed = q<HTMLSelectElement>('pf-size-fixed');

    pfValue.addEventListener('input', () => { input.value = pfValue.value; });

    pfPrefix.addEventListener('input', () => {
      span.setAttribute(ATTR.prefix, pfPrefix.value);
    });
    pfSuffix.addEventListener('input', () => {
      span.setAttribute(ATTR.suffix, pfSuffix.value);
    });
    pfMulti.addEventListener('change', () => {
      span.setAttribute(ATTR.multiline, pfMulti.value);
    });
    pfFontSize.addEventListener('input', () => {
      const v = pfFontSize.value;
      pfFsVal.textContent = v === '0' ? '상속' : v;
      span.setAttribute(ATTR.fontSize, v);
      input.style.fontSize = v === '0' ? 'inherit' : `${v}px`;
    });
    pfAlign.addEventListener('change', () => {
      span.setAttribute(ATTR.textAlign, pfAlign.value);
      input.style.textAlign = pfAlign.value;
    });
    pfFont.addEventListener('change', () => {
      span.setAttribute(ATTR.fontFamily, pfFont.value);
      input.style.fontFamily = pfFont.value || 'inherit';
    });
    pfSizeFixed.addEventListener('change', () => {
      span.setAttribute(ATTR.sizeFixed, pfSizeFixed.value);
    });

    if (isNumber) {
      const pfNumFormat = q<HTMLSelectElement>('pf-numformat');
      pfNumFormat.addEventListener('change', () => {
        span.setAttribute(ATTR.numberFormat, pfNumFormat.value);
      });
    }

    popup.querySelector('#pf-close')!.addEventListener('click', () => this.closePopup());

    // 팝업 외부 mousedown → 닫기
    const outsideHandler = (ev: MouseEvent): void => {
      if (!this.popupEl?.contains(ev.target as Node)) {
        this.closePopup();
        ownerDoc.removeEventListener('mousedown', outsideHandler);
      }
    };
    setTimeout(() => ownerDoc.addEventListener('mousedown', outsideHandler), 0);
  }

  private closePopup(): void {
    if (this.popupEl) {
      this.popupEl.remove();
      this.popupEl = null;
    }
  }

  // ── 저장 내보내기 ────────────────────────────────────────────────────────────

  /**
   * 에디터 HTML 문자열에서 .poa-field 스팬을
   * 입력값 또는 플레이스홀더 텍스트로 대체한다.
   * 원본 DOM에는 영향을 주지 않는다.
   */
  static exportFields(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll<HTMLElement>('.poa-field').forEach((span) => {
      const placeholder = span.getAttribute('data-placeholder') ?? '';
      const prefix  = span.getAttribute('data-prefix')  ?? '';
      const suffix  = span.getAttribute('data-suffix')  ?? '';
      const input   = span.querySelector('input') as HTMLInputElement | null;
      const rawVal  = input?.getAttribute('value')?.trim() ?? '';
      const value   = rawVal !== '' ? rawVal : placeholder;
      span.replaceWith(doc.createTextNode(`${prefix}${value}${suffix}`));
    });
    return doc.body.innerHTML;
  }
}
