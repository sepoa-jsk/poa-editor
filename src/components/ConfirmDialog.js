const CSS = `
:host { display: none; }
:host([open]) { display: block; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dialog {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 24px;
  min-width: 300px;
  max-width: 440px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: dlgIn 0.15s ease;
}

@keyframes dlgIn {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.message {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0 0 24px;
  white-space: pre-wrap;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  height: 36px;
  padding: 0 16px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-cancel:hover { background: #F9FAFB; }

.btn-ok {
  height: 36px;
  padding: 0 16px;
  background: #1F2937;
  border: none;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-ok:hover { background: #374151; }
`;
const HTML = `
<div class="overlay" id="overlay">
  <div class="dialog">
    <p class="title">
      <span>⚠️</span>
      <span id="dlg-title">확인</span>
    </p>
    <p class="message" id="dlg-message"></p>
    <div class="buttons">
      <button class="btn-cancel" id="btn-cancel">취소</button>
      <button class="btn-ok"     id="btn-ok">확인</button>
    </div>
  </div>
</div>
`;
/**
 * <poa-confirm-dialog> — Promise 기반 커스텀 확인 다이얼로그.
 * 브라우저 기본 confirm() 대체.
 *
 * 사용법:
 *   const ok = await this.confirmDialog.show('저장하지 않은 내용이 있습니다. 계속할까요?');
 */
export class PoaConfirmDialog extends HTMLElement {
    shadow;
    resolvePromise = null;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style>${HTML}`;
        this.bindEvents();
    }
    show(message, title = '확인') {
        const titleEl = this.shadow.getElementById('dlg-title');
        const msgEl = this.shadow.getElementById('dlg-message');
        if (titleEl)
            titleEl.textContent = title;
        if (msgEl)
            msgEl.textContent = message;
        this.setAttribute('open', '');
        return new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
    }
    close(result) {
        this.removeAttribute('open');
        this.resolvePromise?.(result);
        this.resolvePromise = null;
    }
    bindEvents() {
        this.shadow.getElementById('btn-ok')?.addEventListener('click', () => this.close(true));
        this.shadow.getElementById('btn-cancel')?.addEventListener('click', () => this.close(false));
        this.shadow.getElementById('overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'overlay')
                this.close(false);
        });
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.close(false);
            }
        });
    }
}
