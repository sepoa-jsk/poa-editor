export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'date';
  category: '기본' | '계약' | '금액' | '보증' | '기타';
  defaultNumberFormat?: string;
}

export const DOCUMENT_FIELDS: ReadonlyArray<DocumentField> = [
  // ── 기본 ───────────────────────────────────────────────────────────────────
  { id: 'text',            label: '텍스트',            placeholder: '$.{text}',            type: 'text',   category: '기본' },
  { id: 'number',          label: '숫자',              placeholder: '$.{number}',          type: 'number', category: '기본', defaultNumberFormat: 'none' },
  { id: 'date',            label: '날짜',              placeholder: '$.{date}',            type: 'date',   category: '기본' },

  // ── 계약 ───────────────────────────────────────────────────────────────────
  { id: 'doc_number',      label: '계약번호',           placeholder: '$.{doc_number}',      type: 'text',   category: '계약' },
  { id: 'contract_name',   label: '계약명',             placeholder: '$.{contract_name}',   type: 'text',   category: '계약' },
  { id: 'contract_date',   label: '계약일',             placeholder: '$.{contract_date}',   type: 'date',   category: '계약' },
  { id: 'start_date',      label: '계약시작일',          placeholder: '$.{start_date}',      type: 'date',   category: '계약' },
  { id: 'end_date',        label: '계약종료일',          placeholder: '$.{end_date}',        type: 'date',   category: '계약' },
  { id: 'currency',        label: '통화',              placeholder: '$.{currency}',        type: 'text',   category: '계약' },
  { id: 'pay_condition',   label: '지급조건',           placeholder: '$.{pay_condition}',   type: 'text',   category: '계약' },
  { id: 'pay_detail',      label: '지급조건상세',        placeholder: '$.{pay_detail}',      type: 'text',   category: '계약' },

  // ── 금액 ───────────────────────────────────────────────────────────────────
  { id: 'amount',          label: '계약금액',           placeholder: '$.{amount}',          type: 'number', category: '금액', defaultNumberFormat: 'comma_won' },
  { id: 'supply_price',    label: '공급가액',           placeholder: '$.{supply_price}',    type: 'number', category: '금액', defaultNumberFormat: 'comma_won' },
  { id: 'vat',             label: '부가세',             placeholder: '$.{vat}',             type: 'number', category: '금액', defaultNumberFormat: 'comma_won' },
  { id: 'penalty',         label: '지체상금',           placeholder: '$.{penalty}',         type: 'number', category: '금액', defaultNumberFormat: 'comma_won' },

  // ── 보증 ───────────────────────────────────────────────────────────────────
  { id: 'advance',         label: '선급금 이행 보증률',   placeholder: '$.{advance}',         type: 'number', category: '보증', defaultNumberFormat: 'percent' },
  { id: 'contract_bond',   label: '계약 이행 보증률',    placeholder: '$.{contract_bond}',   type: 'number', category: '보증', defaultNumberFormat: 'percent' },
  { id: 'defect_bond',     label: '하자 이행 보증률',    placeholder: '$.{defect_bond}',     type: 'number', category: '보증', defaultNumberFormat: 'percent' },
  { id: 'warranty_end',    label: '하자보증기간 종류',    placeholder: '$.{warranty_end}',    type: 'text',   category: '보증' },
  { id: 'warranty_period', label: '하자보증기간',        placeholder: '$.{warranty_period}', type: 'text',   category: '보증' },
  { id: 'warranty_unit',   label: '하자보증기간 단위',    placeholder: '$.{warranty_unit}',   type: 'text',   category: '보증' },

  // ── 기타 ───────────────────────────────────────────────────────────────────
  { id: 'remark',          label: '비고',              placeholder: '$.{remark}',          type: 'text',   category: '기타' },
];

export const FIELD_MAP: Readonly<Record<string, DocumentField>> =
  Object.fromEntries(DOCUMENT_FIELDS.map((f) => [f.id, f]));
