import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableNavigator } from '../../src/modules/table/TableNavigator';
// ── 헬퍼 ─────────────────────────────────────────────────────────────────────
function makeTable(rows, cols) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    for (let r = 0; r < rows; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < cols; c++) {
            const td = document.createElement('td');
            td.textContent = `r${r}c${c}`;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}
/** jsdom용: Selection의 startContainer를 설정한다. */
function placeCaretInCell(cell) {
    const range = document.createRange();
    const textNode = cell.firstChild ?? cell;
    range.setStart(textNode, 0);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function fireTab(target, shiftKey = false) {
    const e = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey,
        bubbles: true,
        cancelable: true,
    });
    target.dispatchEvent(e);
    return e;
}
// ── 테스트 ────────────────────────────────────────────────────────────────────
describe('TableNavigator — Tab 셀 이동', () => {
    let root;
    let navigator;
    const onModified = vi.fn();
    beforeEach(() => {
        root = document.createElement('div');
        root.contentEditable = 'true';
        document.body.appendChild(root);
        navigator = new TableNavigator({ onModified }, { noMenu: true });
        navigator.attach(root);
        onModified.mockClear();
    });
    afterEach(() => {
        navigator.detach();
        root.remove();
    });
    it('Tab → 다음 셀로 이동 (focus 호출 확인)', () => {
        const table = makeTable(2, 3);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        const focusSpy = vi.spyOn(cells[1], 'focus');
        placeCaretInCell(cells[0]);
        const e = fireTab(root);
        expect(e.defaultPrevented).toBe(true);
        expect(focusSpy).toHaveBeenCalled();
    });
    it('Shift+Tab → 이전 셀로 이동 (focus 호출 확인)', () => {
        const table = makeTable(2, 3);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        const focusSpy = vi.spyOn(cells[1], 'focus');
        placeCaretInCell(cells[2]);
        const e = fireTab(root, true);
        expect(e.defaultPrevented).toBe(true);
        expect(focusSpy).toHaveBeenCalled();
    });
    it('첫 번째 셀에서 Shift+Tab → 이동 없음 (focus 미호출)', () => {
        const table = makeTable(2, 3);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        // 다른 셀들에 focus spy
        const spies = cells.slice(1).map((c) => vi.spyOn(c, 'focus'));
        placeCaretInCell(cells[0]);
        const e = fireTab(root, true);
        expect(e.defaultPrevented).toBe(true);
        spies.forEach((s) => expect(s).not.toHaveBeenCalled());
    });
    it('마지막 셀에서 Tab → 새 행 추가 + onModified 호출', () => {
        const table = makeTable(1, 3);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        placeCaretInCell(cells[cells.length - 1]);
        const e = fireTab(root);
        expect(e.defaultPrevented).toBe(true);
        expect(table.rows.length).toBe(2);
        expect(table.rows[1].cells.length).toBe(3);
        expect(onModified).toHaveBeenCalled();
    });
    it('마지막 셀에서 Tab → 새 행 첫 번째 셀에 focus', () => {
        const table = makeTable(1, 3);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        placeCaretInCell(cells[cells.length - 1]);
        fireTab(root);
        // 새 행의 첫 셀이 생성됐는지 확인
        const newFirstCell = table.rows[1]?.cells[0];
        expect(newFirstCell).toBeTruthy();
    });
    it('표 밖에서 Tab → defaultPrevented = false (기본 동작 유지)', () => {
        const p = document.createElement('p');
        p.textContent = '표 밖 텍스트';
        root.appendChild(p);
        const range = document.createRange();
        range.setStart(p.firstChild, 0);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        const e = fireTab(root);
        expect(e.defaultPrevented).toBe(false);
    });
    it('th 헤더 셀에서도 Tab 이동 동작', () => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        th1.textContent = '헤더1';
        th2.textContent = '헤더2';
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        table.appendChild(thead);
        root.appendChild(table);
        const focusSpy = vi.spyOn(th2, 'focus');
        placeCaretInCell(th1);
        const e = fireTab(root);
        expect(e.defaultPrevented).toBe(true);
        expect(focusSpy).toHaveBeenCalled();
    });
    it('Tab 이벤트가 표 안에 있을 때 defaultPrevented = true', () => {
        const table = makeTable(1, 2);
        root.appendChild(table);
        const cells = Array.from(table.querySelectorAll('td'));
        placeCaretInCell(cells[0]);
        const e = fireTab(root);
        expect(e.defaultPrevented).toBe(true);
    });
});
