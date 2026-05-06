export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'number' | 'date';
}

export const DOCUMENT_FIELDS: ReadonlyArray<DocumentField> = [
  { id: 'date',             label: '날짜',              placeholder: '#DATE',            type: 'date'     },
  { id: 'text',             label: '텍스트',             placeholder: '#TEXT',            type: 'text'     },
  { id: 'textarea',         label: '여러 줄',            placeholder: '#TEXTAREA',        type: 'textarea' },
  { id: 'number',           label: '숫자',              placeholder: '#NUMBER',          type: 'number'   },
  { id: 'contract_name',    label: '계약명',             placeholder: '#CONTRACT_NAME',   type: 'text'     },
  { id: 'start_date',       label: '계약시작일',          placeholder: '#START_DATE',      type: 'date'     },
  { id: 'end_date',         label: '계약종료일',          placeholder: '#END_DATE',        type: 'date'     },
  { id: 'contract_date',    label: '계약일',             placeholder: '#CONTRACT_DATE',   type: 'date'     },
  { id: 'amount',           label: '계약금액',            placeholder: '#AMOUNT',          type: 'number'   },
  { id: 'penalty',          label: '지체상금',            placeholder: '#PENALTY',         type: 'number'   },
  { id: 'currency',         label: '통화',              placeholder: '#CURRENCY',        type: 'text'     },
  { id: 'supply_price',     label: '공급가액',            placeholder: '#SUPPLY_PRICE',    type: 'number'   },
  { id: 'vat',              label: '부가세',             placeholder: '#VAT',             type: 'number'   },
  { id: 'advance',          label: '선급금 이행 보증률',    placeholder: '#ADVANCE_RATE',    type: 'number'   },
  { id: 'contract_bond',    label: '계약 이행 보증률',     placeholder: '#CONTRACT_BOND',   type: 'number'   },
  { id: 'defect_bond',      label: '하자 이행 보증률',     placeholder: '#DEFECT_BOND',     type: 'number'   },
  { id: 'warranty_end',     label: '하자보증기간 종류',     placeholder: '#WARRANTY_END',    type: 'text'     },
  { id: 'warranty_period',  label: '하자보증기간',         placeholder: '#WARRANTY_PERIOD', type: 'text'     },
  { id: 'warranty_unit',    label: '하자보증기간 단위',     placeholder: '#WARRANTY_UNIT',   type: 'text'     },
  { id: 'pay_condition',    label: '지급조건',            placeholder: '#PAY_CONDITION',   type: 'text'     },
  { id: 'pay_detail',       label: '지급조건상세',         placeholder: '#PAY_DETAIL',      type: 'textarea' },
  { id: 'doc_number',       label: '계약번호',            placeholder: '#DOC_NUMBER',      type: 'text'     },
  { id: 'test_text',        label: '테스트텍스트',         placeholder: '#TEST_TEXT',       type: 'text'     },
];

export const FIELD_MAP: Readonly<Record<string, DocumentField>> =
  Object.fromEntries(DOCUMENT_FIELDS.map((f) => [f.id, f]));
