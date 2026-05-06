import type { DocumentField } from './DocumentFields.js';

const ATTR = {
  fieldId:      'data-field-id',
  placeholder:  'data-placeholder',
  label:        'data-label',
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
  rawValue:     'data-raw-value',
  dataWidth:    'data-width',
  dataHeight:   'data-height',
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
  ['0',  '문서 기본값'],
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

const TYPE_BADGE: Record<string, string> = { text: 'T', textarea: '☰', number: '#', date: '📅' };

const BASE_FIELD_STYLE = [
  'border:1px solid #93C5FD',
  'border-radius:4px',
  'font-size:inherit',
  'background:#EFF6FF',
  'color:#1E40AF',
  'min-width:60px',
  'max-width:100%',
  'outline:none',
  'font-family:inherit',
  'box-sizing:border-box',
  'margin:0',
].join(';');

const FIELD_INPUT_STYLE =
  `${BASE_FIELD_STYLE};display:inline-block;padding:1px 4px;vertical-align:middle;` +
  `resize:horizontal;height:auto;`;

const FIELD_TEXTAREA_STYLE =
  `${BASE_FIELD_STYLE};display:inline-block;padding:2px 4px;vertical-align:middle;resize:both;` +
  `max-height:400px;line-height:inherit;min-height:1.5em;height:auto;`;

// ── 숫자 포맷 헬퍼 ──────────────────────────────────────────────────────────

const KOR_NUMS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

function groupToKorean(n: number): string {
  if (n <= 0 || n > 9999) return '';
  let result = '';
  const d = [Math.floor(n / 1000), Math.floor((n % 1000) / 100), Math.floor((n % 100) / 10), n % 10];
  const units = ['천', '백', '십', ''];
  for (let i = 0; i < 4; i++) {
    if (d[i] === 0) continue;
    const digit = (d[i] === 1 && i < 3) ? '' : KOR_NUMS[d[i]];
    result += digit + units[i];
  }
  return result;
}

function toKoreanUnits(num: number): string {
  if (num === 0) return '0';
  const sign = num < 0 ? '-' : '';
  let n = Math.abs(Math.floor(num));
  const parts: string[] = [];
  const groups: [number, string][] = [
    [1_000_000_000_000, '조'],
    [100_000_000, '억'],
    [10_000, '만'],
  ];
  for (const [unit, label] of groups) {
    const q = Math.floor(n / unit);
    if (q > 0) { parts.push(q.toLocaleString('ko-KR') + label); n %= unit; }
  }
  if (n > 0) parts.push(n.toLocaleString('ko-KR'));
  return sign + parts.join(' ');
}

function toKoreanFull(num: number): string {
  if (num === 0) return '영원';
  const sign = num < 0 ? '마이너스 ' : '';
  let n = Math.abs(Math.floor(num));
  const parts: string[] = [];
  const groups: [number, string][] = [
    [1_000_000_000_000, '조'],
    [100_000_000, '억'],
    [10_000, '만'],
  ];
  for (const [unit, label] of groups) {
    const q = Math.floor(n / unit);
    if (q > 0) { parts.push(groupToKorean(q) + label); n %= unit; }
  }
  if (n > 0) parts.push(groupToKorean(n));
  return sign + parts.join('') + '원';
}

const DATE_FORMAT_PLACEHOLDER: Record<string, string> = {
  'YYYY-MM-DD':     '예) 2026-12-31',
  'YYYY년MM월DD일': '예) 2026년 12월 31일',
  'YYYY. MM. DD':   '예) 2026. 12. 31',
  'MM/DD/YYYY':     '예) 12/31/2026',
  'DD-MM-YYYY':     '예) 31-12-2026',
};

/**
 * 날짜 입력값에서 숫자만 추출해 YYYYMMDD 파싱 후 지정 형식으로 변환.
 * 20261231 / 2026-12-31 / 2026.12.31 / 2026/12/31 모두 지원.
 * 파싱 실패 시 raw 그대로 반환.
 */
export function applyDateFormat(raw: string, format: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 8) return raw;
  const yyyy = digits.slice(0, 4);
  const mm   = digits.slice(4, 6);
  const dd   = digits.slice(6, 8);
  const y = Number(yyyy), mo = Number(mm), d = Number(dd);
  if (y < 1000 || y > 9999 || mo < 1 || mo > 12 || d < 1 || d > 31) return raw;
  switch (format) {
    case 'YYYY-MM-DD':     return `${yyyy}-${mm}-${dd}`;
    case 'YYYY년MM월DD일': return `${yyyy}년 ${mm}월 ${dd}일`;
    case 'YYYY. MM. DD':   return `${yyyy}. ${mm}. ${dd}`;
    case 'MM/DD/YYYY':     return `${mm}/${dd}/${yyyy}`;
    case 'DD-MM-YYYY':     return `${dd}-${mm}-${yyyy}`;
    default: return raw;
  }
}

export function formatNumber(raw: string, format: string): string {
  const clean = raw.replace(/[,\s]/g, '');
  const num   = parseFloat(clean);
  if (!clean || isNaN(num)) return raw;

  switch (format) {
    case 'comma':      return num.toLocaleString('ko-KR');
    case 'comma_won':  return num.toLocaleString('ko-KR') + '원';
    case 'korean':     return toKoreanUnits(num);
    case 'korean_full': return toKoreanFull(num);
    case 'decimal2':
      return num.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'percent':
      return num.toLocaleString('ko-KR', { maximumFractionDigits: 1 }) + '%';
    case 'percent2':
      return num.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
    default: return raw;
  }
}

