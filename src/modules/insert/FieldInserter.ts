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
  dateFormat:   'data-date-format',
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

const DATE_FORMAT_LABELS: ReadonlyArray<readonly [string, string]> = [
  ['YYYY-MM-DD',     'YYYY-MM-DD  예) 2025-01-31'],
  ['YYYY년MM월DD일', 'YYYY년 MM월 DD일  예) 2025년 01월 31일'],
  ['YYYY. MM. DD',   'YYYY. MM. DD  예) 2025. 01. 31'],
  ['MM/DD/YYYY',     'MM/DD/YYYY  예) 01/31/2025'],
  ['DD-MM-YYYY',     'DD-MM-YYYY  예) 31-01-2025'],
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
    input.type        = inputType;
    input.className   = 'poa-field-input';
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
    const rect     = input.getBoundingClientRect();

    const prefix       = span.getAttribute(ATTR.prefix)       ?? '';
    const suffix       = span.getAttribute(ATTR.suffix)       ?? '';
    const multiline    = span.getAttribute(ATTR.multiline)    ?? '0';
    const fontSize     = span.getAttribute(ATTR.fontSize)     ?? '0';
    const textAlign    = span.getAttribute(ATTR.textAlign)    ?? 'left';
    const fontFamily   = span.getAttribute(ATTR.fontFamily)   ?? '';
    const sizeFixed    = span.getAttribute(ATTR.sizeFixed)    ?? '0';
    const fieldType    = span.getAttribute(ATTR.fieldType)    ?? 'text';
    const numberFormat = span.getAttribute(ATTR.numberFormat) ?? 'none';
    const dateFormat   = span.getAttribute(ATTR.dateFormat)   ?? 'YYYY-MM-DD';
    const label        = input.placeholder;
    const isNumber     = fieldType === 'number';
    const isDate       = fieldType === 'date';

    // ── 공통 스타일 헬퍼 ──────────────────────────────────────────
    const inputStyle  = 'width:100%;box-sizing:border-box;padding:4px 7px;border:1px solid #D1D5DB;border-radius:3px;font-size:13px;outline:none;background:#fff;color:#111;';
    const selectStyle = inputStyle;
    const fsLabel     = fontSize === '0' ? '상속' : fontSize;
    const lbl = (text: string): string =>
      `<label style="font-size:12px;color:#6B7280;white-space:nowrap;">${text}</label>`;
    const opt = (val: string, cur: string, text: string): string =>
      `<option value="${val}"${val === cur ? ' selected' : ''}>${text}</option>`;

    const hdrStyle  = 'display:flex;align-items:center;gap:5px;padding:6px 12px;background:#F9FAFB;border-top:1px solid #E5E7EB;font-size:11px;font-weight:600;color:#6B7280;cursor:pointer;user-select:none;-webkit-user-select:none;letter-spacing:0.04em;';
    const bodyStyle = 'padding:8px 12px;display:grid;grid-template-columns:108px 1fr;gap:6px 10px;align-items:center;';

    // ── 타입별 포맷 행 ─────────────────────────────────────────────
    const formatRow = isNumber ? `
      ${lbl('숫자 표시 형식')}
      <select id="pf-numformat" style="${selectStyle}">
        ${NUMBER_FORMAT_LABELS.map(([v, t]) => opt(v, numberFormat, t)).join('')}
      </select>` : isDate ? `
      ${lbl('날짜 표시 형식')}
      <select id="pf-dateformat" style="${selectStyle}">
        ${DATE_FORMAT_LABELS.map(([v, t]) => opt(v, dateFormat, t)).join('')}
      </select>` : '';

    // ── 팝업 HTML ─────────────────────────────────────────────────
    const popup = ownerDoc.createElement('div');
    popup.className = 'poa-field-popup';
    popup.style.cssText = [
      'position:fixed',
      `left:${Math.round(rect.left)}px`,
      `top:${Math.round(rect.bottom + 4)}px`,
      'width:300px',
      'visibility:hidden',
      'background:#fff',
      'border:1px solid #E5E7EB',
      'border-radius:8px',
      'box-shadow:0 4px 20px rgba(0,0,0,.18)',
      'z-index:99999',
      'font-size:13px',
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif',
      'overflow:hidden',
    ].join(';');

    popup.innerHTML = `
<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #E5E7EB;font-weight:600;color:#111827;font-size:13px;">
  <span>${label}</span>
  <button id="pf-close" style="border:none;background:transparent;font-size:16px;cursor:pointer;color:#9CA3AF;padding:0 4px;line-height:1;" title="닫기">✕</button>
</div>

<div class="pf-sec">
  <div class="pf-sec-hdr" data-sec="value" style="${hdrStyle}">▾ 값 설정</div>
  <div id="pf-body-value" style="${bodyStyle}">
    ${formatRow}
    ${lbl('기본값')}
    <input id="pf-value" type="${input.type}" value="${input.value}" placeholder="${label}" style="${inputStyle}">
  </div>
</div>

<div class="pf-sec">
  <div class="pf-sec-hdr" data-sec="display" style="${hdrStyle}">▾ 표시 설정</div>
  <div id="pf-body-display" style="${bodyStyle}">
    ${lbl('앞에 붙일 텍스트')}
    <input id="pf-prefix" type="text" value="${prefix}" style="${inputStyle}">
    ${lbl('뒤에 붙일 텍스트')}
    <input id="pf-suffix" type="text" value="${suffix}" style="${inputStyle}">
    ${lbl('줄바꿈 허용')}
    <select id="pf-multiline" style="${selectStyle}">
      ${opt('0', multiline, '사용 안 함')}${opt('1', multiline, '사용')}
    </select>
  </div>
</div>

<div class="pf-sec">
  <div class="pf-sec-hdr" data-sec="font" style="${hdrStyle}">▾ 글자 설정</div>
  <div id="pf-body-font" style="${bodyStyle}">
    ${lbl('글자 크기')}
    <div style="display:flex;align-items:center;gap:6px;">
      <input id="pf-fontsize" type="range" min="0" max="72" value="${fontSize}" style="flex:1;accent-color:#3B82F6;">
      <span id="pf-fontsize-val" style="font-size:12px;color:#374151;min-width:28px;text-align:right;">${fsLabel}</span>
    </div>
    ${lbl('정렬 방식')}
    <select id="pf-align" style="${selectStyle}">
      ${opt('left','','왼쪽')}${opt('center','','가운데')}
      ${opt('right','','오른쪽')}${opt('justify','','양쪽')}
    </select>
    ${lbl('글꼴')}
    <select id="pf-font" style="${selectStyle}">
      ${opt('',               fontFamily, '문서 기본값')}
      ${opt("'Dotum'",        fontFamily, '돋움체')}
      ${opt("'Gulim'",        fontFamily, '굴림체')}
      ${opt("'Malgun Gothic'",fontFamily, '맑은 고딕')}
      ${opt("'Batang'",       fontFamily, '바탕체')}
      ${opt("'Arial'",        fontFamily, 'Arial')}
    </select>
    ${lbl('크기 고정')}
    <select id="pf-size-fixed" style="${selectStyle}">
      ${opt('0', sizeFixed, '사용 안 함')}${opt('1', sizeFixed, '사용')}
    </select>
  </div>
</div>`;

    // 텍스트 정렬 옵션 직접 설정 (선택 값 누락 방지)
    (popup.querySelector('#pf-align') as HTMLSelectElement).value = textAlign;

    ownerDoc.body.appendChild(popup);
    this.popupEl = popup;

    // 뷰포트 경계 보정 (실제 크기 측정 후 위치 결정)
    requestAnimationFrame(() => {
      if (!this.popupEl) return;
      const win = ownerDoc.defaultView;
      if (!win) return;
      const vw  = win.innerWidth;
      const vh  = win.innerHeight;
      const pr  = this.popupEl.getBoundingClientRect();

      let left = rect.left;
      let top  = rect.bottom + 4;

      if (top + pr.height > vh) top  = rect.top - pr.height - 4;
      if (left + pr.width  > vw) left = rect.right - pr.width;
      left = Math.max(4, left);
      top  = Math.max(4, top);

      this.popupEl.style.left       = `${Math.round(left)}px`;
      this.popupEl.style.top        = `${Math.round(top)}px`;
      this.popupEl.style.visibility = 'visible';
    });

    // ── 이벤트 바인딩 ──────────────────────────────────────────────
    const q = <T extends HTMLElement>(id: string) => popup.querySelector<T>(`#${id}`)!;

    q<HTMLInputElement>('pf-value').addEventListener('input', (ev) => {
      input.value = (ev.target as HTMLInputElement).value;
    });
    q<HTMLInputElement>('pf-prefix').addEventListener('input', (ev) => {
      span.setAttribute(ATTR.prefix, (ev.target as HTMLInputElement).value);
    });
    q<HTMLInputElement>('pf-suffix').addEventListener('input', (ev) => {
      span.setAttribute(ATTR.suffix, (ev.target as HTMLInputElement).value);
    });
    q<HTMLSelectElement>('pf-multiline').addEventListener('change', (ev) => {
      span.setAttribute(ATTR.multiline, (ev.target as HTMLSelectElement).value);
    });
    const pfFontSize = q<HTMLInputElement>('pf-fontsize');
    const pfFsVal    = q<HTMLElement>('pf-fontsize-val');
    pfFontSize.addEventListener('input', () => {
      const v = pfFontSize.value;
      pfFsVal.textContent = v === '0' ? '상속' : v;
      span.setAttribute(ATTR.fontSize, v);
      input.style.fontSize = v === '0' ? 'inherit' : `${v}px`;
    });
    q<HTMLSelectElement>('pf-align').addEventListener('change', (ev) => {
      const v = (ev.target as HTMLSelectElement).value;
      span.setAttribute(ATTR.textAlign, v);
      input.style.textAlign = v;
    });
    q<HTMLSelectElement>('pf-font').addEventListener('change', (ev) => {
      const v = (ev.target as HTMLSelectElement).value;
      span.setAttribute(ATTR.fontFamily, v);
      input.style.fontFamily = v || 'inherit';
    });
    q<HTMLSelectElement>('pf-size-fixed').addEventListener('change', (ev) => {
      span.setAttribute(ATTR.sizeFixed, (ev.target as HTMLSelectElement).value);
    });
    if (isNumber) {
      q<HTMLSelectElement>('pf-numformat').addEventListener('change', (ev) => {
        span.setAttribute(ATTR.numberFormat, (ev.target as HTMLSelectElement).value);
      });
    }
    if (isDate) {
      q<HTMLSelectElement>('pf-dateformat').addEventListener('change', (ev) => {
        span.setAttribute(ATTR.dateFormat, (ev.target as HTMLSelectElement).value);
      });
    }

    // 섹션 접기/펼치기
    popup.querySelectorAll<HTMLElement>('.pf-sec-hdr').forEach((hdr) => {
      hdr.addEventListener('click', () => {
        const secId  = hdr.dataset.sec;
        const body   = popup.querySelector<HTMLElement>(`#pf-body-${secId}`);
        if (!body) return;
        const open   = body.style.display !== 'none';
        body.style.display  = open ? 'none' : 'grid';
        hdr.textContent = (open ? '▸ ' : '▾ ') + hdr.textContent!.slice(2);
      });
    });

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
