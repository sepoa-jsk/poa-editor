import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputInlineToolbar } from '../../src/modules/form/InputInlineToolbar.js';
// ── 헬퍼 ──────────────────────────────────────────────────────────────────────
function makeInput() {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.dataset.poaForm = '{}';
    document.body.appendChild(inp);
    return inp;
}
function makeInputInCell() {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.dataset.poaForm = '{}';
    td.appendChild(inp);
    tr.appendChild(td);
    table.appendChild(tr);
    document.body.appendChild(table);
    return { inp, td };
}
function makeContentEl() {
    const div = document.createElement('div');
    div.style.cssText = 'position:relative;width:800px;height:600px;overflow-y:auto;';
    document.body.appendChild(div);
    return div;
}
function getBar() {
    return document.body.querySelector('[data-poa-temp]');
}
function getBtns(bar) {
    return Array.from(bar.querySelectorAll('button'));
}
// ── 표 밖 input 테스트 ────────────────────────────────────────────────────────
describe('InputInlineToolbar — 표 밖 input', () => {
    let toolbar;
    let inp;
    let contentEl;
    beforeEach(() => {
        toolbar = new InputInlineToolbar();
        inp = makeInput();
        contentEl = makeContentEl();
        toolbar.show(inp, contentEl);
    });
    afterEach(() => {
        toolbar.hide();
        document.body.querySelectorAll('[data-poa-temp], input, div, table').forEach((el) => el.remove());
        vi.restoreAllMocks();
    });
    it('show() 후 data-poa-temp 툴바가 body에 추가된다', () => {
        expect(getBar()).toBeTruthy();
    });
    it('hide() 후 툴바가 제거된다', () => {
        toolbar.hide();
        expect(getBar()).toBeNull();
    });
    it('너비 input이 존재한다', () => {
        expect(getBar().querySelector('input[type="number"]')).toBeTruthy();
    });
    it('표 밖 input에는 "셀에 맞춤" 버튼이 없다', () => {
        const btns = getBtns(getBar());
        expect(btns.some((b) => b.textContent === '셀에 맞춤')).toBe(false);
    });
    it('표 밖 input에는 "에디터 너비에 맞춤" 버튼이 있다', () => {
        const btns = getBtns(getBar());
        expect(btns.some((b) => b.textContent === '에디터 너비에 맞춤')).toBe(true);
    });
    it('정렬 select가 존재한다', () => {
        expect(getBar().querySelector('select')).toBeTruthy();
    });
    it('정렬 select에 글자 정렬 optgroup이 있다', () => {
        const groups = Array.from(getBar().querySelectorAll('optgroup'));
        expect(groups.some((g) => g.label === '글자 정렬')).toBe(true);
    });
    it('정렬 select에 위치 정렬 optgroup이 있다', () => {
        const groups = Array.from(getBar().querySelectorAll('optgroup'));
        expect(groups.some((g) => g.label === '위치 정렬')).toBe(true);
    });
    it('너비 input에서 Enter → inp.style.width 변경', () => {
        const bar = getBar();
        const wInput = bar.querySelector('input[type="number"]');
        wInput.value = '350';
        wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(inp.style.width).toBe('350px');
    });
    it('에디터 너비에 맞춤 버튼 클릭 → width:px 설정', () => {
        inp.style.width = '200px';
        const bar = getBar();
        const fitBtn = getBtns(bar).find((b) => b.textContent === '에디터 너비에 맞춤');
        fitBtn.click();
        // contentEl.clientWidth = 0 in jsdom → fallback 200px
        expect(inp.style.width).toMatch(/^\d+px$/);
    });
    it('글자 정렬 "가운데" 선택 → textAlign:center 적용', () => {
        const bar = getBar();
        const alignSel = bar.querySelector('select');
        alignSel.value = 'text-center';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.textAlign).toBe('center');
    });
    it('글자 정렬 "오른쪽" 선택 → textAlign:right 적용', () => {
        const bar = getBar();
        const alignSel = bar.querySelector('select');
        alignSel.value = 'text-right';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.textAlign).toBe('right');
    });
    it('위치 정렬 "가운데 배치" 선택 → margin:auto + display:block 적용', () => {
        const bar = getBar();
        const alignSel = bar.querySelector('select');
        alignSel.value = 'pos-center';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.marginLeft).toBe('auto');
        expect(inp.style.marginRight).toBe('auto');
        expect(inp.style.display).toBe('block');
    });
    it('위치 정렬 "오른쪽 배치" 선택 → marginLeft:auto 적용', () => {
        const bar = getBar();
        const alignSel = bar.querySelector('select');
        alignSel.value = 'pos-right';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.marginLeft).toBe('auto');
        // jsdom은 '0' → '0px' 로 정규화
        expect(inp.style.marginRight).toMatch(/^0(px)?$/);
        expect(inp.style.display).toBe('block');
    });
    it('위치 정렬 "왼쪽 배치" 선택 → marginRight:auto 적용', () => {
        const bar = getBar();
        const alignSel = bar.querySelector('select');
        alignSel.value = 'pos-left';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.marginRight).toBe('auto');
        expect(inp.style.marginLeft).toMatch(/^0(px)?$/);
        expect(inp.style.display).toBe('block');
    });
    it('onResized 콜백이 너비 변경 시 호출된다', () => {
        // beforeEach 툴바를 먼저 숨겨야 같은 input에 새 툴바가 단독으로 붙는다
        toolbar.hide();
        const onResized = vi.fn();
        const tb = new InputInlineToolbar({ onResized });
        tb.show(inp, contentEl);
        const bar = getBar();
        const wInput = bar.querySelector('input[type="number"]');
        wInput.value = '280';
        wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(onResized).toHaveBeenCalledTimes(1);
        tb.hide();
    });
    it('onResized 콜백이 에디터 너비에 맞춤 시 호출된다', () => {
        toolbar.hide();
        const onResized = vi.fn();
        const tb = new InputInlineToolbar({ onResized });
        tb.show(inp, contentEl);
        const bar = getBar();
        const fitBtn = getBtns(bar).find((b) => b.textContent === '에디터 너비에 맞춤');
        fitBtn.click();
        expect(onResized).toHaveBeenCalledTimes(1);
        tb.hide();
    });
    it('syncPosition() 호출 시 오류 없이 완료된다', () => {
        expect(() => toolbar.syncPosition()).not.toThrow();
    });
    it('show()를 두 번 호출해도 툴바는 1개다', () => {
        toolbar.show(inp, contentEl);
        const bars = document.body.querySelectorAll('[data-poa-temp]');
        expect(bars.length).toBe(1);
    });
});
// ── 표 안 input 테스트 ────────────────────────────────────────────────────────
describe('InputInlineToolbar — 표 안 input', () => {
    let toolbar;
    let inp;
    let td;
    let contentEl;
    beforeEach(() => {
        toolbar = new InputInlineToolbar();
        const result = makeInputInCell();
        inp = result.inp;
        td = result.td;
        contentEl = makeContentEl();
        toolbar.show(inp, contentEl);
    });
    afterEach(() => {
        toolbar.hide();
        document.body.querySelectorAll('[data-poa-temp], input, div, table').forEach((el) => el.remove());
        vi.restoreAllMocks();
    });
    it('표 안 input에는 "셀에 맞춤" 버튼이 있다', () => {
        const btns = getBtns(getBar());
        expect(btns.some((b) => b.textContent === '셀에 맞춤')).toBe(true);
    });
    it('표 안 input에도 "에디터 너비에 맞춤" 버튼이 있다', () => {
        const btns = getBtns(getBar());
        expect(btns.some((b) => b.textContent === '에디터 너비에 맞춤')).toBe(true);
    });
    it('셀에 맞춤 버튼 클릭 → width:100%', () => {
        inp.style.width = '200px';
        const fitBtn = getBtns(getBar()).find((b) => b.textContent === '셀에 맞춤');
        fitBtn.click();
        expect(inp.style.width).toBe('100%');
    });
    it('위치 정렬 "가운데 배치" → td.style.textAlign:center', () => {
        const alignSel = getBar().querySelector('select');
        alignSel.value = 'pos-center';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(td.style.textAlign).toBe('center');
    });
    it('위치 정렬 "오른쪽 배치" → td.style.textAlign:right', () => {
        const alignSel = getBar().querySelector('select');
        alignSel.value = 'pos-right';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(td.style.textAlign).toBe('right');
    });
    it('위치 정렬 "왼쪽 배치" → td.style.textAlign 초기화', () => {
        td.style.textAlign = 'center';
        const alignSel = getBar().querySelector('select');
        alignSel.value = 'pos-left';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(td.style.textAlign).toBe('');
    });
    it('글자 정렬 "가운데" → inp.style.textAlign:center (td 변경 없음)', () => {
        const alignSel = getBar().querySelector('select');
        alignSel.value = 'text-center';
        alignSel.dispatchEvent(new Event('change', { bubbles: true }));
        expect(inp.style.textAlign).toBe('center');
        expect(td.style.textAlign).toBe('');
    });
});
// ── 너비 클램핑 테스트 ─────────────────────────────────────────────────────────
describe('InputInlineToolbar — 너비 클램핑', () => {
    let toolbar;
    let inp;
    let contentEl;
    beforeEach(() => {
        toolbar = new InputInlineToolbar();
        inp = makeInput();
        contentEl = makeContentEl();
        toolbar.show(inp, contentEl);
    });
    afterEach(() => {
        toolbar.hide();
        document.body.querySelectorAll('[data-poa-temp], input, div').forEach((el) => el.remove());
    });
    it('60 미만 너비 입력 시 60으로 클램핑', () => {
        const bar = getBar();
        const wInput = bar.querySelector('input[type="number"]');
        wInput.value = '10';
        wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(parseInt(inp.style.width)).toBeGreaterThanOrEqual(60);
    });
    it('contentEl.clientWidth가 0이면 fallback으로 너비를 그대로 적용 (9999 cap)', () => {
        const bar = getBar();
        const wInput = bar.querySelector('input[type="number"]');
        wInput.value = '500';
        wInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        // jsdom에서 clientWidth=0 → maxW=9999 → 500px 그대로
        expect(inp.style.width).toBe('500px');
    });
});