// ── 팝업 CSS 주입 ───────────────────────────────────────────────────────────

const POPUP_STYLE_ID = 'poa-field-popup-style';
function injectPopupStyles(doc: Document): void {
  if (doc.getElementById(POPUP_STYLE_ID)) return;
  const s = doc.createElement('style');
  s.id = POPUP_STYLE_ID;
  s.textContent = `
.poa-field-popup *{box-sizing:border-box;margin:0;padding:0;}
.poa-field-popup .pf-input,.poa-field-popup .pf-select,.poa-field-popup .pf-textarea{
  width:100%;border:1.5px solid #E5E7EB;border-radius:7px;
  padding:8px 10px;font-size:13px;color:#111827;background:#fff;
  outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s;
}
.poa-field-popup .pf-textarea{resize:vertical;min-height:60px;}
.poa-field-popup .pf-input:focus,.poa-field-popup .pf-select:focus,.poa-field-popup .pf-textarea:focus{
  border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.15);
}
.poa-field-popup .pf-field{margin-bottom:10px;}
.poa-field-popup .pf-field-lbl{
  display:block;font-size:11px;font-weight:700;color:#6B7280;
  letter-spacing:.05em;text-transform:uppercase;margin-bottom:5px;
}
.poa-field-popup .pf-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.poa-field-popup .pf-sec{border-top:1px solid #F3F4F6;}
.poa-field-popup .pf-sec-hdr{
  display:flex;align-items:center;gap:5px;width:100%;
  padding:9px 16px 7px;border:none;background:none;cursor:pointer;
  font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:#9CA3AF;text-align:left;font-family:inherit;
  transition:color .12s;
}
.poa-field-popup .pf-sec-hdr:hover{color:#6B7280;}
.poa-field-popup .pf-sec-body{padding:0 16px 12px;}
.poa-field-popup .pf-align-btn{
  display:inline-flex;align-items:center;justify-content:center;
  width:36px;height:34px;border-radius:7px;cursor:pointer;
  border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;
  transition:all .12s;font-family:inherit;
}
.poa-field-popup .pf-align-btn.active{
  border-color:#3B82F6;background:#EFF6FF;color:#2563EB;
}
.poa-field-popup .pf-align-btn:hover:not(.active){
  background:#F9FAFB;border-color:#D1D5DB;
}
.poa-field-popup .pf-move-btn{
  display:inline-flex;align-items:center;justify-content:center;
  width:24px;height:24px;border-radius:5px;cursor:pointer;
  border:1px solid #E5E7EB;background:#F9FAFB;color:#6B7280;
  font-size:13px;transition:all .1s;font-family:inherit;
  line-height:1;
}
.poa-field-popup .pf-move-btn:hover{
  background:#EFF6FF;border-color:#93C5FD;color:#2563EB;
}
.poa-field{display:inline-flex;align-items:center;position:relative;vertical-align:middle;}
.poa-field-drag-handle{
  display:inline-flex;align-items:center;justify-content:center;
  width:12px;cursor:grab;color:#93C5FD;font-size:11px;
  vertical-align:middle;user-select:none;opacity:0;transition:opacity .15s;
  padding:0;line-height:1;
}
.poa-field-drag-handle:active{cursor:grabbing;}
.poa-field:hover .poa-field-drag-handle{opacity:1;}
.poa-field.poa-field-dragging{opacity:.5;}
.poa-field-resize-handle{
  position:absolute;right:0;bottom:0;
  width:8px;height:8px;
  cursor:se-resize;
  background:linear-gradient(135deg,transparent 50%,#93C5FD 50%);
  opacity:0;transition:opacity .15s;
  flex-shrink:0;
}
.poa-field:hover .poa-field-resize-handle{opacity:1;}
`;
  doc.head.appendChild(s);
}

