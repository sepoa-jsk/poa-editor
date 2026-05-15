import DOMPurify from 'dompurify';
import { CommandManager } from './CommandManager';
import { FormatCommand } from './commands/FormatCommand';
import { HistoryManager } from './history/HistoryManager';
/**
 * 에디터 코어: Component/Module Layer와 Core Engine의 연결 진입점.
 *
 * - HTMLElement를 주입받아 contenteditable 초기화 및 커맨드 실행을 담당.
 * - DOM 전역(document/window) 직접 호출 대신 마운트된 엘리먼트의 ownerDocument 사용.
 * - execute()는 비동기 — 커맨드 실행 후 HistoryManager에 스냅샷 푸시.
 * - Ctrl+Z(Undo) / Ctrl+Y, Ctrl+Shift+Z(Redo) 단축키를 keydown 이벤트로 처리.
 */
export class EditorCore {
    config;
    commandManager;
    historyManager;
    root = null;
    inputTimer = null;
    /** 타이핑 800ms 무입력 후 히스토리에 자동 기록 */
    inputHandler = () => {
        if (this.inputTimer !== null)
            clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(() => {
            this.inputTimer = null;
            if (this.root) {
                void this.historyManager.push(this.root.innerHTML, 'input').then(() => {
                    if (import.meta.env.DEV)
                        console.log('[EditorCore inputHandler] debounce push 완료 | canUndo:', this.historyManager.canUndo());
                    this.config.onHistoryPush?.();
                });
            }
        }, 800);
    };
    /**
     * keydown 이벤트 핸들러를 멤버로 유지해 unmount 시 정확히 제거할 수 있도록 한다.
     */
    keydownHandler = async (e) => {
        const ctrl = e.ctrlKey || e.metaKey;
        if (!ctrl)
            return;
        if (e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            await this.undo();
        }
        else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
            e.preventDefault();
            await this.redo();
        }
        else if (e.key === 'b') {
            e.preventDefault();
            await this.bold();
        }
        else if (e.key === 'i') {
            e.preventDefault();
            await this.italic();
        }
        else if (e.key === 'u') {
            e.preventDefault();
            await this.underline();
        }
    };
    constructor(config = {}) {
        this.config = config;
        this.commandManager = new CommandManager();
        this.historyManager = new HistoryManager();
    }
    /** contenteditable 엘리먼트에 에디터를 초기화한다 */
    mount(element) {
        this.root = element;
        element.contentEditable = this.config.readonly ? 'false' : 'true';
        element.setAttribute('role', 'textbox');
        element.setAttribute('aria-multiline', 'true');
        if (this.config.placeholder) {
            element.dataset.placeholder = this.config.placeholder;
        }
        // 초기 DOM 상태를 히스토리에 등록 (동기 — mount는 sync 유지)
        this.historyManager.setInitial(element.innerHTML);
        element.addEventListener('input', this.inputHandler);
        element.addEventListener('keydown', this.keydownHandler);
    }
    /** 에디터를 해제하고 속성 및 이벤트를 정리한다 */
    unmount() {
        if (!this.root)
            return;
        if (this.inputTimer !== null) {
            clearTimeout(this.inputTimer);
            this.inputTimer = null;
        }
        this.root.removeEventListener('input', this.inputHandler);
        this.root.removeEventListener('keydown', this.keydownHandler);
        this.root.contentEditable = 'inherit';
        this.root.removeAttribute('role');
        this.root.removeAttribute('aria-multiline');
        delete this.root.dataset.placeholder;
        this.root = null;
    }
    /**
     * 커맨드를 실행하고 실행 후 DOM 상태를 히스토리에 추가한다.
     * 모든 편집 조작은 이 메서드를 통해 히스토리에 기록된다.
     * 커맨드 실행 전 미발화 input 디바운스를 즉시 플러시해 "타이핑 → 즉시 서식 적용 → Undo"
     * 시나리오에서 타이핑 상태가 히스토리에 남도록 한다.
     */
    async execute(cmd) {
        if (!this.root)
            throw new Error('EditorCore가 마운트되지 않았습니다.');
        await this.flushInput();
        this.commandManager.execute(cmd);
        await this.historyManager.push(this.root.innerHTML, cmd.name);
        if (import.meta.env.DEV)
            console.log('[EditorCore execute] push 완료 | canUndo:', this.historyManager.canUndo(), '| canRedo:', this.historyManager.canRedo(), '| stackSize:', this.historyManager.getStackSize());
    }
    /** 한 단계 이전 상태로 복원한다 */
    async undo() {
        if (!this.root)
            return;
        // 아직 히스토리에 기록되지 않은 타이핑 내용을 먼저 저장한 뒤 되돌린다
        await this.flushInput();
        const html = await this.historyManager.undo();
        if (html !== null) {
            this.root.innerHTML = DOMPurify.sanitize(html);
        }
    }
    /** 한 단계 이후 상태로 복원한다 */
    async redo() {
        if (!this.root)
            return;
        const html = await this.historyManager.redo();
        if (html !== null) {
            this.root.innerHTML = DOMPurify.sanitize(html);
        }
    }
    /**
     * 미발화 input 디바운스를 즉시 플러시한다.
     * execute() · undo() 진입 시 호출하여 "타이핑 → Undo" 시 상태 손실을 방지한다.
     */
    async flushInput() {
        if (this.inputTimer === null)
            return;
        clearTimeout(this.inputTimer);
        this.inputTimer = null;
        if (this.root)
            await this.historyManager.push(this.root.innerHTML, 'input');
    }
    /**
     * 컴포넌트 레이어에서 스타일·정렬 적용 후 현재 DOM 상태를 히스토리에 기록한다.
     * execute()를 거치지 않는 직접 DOM 조작(정렬, 인덴트, 색상 등)에 사용.
     */
    async captureHistory(label) {
        if (!this.root)
            return;
        await this.historyManager.push(this.root.innerHTML, label);
    }
    /** 이전 상태가 존재하는지 여부 (툴바 버튼 활성화에 사용) */
    canUndo() {
        return this.historyManager.canUndo();
    }
    /** 다음 상태가 존재하는지 여부 (툴바 버튼 활성화에 사용) */
    canRedo() {
        return this.historyManager.canRedo();
    }
    async bold() {
        await this.applyFormat('strong');
    }
    async italic() {
        await this.applyFormat('em');
    }
    async underline() {
        await this.applyFormat('u');
    }
    /**
     * 툴바에서 직접 Range를 전달해 서식을 적용한다.
     * document.getSelection()의 Shadow DOM retarget 문제를 우회하기 위해
     * PoaEditor가 직접 캡처한 savedRange를 주입받는다.
     */
    async applyFormatWithRange(tag, range) {
        if (!this.root)
            throw new Error('EditorCore가 마운트되지 않았습니다.');
        const cmd = new FormatCommand(tag, range, this.root.ownerDocument);
        await this.execute(cmd);
    }
    async strike() {
        await this.applyFormat('s');
    }
    /** 마운트 여부를 반환한다 */
    isMounted() {
        return this.root !== null;
    }
    /**
     * 현재 Selection의 Range를 가져와 FormatCommand를 생성하고 실행.
     * getSelection()은 EditorCore(브리지)에서만 호출 — FormatCommand는 주입된 객체만 사용.
     */
    async applyFormat(tag) {
        if (!this.root)
            throw new Error('EditorCore가 마운트되지 않았습니다.');
        const ownerDoc = this.root.ownerDocument;
        const sel = ownerDoc.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        const range = sel.getRangeAt(0);
        const cmd = new FormatCommand(tag, range, ownerDoc);
        await this.execute(cmd);
    }
}
