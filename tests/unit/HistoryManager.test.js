import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Snapshot } from '../../src/core/history/Snapshot';
import { HistoryManager } from '../../src/core/history/HistoryManager';
import { EditorCore } from '../../src/core/EditorCore';
// ─────────────────────── Snapshot 테스트 ───────────────────────
describe('Snapshot', () => {
    it('serialize/deserialize 왕복 변환이 정확하다', async () => {
        const html = '<p>Hello <strong>World</strong></p>';
        const data = await Snapshot.serialize(html);
        const restored = await Snapshot.deserialize(data);
        expect(restored).toBe(html);
    });
    it('빈 문자열도 정확하게 왕복 변환된다', async () => {
        const data = await Snapshot.serialize('');
        const restored = await Snapshot.deserialize(data);
        expect(restored).toBe('');
    });
    it('한국어 문자열을 정확하게 왕복 변환한다', async () => {
        const html = '<p>안녕하세요 <em>세계</em></p>';
        const data = await Snapshot.serialize(html);
        const restored = await Snapshot.deserialize(data);
        expect(restored).toBe(html);
    });
});
// ─────────────────── HistoryManager 단위 테스트 ─────────────────
describe('HistoryManager', () => {
    let hm;
    beforeEach(() => {
        hm = new HistoryManager();
    });
    it('setInitial() 직후 canUndo()는 false이다', async () => {
        hm.setInitial('<p>초기 상태</p>');
        expect(hm.canUndo()).toBe(false);
    });
    it('setInitial() 직후 canRedo()는 false이다', () => {
        hm.setInitial('');
        expect(hm.canRedo()).toBe(false);
    });
    it('push() 후 canUndo()는 true이다', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'format:strong');
        expect(hm.canUndo()).toBe(true);
    });
    it('push() 후 canRedo()는 false이다', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'format:strong');
        expect(hm.canRedo()).toBe(false);
    });
    it('undo() 가 이전 상태 HTML을 반환한다', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'cmd1');
        const html = await hm.undo();
        expect(html).toBe('<p>initial</p>');
    });
    it('undo() 후 canUndo()는 false (초기 상태까지 복원)', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'cmd1');
        await hm.undo();
        expect(hm.canUndo()).toBe(false);
    });
    it('undo() 후 redo()가 다음 상태 HTML을 반환한다', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'cmd1');
        await hm.undo();
        expect(hm.canRedo()).toBe(true);
        const html = await hm.redo();
        expect(html).toBe('<p>step1</p>');
    });
    it('redo() 후 canRedo()는 false (최신 상태)', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'cmd1');
        await hm.undo();
        await hm.redo();
        expect(hm.canRedo()).toBe(false);
    });
    it('canUndo()가 false일 때 undo()는 null을 반환한다', async () => {
        hm.setInitial('');
        const result = await hm.undo();
        expect(result).toBeNull();
    });
    it('canRedo()가 false일 때 redo()는 null을 반환한다', async () => {
        hm.setInitial('');
        await hm.push('<p>step1</p>', 'cmd1');
        const result = await hm.redo();
        expect(result).toBeNull();
    });
    it('undo 후 push()하면 redo 스택이 초기화된다', async () => {
        hm.setInitial('<p>initial</p>');
        await hm.push('<p>step1</p>', 'cmd1');
        await hm.push('<p>step2</p>', 'cmd2');
        await hm.undo(); // step1로 이동
        expect(hm.canRedo()).toBe(true);
        // 새 편집 → redo 스택 초기화
        await hm.push('<p>step_new</p>', 'cmd_new');
        expect(hm.canRedo()).toBe(false);
        expect(hm.getStackSize()).toBe(3); // initial, step1, step_new
    });
    it('다중 undo 후 연속 redo가 정확히 복원된다', async () => {
        hm.setInitial('s0');
        await hm.push('s1', 'cmd1');
        await hm.push('s2', 'cmd2');
        await hm.push('s3', 'cmd3');
        expect(await hm.undo()).toBe('s2');
        expect(await hm.undo()).toBe('s1');
        expect(await hm.undo()).toBe('s0');
        expect(hm.canUndo()).toBe(false);
        expect(await hm.redo()).toBe('s1');
        expect(await hm.redo()).toBe('s2');
        expect(await hm.redo()).toBe('s3');
        expect(hm.canRedo()).toBe(false);
    });
    it('maxSize(100스텝) 초과 시 가장 오래된 항목이 제거된다', async () => {
        hm.setInitial('<p>initial</p>');
        // 101번 push → maxSize(100스텝=101 entries) 초과로 1회 trim 발생
        for (let i = 1; i <= 101; i++) {
            await hm.push(`<p>step${i}</p>`, `cmd${i}`);
        }
        // 101 entries(initial포함 102 → trim 1회 → 101)
        expect(hm.getStackSize()).toBe(101);
        // 여전히 undo 가능
        expect(hm.canUndo()).toBe(true);
        // 가장 오래된 항목까지 undo 했을 때 '<p>initial</p>'이 아닌 '<p>step1</p>'
        let lastHtml = null;
        while (hm.canUndo()) {
            lastHtml = await hm.undo();
        }
        expect(lastHtml).toBe('<p>step1</p>');
    });
    it('getCurrentLabel()이 현재 엔트리 라벨을 반환한다', async () => {
        hm.setInitial('');
        expect(hm.getCurrentLabel()).toBe('initial');
        await hm.push('<p>1</p>', 'format:strong');
        expect(hm.getCurrentLabel()).toBe('format:strong');
        await hm.undo();
        expect(hm.getCurrentLabel()).toBe('initial');
    });
});
// ──────────────── EditorCore + HistoryManager 통합 테스트 ────────
describe('EditorCore — Undo/Redo 통합', () => {
    let container;
    let core;
    beforeEach(() => {
        container = document.createElement('div');
        container.contentEditable = 'true';
        container.textContent = 'Hello World';
        document.body.appendChild(container);
        core = new EditorCore();
        core.mount(container);
    });
    afterEach(() => {
        core.unmount();
        document.body.removeChild(container);
    });
    it('mount() 직후 canUndo()는 false이다', () => {
        expect(core.canUndo()).toBe(false);
    });
    it('FormatCommand 실행 후 canUndo()는 true이다', async () => {
        const { FormatCommand } = await import('../../src/core/commands/FormatCommand');
        const range = document.createRange();
        range.selectNodeContents(container);
        const cmd = new FormatCommand('strong', range, document);
        await core.execute(cmd);
        expect(core.canUndo()).toBe(true);
    });
    it('execute 후 undo()하면 이전 DOM 상태로 복원된다', async () => {
        const { FormatCommand } = await import('../../src/core/commands/FormatCommand');
        // "Hello" 선택 후 bold 적용
        const textNode = container.firstChild;
        const range = document.createRange();
        range.setStart(textNode, 0);
        range.setEnd(textNode, 5);
        const cmd = new FormatCommand('strong', range, document);
        await core.execute(cmd);
        expect(container.querySelector('strong')).not.toBeNull();
        expect(core.canUndo()).toBe(true);
        await core.undo();
        expect(container.querySelector('strong')).toBeNull();
        expect(container.textContent).toBe('Hello World');
        expect(core.canUndo()).toBe(false);
    });
    it('undo 후 redo()하면 다시 서식이 복원된다', async () => {
        const { FormatCommand } = await import('../../src/core/commands/FormatCommand');
        const textNode = container.firstChild;
        const range = document.createRange();
        range.setStart(textNode, 0);
        range.setEnd(textNode, 5);
        const cmd = new FormatCommand('strong', range, document);
        await core.execute(cmd);
        await core.undo();
        expect(container.querySelector('strong')).toBeNull();
        await core.redo();
        expect(container.querySelector('strong')).not.toBeNull();
        expect(core.canRedo()).toBe(false);
    });
});
