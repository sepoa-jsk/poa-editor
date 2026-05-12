export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'date';
  category: string;
  defaultNumberFormat?: string;
  order?: number;
  builtIn?: boolean;
}

export interface FieldCategory {
  id: string;
  label: string;
  order: number;
  builtIn?: boolean;
}

export interface FieldDefinition extends DocumentField {
  builtIn: boolean;
  order: number;
}

// ── Format options (exported for FieldManagerPage) ──────────────────────────

export const NUMBER_FORMAT_OPTIONS: ReadonlyArray<readonly [string, string]> = [
  ['none',        '포맷 없음'],
  ['comma',       '천 단위 (1,000,000)'],
  ['comma_won',   '천 단위 + 원 (1,000,000원)'],
  ['korean',      '한국식 단위 (100만)'],
  ['korean_full', '한국식 전체 (일백만원)'],
  ['decimal2',    '소수점 2자리 (1,000,000.00)'],
  ['percent',     '퍼센트 (10.5%)'],
  ['percent2',    '퍼센트 소수점 2자리 (10.50%)'],
];

export const DATE_FORMAT_OPTIONS: ReadonlyArray<readonly [string, string]> = [
  ['YYYY-MM-DD',     'YYYY-MM-DD  예) 2025-01-31'],
  ['YYYY년MM월DD일', 'YYYY년 MM월 DD일  예) 2025년 01월 31일'],
  ['YYYY. MM. DD',   'YYYY. MM. DD  예) 2025. 01. 31'],
  ['MM/DD/YYYY',     'MM/DD/YYYY  예) 01/31/2025'],
  ['DD-MM-YYYY',     'DD-MM-YYYY  예) 31-01-2025'],
];

// ── Built-in data ────────────────────────────────────────────────────────────

const BUILTIN_CATEGORIES: FieldCategory[] = [
  { id: '기본', label: '기본',   order: 0, builtIn: true },
  { id: '계약', label: '계약',   order: 1, builtIn: true },
  { id: '금액', label: '금액',   order: 2, builtIn: true },
  { id: '보증', label: '보증',   order: 3, builtIn: true },
  { id: '기타', label: '기타',   order: 4, builtIn: true },
];

