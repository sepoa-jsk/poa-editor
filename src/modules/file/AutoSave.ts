import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import { eventBus, BusEvent } from '../../utils/eventBus';

const DB_NAME = 'poa-editor-autosave';
const STORE = 'snapshots';
const MAX_ENTRIES = 10;
const DEFAULT_INTERVAL_MS = 5 * 60 * 1000; // 5분

interface StoredEntry {
  html: string;
  savedAt: number;
}

interface PoaAutoSaveDB extends DBSchema {
  snapshots: {
    key: number;
    value: StoredEntry;
  };
}

export interface AutoSaveEntry {
  id: IDBValidKey;
  html: string;
  savedAt: number;
}

/**
 * IndexedDB 기반 자동저장 관리자.
 *
 * - HistoryManager(Undo/Redo 스택)와 완전히 분리된 별도 저장소 사용.
 * - 최대 MAX_ENTRIES(10)개 스냅샷 유지; 초과 시 가장 오래된 항목 제거.
 * - start(getContent) / stop()으로 인터벌 제어.
 */
export class AutoSave {
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly intervalMs: number;

  constructor(intervalMs = DEFAULT_INTERVAL_MS) {
    this.intervalMs = intervalMs;
  }

  /** 주기적 자동저장 시작 */
  start(getContent: () => string): void {
    this.stop();
    this.timer = setInterval(() => {
      void this.saveNow(getContent());
    }, this.intervalMs);
  }

  /** 주기적 자동저장 중지 */
  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** 현재 실행 중 여부 */
  isRunning(): boolean {
    return this.timer !== null;
  }

  /** 현재 내용을 즉시 IndexedDB에 저장한다 */
  async saveNow(html: string): Promise<void> {
    const db = await this.openDB();
    const tx = db.transaction(STORE, 'readwrite');
    await tx.store.put({ html, savedAt: Date.now() });
    const keys = await tx.store.getAllKeys();
    if (keys.length > MAX_ENTRIES) {
      await tx.store.delete(keys[0]);
    }
    await tx.done;
    eventBus.emit(BusEvent.AUTOSAVE_SAVED, { savedAt: Date.now() });
  }

  /** 저장된 이력 목록을 최신순으로 반환한다 */
  async listSnapshots(): Promise<AutoSaveEntry[]> {
    const db = await this.openDB();
    const [keys, values] = await Promise.all([
      db.getAllKeys(STORE),
      db.getAll(STORE),
    ]);
    return (values as StoredEntry[])
      .map((v, i) => ({ id: keys[i], html: v.html, savedAt: v.savedAt }))
      .reverse();
  }

  /**
   * 특정 스냅샷의 HTML을 반환한다.
   * @returns HTML 문자열, 없으면 null
   */
  async restoreSnapshot(id: IDBValidKey): Promise<string | null> {
    const db = await this.openDB();
    const entry = (await db.get(STORE, id as number)) as StoredEntry | undefined;
    return entry?.html ?? null;
  }

  /** 전체 이력을 삭제한다 */
  async clearAll(): Promise<void> {
    const db = await this.openDB();
    await db.clear(STORE);
  }

  private async openDB(): Promise<IDBPDatabase<PoaAutoSaveDB>> {
    return openDB<PoaAutoSaveDB>(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { autoIncrement: true });
        }
      },
    });
  }
}
