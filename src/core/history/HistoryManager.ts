import { Snapshot } from './Snapshot';

/**
 * Undo/Redo 히스토리 엔트리.
 * isCheckpoint 플래그로 자동저장 체크포인트를 표시 (S7-S8에서 AutoSave와 연동).
 */
interface HistoryEntry {
  data: Uint8Array;
  label: string;
  isCheckpoint: boolean;
}

/**
 * Undo/Redo 스냅샷 스택 관리자.
 *
 * 설계 원칙:
 * - entries[pointer]가 항상 현재 상태를 나타낸다.
 * - setInitial()은 동기 — mount()에서 호출 가능.
 * - push()는 비동기 — gzip 압축 후 추가.
 * - undo/redo는 스냅샷 복원 방식 → Command.undo() 없이도 신뢰성 있는 복원.
 * - 자동저장 체크포인트와 Undo 스택은 동일 배열에서 플래그로 분리.
 */
export class HistoryManager {
  private entries: HistoryEntry[] = [];
  private pointer = -1;
  private readonly maxSize = 100;

  /**
   * 초기 DOM 상태를 동기적으로 설정한다 (압축 없이 UTF-8 인코딩).
   * mount() 시 호출하여 가장 오래된 복원 가능 지점을 기록.
   */
  setInitial(html: string): void {
    const data = new TextEncoder().encode(html);
    this.entries = [{ data, label: 'initial', isCheckpoint: false }];
    this.pointer = 0;
  }

  /**
   * 커맨드 실행 후 현재 DOM 상태를 gzip 압축하여 스택에 추가한다.
   * undo 후 새 편집 시 redo 스택(pointer 이후 항목)을 초기화한다.
   *
   * @param html 현재 DOM의 innerHTML
   * @param label 커맨드 이름 (UI 표시용)
   * @param isCheckpoint 자동저장 체크포인트 여부
   */
  async push(html: string, label: string, isCheckpoint = false): Promise<void> {
    // undo 후 새 편집: redo 스택 초기화
    this.entries.splice(this.pointer + 1);

    const data = await Snapshot.serialize(html);
    this.entries.push({ data, label, isCheckpoint });
    this.pointer++;

    // maxSize(100스텝) 초과 시 가장 오래된 항목 제거
    // 100 undo 스텝 = initial 포함 최대 101 entries
    if (this.entries.length > this.maxSize + 1) {
      this.entries.shift();
      this.pointer--;
    }
  }

  /**
   * 한 단계 이전 상태로 이동한다.
   * @returns 복원할 HTML 문자열, canUndo()가 false이면 null
   */
  async undo(): Promise<string | null> {
    if (!this.canUndo()) return null;
    this.pointer--;
    return Snapshot.deserialize(this.entries[this.pointer].data);
  }

  /**
   * 한 단계 이후 상태로 이동한다.
   * @returns 복원할 HTML 문자열, canRedo()가 false이면 null
   */
  async redo(): Promise<string | null> {
    if (!this.canRedo()) return null;
    this.pointer++;
    return Snapshot.deserialize(this.entries[this.pointer].data);
  }

  /** 이전 상태가 존재하는지 여부 */
  canUndo(): boolean {
    return this.pointer > 0;
  }

  /** 다음 상태가 존재하는지 여부 */
  canRedo(): boolean {
    return this.pointer >= 0 && this.pointer < this.entries.length - 1;
  }

  /** 초기화(setInitial 호출) 여부 */
  isInitialized(): boolean {
    return this.pointer >= 0;
  }

  /** 현재 스택 엔트리 수 반환 (initial 포함) */
  getStackSize(): number {
    return this.entries.length;
  }

  /** 현재 포인터가 가리키는 엔트리 라벨 반환 */
  getCurrentLabel(): string | null {
    if (this.pointer < 0) return null;
    return this.entries[this.pointer].label;
  }
}