const BUILTIN_FIELDS: FieldDefinition[] = [
  // 기본
  { id: 'text',            label: '텍스트',            placeholder: '$.{text}',            type: 'text',   category: '기본', order: 0,  builtIn: true },
  { id: 'number',          label: '숫자',              placeholder: '$.{number}',          type: 'number', category: '기본', order: 1,  builtIn: true, defaultNumberFormat: 'none' },
  { id: 'date',            label: '날짜',              placeholder: '$.{date}',            type: 'date',   category: '기본', order: 2,  builtIn: true },
  // 계약
  { id: 'doc_number',      label: '계약번호',           placeholder: '$.{doc_number}',      type: 'text',   category: '계약', order: 3,  builtIn: true },
  { id: 'contract_name',   label: '계약명',             placeholder: '$.{contract_name}',   type: 'text',   category: '계약', order: 4,  builtIn: true },
  { id: 'contract_date',   label: '계약일',             placeholder: '$.{contract_date}',   type: 'date',   category: '계약', order: 5,  builtIn: true },
  { id: 'start_date',      label: '계약시작일',          placeholder: '$.{start_date}',      type: 'date',   category: '계약', order: 6,  builtIn: true },
  { id: 'end_date',        label: '계약종료일',          placeholder: '$.{end_date}',        type: 'date',   category: '계약', order: 7,  builtIn: true },
  { id: 'currency',        label: '통화',              placeholder: '$.{currency}',        type: 'text',   category: '계약', order: 8,  builtIn: true },
  { id: 'pay_condition',   label: '지급조건',           placeholder: '$.{pay_condition}',   type: 'text',   category: '계약', order: 9,  builtIn: true },
  { id: 'pay_detail',      label: '지급조건상세',        placeholder: '$.{pay_detail}',      type: 'text',   category: '계약', order: 10, builtIn: true },
  // 금액
  { id: 'amount',          label: '계약금액',           placeholder: '$.{amount}',          type: 'number', category: '금액', order: 11, builtIn: true, defaultNumberFormat: 'comma_won' },
  { id: 'supply_price',    label: '공급가액',           placeholder: '$.{supply_price}',    type: 'number', category: '금액', order: 12, builtIn: true, defaultNumberFormat: 'comma_won' },
  { id: 'vat',             label: '부가세',             placeholder: '$.{vat}',             type: 'number', category: '금액', order: 13, builtIn: true, defaultNumberFormat: 'comma_won' },
  { id: 'penalty',         label: '지체상금',           placeholder: '$.{penalty}',         type: 'number', category: '금액', order: 14, builtIn: true, defaultNumberFormat: 'comma_won' },
  // 보증
  { id: 'advance',         label: '선급금 이행 보증률',   placeholder: '$.{advance}',         type: 'number', category: '보증', order: 15, builtIn: true, defaultNumberFormat: 'percent' },
  { id: 'contract_bond',   label: '계약 이행 보증률',    placeholder: '$.{contract_bond}',   type: 'number', category: '보증', order: 16, builtIn: true, defaultNumberFormat: 'percent' },
  { id: 'defect_bond',     label: '하자 이행 보증률',    placeholder: '$.{defect_bond}',     type: 'number', category: '보증', order: 17, builtIn: true, defaultNumberFormat: 'percent' },
  { id: 'warranty_end',    label: '하자보증기간 종류',    placeholder: '$.{warranty_end}',    type: 'text',   category: '보증', order: 18, builtIn: true },
  { id: 'warranty_period', label: '하자보증기간',        placeholder: '$.{warranty_period}', type: 'text',   category: '보증', order: 19, builtIn: true },
  { id: 'warranty_unit',   label: '하자보증기간 단위',    placeholder: '$.{warranty_unit}',   type: 'text',   category: '보증', order: 20, builtIn: true },
  // 기타
  { id: 'remark',          label: '비고',              placeholder: '$.{remark}',          type: 'text',   category: '기타', order: 21, builtIn: true },
];

// ── Storage keys ─────────────────────────────────────────────────────────────

const KEY_FIELDS     = 'poa-field-definitions';
const KEY_CATEGORIES = 'poa-field-categories';

// ── Persistence ──────────────────────────────────────────────────────────────

export function loadFieldCategories(): FieldCategory[] {
  try {
    const raw = localStorage.getItem(KEY_CATEGORIES);
    if (raw) return JSON.parse(raw) as FieldCategory[];
  } catch { /* ignore */ }
  return BUILTIN_CATEGORIES.map(c => ({ ...c }));
}

export function saveFieldCategories(cats: FieldCategory[]): void {
  localStorage.setItem(KEY_CATEGORIES, JSON.stringify(cats));
}

export function loadFieldDefinitions(): FieldDefinition[] {
  try {
    const raw = localStorage.getItem(KEY_FIELDS);
    if (raw) return JSON.parse(raw) as FieldDefinition[];
  } catch { /* ignore */ }
  return BUILTIN_FIELDS.map(f => ({ ...f }));
}

export function saveFieldDefinitions(fields: FieldDefinition[]): void {
  localStorage.setItem(KEY_FIELDS, JSON.stringify(fields));
}

// ── Active field accessors ───────────────────────────────────────────────────

export function getActiveDocumentFields(): DocumentField[] {
  return loadFieldDefinitions();
}

export function getActiveFieldMap(): Record<string, DocumentField> {
  return Object.fromEntries(getActiveDocumentFields().map(f => [f.id, f]));
}

// ── Legacy exports (backward-compat) ─────────────────────────────────────────

export const DOCUMENT_FIELDS: ReadonlyArray<DocumentField> = BUILTIN_FIELDS;

export const FIELD_MAP: Readonly<Record<string, DocumentField>> =
  Object.fromEntries(BUILTIN_FIELDS.map(f => [f.id, f]));
