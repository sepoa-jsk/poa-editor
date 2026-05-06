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

const FONT_SIZE_OPTIONS: ReadonlyArray<readonly [string, string]> = [
  ['0',  '상속'],
  ['8',  '8px'],  ['9',  '9px'],  ['10', '10px'], ['11', '11px'],
  ['12', '12px'], ['13', '13px'], ['14', '14px'], ['15', '15px'],
  ['16', '16px'], ['18', '18px'], ['20', '20px'], ['22', '22px'],
  ['24', '24px'], ['28', '28px'], ['32', '32px'], ['36', '36px'],
  ['40', '40px'], ['48', '48px'], ['56', '56px'], ['64', '64px'], ['72', '72px'],
];

const FONT_OPTIONS: ReadonlyArray<readonly [string, string]> = [
  ['',                    '문서 기본값'],
  ["'Noto Sans KR'",      'Noto Sans KR'],
  ["'Roboto'",            'Roboto'],
  ["'Malgun Gothic'",     '맑은 고딕'],
  ["'Dotum'",             '돋움체'],
  ["'Gulim'",             '굴림체'],
  ["'Batang'",            '바탕체'],
  ["'Arial'",             'Arial'],
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

// 타입 배지 텍스트
const TYPE_BADGE: Record<string, string> = { text: 'T', number: '#', date: '📅' };

// 텍스트 / 여러 줄 아이콘
const ICON_TEXT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="9" width="18" height="6" rx="2"/></svg>`;
const ICON_MULTI = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="15" x2="13" y2="15"/></svg>`;

// 팝업 공통 CSS (한 번만 주입)
const POPUP_STYLE_ID = 'poa-field-popup-style';
function injectPopupStyles(doc: Document): void {
  if (doc.getElementById(POPUP_STYLE_ID)) return;
  const s = doc.createElement('style');
  s.id = POPUP_STYLE_ID;
  s.textContent = `
.poa-field-popup *{box-sizing:border-box;}
.poa-field-popup .pf-input,.poa-field-popup .pf-select{
  width:100%;border:1.5px solid #E5E7EB;border-radius:6px;
  padding:7px 10px;font-size:13px;color:#111827;background:#fff;
  outline:none;font-family:inherit;transition:border-color .15s;
}
.poa-field-popup .pf-input:focus,.poa-field-popup .pf-select:focus{
  border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.1);
}
.poa-field-popup .pf-field{margin-bottom:10px;}
.poa-field-popup .pf-field-lbl{
  display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:4px;
}
.poa-field-popup .pf-row2{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.poa-field-popup .pf-type-btn{
  display:flex;align-items:center;justify-content:center;gap:5px;
  flex:1;height:34px;border-radius:6px;cursor:pointer;
  font-size:12px;font-weight:600;
  border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;
  transition:all .12s;font-family:inherit;
}
.poa-field-popup .pf-type-btn.active{
  border-color:#2563EB;background:#EFF6FF;color:#2563EB;
}
.poa-field-popup .pf-type-btn:hover:not(.active){
  background:#F9FAFB;border-color:#D1D5DB;
}
.poa-field-popup .pf-sec-hdr{
  display:flex;align-items:center;gap:4px;width:100%;
  padding:10px 14px 5px;border:none;background:none;cursor:pointer;
  font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:#9CA3AF;text-align:left;font-family:inherit;
}
.poa-field-popup .pf-sec-hdr:hover{color:#6B7280;}
.poa-field-popup .pf-sec-body{padding:2px 14px 10px;}
.poa-field-popup .pf-divider{height:1px;background:#F3F4F6;margin:0;}
`;
  doc.head.appendChild(s);
}

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
    injectPopupStyles(ownerDoc);
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
    const dateFormat   = span.getAttribute(ATTR.dateFormat)   ?? 'YYYY-MM-DD';
    const label        = input.placeholder;
    const isText       = fieldType === 'text';
    const isNumber     = fieldType === 'number';
    const isDate       = fieldType === 'date';

    const opt = (val: string, cur: string, text: string): string =>
      `<option value="${val}"${val === cur ? ' selected' : ''}>${text}</option>`;

    // 글자 크기 드롭다운 — 현재 값이 리스트에 없으면 앞에 추가
    const fsInList = FONT_SIZE_OPTIONS.some(([v]) => v === fontSize);
    const fsExtra  = (!fsInList && fontSize !== '0')
      ? `<option value="${fontSize}" selected>${fontSize}px</option>` : '';
    const fsOptions = FONT_SIZE_OPTIONS.map(([v, t]) => opt(v, fontSize, t)).join('');

    // 타입별 포맷 행
    const formatRow = isNumber ? `
      <div class="pf-field">
        <span class="pf-field-lbl">숫자 표시 형식</span>
        <select id="pf-numformat" class="pf-select">
          ${NUMBER_FORMAT_LABELS.map(([v, t]) => opt(v, numberFormat, t)).join('')}
        </select>
      </div>` : isDate ? `
      <div class="pf-field">
        <span class="pf-field-lbl">날짜 표시 형식</span>
        <select id="pf-dateformat" class="pf-select">
          ${DATE_FORMAT_LABELS.map(([v, t]) => opt(v, dateFormat, t)).join('')}
        </select>
      </div>` : '';

    // 텍스트 서브타입 카드 (text 타입만)
    const typeCards = isText ? `
      <div style="display:flex;gap:8px;padding:8px 14px 10px;">
        <button class="pf-type-btn${multiline === '0' ? ' active' : ''}" data-multiline="0">
          ${ICON_TEXT} 텍스트
        </button>
        <button class="pf-type-btn${multiline === '1' ? ' active' : ''}" data-multiline="1">
          ${ICON_MULTI} 여러 줄
        </button>
      </div>
      <div class="pf-divider"></div>` : '';

    // ── 팝업 HTML ─────────────────────────────────────────────────
    const popup = ownerDoc.createElement('div');
    popup.className = 'poa-field-popup';
    popup.style.cssText = [
      'position:fixed',
      `left:${Math.round(rect.left)}px`,
      `top:${Math.round(rect.bottom + 4)}px`,
      'width:360px',
      'visibility:hidden',
      'background:#fff',
      'border:1px solid #E5E7EB',
      'border-radius:10px',
      'box-shadow:0 8px 32px rgba(0,0,0,.18)',
      'z-index:99999',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      'font-size:13px',
      'overflow:hidden',
    ].join(';');

    popup.innerHTML = `
<!-- 헤더 -->
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #F3F4F6;">
  <div style="display:flex;align-items:center;gap:8px;">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#EFF6FF;border-radius:6px;color:#2563EB;font-size:11px;font-weight:700;flex-shrink:0;">${TYPE_BADGE[fieldType] ?? 'T'}</span>
    <span style="font-size:14px;font-weight:700;color:#111827;">${label}</span>
  </div>
  <button id="pf-close" style="border:none;background:transparent;font-size:18px;cursor:pointer;color:#9CA3AF;padding:0 4px;line-height:1;border-radius:4px;" title="닫기">✕</button>
</div>

${typeCards}

<!-- 값 설정 섹션 -->
<button class="pf-sec-hdr" data-sec="value"><span class="pf-sec-arrow">▾</span> 값 설정</button>
<div id="pf-body-value" class="pf-sec-body">
  ${formatRow}
  <div class="pf-field">
    <span class="pf-field-lbl">기본값</span>
    <input id="pf-value" type="${input.type}" value="${input.value}" placeholder="${label}" class="pf-input">
  </div>
</div>
<div class="pf-divider"></div>

<!-- 표시 설정 섹션 -->
<button class="pf-sec-hdr" data-sec="display"><span class="pf-sec-arrow">▾</span> 표시 설정</button>
<div id="pf-body-display" class="pf-sec-body">
  <div class="pf-row2">
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">앞에 붙일 텍스트</span>
      <input id="pf-prefix" type="text" value="${prefix}" class="pf-input">
    </div>
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">뒤에 붙일 텍스트</span>
      <input id="pf-suffix" type="text" value="${suffix}" class="pf-input">
    </div>
  </div>
</div>
<div class="pf-divider"></div>

<!-- 글자 설정 섹션 -->
<button class="pf-sec-hdr" data-sec="font"><span class="pf-sec-arrow">▾</span> 글자 설정</button>
<div id="pf-body-font" class="pf-sec-body">
  <div class="pf-row2">
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">글자 크기</span>
      <select id="pf-fontsize" class="pf-select">${fsExtra}${fsOptions}</select>
    </div>
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">정렬 방식</span>
      <select id="pf-align" class="pf-select">
        ${opt('left','','왼쪽')}${opt('center','','가운데')}
        ${opt('right','','오른쪽')}${opt('justify','','양쪽')}
      </select>
    </div>
  </div>
  <div style="height:8px;"></div>
  <div class="pf-row2">
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">글꼴</span>
      <select id="pf-font" class="pf-select">
        ${FONT_OPTIONS.map(([v, t]) => opt(v, fontFamily, t)).join('')}
      </select>
    </div>
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">크기 고정</span>
      <select id="pf-size-fixed" class="pf-select">
        ${opt('0', sizeFixed, '사용 안 함')}${opt('1', sizeFixed, '사용')}
      </select>
    </div>
  </div>
</div>`;

    // 텍스트 정렬 옵션 직접 설정 (선택 값 누락 방지)
    (popup.querySelector('#pf-align') as HTMLSelectElement).value = textAlign;

    ownerDoc.body.appendChild(popup);
    this.popupEl = popup;

    // 뷰포트 경계 보정
    requestAnimationFrame(() => {
      if (!this.popupEl) return;
      const win = ownerDoc.defaultView;
      if (!win) return;
      const vw = win.innerWidth;
      const vh = win.innerHeight;
      const pr = this.popupEl.getBoundingClientRect();

      let left = rect.left;
      let top  = rect.bottom + 4;
      if (top  + pr.height > vh) top  = rect.top - pr.height - 4;
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
    q<HTMLSelectElement>('pf-fontsize').addEventListener('change', (ev) => {
      const v = (ev.target as HTMLSelectElement).value;
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

    // 텍스트 서브타입 카드 클릭
    if (isText) {
      popup.querySelectorAll<HTMLButtonElement>('.pf-type-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          popup.querySelectorAll<HTMLButtonElement>('.pf-type-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const ml = btn.dataset.multiline ?? '0';
          span.setAttribute(ATTR.multiline, ml);
        });
      });
    }

    // 섹션 접기/펼치기
    popup.querySelectorAll<HTMLButtonElement>('.pf-sec-hdr').forEach((hdr) => {
      hdr.addEventListener('click', () => {
        const secId = hdr.dataset.sec;
        const body  = popup.querySelector<HTMLElement>(`#pf-body-${secId}`);
        const arrow = hdr.querySelector<HTMLElement>('.pf-sec-arrow');
        if (!body || !arrow) return;
        const open       = body.style.display !== 'none';
        body.style.display = open ? 'none' : 'block';
        arrow.textContent  = open ? '▸' : '▾';
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
