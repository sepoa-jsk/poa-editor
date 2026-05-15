import { describe, it, expect } from 'vitest';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — jsdom types not installed; runtime only
import { JSDOM } from 'jsdom';
import { FormatPainter } from '../../src/modules/format/FormatPainter.js';
/** JSDOM 환경에서 Selection/Range를 초기화하고 FormatPainter 인스턴스를 반환한다 */
function setup() {
    const dom = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' });
    const document = dom.window.document;
    const contentEl = document.createElement('div');
    contentEl.setAttribute('contenteditable', 'true');
    document.body.appendChild(contentEl);
    let modeChangedTo = null;
    const painter = new FormatPainter(contentEl, {
        onModeChange: (active) => { modeChangedTo = active; },
    });
    function makeRange(html) {
        contentEl.innerHTML = html;
        const range = document.createRange();
        range.selectNodeContents(contentEl.firstChild);
        const sel = dom.window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        return range;
    }
    function makeCollapsedRange(node, offset = 0) {
        const range = document.createRange();
        range.setStart(node, offset);
        range.collapse(true);
        const sel = dom.window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        return range;
    }
    return { document, contentEl, painter, makeRange, makeCollapsedRange, getModeChangedTo: () => modeChangedTo };
}
describe('FormatPainter', () => {
    describe('초기 상태', () => {
        it('기본적으로 비활성 상태다', () => {
            const { painter } = setup();
            expect(painter.isActive).toBe(false);
        });
        it('저장된 스타일이 없다', () => {
            const { painter } = setup();
            expect(painter.hasSavedStyles).toBe(false);
        });
    });
    describe('copy()', () => {
        it('인라인 스타일이 있는 노드에서 스타일을 수집하고 페인터 모드를 활성화한다', () => {
            const { document, contentEl, painter, getModeChangedTo } = setup();
            const span = document.createElement('span');
            span.style.fontWeight = 'bold';
            span.style.color = 'rgb(255, 0, 0)';
            span.textContent = 'hello';
            contentEl.appendChild(span);
            const range = document.createRange();
            range.selectNodeContents(span);
            const sel = document.defaultView.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            painter.copy();
            expect(painter.isActive).toBe(true);
            expect(painter.hasSavedStyles).toBe(true);
            expect(getModeChangedTo()).toBe(true);
        });
        it('선택 영역이 없으면 아무 동작도 하지 않는다', () => {
            const { painter } = setup();
            const sel = document.getSelection();
            sel?.removeAllRanges();
            painter.copy();
            expect(painter.isActive).toBe(false);
        });
        it('continuous=true이면 연속 모드가 활성화된다', () => {
            const { document, contentEl, painter } = setup();
            const span = document.createElement('span');
            span.style.fontSize = '14pt';
            span.textContent = 'test';
            contentEl.appendChild(span);
            const range = document.createRange();
            range.selectNodeContents(span);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy(true);
            expect(painter.isActive).toBe(true);
        });
    });
    describe('paste()', () => {
        it('저장된 스타일을 선택 영역에 span으로 적용한다', () => {
            const { document, contentEl, painter } = setup();
            // 스타일 복사 소스
            const src = document.createElement('span');
            src.style.fontSize = '18pt';
            src.style.color = 'rgb(0, 0, 255)';
            src.textContent = 'source';
            contentEl.appendChild(src);
            let range = document.createRange();
            range.selectNodeContents(src);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy();
            // 적용 대상
            const target = document.createElement('p');
            target.textContent = 'target text';
            contentEl.appendChild(target);
            range = document.createRange();
            range.selectNodeContents(target);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.paste();
            // paste가 range의 내용을 교체하므로 p 내부 또는 인근에 span이 생성됨
            const allSpans = contentEl.querySelectorAll('span');
            const styled = Array.from(allSpans).find(s => s.style.fontSize === '18pt');
            expect(styled).toBeTruthy();
            expect(styled?.style.color).toBe('rgb(0, 0, 255)');
        });
        it('저장된 스타일이 없으면 아무 동작도 하지 않는다', () => {
            const { document, contentEl, painter } = setup();
            contentEl.textContent = 'hello';
            const range = document.createRange();
            range.selectNodeContents(contentEl);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            const before = contentEl.innerHTML;
            painter.paste();
            expect(contentEl.innerHTML).toBe(before);
        });
        it('비연속 모드에서 paste 후 페인터가 비활성화된다', () => {
            const { document, contentEl, painter, getModeChangedTo } = setup();
            const src = document.createElement('span');
            src.style.color = 'red';
            src.textContent = 'x';
            contentEl.appendChild(src);
            const range = document.createRange();
            range.selectNodeContents(src);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy(false);
            const tgt = document.createElement('p');
            tgt.textContent = 'target';
            contentEl.appendChild(tgt);
            const r2 = document.createRange();
            r2.selectNodeContents(tgt);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(r2);
            painter.paste();
            expect(painter.isActive).toBe(false);
            expect(getModeChangedTo()).toBe(false);
        });
        it('collapsed range에서는 paste가 동작하지 않는다', () => {
            const { document, contentEl, painter, makeCollapsedRange } = setup();
            const src = document.createElement('span');
            src.style.color = 'green';
            src.textContent = 'source';
            contentEl.appendChild(src);
            const range = document.createRange();
            range.selectNodeContents(src);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy();
            const tgt = document.createTextNode('hi');
            contentEl.appendChild(tgt);
            makeCollapsedRange(tgt, 1);
            const before = contentEl.innerHTML;
            painter.paste();
            expect(contentEl.innerHTML).toBe(before);
        });
    });
    describe('clear()', () => {
        it('선택 영역의 인라인 태그를 제거하고 순수 텍스트를 유지한다', () => {
            const { document, contentEl, painter } = setup();
            contentEl.innerHTML = '<p><strong><em>bold italic</em></strong></p>';
            const p = contentEl.querySelector('p');
            const range = document.createRange();
            range.selectNodeContents(p);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.clear();
            // strong/em이 제거되고 텍스트만 남아야 한다
            expect(contentEl.textContent).toContain('bold italic');
            expect(contentEl.querySelector('strong')).toBeNull();
            expect(contentEl.querySelector('em')).toBeNull();
        });
        it('collapsed 선택에서는 아무 동작도 하지 않는다', () => {
            const { contentEl, painter, makeCollapsedRange } = setup();
            contentEl.innerHTML = '<span style="color:red">hello</span>';
            const text = contentEl.querySelector('span').firstChild;
            makeCollapsedRange(text, 2);
            const before = contentEl.innerHTML;
            painter.clear();
            expect(contentEl.innerHTML).toBe(before);
        });
    });
    describe('deactivate()', () => {
        it('페인터 모드를 비활성화하고 콜백을 호출한다', () => {
            const { document, contentEl, painter, getModeChangedTo } = setup();
            const span = document.createElement('span');
            span.style.color = 'purple';
            span.textContent = 'test';
            contentEl.appendChild(span);
            const range = document.createRange();
            range.selectNodeContents(span);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy();
            expect(painter.isActive).toBe(true);
            painter.deactivate();
            expect(painter.isActive).toBe(false);
            expect(getModeChangedTo()).toBe(false);
        });
        it('이미 비활성 상태에서 deactivate는 콜백을 호출하지 않는다', () => {
            const { painter, getModeChangedTo } = setup();
            painter.deactivate();
            expect(getModeChangedTo()).toBeNull();
        });
    });
    describe('handleKeydown()', () => {
        it('ESC 키로 페인터 모드를 해제한다', () => {
            const { document, contentEl, painter } = setup();
            const span = document.createElement('span');
            span.style.fontSize = '20pt';
            span.textContent = 'esc test';
            contentEl.appendChild(span);
            const range = document.createRange();
            range.selectNodeContents(span);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(range);
            painter.copy();
            expect(painter.isActive).toBe(true);
            const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            painter.handleKeydown(escEvent);
            expect(painter.isActive).toBe(false);
        });
        it('페인터 비활성 상태에서 ESC는 아무 동작도 하지 않는다', () => {
            const { painter } = setup();
            const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            painter.handleKeydown(escEvent);
            expect(painter.isActive).toBe(false);
        });
    });
    describe('handleMouseUp()', () => {
        it('페인터 활성 + 선택 있을 때 paste를 실행한다', () => {
            const { document, contentEl, painter } = setup();
            // setup source style
            const src = document.createElement('span');
            src.style.fontWeight = '700';
            src.textContent = 'src';
            contentEl.appendChild(src);
            const r1 = document.createRange();
            r1.selectNodeContents(src);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(r1);
            painter.copy();
            // setup target selection
            const tgt = document.createElement('p');
            tgt.textContent = 'target';
            contentEl.appendChild(tgt);
            const r2 = document.createRange();
            r2.selectNodeContents(tgt);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(r2);
            painter.handleMouseUp();
            // paste 실행 → font-weight:700 span이 생성되어야 한다
            const allSpans = contentEl.querySelectorAll('span');
            const boldSpan = Array.from(allSpans).find(s => s.style.fontWeight === '700');
            expect(boldSpan).toBeTruthy();
        });
        it('페인터 비활성 상태에서 handleMouseUp은 아무 동작도 하지 않는다', () => {
            const { document, contentEl, painter } = setup();
            contentEl.textContent = 'noop';
            const before = contentEl.innerHTML;
            const r = document.createRange();
            r.selectNodeContents(contentEl);
            document.defaultView.getSelection().removeAllRanges();
            document.defaultView.getSelection().addRange(r);
            painter.handleMouseUp();
            expect(contentEl.innerHTML).toBe(before);
        });
    });
});
