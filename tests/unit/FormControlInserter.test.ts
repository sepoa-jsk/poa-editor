import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  buildFormControlHtml,
  generateControlId,
  FormControlInserter,
} from '../../src/modules/form/FormControlInserter.js';
import type { FormControl } from '../../src/modules/form/FormControlInserter.js';

// ── generateControlId ──────────────────────────────────────────────────────

describe('generateControlId', () => {
  it('접두사 poa- + 타입을 포함한다', () => {
    const id = generateControlId('text');
    expect(id).toMatch(/^poa-text-/);
  });

  it('호출할 때마다 다른 값을 반환한다', () => {
    const a = generateControlId('text');
    const b = generateControlId('text');
    expect(a).not.toBe(b);
  });
});

// ── buildFormControlHtml — text ────────────────────────────────────────────

describe('buildFormControlHtml — text', () => {
  it('poa-form-group 래퍼를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'text' });
    expect(html).toContain('class="poa-form-group"');
  });

  it('input[type=text]과 poa-input 클래스를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'text' });
    expect(html).toContain('type="text"');
    expect(html).toContain('poa-input');
  });

  it('label과 for 속성이 연결된다 (autoLabel 기본 true)', () => {
    const html = buildFormControlHtml({ type: 'text', label: '이름', id: 'my-name' });
    expect(html).toContain('<label for="my-name">이름</label>');
  });

  it('autoLabel=false이면 label[for]이 없다', () => {
    const html = buildFormControlHtml({ type: 'text', label: '이름', id: 'x', autoLabel: false });
    expect(html).toContain('<label>이름</label>');
    expect(html).not.toContain('for="x"');
  });

  it('placeholder, maxlength, value를 반영한다', () => {
    const html = buildFormControlHtml({
      type: 'text', placeholder: '입력', maxlength: 100, value: '기본',
    });
    expect(html).toContain('placeholder="입력"');
    expect(html).toContain('maxlength="100"');
    expect(html).toContain('value="기본"');
  });

  it('disabled, readonly 불리언 속성을 출력한다', () => {
    const html = buildFormControlHtml({ type: 'text', disabled: true, readonly: true });
    expect(html).toContain('disabled');
    expect(html).toContain('readonly');
  });

  it('XSS 문자를 이스케이프한다', () => {
    const html = buildFormControlHtml({ type: 'text', label: '<script>', placeholder: '"xss"' });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&quot;xss&quot;');
  });
});

// ── buildFormControlHtml — textarea ───────────────────────────────────────

describe('buildFormControlHtml — textarea', () => {
  it('textarea 태그와 기본 rows/cols/resize를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'textarea' });
    expect(html).toContain('<textarea');
    expect(html).toContain('rows="4"');
    expect(html).toContain('cols="40"');
    expect(html).toContain('resize:both');
  });

  it('커스텀 rows/cols/resize를 반영한다', () => {
    const html = buildFormControlHtml({ type: 'textarea', rows: 6, cols: 60, resize: 'vertical' });
    expect(html).toContain('rows="6"');
    expect(html).toContain('cols="60"');
    expect(html).toContain('resize:vertical');
  });
});

// ── buildFormControlHtml — checkbox ───────────────────────────────────────

describe('buildFormControlHtml — checkbox', () => {
  it('input[type=checkbox]과 poa-checkbox-label을 포함한다', () => {
    const html = buildFormControlHtml({ type: 'checkbox' });
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('poa-checkbox-label');
  });

  it('checked 속성을 반영한다', () => {
    const html = buildFormControlHtml({ type: 'checkbox', checked: true });
    expect(html).toContain(' checked');
  });

  it('checkLabel을 사용하고 없으면 label로 대체한다', () => {
    const h1 = buildFormControlHtml({ type: 'checkbox', checkLabel: '동의' });
    expect(h1).toContain('동의');

    const h2 = buildFormControlHtml({ type: 'checkbox', label: '기본레이블' });
    expect(h2).toContain('기본레이블');
  });
});

