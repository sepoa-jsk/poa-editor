import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputResizer } from '../../src/modules/form/InputResizer.js';

function makeInput(): HTMLInputElement {
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.dataset.poaForm = '{}';
  document.body.appendChild(inp);
  return inp;
}

function makeTextarea(): HTMLTextAreaElement {
  const ta = document.createElement('textarea');
  ta.dataset.poaForm = '{}';
  document.body.appendChild(ta);
  return ta;
}

function makeCell(inp: HTMLElement): HTMLTableCellElement {
  const td = document.createElement('td');
  td.appendChild(inp);
  const tr = document.createElement('tr');
  tr.appendChild(td);
  const table = document.createElement('table');
  table.appendChild(tr);
  document.body.appendChild(table);
  return td;
}

describe('InputResizer', () => {
  let resizer: InputResizer;
  let inp: HTMLInputElement;

  beforeEach(() => {
    resizer = new InputResizer();
    inp = makeInput();
  });

  afterEach(() => {
    resizer.detach();
    document.body.querySelectorAll('[data-poa-resize-handle]').forEach((el) => el.remove());
    document.body.querySelectorAll('input, textarea, table').forEach((el) => el.remove());
  });

  it('attach() 시 CSS resize:horizontal이 설정된다', () => {
    resizer.attach(inp);
    expect(inp.style.resize).toBe('horizontal');
  });

  it('attach() 시 overflow:hidden이 설정된다', () => {
    resizer.attach(inp);
    expect(inp.style.overflow).toBe('hidden');
  });

  it('attach() 시 minWidth:60px이 설정된다', () => {
    resizer.attach(inp);
    expect(inp.style.minWidth).toBe('60px');
  });

  it('attach() 시 maxWidth:100%이 설정된다', () => {
    resizer.attach(inp);
    expect(inp.style.maxWidth).toBe('100%');
  });

  it('attach() 시 커스텀 핸들이 body에 추가된다', () => {
    resizer.attach(inp);
    expect(document.body.querySelector('[data-poa-resize-handle]')).toBeTruthy();
  });

  it('detach() 후 resize:none으로 복원된다', () => {
    resizer.attach(inp);
    resizer.detach();
    expect(inp.style.resize).toBe('none');
  });

  it('detach() 후 커스텀 핸들이 제거된다', () => {
    resizer.attach(inp);
    resizer.detach();
    expect(document.body.querySelector('[data-poa-resize-handle]')).toBeNull();
  });

  it('두 번 attach() 해도 핸들은 1개다', () => {
    resizer.attach(inp);
    resizer.attach(inp);
    const handles = document.body.querySelectorAll('[data-poa-resize-handle]');
    expect(handles.length).toBe(1);
  });

  it('textarea에도 attach() 가능하다', () => {
    const ta = makeTextarea();
    resizer.attach(ta);
    expect(ta.style.resize).toBe('horizontal');
    expect(document.body.querySelector('[data-poa-resize-handle]')).toBeTruthy();
    resizer.detach();
    ta.remove();
  });

  it('syncHandle()은 핸들 없이 호출해도 오류가 없다', () => {
    expect(() => resizer.syncHandle()).not.toThrow();
  });

  it('attach() 후 syncHandle() 호출 시 오류가 없다', () => {
    resizer.attach(inp);
    expect(() => resizer.syncHandle()).not.toThrow();
  });

  it('핸들 mousedown → mousemove → mouseup 시 onResized 콜백이 호출된다', () => {
    const onResized = vi.fn();
    resizer.attach(inp, onResized);

    const handle = document.body.querySelector<HTMLElement>('[data-poa-resize-handle]')!;
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, buttons: 1 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(onResized).toHaveBeenCalledTimes(1);
  });
});

describe('InputResizer — textarea', () => {
  let resizer: InputResizer;
  let ta: HTMLTextAreaElement;

  beforeEach(() => {
    resizer = new InputResizer();
    ta = makeTextarea();
  });

  afterEach(() => {
    resizer.detach();
    document.body.querySelectorAll('[data-poa-resize-handle], textarea').forEach((el) => el.remove());
  });

  it('textarea attach() 후 detach() 시 resize:none으로 복원된다', () => {
    resizer.attach(ta);
    resizer.detach();
    expect(ta.style.resize).toBe('none');
  });
});
