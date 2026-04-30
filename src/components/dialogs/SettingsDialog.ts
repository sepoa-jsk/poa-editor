import type { AutoSave, AutoSaveEntry } from '../../modules/file/AutoSave';
import type { FileManager } from '../../modules/file/FileManager';

const CSS = `
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 480px; max-width: 95vw; max-height: 80vh;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #eee;
  font-size: 15px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; line-height: 1; padding: 0 4px;
}
.close-btn:hover { color: #333; }
.body { flex: 1; overflow-y: auto; }
.section { padding: 16px 20px; }
.section + .section { border-top: 1px solid #f0f0f0; }
.section-title {
  font-size: 12px; font-weight: 600; color: #888;
  text-transform: uppercase; letter-spacing: .05em;
  margin: 0 0 10px;
}
.file-btns { display: flex; gap: 8px; flex-wrap: wrap; }
.file-btns button {
  padding: 6px 14px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.file-btns button:hover { background: #f5f5f5; }
.history-list { list-style: none; margin: 0; padding: 0; }
.history-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid #f5f5f5;
}
.history-item:last-child { border-bottom: none; }
.history-time { font-size: 12px; color: #666; }
.restore-btn {
  padding: 3px 10px; border: 1px solid #1976d2; border-radius: 3px;
  background: transparent; color: #1976d2; cursor: pointer; font-size: 12px;
}
.restore-btn:hover { background: #e3f2fd; }
.empty-msg { color: #aaa; font-size: 13px; text-align: center; padding: 20px 0; }
.clear-btn {
  margin-top: 10px; padding: 5px 12px;
  border: 1px solid #ccc; border-radius: 3px;
  background: #fff; cursor: pointer; font-size: 12px; color: #666;
}
.clear-btn:hover { background: #fafafa; }
`;

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleString('ko-KR', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

/**
 * <poa-settings-dialog> — 자동저장 이력 조회 및 파일 관리 다이얼로그.
 *
 * 사용법:
 *   dialog.setAutoSave(autoSave);
 *   dialog.setFileManager(fm);
 *   await dialog.show();
 */
export class PoaSettingsDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private autoSave: AutoSave | null = null;
  private fm: FileManager | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="설정">
    <div class="header">
      <span>파일 관리 · 자동저장 이력</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="body">
      <div class="section">
        <p class="section-title">파일</p>
        <div class="file-btns">
          <button id="btn-new">새 문서</button>
          <button id="btn-open">열기</button>
          <button id="btn-save">저장</button>
          <button id="btn-saveas">다른 이름으로 저장</button>
        </div>
      </div>
      <div class="section">
        <p class="section-title">자동저장 이력</p>
        <ul class="history-list" id="history-list"></ul>
        <button class="clear-btn" id="btn-clear">이력 전체 삭제</button>
      </div>
    </div>
  </div>
</div>`;

    this.bindEvents();
  }

  setAutoSave(autoSave: AutoSave): void { this.autoSave = autoSave; }
  setFileManager(fm: FileManager): void { this.fm = fm; }

  async show(): Promise<void> {
    await this.loadHistory();
    this.setAttribute('open', '');
    this.shadow.getElementById('btn-close')?.focus();
  }

  close(): void {
    this.removeAttribute('open');
  }

  private bindEvents(): void {
    const s = this.shadow;
    s.getElementById('backdrop')?.addEventListener('click', (e) => {
      if (e.target === s.getElementById('backdrop')) this.close();
    });
    s.getElementById('btn-close')?.addEventListener('click', () => this.close());

    const dispatch = (type: string): void => {
      this.dispatchEvent(new CustomEvent(`poa-file-${type}`, { bubbles: true, composed: true }));
      this.close();
    };

    s.getElementById('btn-new')?.addEventListener('click',   () => dispatch('new'));
    s.getElementById('btn-open')?.addEventListener('click',  () => dispatch('open'));
    s.getElementById('btn-save')?.addEventListener('click',  () => dispatch('save'));
    s.getElementById('btn-saveas')?.addEventListener('click',() => dispatch('saveas'));

    s.getElementById('btn-clear')?.addEventListener('click', async () => {
      await this.autoSave?.clearAll();
      await this.loadHistory();
    });
  }

  private async loadHistory(): Promise<void> {
    const list = this.shadow.getElementById('history-list');
    if (!list) return;
    list.innerHTML = '';

    if (!this.autoSave) {
      list.innerHTML = '<li class="empty-msg">자동저장 미설정</li>';
      return;
    }

    const entries = await this.autoSave.listSnapshots();
    if (entries.length === 0) {
      list.innerHTML = '<li class="empty-msg">저장된 이력이 없습니다</li>';
      return;
    }

    for (const entry of entries) {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `
        <span class="history-time">${fmtDate(entry.savedAt)}</span>
        <button class="restore-btn" data-id="${String(entry.id)}">복원</button>`;
      li.querySelector<HTMLButtonElement>('.restore-btn')!.addEventListener('click', () => {
        this.handleRestore(entry);
      });
      list.appendChild(li);
    }
  }

  private handleRestore(entry: AutoSaveEntry): void {
    this.dispatchEvent(
      new CustomEvent('poa-autosave-restore', {
        bubbles: true,
        composed: true,
        detail: { html: entry.html },
      }),
    );
    this.close();
  }
}
