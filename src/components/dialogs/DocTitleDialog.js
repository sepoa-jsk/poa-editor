const CSS = `
:host { display: none; }
:host([open]) { display: block; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45); z-index: 99999;
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
}

.dialog {
  background: #fff; border-radius: 10px;
  padding: 24px; width: 360px;
  box-shadow: 0 10px 40px rgba(0,0,0,.2);
  animation: dlgIn .15s ease;
}

@keyframes dlgIn {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.title {
  font-size: 15px; font-weight: 600; color: #111827;
  margin: 0 0 16px;
}

.form-group { margin-bottom: 20px; }

.form-label {
  display: block; font-size: 13px; color: #374151;
  font-weight: 500; margin-bottom: 6px;
}

.form-input {
  width: 100%; height: 36px; padding: 0 10px;
  border: 1.5px solid #D1D5DB; border-radius: 6px;
  font-size: 14px; outline: none; box-sizing: border-box;
  font-family: inherit;
}
.form-input:focus { border-color: #2563EB; }

.message {
  font-size: 14px; color: #374151; line-height: 1.6;
  margin: 0 0 20px;
}

.buttons {
  display: flex; justify-content: flex-end; gap: 8px;
}

.btn {
  height: 36px; padding: 0 16px;
  border-radius: 6px; font-size: 14px;
  cursor: pointer; border: 1px solid #D1D5DB;
  background: #fff; color: #374151;
  font-family: inherit; transition: background .1s;
}
.btn:hover { background: #F9FAFB; }

.btn-primary {
  background: #1F2937; border-color: #1F2937; color: #fff;
}
.btn-primary:hover { background: #374151; }

.btn-danger {
  border-color: #FCA5A5; color: #EF4444;
}
.btn-danger:hover { background: #FEF2F2; }
`;
export class PoaDocTitleDialog extends HTMLElement {
    shadow;
    mode = 'title';
    defaultTitle = '새 문서';
    titleResolve = null;
    unsavedResolve = null;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `<style>${CSS}</style><div class="overlay" id="overlay"></div>`;
        this.shadow.getElementById('overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'overlay')
                this._handleCancel();
        });
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this._handleCancel();
            }
        });
    }
    showTitleInput(defaultTitle) {
        this.mode = 'title';
        this.defaultTitle = defaultTitle;
        this._render();
        this.setAttribute('open', '');
        return new Promise((resolve) => { this.titleResolve = resolve; });
    }
    showUnsavedConfirm() {
        this.mode = 'unsaved';
        this._render();
        this.setAttribute('open', '');
        return new Promise((resolve) => { this.unsavedResolve = resolve; });
    }
    _render() {
        const overlay = this.shadow.getElementById('overlay');
        if (this.mode === 'title') {
            overlay.innerHTML = `
<div class="dialog">
  <p class="title">문서 제목 입력</p>
  <div class="form-group">
    <label class="form-label" for="title-inp">문서 제목</label>
    <input class="form-input" id="title-inp" type="text">
  </div>
  <div class="buttons">
    <button class="btn" id="btn-cancel">취소</button>
    <button class="btn btn-primary" id="btn-save">저장</button>
  </div>
</div>`;
            const inp = this.shadow.getElementById('title-inp');
            inp.value = this.defaultTitle;
            inp.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this._handleTitleSave();
                }
                e.stopPropagation();
            });
            this.shadow.getElementById('btn-save')?.addEventListener('click', () => this._handleTitleSave());
            this.shadow.getElementById('btn-cancel')?.addEventListener('click', () => this._handleCancel());
            requestAnimationFrame(() => { inp.focus(); inp.select(); });
        }
        else {
            overlay.innerHTML = `
<div class="dialog">
  <p class="title">저장되지 않은 변경사항</p>
  <p class="message">저장하지 않은 내용이 있습니다. 저장하시겠습니까?</p>
  <div class="buttons">
    <button class="btn" id="btn-cancel">취소</button>
    <button class="btn btn-danger" id="btn-discard">저장 안 함</button>
    <button class="btn btn-primary" id="btn-save">저장</button>
  </div>
</div>`;
            this.shadow.getElementById('btn-save')?.addEventListener('click', () => {
                this._close();
                this.unsavedResolve?.('save');
                this.unsavedResolve = null;
            });
            this.shadow.getElementById('btn-discard')?.addEventListener('click', () => {
                this._close();
                this.unsavedResolve?.('discard');
                this.unsavedResolve = null;
            });
            this.shadow.getElementById('btn-cancel')?.addEventListener('click', () => this._handleCancel());
        }
    }
    _handleTitleSave() {
        const inp = this.shadow.getElementById('title-inp');
        const title = inp.value.trim() || this.defaultTitle;
        this._close();
        this.titleResolve?.(title);
        this.titleResolve = null;
    }
    _handleCancel() {
        this._close();
        if (this.mode === 'title') {
            this.titleResolve?.(null);
            this.titleResolve = null;
        }
        else {
            this.unsavedResolve?.('cancel');
            this.unsavedResolve = null;
        }
    }
    _close() {
        this.removeAttribute('open');
    }
}
