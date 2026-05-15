import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { TableNavigator } from '../../src/modules/table/TableNavigator.js';
import { TableBuilder } from '../../src/modules/table/TableBuilder.js';
// ── JSDOM 환경 헬퍼 ──────────────────────────────────────────────────────────
function createEnv() {
    const dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true });
    const doc = dom.window.document;
    const contentEl = doc.createElement('div');
    contentEl.contentEditable = 'true';
    doc.body.appendChild(contentEl);
    return { dom, doc, contentEl };
}
function buildTable(doc, rows = 3, cols = 3) {
    const table = TableBuilder.build({ rows, cols, width: '300px', border: 1 }, doc);
    // JSDOM 에서 실제 레이아웃이 없으므로 td에 width/height 직접 설정
    Array.from(table.querySelectorAll('td,th')).forEach((cell) => {
        Object.defineProperty(cell, 'getBoundingClientRect', {
            value: () => ({
                width: 100, height: 30,
                left: 0, right: 100, top: 0, bottom: 30,
            }),
            configurable: true,
        });
        Object.defineProperty(cell, 'offsetWidth', { value: 100, configurable: true });
        Object.defineProperty(cell, 'offsetHeight', { value: 30, configurable: true });
    });
    return table;
}
// ── 테스트 ───────────────────────────────────────────────────────────────────
describe('열 너비 드래그 조정', () => {
    let doc;
    let contentEl;
    let nav;
    let table;
    beforeEach(() => {
        ({ doc, contentEl } = createEnv());
        nav = new TableNavigator({ onModified: () => { } });
        nav.attach(contentEl);
        table = buildTable(doc);
        contentEl.appendChild(table);
    });
    it('열 너비 드래그 후 td style.width 가 변경된다', () => {
        const firstCell = table.querySelector('td');
        const colgroup = table.querySelector('colgroup');
        const col1 = colgroup?.children[0];
        // startColResize 직접 호출 (private 우회)
        const navAny = nav;
        navAny['startColResize'](firstCell, table, 0);
        // 드래그: 20px 오른쪽
        const ownerDoc = firstCell.ownerDocument;
        const moveEv = new ownerDoc.defaultView.MouseEvent('mousemove', { clientX: 20 });
        ownerDoc.dispatchEvent(moveEv);
        // col1 또는 td 의 width 업데이트 확인
        const w = col1 ? col1.style.width : firstCell.style.width;
        expect(w).toContain('px');
        const px = parseFloat(w);
        expect(px).toBeGreaterThan(100); // 원래 100px 보다 증가
    });
    it('열 너비 최솟값 30px 미만으로 줄어들지 않는다', () => {
        const firstCell = table.querySelector('td');
        const navAny = nav;
        navAny['startColResize'](firstCell, table, 0);
        // 드래그: 200px 오른쪽 (옆 열을 30px 미만으로 만들려는 시도)
        const ownerDoc = firstCell.ownerDocument;
        const moveEv = new ownerDoc.defaultView.MouseEvent('mousemove', { clientX: 200 });
        ownerDoc.dispatchEvent(moveEv);
        const colgroup = table.querySelector('colgroup');
        const col2 = colgroup?.children[1];
        if (col2) {
            const w2 = parseFloat(col2.style.width);
            expect(w2).toBeGreaterThanOrEqual(30);
        }
    });
});
describe('행 높이 드래그 조정', () => {
    let doc;
    let contentEl;
    let nav;
    let table;
    beforeEach(() => {
        ({ doc, contentEl } = createEnv());
        nav = new TableNavigator({});
        nav.attach(contentEl);
        table = buildTable(doc);
        contentEl.appendChild(table);
    });
    it('행 높이 드래그 후 tr style.height 가 변경된다', () => {
        const firstRow = table.querySelector('tr');
        const firstCell = firstRow.querySelector('td,th');
        Object.defineProperty(firstRow, 'getBoundingClientRect', {
            value: () => ({ height: 30, top: 0, bottom: 30, left: 0, right: 300, width: 300 }),
            configurable: true,
        });
        const navAny = nav;
        navAny['startRowResize'](firstCell, table, 0);
        const ownerDoc = table.ownerDocument;
        const moveEv = new ownerDoc.defaultView.MouseEvent('mousemove', { clientY: 20 });
        ownerDoc.dispatchEvent(moveEv);
        expect(firstRow.style.height).toContain('px');
        expect(parseFloat(firstRow.style.height)).toBeGreaterThan(30);
    });
    it('행 높이 최솟값 20px 미만으로 줄어들지 않는다', () => {
        const firstRow = table.querySelector('tr');
        const firstCell = firstRow.querySelector('td,th');
        Object.defineProperty(firstRow, 'getBoundingClientRect', {
            value: () => ({ height: 30, top: 0, bottom: 30, left: 0, right: 300, width: 300 }),
            configurable: true,
        });
        const navAny = nav;
        navAny['startRowResize'](firstCell, table, 0);
        const ownerDoc = table.ownerDocument;
        // -100px 드래그 (20px 미만으로 만들려는 시도)
        const moveEv = new ownerDoc.defaultView.MouseEvent('mousemove', { clientY: -100 });
        ownerDoc.dispatchEvent(moveEv);
        const h = parseFloat(firstRow.style.height);
        expect(h).toBeGreaterThanOrEqual(20);
    });
});
describe('셀 세로 정렬', () => {
    let doc;
    let contentEl;
    let nav;
    let table;
    beforeEach(() => {
        ({ doc, contentEl } = createEnv());
        nav = new TableNavigator({ onModified: () => { } });
        nav.attach(contentEl);
        table = buildTable(doc);
        contentEl.appendChild(table);
    });
    it('세로 정렬 middle 적용 시 td style.verticalAlign 이 middle 이다', () => {
        const cell = table.querySelector('td');
        const navAny = nav;
        navAny['applyCellVerticalAlign'](cell, table, 'middle');
        expect(cell.style.verticalAlign).toBe('middle');
    });
    it('세로 정렬 top 적용 시 td style.verticalAlign 이 top 이다', () => {
        const cell = table.querySelector('td');
        const navAny = nav;
        navAny['applyCellVerticalAlign'](cell, table, 'top');
        expect(cell.style.verticalAlign).toBe('top');
    });
});
describe('표 전체 정렬', () => {
    let doc;
    let contentEl;
    let nav;
    let table;
    beforeEach(() => {
        ({ doc, contentEl } = createEnv());
        nav = new TableNavigator({ onModified: () => { } });
        nav.attach(contentEl);
        table = buildTable(doc);
        contentEl.appendChild(table);
    });
    it('표 가운데 정렬 시 table margin 이 auto auto 이다', () => {
        nav.applyTableAlign(table, 'center');
        expect(table.style.marginLeft).toBe('auto');
        expect(table.style.marginRight).toBe('auto');
    });
    it('표 오른쪽 정렬 시 marginLeft 가 auto 이다', () => {
        nav.applyTableAlign(table, 'right');
        expect(table.style.marginLeft).toBe('auto');
        expect(parseFloat(table.style.marginRight)).toBe(0);
    });
    it('표 왼쪽 정렬 시 marginLeft 가 0 이다', () => {
        nav.applyTableAlign(table, 'left');
        expect(parseFloat(table.style.marginLeft)).toBe(0);
    });
});