const ALIGN_ICONS: Record<string, string> = {
  left: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="3" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`,
  center: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="5" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`,
  right: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="7" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`,
};

/**
 * 에디터에 문서 양식 필드(<span.poa-field>)를 삽입하고
 * 필드 클릭 시 속성 팝업을 표시한다.
 */
export class FieldInserter {
  private contentEl:        HTMLElement | null = null;
  private popupEl:          HTMLElement | null = null;
  private dragCleanup:      (() => void) | null = null;
  private lastInsertedEl:   HTMLElement | null = null;

  private readonly clickHandler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('poa-field-input')) return;
    e.preventDefault();
    e.stopPropagation();
    this.openPopup(target);
  };

  private readonly handleMouseDown = (e: MouseEvent): void => {
    const handle = (e.target as HTMLElement).closest<HTMLElement>('.poa-field-drag-handle');
    if (!handle) return;
    const span = handle.closest<HTMLElement>('.poa-field');
    if (!span) return;
    e.preventDefault();
    this.startFieldDrag(span, e);
  };

  private startFieldDrag(span: HTMLElement, startEv: MouseEvent): void {
    const ownerDoc = span.ownerDocument;
    const ghost = ownerDoc.createElement('div');
    ghost.textContent = span.querySelector('.poa-field-input')?.getAttribute('placeholder') ?? '';
    ghost.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'z-index:99999',
      'background:#EFF6FF',
      'border:1.5px dashed #3B82F6',
      'border-radius:4px',
      'padding:2px 8px',
      'font-size:12px',
      'color:#1E40AF',
      'white-space:nowrap',
      'opacity:0.85',
      `left:${startEv.clientX + 12}px`,
      `top:${startEv.clientY + 8}px`,
    ].join(';');
    ownerDoc.body.appendChild(ghost);
    span.style.opacity = '0.4';

    const onMove = (mv: MouseEvent): void => {
      ghost.style.left = `${mv.clientX + 12}px`;
      ghost.style.top  = `${mv.clientY + 8}px`;
    };

    const onUp = (up: MouseEvent): void => {
      ownerDoc.removeEventListener('mousemove', onMove);
      ownerDoc.removeEventListener('mouseup',   onUp);
      ghost.remove();
      span.style.opacity = '';

      if (!this.contentEl) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = ownerDoc as any;
      let range: Range | null = null;
      if (typeof doc.caretRangeFromPoint === 'function') {
        range = doc.caretRangeFromPoint(up.clientX, up.clientY) as Range | null;
      } else if (typeof doc.caretPositionFromPoint === 'function') {
        const pos = doc.caretPositionFromPoint(up.clientX, up.clientY) as { offsetNode: Node; offset: number } | null;
        if (pos) {
          range = (ownerDoc as Document).createRange();
          range.setStart(pos.offsetNode, pos.offset);
          range.collapse(true);
        }
      }
      if (!range) return;
      if (span.contains(range.startContainer)) return;
      if (!this.contentEl.contains(range.startContainer)) return;

      span.remove();
      range.insertNode(span);
      range.setStartAfter(span);
      range.collapse(true);
      const sel = ownerDoc.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      this.contentEl.dispatchEvent(new Event('input', { bubbles: true }));
    };

    ownerDoc.addEventListener('mousemove', onMove);
    ownerDoc.addEventListener('mouseup',   onUp);
  }

  attach(contentEl: HTMLElement): void {
    this.detach();
    this.contentEl = contentEl;
    contentEl.addEventListener('click',     this.clickHandler);
    contentEl.addEventListener('mousedown', this.handleMouseDown);
  }

  detach(): void {
    if (this.contentEl) {
      this.contentEl.removeEventListener('click',     this.clickHandler);
      this.contentEl.removeEventListener('mousedown', this.handleMouseDown);
      this.contentEl = null;
    }
    this.closePopup();
  }

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
    span.setAttribute(ATTR.label,       field.label);
    span.setAttribute(ATTR.prefix,      '');
    span.setAttribute(ATTR.suffix,      '');
    span.setAttribute(ATTR.fieldType,   field.type);
    span.setAttribute(ATTR.multiline, '1');
    if (field.defaultNumberFormat && field.type === 'number') {
      span.setAttribute(ATTR.numberFormat, field.defaultNumberFormat);
    }
    if (field.type === 'date') {
      span.setAttribute(ATTR.dateFormat, 'YYYY-MM-DD');
    }
    span.contentEditable = 'false';
    span.style.cssText = 'margin:0;padding:0;display:inline-flex;align-items:center;vertical-align:middle;max-width:100%;position:relative;line-height:1;';

    const handle = ownerDoc.createElement('span');
    handle.className = 'poa-field-drag-handle';
    handle.textContent = '⠿';
    handle.title = '드래그하여 이동';

    const fieldEl: HTMLElement = this.createTextarea(ownerDoc, field.label, field.id);
    (fieldEl as HTMLTextAreaElement).rows = 1;

    if (field.type === 'date') fieldEl.setAttribute('data-input-type', 'date');

    const resizeHandle = ownerDoc.createElement('span');
    resizeHandle.className = 'poa-field-resize-handle';
    resizeHandle.title = '크기 조절';

    span.appendChild(handle);
    span.appendChild(fieldEl);
    span.appendChild(resizeHandle);

    // td/th 안에 삽입 시 빈 노드(<br>, 빈 <p>, 공백 텍스트)로 인한 줄 분리 방지
    const containerCell = this.findContainerCell(range);
    if (containerCell && this.isCellEffectivelyEmpty(containerCell)) {
      // 빈 셀: 기존 노드 전체 제거 후 span 직속 appendChild
      while (containerCell.firstChild) containerCell.removeChild(containerCell.firstChild);
      containerCell.appendChild(span);
    } else {
      range.deleteContents();
      range.insertNode(span);
      // 삽입 후 셀 내 잔여 빈 노드 제거
      if (containerCell) this.cleanCellAfterInsert(containerCell, span);
    }

    range.setStartAfter(span);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);

    this.attachResizeObserver(fieldEl, span);
    this.attachResizeDrag(resizeHandle, fieldEl, span);
    this.lastInsertedEl = fieldEl;
  }

  private createInput(doc: Document, placeholder: string, fieldId: string): HTMLInputElement {
    const el = doc.createElement('input');
    el.type        = 'text';
    el.className   = 'poa-field-input';
    el.placeholder = placeholder;
    el.setAttribute(ATTR.fieldId, fieldId);
    el.style.cssText = FIELD_INPUT_STYLE;
    return el;
  }

  private createTextarea(doc: Document, placeholder: string, fieldId: string): HTMLTextAreaElement {
    const el = doc.createElement('textarea');
    el.className   = 'poa-field-input';
    el.placeholder = placeholder;
    el.setAttribute(ATTR.fieldId, fieldId);
    el.style.cssText = FIELD_TEXTAREA_STYLE;
    return el;
  }

  /** range가 포함된 가장 가까운 td/th 반환 */
  private findContainerCell(range: Range): HTMLTableCellElement | null {
    let node: Node | null = range.commonAncestorContainer;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName;
        if (tag === 'TD' || tag === 'TH') return node as HTMLTableCellElement;
      }
      node = node.parentNode;
    }
    return null;
  }

  /** td/th가 실질적으로 비어있는지 확인 (<br>, 공백 텍스트, 빈 <p>만 있는 경우) */
  private isCellEffectivelyEmpty(cell: HTMLElement): boolean {
    if ((cell.textContent ?? '').trim() !== '') return false;
    return Array.from(cell.childNodes).every((node) => {
      if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? '').trim() === '';
      const tag = (node as Element).tagName;
      if (tag === 'BR') return true;
      if (tag === 'P') return ((node as HTMLElement).textContent ?? '').trim() === '';
      return false;
    });
  }

  /** 삽입 후 td/th 내 잔여 빈 노드 제거 (span 내부는 보존) */
  private cleanCellAfterInsert(cell: HTMLElement, span: HTMLElement): void {
    Array.from(cell.querySelectorAll('br')).forEach((br) => {
      if (!span.contains(br)) br.remove();
    });
    Array.from(cell.childNodes).forEach((node) => {
      if (node !== span && node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim() === '') {
        cell.removeChild(node);
      }
    });
    Array.from(cell.querySelectorAll('p')).forEach((p) => {
      if (!span.contains(p) && (p.textContent ?? '').trim() === '') p.remove();
    });
  }

  private attachResizeObserver(el: HTMLElement, span: HTMLElement): void {
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      span.setAttribute(ATTR.dataWidth,  String(el.offsetWidth));
      span.setAttribute(ATTR.dataHeight, String(el.offsetHeight));
    });
    ro.observe(el);
  }

  private attachResizeDrag(handle: HTMLElement, fieldEl: HTMLElement, span: HTMLElement): void {
    handle.addEventListener('mousedown', (startEv: MouseEvent) => {
      startEv.preventDefault();
      startEv.stopPropagation();
      const startX   = startEv.clientX;
      const startY   = startEv.clientY;
      const startW   = fieldEl.offsetWidth;
      const startH   = fieldEl.offsetHeight;
      const ownerDoc = handle.ownerDocument;

      // 표 셀 안에 있는 경우 최대 너비를 셀 너비로 제한
      const cell = span.closest<HTMLTableCellElement>('td,th');

      const onMove = (mv: MouseEvent): void => {
        const dx = mv.clientX - startX;
        const dy = mv.clientY - startY;
        let newW = Math.max(60, startW + dx);
        let newH = Math.max(24, startH + dy);
        if (cell) newW = Math.min(newW, cell.clientWidth - 20);
        newW = Math.min(newW, 1200);
        newH = Math.min(newH, 600);
        fieldEl.style.width  = `${newW}px`;
        fieldEl.style.height = `${newH}px`;
        span.setAttribute(ATTR.dataWidth,  String(newW));
        span.setAttribute(ATTR.dataHeight, String(newH));
      };
      const onUp = (): void => {
        ownerDoc.removeEventListener('mousemove', onMove);
        ownerDoc.removeEventListener('mouseup',   onUp);
      };
      ownerDoc.addEventListener('mousemove', onMove);
      ownerDoc.addEventListener('mouseup',   onUp);
    });
  }

  /** 마지막으로 삽입된 필드의 팝업을 열어 바로 속성을 편집할 수 있게 한다 */
  openLastInsertedPopup(): void {
    if (this.lastInsertedEl?.isConnected) {
      this.openPopup(this.lastInsertedEl);
    }
    this.lastInsertedEl = null;
  }

  // ── 속성 팝업 ──────────────────────────────────────────────────────────────

  private openPopup(el: HTMLElement): void {
    this.closePopup();

    const span = el.closest('.poa-field') as HTMLElement | null;
    if (!span) return;
    const ownerDoc = el.ownerDocument;
    injectPopupStyles(ownerDoc);
    const rect = el.getBoundingClientRect();

    const prefix       = span.getAttribute(ATTR.prefix)       ?? '';
    const suffix       = span.getAttribute(ATTR.suffix)       ?? '';
    const fontSize     = span.getAttribute(ATTR.fontSize)     ?? '0';
    const textAlign    = span.getAttribute(ATTR.textAlign)    ?? 'left';
    const fontFamily   = span.getAttribute(ATTR.fontFamily)   ?? '';
    const sizeFixed    = span.getAttribute(ATTR.sizeFixed)    ?? '0';
    const fieldType    = span.getAttribute(ATTR.fieldType)    ?? 'text';
    const multiline    = span.getAttribute(ATTR.multiline)    ?? '1';
    const numberFormat = span.getAttribute(ATTR.numberFormat) ?? 'none';
    const dateFormat   = span.getAttribute(ATTR.dateFormat)   ?? 'YYYY-MM-DD';
    const label        = el.getAttribute('placeholder') ?? '';
    const isNumber     = fieldType === 'number';
    const isDate       = fieldType === 'date';
    const isMultiline  = multiline === '1';

    const elValue = el.tagName === 'TEXTAREA'
      ? (el as HTMLTextAreaElement).value
      : (el as HTMLInputElement).value;
    const rawValue = span.getAttribute(ATTR.rawValue) ?? elValue;

    // currentEl은 multiline 토글 시 재할당되므로 let 선언
    let currentEl: HTMLInputElement | HTMLTextAreaElement =
      el as HTMLInputElement | HTMLTextAreaElement;

    // sizeFixed 상태를 요소의 resize 스타일에 즉시 동기화
    currentEl.style.resize = sizeFixed === '1' ? 'none' : (isMultiline ? 'both' : 'horizontal');

    const opt = (val: string, cur: string, text: string): string =>
      `<option value="${val}"${val === cur ? ' selected' : ''}>${text}</option>`;

    const fsInList = FONT_SIZE_OPTIONS.some(([v]) => v === fontSize);
    const fsExtra  = (!fsInList && fontSize !== '0')
      ? `<option value="${fontSize}" selected>${fontSize}px</option>` : '';
    const fsOptions = FONT_SIZE_OPTIONS.map(([v, t]) => opt(v, fontSize, t)).join('');

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

    const alignBtns = (['left', 'center', 'right'] as const).map((a) =>
      `<button class="pf-align-btn${textAlign === a ? ' active' : ''}" data-align="${a}"` +
      ` title="${a === 'left' ? '왼쪽' : a === 'center' ? '가운데' : '오른쪽'}">${ALIGN_ICONS[a]}</button>`,
    ).join('');

    const pfValueInitial = isNumber ? rawValue : isDate ? (span.getAttribute(ATTR.rawValue) ?? '') : elValue;
    const pfValuePlaceholder = isDate ? (DATE_FORMAT_PLACEHOLDER[dateFormat] ?? '예) 20261231') : label;
    const pfValueHtml = isMultiline
      ? `<textarea id="pf-value" placeholder="${label}" class="pf-textarea">${elValue}</textarea>`
      : `<input id="pf-value" type="${isNumber ? 'number' : 'text'}" value="${pfValueInitial}" placeholder="${pfValuePlaceholder}" class="pf-input">`;

    const showHeight = currentEl.tagName === 'TEXTAREA';
    const initWidth  = currentEl.offsetWidth  || parseInt(span.getAttribute(ATTR.dataWidth)  ?? '0', 10) || 120;
    const initHeight = currentEl.offsetHeight || parseInt(span.getAttribute(ATTR.dataHeight) ?? '0', 10) || 28;
    const sizeSection = `
<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="size"><span class="pf-sec-arrow">▾</span> 크기 설정</button>
  <div id="pf-body-size" class="pf-sec-body">
    <div class="pf-row2">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">가로 길이</span>
        <div style="display:flex;align-items:center;gap:4px;">
          <input id="pf-width" type="number" value="${initWidth}" min="60" max="800" step="1"
            style="width:70px;" class="pf-input">
          <span style="font-size:12px;color:#6B7280;">px</span>
        </div>
      </div>
      ${showHeight ? `
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">세로 길이</span>
        <div style="display:flex;align-items:center;gap:4px;">
          <input id="pf-height" type="number" value="${initHeight}" min="28" max="600" step="1"
            style="width:70px;" class="pf-input">
          <span style="font-size:12px;color:#6B7280;">px</span>
        </div>
      </div>` : '<div></div>'}
    </div>
  </div>
</div>`;

    // ── 팝업 DOM ────────────────────────────────────────────────────
    const POPUP_W = 320;
    const POPUP_H = 340;
    const win     = ownerDoc.defaultView;
    const vw = win ? win.innerWidth  : 1920;
    const vh = win ? win.innerHeight : 1080;
    let popupLeft = rect.left;
    let popupTop  = rect.bottom + 6;
    if (popupTop  + POPUP_H > vh) popupTop  = rect.top - POPUP_H - 6;
    if (popupLeft + POPUP_W > vw) popupLeft = rect.right - POPUP_W;
    popupLeft = Math.max(4, popupLeft);
    popupTop  = Math.max(4, popupTop);

    const popup = ownerDoc.createElement('div');
    popup.className = 'poa-field-popup';
    popup.style.cssText = [
      'position:fixed',
      `left:${Math.round(popupLeft)}px`,
      `top:${Math.round(popupTop)}px`,
      'width:320px',
      'background:#fff',
      'border:1px solid #E2E8F0',
      'border-radius:12px',
      'box-shadow:0 10px 40px rgba(0,0,0,.15),0 2px 8px rgba(0,0,0,.08)',
      'z-index:99999',
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
      'font-size:13px',
      'overflow:hidden',
    ].join(';');

    popup.innerHTML = `
<div id="pf-header" style="padding:10px 12px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #F1F5F9;gap:8px;cursor:move;">
  <div style="display:flex;align-items:center;gap:8px;min-width:0;">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;background:linear-gradient(135deg,#3B82F6,#2563EB);border-radius:7px;color:#fff;font-size:11px;font-weight:700;flex-shrink:0;">${TYPE_BADGE[fieldType] ?? 'T'}</span>
    <span style="font-size:13px;font-weight:700;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${label}</span>
  </div>
  <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
    <button class="pf-move-btn" data-dir="left"  title="왼쪽으로 이동">←</button>
    <button class="pf-move-btn" data-dir="right" title="오른쪽으로 이동">→</button>
    <button class="pf-move-btn" data-dir="up"    title="위로 이동">↑</button>
    <button class="pf-move-btn" data-dir="down"  title="아래로 이동">↓</button>
    <div style="width:1px;height:16px;background:#E5E7EB;margin:0 2px;"></div>
    <button id="pf-close" style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border:none;background:#F8FAFC;border-radius:6px;font-size:15px;cursor:pointer;color:#94A3B8;transition:all .12s;" title="닫기">✕</button>
  </div>
</div>

<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="value"><span class="pf-sec-arrow">▾</span> 값 설정</button>
  <div id="pf-body-value" class="pf-sec-body">
    ${formatRow}
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">기본값</span>
      ${pfValueHtml}
    </div>
  </div>
</div>

${sizeSection}

<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="font"><span class="pf-sec-arrow">▾</span> 글자 설정</button>
  <div id="pf-body-font" class="pf-sec-body">
    <div class="pf-row2">
      <div class="pf-field">
        <span class="pf-field-lbl">글자 크기</span>
        <select id="pf-fontsize" class="pf-select">${fsExtra}${fsOptions}</select>
      </div>
      <div class="pf-field">
        <span class="pf-field-lbl">정렬</span>
        <div style="display:flex;gap:5px;">${alignBtns}</div>
      </div>
    </div>
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
    <div style="margin-top:10px;">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">줄바꿈 허용</span>
        <select id="pf-multiline" class="pf-select">
          ${opt('0', multiline, '사용 안 함')}${opt('1', multiline, '사용')}
        </select>
      </div>
    </div>
  </div>
</div>

<div class="pf-sec">
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
</div>`;

    ownerDoc.body.appendChild(popup);
    this.popupEl = popup;

    // ── 이벤트 바인딩 ──────────────────────────────────────────────
    const q = <T extends HTMLElement>(id: string) => popup.querySelector<T>(`#${id}`)!;

    const getVal = (): string =>
      currentEl.tagName === 'TEXTAREA'
        ? (currentEl as HTMLTextAreaElement).value
        : (currentEl as HTMLInputElement).value;

    const setVal = (v: string): void => {
      if (currentEl.tagName === 'TEXTAREA') (currentEl as HTMLTextAreaElement).value = v;
      else                                  (currentEl as HTMLInputElement).value = v;
    };

    // 기본값 입력
    const pfValueEl = popup.querySelector<HTMLElement>('#pf-value')!;
    pfValueEl.addEventListener('input', (ev) => {
      const v = (ev.target as HTMLInputElement | HTMLTextAreaElement).value;
      if (isNumber) {
        span.setAttribute(ATTR.rawValue, v);
        const fmt = span.getAttribute(ATTR.numberFormat) ?? 'none';
        setVal(fmt === 'none' ? v : formatNumber(v, fmt));
      } else if (isDate) {
        span.setAttribute(ATTR.rawValue, v);
        const fmt = span.getAttribute(ATTR.dateFormat) ?? 'YYYY-MM-DD';
        setVal(v ? applyDateFormat(v, fmt) : '');
      } else {
        setVal(v);
      }
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
      currentEl.style.fontSize = v === '0' ? 'inherit' : `${v}px`;
    });
    q<HTMLSelectElement>('pf-font').addEventListener('change', (ev) => {
      const v = (ev.target as HTMLSelectElement).value;
      span.setAttribute(ATTR.fontFamily, v);
      currentEl.style.fontFamily = v || 'inherit';
    });
    q<HTMLSelectElement>('pf-size-fixed').addEventListener('change', (ev) => {
      const v = (ev.target as HTMLSelectElement).value;
      span.setAttribute(ATTR.sizeFixed, v);
      currentEl.style.resize = v === '1' ? 'none' : (currentEl.tagName === 'TEXTAREA' ? 'both' : 'horizontal');
    });

    // 줄바꿈 허용 토글: input ↔ textarea 교체
    q<HTMLSelectElement>('pf-multiline').addEventListener('change', (ev) => {
      const useMultiline = (ev.target as HTMLSelectElement).value === '1';
      const wasMultiline = currentEl.tagName === 'TEXTAREA';
      if (useMultiline === wasMultiline) return;

      const val      = getVal();
      const ph       = currentEl.getAttribute('placeholder') ?? '';
      const fldId    = span.getAttribute(ATTR.fieldId) ?? '';

      span.setAttribute(ATTR.multiline, useMultiline ? '1' : '0');

      const newEl = useMultiline
        ? this.createTextarea(ownerDoc, ph, fldId)
        : this.createInput(ownerDoc, ph, fldId);
      if (useMultiline) (newEl as HTMLTextAreaElement).rows = 3;

      // 기존 스타일 유지
      const fs = span.getAttribute(ATTR.fontSize) ?? '0';
      newEl.style.fontSize   = fs === '0' ? 'inherit' : `${fs}px`;
      const ff = span.getAttribute(ATTR.fontFamily) ?? '';
      newEl.style.fontFamily = ff || 'inherit';
      newEl.style.textAlign  = span.getAttribute(ATTR.textAlign) ?? 'left';

      // resize 허용 여부 적용
      const sf = span.getAttribute(ATTR.sizeFixed) ?? '0';
      newEl.style.resize = sf === '1' ? 'none' : (useMultiline ? 'both' : 'horizontal');

      // 크기 복원 (ResizeObserver가 저장한 값)
      const dw = span.getAttribute(ATTR.dataWidth);
      const dh = span.getAttribute(ATTR.dataHeight);
      if (dw) newEl.style.width = `${dw}px`;
      if (dh && useMultiline) newEl.style.height = `${dh}px`;

      // 값 이전 (줄바꿈 → input이면 공백 치환)
      if (useMultiline) {
        (newEl as HTMLTextAreaElement).value = val;
      } else {
        (newEl as HTMLInputElement).value = val.replace(/\n/g, ' ');
      }

      currentEl.replaceWith(newEl);
      currentEl = newEl;
      this.attachResizeObserver(newEl, span);
    });

    if (isNumber) {
      q<HTMLSelectElement>('pf-numformat').addEventListener('change', (ev) => {
        const fmt = (ev.target as HTMLSelectElement).value;
        span.setAttribute(ATTR.numberFormat, fmt);
        const raw = span.getAttribute(ATTR.rawValue) ?? '';
        setVal(fmt === 'none' ? raw : formatNumber(raw, fmt));
      });
    }
    if (isDate) {
      q<HTMLSelectElement>('pf-dateformat').addEventListener('change', (ev) => {
        const fmt = (ev.target as HTMLSelectElement).value;
        span.setAttribute(ATTR.dateFormat, fmt);
        const raw = span.getAttribute(ATTR.rawValue) ?? '';
        if (raw) setVal(applyDateFormat(raw, fmt));
        const pfInput = popup.querySelector<HTMLInputElement>('#pf-value');
        if (pfInput) pfInput.placeholder = DATE_FORMAT_PLACEHOLDER[fmt] ?? '예) 20261231';
      });
    }

    // 가로/세로 크기 입력
    popup.querySelector<HTMLInputElement>('#pf-width')?.addEventListener('change', (ev) => {
      let v = parseInt((ev.target as HTMLInputElement).value, 10) || 60;
      v = Math.max(60, Math.min(800, v));
      (ev.target as HTMLInputElement).value = String(v);
      currentEl.style.width = `${v}px`;
      span.setAttribute(ATTR.dataWidth, String(v));
    });
    if (showHeight) {
      popup.querySelector<HTMLInputElement>('#pf-height')?.addEventListener('change', (ev) => {
        let v = parseInt((ev.target as HTMLInputElement).value, 10) || 28;
        v = Math.max(28, Math.min(600, v));
        (ev.target as HTMLInputElement).value = String(v);
        currentEl.style.height = `${v}px`;
        span.setAttribute(ATTR.dataHeight, String(v));
      });
    }

    // 정렬 아이콘 버튼
    popup.querySelectorAll<HTMLButtonElement>('.pf-align-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        popup.querySelectorAll<HTMLButtonElement>('.pf-align-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const align = btn.dataset.align ?? 'left';
        span.setAttribute(ATTR.textAlign, align);
        currentEl.style.textAlign = align;
      });
    });

    // 섹션 접기/펼치기
    popup.querySelectorAll<HTMLButtonElement>('.pf-sec-hdr').forEach((hdr) => {
      hdr.addEventListener('click', () => {
        const body  = popup.querySelector<HTMLElement>(`#pf-body-${hdr.dataset.sec}`);
        const arrow = hdr.querySelector<HTMLElement>('.pf-sec-arrow');
        if (!body || !arrow) return;
        const open       = body.style.display !== 'none';
        body.style.display = open ? 'none' : 'block';
        arrow.textContent  = open ? '▸' : '▾';
      });
    });

    // 이동 버튼
    popup.querySelectorAll<HTMLButtonElement>('.pf-move-btn').forEach((btn) => {
      btn.addEventListener('mousedown', (ev) => {
        ev.preventDefault();    // 에디터 포커스 유지
        ev.stopPropagation();   // 팝업 외부 클릭 감지 핸들러 방지

        const dir = btn.dataset.dir as 'left' | 'right' | 'up' | 'down' | undefined;
        if (!dir || !span.parentNode) return;

        const parent = span.parentElement;
        const isInCell = parent?.tagName === 'TD' || parent?.tagName === 'TH';

        switch (dir) {
          case 'left': {
            const prev = span.previousSibling;
            if (prev && (!isInCell || parent?.contains(prev))) {
              span.parentNode.insertBefore(span, prev);
              this.contentEl?.dispatchEvent(new Event('input', { bubbles: true }));
            }
            break;
          }
          case 'right': {
            const next = span.nextSibling;
            if (next && (!isInCell || parent?.contains(next))) {
              span.parentNode.insertBefore(next, span);
              this.contentEl?.dispatchEvent(new Event('input', { bubbles: true }));
            }
            break;
          }
          case 'up': {
            const range = ownerDoc.createRange();
            range.setStartBefore(span);
            range.collapse(true);
            const sel = ownerDoc.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            this.contentEl?.focus();
            break;
          }
          case 'down': {
            const range = ownerDoc.createRange();
            range.setStartAfter(span);
            range.collapse(true);
            const sel = ownerDoc.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            this.contentEl?.focus();
            break;
          }
        }
      });
    });

    // 닫기 버튼
    const closeBtn = q<HTMLButtonElement>('pf-close');
    closeBtn.addEventListener('mouseenter', () => { closeBtn.style.background = '#F1F5F9'; closeBtn.style.color = '#374151'; });
    closeBtn.addEventListener('mouseleave', () => { closeBtn.style.background = '#F8FAFC'; closeBtn.style.color = '#94A3B8'; });
    closeBtn.addEventListener('click', () => this.closePopup());

    // 팝업 외부 mousedown → 닫기
    const outsideHandler = (ev: MouseEvent): void => {
      if (!this.popupEl?.contains(ev.target as Node)) {
        this.closePopup();
        ownerDoc.removeEventListener('mousedown', outsideHandler);
      }
    };
    setTimeout(() => ownerDoc.addEventListener('mousedown', outsideHandler), 0);

    // ── 팝업 드래그 ────────────────────────────────────────────────
    const header = popup.querySelector<HTMLElement>('#pf-header')!;
    header.addEventListener('mousedown', (ev) => {
      if ((ev.target as HTMLElement).closest('button')) return;
      ev.preventDefault();
      const startX    = ev.clientX;
      const startY    = ev.clientY;
      const startLeft = parseInt(popup.style.left, 10);
      const startTop  = parseInt(popup.style.top,  10);

      const onMove = (me: MouseEvent): void => {
        const dx = me.clientX - startX;
        const dy = me.clientY - startY;
        const newLeft = Math.max(4, Math.min(startLeft + dx, (win?.innerWidth ?? 1920) - 320 - 4));
        const newTop  = Math.max(4, Math.min(startTop  + dy, (win?.innerHeight ?? 1080) - 60));
        popup.style.left = `${Math.round(newLeft)}px`;
        popup.style.top  = `${Math.round(newTop)}px`;
      };
      const onUp = (): void => {
        ownerDoc.removeEventListener('mousemove', onMove);
        ownerDoc.removeEventListener('mouseup',   onUp);
        this.dragCleanup = null;
      };
      ownerDoc.addEventListener('mousemove', onMove);
      ownerDoc.addEventListener('mouseup',   onUp);
      this.dragCleanup = (): void => {
        ownerDoc.removeEventListener('mousemove', onMove);
        ownerDoc.removeEventListener('mouseup',   onUp);
      };
    });
  }

  private closePopup(): void {
    this.dragCleanup?.();
    this.dragCleanup = null;
    if (this.popupEl) {
      this.popupEl.remove();
      this.popupEl = null;
    }
  }

  // ── 저장 내보내기 ────────────────────────────────────────────────────────────

  /**
   * 에디터 HTML 문자열에서 .poa-field 스팬을 입력값 또는 플레이스홀더로 대체한다.
   * data-width/data-height가 있으면 크기가 적용된 인라인 span으로 감싼다.
   */
  static exportFields(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll<HTMLElement>('.poa-field').forEach((span) => {
      // 빈 값: placeholder($.{key}) → label 순으로 fallback (외부 시스템 치환 토큰 우선)
      const label       = span.getAttribute('data-label')       ?? '';
      const placeholder = span.getAttribute('data-placeholder') ?? '';
      const emptyText   = placeholder || label;
      const prefix  = span.getAttribute('data-prefix')  ?? '';
      const suffix  = span.getAttribute('data-suffix')  ?? '';
      const width   = span.getAttribute('data-width');
      const height  = span.getAttribute('data-height');

      const fieldEl = span.querySelector('.poa-field-input') as HTMLElement | null;
      let rawVal = '';
      if (fieldEl?.tagName === 'TEXTAREA') {
        rawVal = fieldEl.textContent?.trim() ?? '';
      } else {
        rawVal = (fieldEl as HTMLInputElement | null)?.getAttribute('value')?.trim() ?? '';
      }

      const fieldType = span.getAttribute('data-field-type') ?? '';
      const rawAttr   = span.getAttribute('data-raw-value') ?? '';
      let value: string;
      if (rawVal !== '') {
        if (fieldType === 'date' && rawAttr) {
          const dateFormat = span.getAttribute('data-date-format') ?? 'YYYY-MM-DD';
          value = applyDateFormat(rawAttr, dateFormat);
        } else {
          value = rawVal;
        }
      } else {
        value = emptyText;
      }
      const finalText = `${prefix}${value}${suffix}`;

      if (width || height) {
        const wrapper = doc.createElement('span');
        wrapper.style.display = 'inline-block';
        if (width)  wrapper.style.width     = `${width}px`;
        if (height) wrapper.style.minHeight = `${height}px`;
        wrapper.textContent = finalText;
        span.replaceWith(wrapper);
      } else {
        span.replaceWith(doc.createTextNode(finalText));
      }
    });
    return doc.body.innerHTML;
  }
}
