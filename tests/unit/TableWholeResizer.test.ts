import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableWholeResizer } from '../../src/modules/table/TableWholeResizer.js';
import { TableInlineToolbar } from '../../src/modules/table/TableInlineToolbar.js';

// ── 헬퍼 ─────────────────────────────────────────────────────────────────────

function makeTable(rows = 2, cols = 3): HTMLTableElement {
  const t = document.createElement('table');
  for (let r = 0; r < rows; r++) {
    const tr = t.insertRow();
    for (let c = 0; c < cols; c++) {
      const td = tr.insertCell();
      td.textContent = `r${r}c${c}`;
    }
  }
  return t;
}

function makeEnv(): { contentEl: HTMLDivElement; table: HTMLTableElement } {
  const contentEl = document.createElement('div');
  contentEl.style.cssText = 'position:relative;width:800px;height:600px;overflow-y:auto;';
  const table = makeTable();
  contentEl.appendChild(table);
  document.body.appendChild(contentEl);
  return { contentEl, table };
}

// ── TableWholeResizer ─────────────────────────────────────────────────────────

describe('TableWholeResizer', () => {
  let contentEl: HTMLDivElement;
  let table: HTMLTableElement;
  let resizer: TableWholeResizer;

  beforeEach(() => {
    ({ contentEl, table } = makeEnv());
    resizer = new TableWholeResizer(contentEl);
  });

  afterEach(() => {
    resizer.detach();
    contentEl.remove();
  });

  it('attach() 후 오버레이(data-poa-temp)가 contentEl에 추가된다', () => {
    resizer.attach(table);
    expect(contentEl.querySelector('[data-poa-temp]')).toBeTruthy();
  });

  it('attach() 후 E/S/SE 핸들 3개가 생성된다', () => {
    resizer.attach(table);
    const handles = contentEl.querySelectorAll('[data-dir]');
    const dirs = Array.from(handles).map((h) => h.getAttribute('data-dir')).sort();
    expect(dirs).toEqual(['e', 's', 'se']);
  });

  it('detach() 후 오버레이가 제거된다', () => {
    resizer.attach(table);
    resizer.detach();
    expect(contentEl.querySelector('[data-poa-temp]')).toBeNull();
  });

  it('detach() 후 다시 attach() 하면 새 오버레이가 생성된다', () => {
    resizer.attach(table);
    resizer.detach();
    resizer.attach(table);
    expect(contentEl.querySelector('[data-poa-temp]')).toBeTruthy();
  });

  it('같은 표로 attach()를 두 번 해도 오버레이(직계 자식)는 1개다', () => {
    resizer.attach(table);
    resizer.attach(table);
    // 오버레이 div는 contentEl 직계 자식 1개 (핸들 3개는 오버레이 안에 있음)
    const overlays = Array.from(contentEl.children)
      .filter((el) => el.getAttribute('data-poa-temp') === 'true');
    expect(overlays.length).toBe(1);
  });

  it('표가 DOM에서 제거되면 input 이벤트 시 자동 detach된다', () => {
    resizer.attach(table);
    table.remove();
    contentEl.dispatchEvent(new Event('input', { bubbles: true }));
    expect(contentEl.querySelector('[data-poa-temp]')).toBeNull();
  });

  it('onResizeEnd 콜백이 mouseup 시 호출된다', () => {
    const onResizeEnd = vi.fn();
    const r = new TableWholeResizer(contentEl, { onResizeEnd });
    r.attach(table);

    const handle = contentEl.querySelector<HTMLElement>('[data-dir="se"]')!;
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100, bubbles: true }));
    document.dispatchEvent(new MouseEvent('mouseup', { clientX: 110, clientY: 110 }));

    // requestAnimationFrame은 jsdom에서 동기 실행되지 않으므로 대기
    expect(onResizeEnd).not.toHaveBeenCalled(); // rAF 전
    r.detach();
  });

  it('e-핸들 mousedown cursor가 e-resize이다', () => {
    resizer.attach(table);
    const h = contentEl.querySelector<HTMLElement>('[data-dir="e"]')!;
    expect(h.style.cursor).toBe('e-resize');
  });

  it('s-핸들 mousedown cursor가 s-resize이다', () => {
    resizer.attach(table);
    const h = contentEl.querySelector<HTMLElement>('[data-dir="s"]')!;
    expect(h.style.cursor).toBe('s-resize');
  });

  it('se-핸들 cursor가 se-resize이다', () => {
    resizer.attach(table);
    const h = contentEl.querySelector<HTMLElement>('[data-dir="se"]')!;
    expect(h.style.cursor).toBe('se-resize');
  });
});

// ── TableInlineToolbar ────────────────────────────────────────────────────────

describe('TableInlineToolbar', () => {
  let contentEl: HTMLDivElement;
  let table: HTMLTableElement;
  let toolbar: TableInlineToolbar;

  beforeEach(() => {
    ({ contentEl, table } = makeEnv());
    toolbar = new TableInlineToolbar();
  });

  afterEach(() => {
    toolbar.hide();
    contentEl.remove();
  });

  it('show() 후 data-poa-temp 툴바가 contentEl에 추가된다', () => {
    toolbar.show(table, contentEl);
    expect(contentEl.querySelector('[data-poa-temp]')).toBeTruthy();
  });

  it('hide() 후 툴바가 제거된다', () => {
    toolbar.show(table, contentEl);
    toolbar.hide();
    expect(contentEl.querySelector('[data-poa-temp]')).toBeNull();
  });

  it('너비 input(#poa-tbl-tb-w)이 존재한다', () => {
    toolbar.show(table, contentEl);
    expect(contentEl.querySelector('#poa-tbl-tb-w')).toBeTruthy();
  });

  it('높이 input(#poa-tbl-tb-h)이 존재한다', () => {
    toolbar.show(table, contentEl);
    expect(contentEl.querySelector('#poa-tbl-tb-h')).toBeTruthy();
  });

  it('table.style.width가 설정된 경우 너비 input에 반영된다', () => {
    table.style.width = '520px';
    toolbar.show(table, contentEl);
    const inp = contentEl.querySelector<HTMLInputElement>('#poa-tbl-tb-w')!;
    expect(inp.value).toBe('520');
  });

  it('너비 input에서 Enter 누르면 table.style.width가 변경된다', () => {
    toolbar.show(table, contentEl);
    const inp = contentEl.querySelector<HTMLInputElement>('#poa-tbl-tb-w')!;
    inp.value = '400';
    inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(table.style.width).toBe('400px');
  });

  it('원본 버튼 클릭 시 width:100%, minHeight:""로 초기화된다', () => {
    table.style.width     = '500px';
    table.style.minHeight = '200px';
    toolbar.show(table, contentEl);
    const resetBtn = Array.from(contentEl.querySelectorAll('button'))
      .find((b) => b.textContent === '원본')!;
    resetBtn.click();
    expect(table.style.width).toBe('100%');
    expect(table.style.minHeight).toBe('');
  });

  it('onApply 콜백이 너비 변경 시 호출된다', () => {
    const onApply = vi.fn();
    const tb = new TableInlineToolbar({ onApply });
    tb.show(table, contentEl);
    const inp = contentEl.querySelector<HTMLInputElement>('#poa-tbl-tb-w')!;
    inp.value = '350';
    inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onApply).toHaveBeenCalledWith(table);
    tb.hide();
  });

  it('syncPosition() 호출 시 오류 없이 완료된다', () => {
    toolbar.show(table, contentEl);
    expect(() => toolbar.syncPosition()).not.toThrow();
  });
});