// ── buildFormControlHtml — radio ──────────────────────────────────────────

describe('buildFormControlHtml — radio', () => {
  it('poa-radio-group과 각 라디오 input을 포함한다', () => {
    const ctrl: FormControl = {
      type: 'radio',
      options: [
        { label: '예', value: 'yes' },
        { label: '아니오', value: 'no', defaultChecked: true },
      ],
    };
    const html = buildFormControlHtml(ctrl);
    expect(html).toContain('poa-radio-group');
    expect(html).toContain('type="radio"');
    expect(html).toContain('value="yes"');
    expect(html).toContain('value="no"');
    expect(html).toContain(' checked');
  });
});

// ── buildFormControlHtml — select ─────────────────────────────────────────

describe('buildFormControlHtml — select', () => {
  it('select 태그와 option들을 포함한다', () => {
    const html = buildFormControlHtml({
      type: 'select',
      options: [
        { label: '사과', value: 'apple', selected: true },
        { label: '배',   value: 'pear' },
      ],
    });
    expect(html).toContain('<select');
    expect(html).toContain('value="apple"');
    expect(html).toContain(' selected');
    expect(html).toContain('value="pear"');
  });

  it('multiple 속성을 반영한다', () => {
    const html = buildFormControlHtml({ type: 'select', multiple: true });
    expect(html).toContain(' multiple');
  });
});

// ── buildFormControlHtml — button ─────────────────────────────────────────

describe('buildFormControlHtml — button', () => {
  it('기본 button 태그와 poa-btn 클래스를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'button' });
    expect(html).toContain('<button');
    expect(html).toContain('poa-btn');
    expect(html).toContain('버튼');
  });

  it('btnStyle=primary이면 poa-btn-primary 클래스를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'button', btnStyle: 'primary' });
    expect(html).toContain('poa-btn-primary');
  });

  it('btnStyle=danger이면 poa-btn-danger 클래스를 포함한다', () => {
    const html = buildFormControlHtml({ type: 'button', btnStyle: 'danger' });
    expect(html).toContain('poa-btn-danger');
  });

  it('btnType을 type 속성으로 반영한다', () => {
    const html = buildFormControlHtml({ type: 'button', btnType: 'submit' });
    expect(html).toContain('type="submit"');
  });
});

// ── buildFormControlHtml — date ───────────────────────────────────────────

describe('buildFormControlHtml — date', () => {
  it('input[type=date]을 포함한다', () => {
    const html = buildFormControlHtml({ type: 'date' });
    expect(html).toContain('type="date"');
  });

  it('min, max, value를 반영한다', () => {
    const html = buildFormControlHtml({
      type: 'date', min: '2024-01-01', max: '2024-12-31', value: '2024-06-15',
    });
    expect(html).toContain('min="2024-01-01"');
    expect(html).toContain('max="2024-12-31"');
    expect(html).toContain('value="2024-06-15"');
  });
});

// ── FormControlInserter (삽입 연기) ───────────────────────────────────────

describe('FormControlInserter', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('contenteditable', 'true');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('insert() 후 .poa-form-group이 DOM에 추가된다', () => {
    const ins = new FormControlInserter(container);
    ins.insert({ type: 'text', label: '이름' });
    expect(container.querySelector('.poa-form-group')).not.toBeNull();
  });

  it('삽입된 요소에 data-poa-form JSON이 저장된다', () => {
    const ins = new FormControlInserter(container);
    const cfg: FormControl = { type: 'text', label: '테스트', name: 'test' };
    ins.insert(cfg);
    const group = container.querySelector<HTMLElement>('.poa-form-group');
    expect(group?.dataset.poaForm).toBeDefined();
    const parsed = JSON.parse(group!.dataset.poaForm!);
    expect(parsed.type).toBe('text');
    expect(parsed.label).toBe('테스트');
  });
});
