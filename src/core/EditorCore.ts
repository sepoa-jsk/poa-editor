import DOMPurify from 'dompurify';
import { CommandManager } from './CommandManager';
import { FormatCommand } from './commands/FormatCommand';
import { HistoryManager } from './history/HistoryManager';
import type { Command, EditorConfig, FormatTag } from './types';

/**
 * 에디터 코어: Component/Module Layer와 Core Engine의 연결 진입점.
 *
 * - HTMLElement를 주입받아 contenteditable 초기화 및 커맨드 실행을 담당.
 * - DOM 전역(document/window) 직접 호출 대신 마운트된 엘리먼트의 ownerDocument 사용.
 * - execute()는 비동기 — 커맨드 실행 후 HistoryManager에 스냅샷 푸시.
 * - Ctrl+Z(Undo) / Ctrl+Y, Ctrl+Shift+Z(Redo) 단축키를 keydown 이벤트로 처리.
 */
export class EditorCore {
  private readonly config: EditorConfig;
  private readonly commandManager: CommandManager;
  private readonly historyManager: HistoryManager;
  private root: HTMLElement | null = null;

  /**
   * keydown 이벤트 핸들러를 멤버로 유지해 unmount 시 정확히 제거할 수 있도록 한다.
   */
  private readonly keydownHandler = async (e: KeyboardEvent): Promise<void> => {
    const ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) return;

    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      await this.undo();
    } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
      e.preventDefault();
      await this.redo();
    }
  };

  constructor(config: EditorConfig = {}) {
    this.config = config;
    this.commandManager = new CommandManager();
    this.historyManager = new HistoryManager();
  }

  /** contenteditable 엘리먼트에 에디터를 초기화한다 */
  mount(element: HTMLElement): void {
    this.root = element;
    element.contentEditable = this.config.readonly ? 'false' : 'true';
    element.setAttribute('role', 'textbox');
    element.setAttribute('aria-multiline', 'true');

    if (this.config.placeholder) {
      element.dataset.placeholder = this.config.placeholder;
    }

    // 초기 DOM 상태를 히스토리에 등록 (동기 — mount는 sync 유지)
    this.historyManager.setInitial(element.innerHTML);

    // Ctrl+Z / Ctrl+Y 단축키 등록
    element.addEventListener('keydown', this.keydownHandler);
  }

  /** 에디터를 해제하고 속성 및 이벤트를 정리한다 */
  unmount(): void {
    if (!this.root) return;
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
   */
  async execute(cmd: Command): Promise<void> {
    if (!this.root) throw new Error('EditorCore가 마운트되지 않았습니다.');
    this.commandManager.execute(cmd);
    await this.historyManager.push(this.root.innerHTML, cmd.name);
  }

  /** 한 단계 이전 상태로 복원한다 */
  async undo(): Promise<void> {
    if (!this.root) return;
    const html = await this.historyManager.undo();
    if (html !== null) {
      this.root.innerHTML = DOMPurify.sanitize(html);
    }
  }

  /** 한 단계 이후 상태로 복원한다 */
  async redo(): Promise<void> {
    if (!this.root) return;
    const html = await this.historyManager.redo();
    if (html !== null) {
      this.root.innerHTML = DOMPurify.sanitize(html);
    }
  }

  /** 이전 상태가 존재하는지 여부 (툴바 버튼 활성화에 사용) */
  canUndo(): boolean {
    return this.historyManager.canUndo();
  }

  /** 다음 상태가 존재하는지 여부 (툴바 버튼 활성화에 사용) */
  canRedo(): boolean {
    return this.historyManager.canRedo();
  }

  async bold(): Promise<void> {
    await this.applyFormat('strong');
  }

  async italic(): Promise<void> {
    await this.applyFormat('em');
  }

  async underline(): Promise<void> {
    await this.applyFormat('u');
  }

  async strike(): Promise<void> {
    await this.applyFormat('s');
  }

  /** 마운트 여부를 반환한다 */
  isMounted(): boolean {
    return this.root !== null;
  }

  /**
   * 현재 Selection의 Range를 가져와 FormatCommand를 생성하고 실행.
   * getSelection()은 EditorCore(브리지)에서만 호출 — FormatCommand는 주입된 객체만 사용.
   */
  private async applyFormat(tag: FormatTag): Promise<void> {
    if (!this.root) throw new Error('EditorCore가 마운트되지 않았습니다.');
    const ownerDoc = this.root.ownerDocument;
    const sel = ownerDoc.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const cmd = new FormatCommand(tag, range, ownerDoc);
    await this.execute(cmd);
  }
}
