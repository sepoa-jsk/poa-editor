const CSS = `
:host { display: none; }
:host(.open) { display: block; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 9500;
}
.dialog {
  background: #fff; border-radius: 6px;
  box-shadow: 0 4px 28px rgba(0,0,0,.22);
  width: 220px; overflow: hidden;
  font-size: 13px; color: #333;
  user-select: none;
}
.dlg-hd {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 12px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600;
}
.dlg-close {
  border: none; background: transparent;
  font-size: 16px; cursor: pointer; color: #999;
  line-height: 1; padding: 0 2px;
}
.dlg-close:hover { color: #333; }
.dlg-body { padding: 14px 16px 16px; }
.form {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 8px 10px; align-items: center;
}
.form label { font-size: 12px; color: #666; }
.form input[type=number] {
  height: 28px; padding: 0 8px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; width: 100%; box-sizing: border-box;
}
.actions {
  display: flex; justify-content: flex-end;
  gap: 8px; margin-top: 14px;
}
.btn {
  height: 28px; padding: 0 14px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary { background: #1565c0; color: #fff; border-color: #1565c0; }
.btn-primary:hover:not(:disabled) { background: #1251a3; }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn:not(.btn-primary):hover { background: #f5f5f5; }
`;

export class PoaCellSplitDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private targetCell: HTMLTableCellElement | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dlg-hd">
      <span>셀 나누기</span>
      <button class="dlg-close" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="dlg-body">
      <div class="form">
        <label for="cs-cols">열 개수</label>
        <input type="number" id="cs-cols" min="1" max="10" value="1">
        <label for="cs-rows">행 개수</label>
        <input type="number" id="cs-rows" min="1" max="10" value="1">
      </div>
      <div class="actions">
        <button class="btn btn-primary" id="btn-ok" disabled>확인</button>
        <button class="btn" id="btn-cancel">취소</button>
      </div>
    </div>
  </div>
</div>`;

    const colsInput = this.shadow.getElementById('cs-cols') as HTMLInputElement;
    const rowsInput = this.shadow.getElementById('cs-rows') as HTMLInputElement;
    const okBtn     = this.shadow.getElementById('btn-ok')  as HTMLButtonElement;

    const updateOk = (): void => {
      const cols = parseInt(colsInput.value, 10) || 1;
      const rows = parseInt(rowsInput.value, 10) || 1;
      okBtn.disabled = cols <= 1 && rows <= 1;
    };

    colsInput.addEventListener('input', updateOk);
    rowsInput.addEventListener('input', updateOk);

    this.shadow.getElementById('btn-close')! .addEventListener('click', () => this.close());
    this.shadow.getElementById('btn-cancel')!.addEventListener('click', () => this.close());
    this.shadow.getElementById('overlay')!   .addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'overlay') this.close();
    });
    okBtn.addEventListener('click', () => this.confirm());
  }

  open(cell: HTMLTableCellElement): void {
    this.targetCell = cell;

    const colsInput = this.shadow.getElementById('cs-cols') as HTMLInputElement;
    const rowsInput = this.shadow.getElementById('cs-rows') as HTMLInputElement;
    const okBtn     = this.shadow.getElementById('btn-ok')  as HTMLButtonElement;

    colsInput.value   = '1';
    rowsInput.value   = '1';
    okBtn.disabled    = true;

    this.classList.add('open');
    colsInput.focus();
    colsInput.select();
  }

  close(): void {
    this.classList.remove('open');
    this.targetCell = null;
  }

  private confirm(): void {
    if (!this.targetCell) return;
    const cols = Math.max(1, parseInt((this.shadow.getElementById('cs-cols') as HTMLInputElement).value, 10) || 1);
    const rows = Math.max(1, parseInt((this.shadow.getElementById('cs-rows') as HTMLInputElement).value, 10) || 1);
    if (cols <= 1 && rows <= 1) return;
    this.dispatchEvent(new CustomEvent('poa-cell-split', {
      bubbles: true, composed: true,
      detail: { cell: this.targetCell, cols, rows },
    }));
    this.close();
  }
}
