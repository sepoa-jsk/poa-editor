import { sanitize, htmlToText, textToHtml } from '../../utils/dom';
import { eventBus, BusEvent } from '../../utils/eventBus';

const HTML_TYPES = [{ description: 'HTML 파일', accept: { 'text/html': ['.html', '.htm'] } }];
const ALL_TYPES  = [
  { description: 'HTML 파일', accept: { 'text/html': ['.html', '.htm'] } },
  { description: '텍스트 파일', accept: { 'text/plain': ['.txt'] } },
];

export interface OpenedFile {
  name: string;
  html: string;
}

/**
 * 파일 열기 / 저장 / 새 문서 관리자.
 *
 * - File System Access API 지원 시 네이티브 파일 다이얼로그 사용.
 * - 미지원 브라우저는 <input type="file"> 열기 / <a download> 저장으로 폴백.
 * - dirty 플래그로 미저장 상태를 추적하고 beforeunload 경고를 등록한다.
 */
export class FileManager {
  private fileHandle: FileSystemFileHandle | null = null;
  private dirty = false;
  private currentName = '새 문서';

  private readonly beforeUnloadHandler = (e: BeforeUnloadEvent): void => {
    if (this.dirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  constructor() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  /** 이벤트 리스너를 제거한다. 컴포넌트 unmount 시 호출 필요. */
  destroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  isDirty(): boolean    { return this.dirty; }
  markDirty(): void     { this.dirty = true;  eventBus.emit(BusEvent.FILE_DIRTY, true); }
  markClean(): void     { this.dirty = false; eventBus.emit(BusEvent.FILE_DIRTY, false); }
  getCurrentName(): string { return this.currentName; }

  /** File System Access API 지원 여부 */
  hasFileSystemAccess(): boolean {
    return typeof window !== 'undefined' && 'showOpenFilePicker' in window;
  }

  // ── 새 문서 ─────────────────────────────────────────────────────────────

  newDocument(): void {
    this.fileHandle = null;
    this.currentName = '새 문서';
    this.markClean();
    eventBus.emit(BusEvent.FILE_NEW, undefined);
  }

  // ── 열기 ─────────────────────────────────────────────────────────────────

  async openFile(): Promise<OpenedFile | null> {
    return this.hasFileSystemAccess()
      ? this.openWithFSA()
      : this.openWithInput();
  }

  private async openWithFSA(): Promise<OpenedFile | null> {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: ALL_TYPES,
        multiple: false,
      });
      const file = await handle.getFile();
      const text = await file.text();
      const html = this.toHtml(file.name, text);
      this.fileHandle = handle;
      this.currentName = file.name;
      this.markClean();
      const result = { name: file.name, html };
      eventBus.emit(BusEvent.FILE_OPENED, result);
      return result;
    } catch (err) {
      if ((err as DOMException).name !== 'AbortError') throw err;
      return null; // 사용자가 취소
    }
  }

  private openWithInput(): Promise<OpenedFile | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.html,.htm,.txt';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) { resolve(null); return; }
        const text = await file.text();
        const html = this.toHtml(file.name, text);
        this.fileHandle = null;
        this.currentName = file.name;
        this.markClean();
        const result = { name: file.name, html };
        eventBus.emit(BusEvent.FILE_OPENED, result);
        resolve(result);
      };
      input.addEventListener('cancel', () => resolve(null));
      input.click();
    });
  }

  // ── 저장 ─────────────────────────────────────────────────────────────────

  /** 현재 파일 핸들이 있으면 덮어쓰기, 없으면 다른 이름으로 저장 */
  async saveFile(html: string): Promise<boolean> {
    if (this.fileHandle) {
      return this.writeToHandle(this.fileHandle, html, this.currentName);
    }
    return this.saveAsFile(html);
  }

  /** 다른 이름으로 저장 */
  async saveAsFile(html: string, suggestedName = 'document.html'): Promise<boolean> {
    return this.hasFileSystemAccess()
      ? this.saveWithFSA(html, suggestedName)
      : this.saveWithDownload(html, suggestedName);
  }

  private async saveWithFSA(html: string, suggestedName: string): Promise<boolean> {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: HTML_TYPES,
      });
      return this.writeToHandle(handle, html, handle.name);
    } catch (err) {
      if ((err as DOMException).name !== 'AbortError') throw err;
      return false;
    }
  }

  private async writeToHandle(
    handle: FileSystemFileHandle,
    html: string,
    name: string,
  ): Promise<boolean> {
    const writable = await handle.createWritable();
    await writable.write(html);
    await writable.close();
    this.fileHandle = handle;
    this.currentName = name;
    this.markClean();
    eventBus.emit(BusEvent.FILE_SAVED, { name });
    return true;
  }

  private saveWithDownload(html: string, filename: string): boolean {
    const isTxt = filename.endsWith('.txt');
    const content = isTxt ? htmlToText(html) : html;
    const mime    = isTxt ? 'text/plain' : 'text/html';
    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    this.markClean();
    eventBus.emit(BusEvent.FILE_SAVED, { name: filename });
    return true;
  }

  // ── 유틸리티 ──────────────────────────────────────────────────────────────

  /** HTML 문자열에서 평문 텍스트를 추출한다 (상태바·저장 미리보기용) */
  htmlToPlainText(html: string): string {
    return htmlToText(html);
  }

  private toHtml(filename: string, rawText: string): string {
    if (filename.endsWith('.txt')) {
      return textToHtml(rawText);
    }
    // .html / .htm → DOMPurify 정제
    return sanitize(rawText);
  }
}
