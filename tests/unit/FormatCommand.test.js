import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FormatCommand } from '../../src/core/commands/FormatCommand';
import { EditorCore } from '../../src/core/EditorCore';
// ───────────────────────────── 헬퍼 ──────────────────────────────
/**
 * container의 첫 번째 텍스트 노드에서 [start, end) 구간을 선택한 Range를 반환.
 * Selection은 설정하지 않음 — FormatCommand 내부에서 ownerDocument.getSelection() 처리.
 */
function makeRange(container, start, end) {
    const textNode = container.firstChild;
    const range = document.createRange();
    range.setStart(textNode, start);
    range.setEnd(textNode, end);
    return range;
}
// ──────────────────────── FormatCommand 테스트 ───────────────────
describe('FormatCommand', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
        container.contentEditable = 'true';
        container.textContent = 'Hello World';
        document.body.appendChild(container);
    });
    afterEach(() => {
        document.body.removeChild(container);
    });
    it('텍스트에 볼드(<strong>) 서식을 적용한다', () => {
        const range = makeRange(container, 0, 5); // "Hello"
        const cmd = new FormatCommand('strong', range, document);
        cmd.execute();
        const strong = container.querySelector('strong');
        expect(strong).not.toBeNull();
        expect(strong.textContent).toBe('Hello');
        // 나머지 텍스트는 그대로
        expect(container.textContent).toBe('Hello World');
    });
    it('이탤릭(<em>) 서식을 적용한다', () => {
        const range = makeRange(container, 0, 5);
        const cmd = new FormatCommand('em', range, document);
        cmd.execute();
        expect(container.querySelector('em')).not.toBeNull();
        expect(container.querySelector('em').textContent).toBe('Hello');
    });
    it('밑줄(<u>) 서식을 적용한다', () => {
        const range = makeRange(container, 0, 5);
        const cmd = new FormatCommand('u', range, document);
        cmd.execute();
        expect(container.querySelector('u')).not.toBeNull();
    });
    it('취소선(<s>) 서식을 적용한다', () => {
        const range = makeRange(container, 0, 5);
        const cmd = new FormatCommand('s', range, document);
        cmd.execute();
        expect(container.querySelector('s')).not.toBeNull();
    });
    it('이미 볼드인 텍스트에 다시 볼드를 적용하면 서식을 제거한다 (토글)', () => {
        // 1차: bold 적용
        const range1 = makeRange(container, 0, 5);
        new FormatCommand('strong', range1, document).execute();
        expect(container.querySelector('strong')).not.toBeNull();
        // 2차: strong 내부 전체를 다시 선택하여 bold 적용 → 제거
        const strong = container.querySelector('strong');
        const range2 = document.createRange();
        range2.selectNodeContents(strong);
        new FormatCommand('strong', range2, document).execute();
        expect(container.querySelector('strong')).toBeNull();
        expect(container.textContent).toBe('Hello World');
    });
    it('볼드 적용 후 undo()하면 <strong>이 제거되고 원본 텍스트가 복원된다', () => {
        const range = makeRange(container, 0, 5);
        const cmd = new FormatCommand('strong', range, document);
        cmd.execute();
        expect(container.querySelector('strong')).not.toBeNull();
        cmd.undo();
        expect(container.querySelector('strong')).toBeNull();
        expect(container.textContent).toBe('Hello World');
    });
    it('볼드 제거 후 undo()하면 <strong>이 복원된다', () => {
        // 1차: bold 적용
        const range1 = makeRange(container, 0, 5);
        new FormatCommand('strong', range1, document).execute();
        // 2차: bold 제거
        const strong = container.querySelector('strong');
        const range2 = document.createRange();
        range2.selectNodeContents(strong);
        const removeCmd = new FormatCommand('strong', range2, document);
        removeCmd.execute();
        expect(container.querySelector('strong')).toBeNull();
        // undo → bold 복원
        removeCmd.undo();
        expect(container.querySelector('strong')).not.toBeNull();
        expect(container.querySelector('strong').textContent).toBe('Hello');
    });
});
// ──────────────────────── EditorCore 테스트 ──────────────────────
describe('EditorCore', () => {
    let div;
    beforeEach(() => {
        div = document.createElement('div');
        document.body.appendChild(div);
    });
    afterEach(() => {
        document.body.removeChild(div);
    });
    it('mount() 후 contentEditable이 true로 설정된다', () => {
        const core = new EditorCore();
        core.mount(div);
        expect(div.contentEditable).toBe('true');
        expect(div.getAttribute('role')).toBe('textbox');
        expect(core.isMounted()).toBe(true);
    });
    it('readonly 옵션으로 mount() 시 contentEditable이 false로 설정된다', () => {
        const core = new EditorCore({ readonly: true });
        core.mount(div);
        expect(div.contentEditable).toBe('false');
    });
    it('unmount() 후 contentEditable과 role 속성이 제거된다', () => {
        const core = new EditorCore();
        core.mount(div);
        core.unmount();
        expect(div.contentEditable).toBe('inherit');
        expect(div.getAttribute('role')).toBeNull();
        expect(core.isMounted()).toBe(false);
    });
    it('placeholder 옵션이 data-placeholder 속성으로 설정된다', () => {
        const core = new EditorCore({ placeholder: '내용을 입력하세요' });
        core.mount(div);
        expect(div.dataset.placeholder).toBe('내용을 입력하세요');
    });
});
// ── 정렬 유틸리티 ─────────────────────────────────────────────────────────────
import { getSelectedBlocks, getImageAlign, getTableAlign } from '../../src/utils/dom.js';
describe('getSelectedBlocks', () => {
    let root;
    beforeEach(() => {
        root = document.createElement('div');
        document.body.appendChild(root);
    });
    afterEach(() => { root.remove(); });
    it('collapsed range — 커서가 속한 단일 블록을 반환한다', () => {
        root.innerHTML = '<p>첫 번째</p><p>두 번째</p>';
        const p1 = root.firstElementChild;
        const range = document.createRange();
        range.setStart(p1.firstChild, 2);
        range.collapse(true);
        expect(getSelectedBlocks(root, range)).toEqual([p1]);
    });
    it('여러 블록에 걸친 range — 교차하는 모든 블록을 반환한다', () => {
        root.innerHTML = '<p>A</p><p>B</p><p>C</p>';
        const [p1, , p3] = Array.from(root.children);
        const range = document.createRange();
        range.setStart(p1.firstChild, 0);
        range.setEnd(p3.firstChild, 1);
        const blocks = getSelectedBlocks(root, range);
        expect(blocks.length).toBe(3);
    });
    it('단일 블록 내 비collapsed range — 해당 블록만 반환한다', () => {
        root.innerHTML = '<p>Hello World</p>';
        const p = root.firstElementChild;
        const range = document.createRange();
        range.setStart(p.firstChild, 0);
        range.setEnd(p.firstChild, 5);
        const blocks = getSelectedBlocks(root, range);
        expect(blocks).toEqual([p]);
    });
});
describe('getImageAlign', () => {
    it('float:left → left', () => {
        const img = document.createElement('img');
        img.style.float = 'left';
        expect(getImageAlign(img)).toBe('left');
    });
    it('float:right → right', () => {
        const img = document.createElement('img');
        img.style.float = 'right';
        expect(getImageAlign(img)).toBe('right');
    });
    it('margin auto/auto → center', () => {
        const img = document.createElement('img');
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        expect(getImageAlign(img)).toBe('center');
    });
    it('기본값(float 없음) → left', () => {
        const img = document.createElement('img');
        expect(getImageAlign(img)).toBe('left');
    });
});
describe('getTableAlign', () => {
    it('marginLeft/Right auto → center', () => {
        const table = document.createElement('table');
        table.style.marginLeft = 'auto';
        table.style.marginRight = 'auto';
        expect(getTableAlign(table)).toBe('center');
    });
    it('marginLeft auto, marginRight 0 → right', () => {
        const table = document.createElement('table');
        table.style.marginLeft = 'auto';
        table.style.marginRight = '0px';
        expect(getTableAlign(table)).toBe('right');
    });
    it('기본값 → left', () => {
        const table = document.createElement('table');
        expect(getTableAlign(table)).toBe('left');
    });
});
