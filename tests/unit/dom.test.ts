import { describe, it, expect } from 'vitest';
import { syncInputValuesToAttributes } from '../../src/utils/dom.js';

describe('syncInputValuesToAttributes', () => {
  it('input의 IDL value를 value 어트리뷰트로 동기화한다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input type="text" value="">';
    const input = root.querySelector<HTMLInputElement>('input')!;
    input.value = '홍길동';

    syncInputValuesToAttributes(root);

    expect(input.getAttribute('value')).toBe('홍길동');
  });

  it('빈 value도 어트리뷰트로 설정한다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input type="text">';
    const input = root.querySelector<HTMLInputElement>('input')!;

    syncInputValuesToAttributes(root);

    expect(input.getAttribute('value')).toBe('');
  });

  it('textarea의 IDL value를 textContent로 동기화한다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<textarea></textarea>';
    const textarea = root.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.value = '여러 줄\n입력';

    syncInputValuesToAttributes(root);

    expect(textarea.textContent).toBe('여러 줄\n입력');
  });

  it('select의 선택된 option에 selected 어트리뷰트를 설정한다', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <select>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </select>`;
    const select = root.querySelector<HTMLSelectElement>('select')!;
    select.selectedIndex = 1;

    syncInputValuesToAttributes(root);

    const options = root.querySelectorAll('option');
    expect(options[0].hasAttribute('selected')).toBe(false);
    expect(options[1].getAttribute('selected')).toBe('selected');
    expect(options[2].hasAttribute('selected')).toBe(false);
  });

  it('root 내 여러 input을 모두 처리한다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input id="a"><input id="b"><input id="c">';
    const inputs = root.querySelectorAll<HTMLInputElement>('input');
    inputs[0].value = '첫번째';
    inputs[1].value = '두번째';
    inputs[2].value = '세번째';

    syncInputValuesToAttributes(root);

    expect(inputs[0].getAttribute('value')).toBe('첫번째');
    expect(inputs[1].getAttribute('value')).toBe('두번째');
    expect(inputs[2].getAttribute('value')).toBe('세번째');
  });

  it('동기화 후 innerHTML에 값이 포함된다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input type="text">';
    const input = root.querySelector<HTMLInputElement>('input')!;
    input.value = '테스트값';

    syncInputValuesToAttributes(root);

    expect(root.innerHTML).toContain('테스트값');
  });

  it('동기화 후 cloneNode를 해도 값이 보존된다', () => {
    const root = document.createElement('div');
    root.innerHTML = '<input type="text">';
    const input = root.querySelector<HTMLInputElement>('input')!;
    input.value = '복제테스트';

    syncInputValuesToAttributes(root);
    const clone = root.cloneNode(true) as HTMLElement;

    const cloneInput = clone.querySelector<HTMLInputElement>('input')!;
    expect(cloneInput.getAttribute('value')).toBe('복제테스트');
  });
});
