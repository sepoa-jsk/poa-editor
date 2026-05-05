import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputInlineToolbar } from '../../src/modules/form/InputInlineToolbar.js';

function makeInput(): HTMLInputElement {
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.dataset.poaForm = '{}';
  document.body.appendChild(inp);
  return inp;
}

function makeContentEl(): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = 'position:relative;width:800px;height:600px;overflow-y:auto;';
  document.body.appendChild(div);
  return div;
}

describe('InputInlineToolbar', () => {
  let toolbar: InputInlineToolbar;
  let inp: HTMLInputElement;
  let contentEl: HTMLDivElement;

  beforeEach(() => {
    toolbar   = new InputInlineToolbar();
    inp       = makeInput();
    contentEl = makeContentEl();
  });

  afterEach(() => {
    toolbar.hide();
    document.body.querySelectorAll('[data-poa-temp], input, div').forEach((el) => el.remove());
  });

  it('show() 후 data-poa-temp 툴바가 body에 추가된다', () => {
    toolbar.show(inp, contentEl);
    expect(document.body.querySelector('[data-poa-temp]')).toBeTruthy();
  });

  it('hide() 후 툴바가 제거된다', () => {
    toolbar.show(inp, contentEl);
    toolbar.hide();
    expect(document.body.querySelector('[data-poa-temp]')).toBeNull();
  });

  it('너비 input이 존재한다', () => {
    toolbar.show(inp, contentEl);
    const bar = document.body.querySelector('[data-poa-temp]')!;
    expect(bar.querySelector('input[type="number"]')).toBeTruthy();
  });

  it('셀에 맞춤 버튼이 존재한다', () => {
    toolbar.show(inp, contentEl);
    const bar   = document.body.querySelector('[data-poa-temp]')!;
    const btns  = Array.from(bar.querySelectorAll('button'));
    expect(btns.some((b) => b.textContent === '셀에 맞춤')).toBe(true);
  });

  it('텍스트 정렬 select가 존재한다', () => {
    toolbar.show(inp, contentEl);
    const bar = document.body.querySelector('[data-poa-temp]')!;
    expect(bar.querySelector('select')).toBeTruthy();
  });

  it('너비 input에서 Enter → input.style.width 변경', () => {
    toolbar.show(inp, contentEl);
    const bar      = document.body.querySelector('[data-poa-temp]')!;
    const wInput   = bar.querySelector<HTMLInputElement>('input[type="number"]')!;
    wInput.value = '350';
    wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(inp.style.width).toBe('350px');
  });

  it('셀에 맞춤 버튼 클릭 → width:100%', () => {
    inp.style.width = '300px';
    toolbar.show(inp, contentEl);
    const bar    = document.body.querySelector('[data-poa-temp]')!;
    const fitBtn = Array.from(bar.querySelectorAll('button')).find((b) => b.textContent === '셀에 맞춤')!;
    fitBtn.click();
    expect(inp.style.width).toBe('100%');
  });

  it('정렬 select 변경 → textAlign 적용', () => {
    toolbar.show(inp, contentEl);
    const bar      = document.body.querySelector('[data-poa-temp]')!;
    const alignSel = bar.querySelector<HTMLSelectElement>('select')!;
    alignSel.value = 'center';
    alignSel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(inp.style.textAlign).toBe('center');
  });

  it('onResized 콜백이 너비 변경 시 호출된다', () => {
    const onResized = vi.fn();
    const tb = new InputInlineToolbar({ onResized });
    tb.show(inp, contentEl);
    const bar    = document.body.querySelector('[data-poa-temp]')!;
    const wInput = bar.querySelector<HTMLInputElement>('input[type="number"]')!;
    wInput.value = '280';
    wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onResized).toHaveBeenCalledTimes(1);
    tb.hide();
  });

  it('onResized 콜백이 셀에 맞춤 시 호출된다', () => {
    const onResized = vi.fn();
    const tb = new InputInlineToolbar({ onResized });
    tb.show(inp, contentEl);
    const bar    = document.body.querySelector('[data-poa-temp]')!;
    const fitBtn = Array.from(bar.querySelectorAll('button')).find((b) => b.textContent === '셀에 맞춤')!;
    fitBtn.click();
    expect(onResized).toHaveBeenCalledTimes(1);
    tb.hide();
  });

  it('syncPosition() 호출 시 오류 없이 완료된다', () => {
    toolbar.show(inp, contentEl);
    expect(() => toolbar.syncPosition()).not.toThrow();
  });

  it('show()를 두 번 호출해도 툴바는 1개다', () => {
    toolbar.show(inp, contentEl);
    toolbar.show(inp, contentEl);
    const bars = document.body.querySelectorAll('[data-poa-temp]');
    expect(bars.length).toBe(1);
  });
});
