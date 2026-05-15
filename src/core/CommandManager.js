/**
 * 커맨드 실행 관리자.
 * S1-S2: execute() 구현. undo/redo 스택은 S3-S4 HistoryManager에서 확장.
 */
export class CommandManager {
    execute(cmd) {
        cmd.execute();
    }
    /** @todo S3-S4: HistoryManager 연동 */
    undo() {
        // S3-S4에서 구현
    }
    /** @todo S3-S4: HistoryManager 연동 */
    redo() {
        // S3-S4에서 구현
    }
}
