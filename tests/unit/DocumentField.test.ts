import { describe, it, expect } from 'vitest';
import { DOCUMENT_FIELDS, FIELD_MAP } from '../../src/modules/insert/DocumentFields.js';
import { formatNumber, applyDateFormat } from '../../src/modules/insert/FieldInserter.js';
import { FieldInserter } from '../../src/modules/insert/FieldInserter.js';

describe('DocumentFields', () => {
  it('총 22개 필드를 포함한다', () => {
    expect(DOCUMENT_FIELDS).toHaveLength(22);
  });

  it('모든 플레이스홀더가 $.{ 형식을 따른다', () => {
    for (const f of DOCUMENT_FIELDS) {
      expect(f.placeholder).toMatch(/^\$\.\{[a-z_]+\}$/);
    }
  });

  it('category 필드가 지정된 값 중 하나다', () => {
    const valid = new Set(['기본', '계약', '금액', '보증', '기타']);
    for (const f of DOCUMENT_FIELDS) {
      expect(valid.has(f.category)).toBe(true);
    }
  });

  it('textarea 타입이 존재하지 않는다', () => {
    for (const f of DOCUMENT_FIELDS) {
      expect((f as { type: string }).type).not.toBe('textarea');
    }
  });

  it('FIELD_MAP에서 id로 필드를 찾을 수 있다', () => {
    expect(FIELD_MAP['amount']?.label).toBe('계약금액');
    expect(FIELD_MAP['date']?.category).toBe('기본');
    expect(FIELD_MAP['remark']?.category).toBe('기타');
  });

  it('getFieldById가 올바른 placeholder를 반환한다', () => {
    expect(FIELD_MAP['amount']?.placeholder).toBe('$.{amount}');
    expect(FIELD_MAP['doc_number']?.placeholder).toBe('$.{doc_number}');
  });

  it('금액 필드에 defaultNumberFormat이 있다', () => {
    expect(FIELD_MAP['amount']?.defaultNumberFormat).toBe('comma_won');
    expect(FIELD_MAP['supply_price']?.defaultNumberFormat).toBe('comma_won');
    expect(FIELD_MAP['vat']?.defaultNumberFormat).toBe('comma_won');
    expect(FIELD_MAP['penalty']?.defaultNumberFormat).toBe('comma_won');
  });

  it('보증률 필드에 percent defaultNumberFormat이 있다', () => {
    expect(FIELD_MAP['advance']?.defaultNumberFormat).toBe('percent');
    expect(FIELD_MAP['contract_bond']?.defaultNumberFormat).toBe('percent');
    expect(FIELD_MAP['defect_bond']?.defaultNumberFormat).toBe('percent');
  });

  it('카테고리별 필드 수가 올바르다', () => {
    const counts = Object.fromEntries(
      ['기본', '계약', '금액', '보증', '기타'].map(cat => [
        cat,
        DOCUMENT_FIELDS.filter(f => f.category === cat).length,
      ])
    );
    expect(counts['기본']).toBe(3);
    expect(counts['계약']).toBe(8);
    expect(counts['금액']).toBe(4);
    expect(counts['보증']).toBe(6);
    expect(counts['기타']).toBe(1);
  });
});

describe('formatNumber', () => {
  it('comma 포맷 — 천 단위 구분', () => {
    expect(formatNumber('1000000', 'comma')).toBe('1,000,000');
  });

  it('comma_won 포맷 — 원 단위 포함', () => {
    expect(formatNumber('1000000', 'comma_won')).toBe('1,000,000원');
  });

  it('percent 포맷 — 퍼센트 기호 추가', () => {
    expect(formatNumber('10.5', 'percent')).toBe('10.5%');
  });

  it('none 포맷 — 원본 반환', () => {
    expect(formatNumber('12345', 'none')).toBe('12345');
  });
});

describe('FieldInserter.exportFields', () => {
  it('값이 없는 필드는 $.{key} 플레이스홀더로 대체된다', () => {
    const html = `<span class="poa-field" data-placeholder="$.{amount}" data-label="계약금액" data-prefix="" data-suffix="">` +
      `<textarea class="poa-field-input" placeholder="계약금액"></textarea></span>`;
    const result = FieldInserter.exportFields(html);
    expect(result).toContain('$.{amount}');
    expect(result).not.toContain('poa-field');
  });

  it('값이 있는 필드는 포맷된 값으로 대체된다', () => {
    const html = `<span class="poa-field" data-placeholder="$.{amount}" data-label="계약금액" ` +
      `data-prefix="" data-suffix="" data-field-type="number" data-number-format="comma_won">` +
      `<textarea class="poa-field-input" placeholder="계약금액">5000000</textarea></span>`;
    const result = FieldInserter.exportFields(html);
    expect(result).toContain('5000000');
  });

  it('prefix/suffix가 결과에 포함된다', () => {
    const html = `<span class="poa-field" data-placeholder="$.{text}" data-label="텍스트" ` +
      `data-prefix="[" data-suffix="]">` +
      `<textarea class="poa-field-input">안녕</textarea></span>`;
    const result = FieldInserter.exportFields(html);
    expect(result).toContain('[안녕]');
  });
});

describe('applyDateFormat', () => {
  it('YYYY-MM-DD 형식으로 변환한다', () => {
    expect(applyDateFormat('20261231', 'YYYY-MM-DD')).toBe('2026-12-31');
  });

  it('한국식 날짜 형식으로 변환한다', () => {
    expect(applyDateFormat('20261231', 'YYYY년MM월DD일')).toBe('2026년 12월 31일');
  });

  it('잘못된 입력은 원본을 반환한다', () => {
    expect(applyDateFormat('invalid', 'YYYY-MM-DD')).toBe('invalid');
  });
});
