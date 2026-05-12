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
  background: #fff; border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 440px; max-width: 95vw; max-height: 80vh;
  display: flex; flex-direction: column;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #E5E7EB;
  font-size: 15px; font-weight: 700; color: #111827;
  flex-shrink: 0;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #9CA3AF; line-height: 1; padding: 0 4px;
  border-radius: 4px;
}
.close-btn:hover { color: #374151; background: #F3F4F6; }
.body { flex: 1; overflow-y: auto; padding: 0 20px; }
.guide-text {
  font-size: 12px; color: #6B7280;
  padding: 8px 0 12px;
  border-bottom: 1px solid #F3F4F6;
  margin-bottom: 8px;
  line-height: 1.5;
}
.history-list { list-style: none; margin: 0; padding: 0; }
.history-item {
  display: flex; align-items: center; justify-content: space-between;
  height: 40px; padding: 0 4px;
  border-bottom: 1px solid #F9FAFB;
  font-size: 13px; color: #374151;
  transition: background .1s;
}
.history-item:hover { background: #F9FAFB; }
.history-item:last-child { border-bottom: none; }
.history-time { font-size: 13px; color: #374151; }
.restore-btn {
  height: 28px; padding: 0 12px;
  font-size: 12px;
  background: #EFF6FF; color: #2563EB;
  border: 1px solid #BFDBFE; border-radius: 4px;
  cursor: pointer; font-family: inherit;
  flex-shrink: 0;
  transition: background .1s;
}
.restore-btn:hover { background: #DBEAFE; }
.empty-msg {
  color: #9CA3AF; font-size: 13px;
  text-align: center; padding: 32px 0;
}
.footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 20px 14px;
  border-top: 1px solid #F3F4F6;
  flex-shrink: 0;
}
.history-count {
  font-size: 12px; color: #6B7280;
}
.clear-btn {
  height: 28px; padding: 0 12px;
  border: 1px solid #FCA5A5; border-radius: 4px;
  background: transparent; cursor: pointer;
  font-size: 12px; color: #EF4444; font-family: inherit;
  transition: background .1s;
}
.clear-btn:hover { background: #FEF2F2; }
`;

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleString('ko-KR', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

export class PoaFileManagerDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private autoSave: AutoSave | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="문서 이력">
    <div class="header">
      <span>문서 이력</span>
      <button class="close-btn" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="body">
      <p class="guide-text">
        자동저장된 문서 이력입니다.<br>
        선택한 시점으로 복원할 수 있습니다.
      </p>
      <ul class="history-list" id="history-list"></ul>
    </div>
    <div class="footer">
      <span class="history-count" id="history-count"></span>
      <button class="clear-btn" id="btn-clear">이력 전체 삭제</button>
    </div>
  </div>
</div>`;

    this.bindEvents();
  }

  setAutoSave(autoSave: AutoSave): void { this.autoSave = autoSave; }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFileManager(_fm: FileManager): void { }

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
    s.getElementById('btn-clear')?.addEventListener('click', async () => {
      await this.autoSave?.clearAll();
      await this.loadHistory();
    });
  }

  private async loadHistory(): Promise<void> {
    const list    = this.shadow.getElementById('history-list');
    const countEl = this.shadow.getElementById('history-count');
    if (!list) return;
    list.innerHTML = '';

    if (!this.autoSave) {
      list.innerHTML = '<li class="empty-msg">자동저장 미설정</li>';
      if (countEl) countEl.textContent = '';
      return;
    }

    const entries = await this.autoSave.listSnapshots();
    if (entries.length === 0) {
      list.innerHTML = '<li class="empty-msg">저장된 이력이 없습니다</li>';
      if (countEl) countEl.textContent = '';
      return;
    }

    if (countEl) countEl.textContent = `저장된 이력: ${entries.length}개`;

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
