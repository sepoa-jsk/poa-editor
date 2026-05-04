import type { TableOptions } from '../../modules/table/TableBuilder.js';

const GRID_ROWS = 10;
const GRID_COLS = 10;

const CSS = `
:host { display: none; }
:host(.open) { display: block; }
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 8000;
}
.dialog {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  padding: 20px 24px;
  min-width: 340px;
  max-width: 90vw;
}
h3 { margin: 0 0 14px; font-size: 15px; color: #222; }
.grid-section { margin-bottom: 14px; }
.grid-label { font-size: 12px; color: #555; margin-bottom: 6px; }
.grid-hint { font-size: 12px; color: #777; margin-bottom 4px; min-height: 18px; }
.grid {
  display: inline-grid;
  grid-template-columns: repeat(${GRID_COLS}, 22px);
  gap: 2px;
  cursor: pointer;
}
.grid-cell {
  width: 22px; height: 22px;
  border: 1px solid #ccc;
  border-radius: 2px;
  background: #fff;
  transition: background 0.05s, border-color 0.05s;
}
.grid-cell.hover {
  background: #c8d8f0;
  border-color: #1565c0;
}
.options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; margin-bottom: 14px; }
.field { display: flex; flex-direction: column; gap: 3px; }
.field.full { grid-column: 1 / -1; }
label { font-size: 12px; color: #555; }
input[type="text"] {
  height: 28px; padding: 0 8px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px;
}
.check-row { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.actions { display: flex; justify-content: flex-end; gap: 8px; }
.btn {
  height: 30px; padding: 0 16px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary {
  background: #1565c0; color: #fff; border-color: #1565c0;
}
.btn-primary:disabled { opacity: 0.45; cursor: default; }
`;

const HTML = `
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="표 삽입">
    <h3>표 삽입</h3>

    <div class="grid-section">
      <div class="grid-label">크기 선택 (마우스를 올리고 클릭)</div>
      <div class="grid-hint" id="grid-hint">—</div>
      <div class="grid" id="grid"></div>
    </div>

    <div class="options">
      <div class="field">
        <label for="inp-caption">캡션</label>
        <input type="text" id="inp-caption" placeholder="표 제목">
      </div>
      <div class="field">
        <label for="inp-width">너비</label>
        <input type="text" id="inp-width" value="100%">
      </div>
      <div class="field full">
        <label for="inp-summary">요약 (접근성)</label>
        <input type="text" id="inp-summary" placeholder="스크린 리더용 표 설명">
      </div>
      <div class="field full">
        <div class="check-row">
          <input type="checkbox" id="chk-header" checked>
          <label for="chk-header">첫 번째 행을 머리글(TH)로 설정</label>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn btn-primary" id="btn-confirm" disabled>삽입</button>
    </div>
  </div>
</div>
`;

export class PoaTableDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private selectedRows = 0;
  private selectedCols = 0;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>${HTML}`;
    this.buildGrid();
    this.bindEvents();
  }

  open(): void {
    this.classList.add('open');
    this.resetState();
  }

  close(): void {
    this.classList.remove('open');
  }

  private resetState(): void {
    this.selectedRows = 0;
    this.selectedCols = 0;
    this.updateGridHighlight(0, 0);
    (this.shadow.getElementById('grid-hint') as HTMLElement).textContent = '—';
    (this.shadow.getElementById('btn-confirm') as HTMLButtonElement).disabled = true;

    const caption = this.shadow.getElementById('inp-caption') as HTMLInputElement;
    const summary = this.shadow.getElementById('inp-summary') as HTMLInputElement;
    if (caption) caption.value = '';
    if (summary) summary.value = '';
    (this.shadow.getElementById('inp-width') as HTMLInputElement).value = '100%';
    (this.shadow.getElementById('chk-header') as HTMLInputElement).checked = true;
  }

  private buildGrid(): void {
    const gridEl = this.shadow.getElementById('grid')!;
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = String(r + 1);
        cell.dataset.col = String(c + 1);
        gridEl.appendChild(cell);
      }
    }
  }

  private bindEvents(): void {
    const s = this.shadow;

    const gridEl = s.getElementById('grid')!;
    const hint = s.getElementById('grid-hint') as HTMLElement;
    const confirmBtn = s.getElementById('btn-confirm') as HTMLButtonElement;

    gridEl.addEventListener('mousemove', (e) => {
      const target = (e.target as HTMLElement).closest('.grid-cell') as HTMLElement | null;
      if (!target) return;
      const r = parseInt(target.dataset.row!, 10);
      const c = parseInt(target.dataset.col!, 10);
      this.updateGridHighlight(r, c);
      hint.textContent = `${r} × ${c}`;
    });

    gridEl.addEventListener('mouseleave', () => {
      if (this.selectedRows > 0) {
        this.updateGridHighlight(this.selectedRows, this.selectedCols);
        hint.textContent = `${this.selectedRows} × ${this.selectedCols}`;
      } else {
        this.updateGridHighlight(0, 0);
        hint.textContent = '—';
      }
    });

    gridEl.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.grid-cell') as HTMLElement | null;
      if (!target) return;
      const r = parseInt(target.dataset.row!, 10);
      const c = parseInt(target.dataset.col!, 10);
      this.selectedRows = r;
      this.selectedCols = c;
      hint.textContent = `${r} × ${c} 선택됨`;
      confirmBtn.disabled = false;
    });

    s.getElementById('btn-cancel')?.addEventListener('click', () => this.close());

    s.getElementById('overlay')?.addEventListener('click', (e) => {
      if (e.target === s.getElementById('overlay')) this.close();
    });

    s.getElementById('btn-confirm')?.addEventListener('click', () => {
      if (this.selectedRows === 0 || this.selectedCols === 0) return;
      this.confirmInsert();
    });
  }

  private updateGridHighlight(rows: number, cols: number): void {
    const cells = this.shadow.querySelectorAll<HTMLElement>('.grid-cell');
    for (const cell of cells) {
      const r = parseInt(cell.dataset.row!, 10);
      const c = parseInt(cell.dataset.col!, 10);
      cell.classList.toggle('hover', r <= rows && c <= cols);
    }
  }

  private confirmInsert(): void {
    const s = this.shadow;
    const caption = (s.getElementById('inp-caption') as HTMLInputElement).value.trim();
    const summary = (s.getElementById('inp-summary') as HTMLInputElement).value.trim();
    const width = (s.getElementById('inp-width') as HTMLInputElement).value.trim() || '100%';
    const hasHeader = (s.getElementById('chk-header') as HTMLInputElement).checked;

    const options: TableOptions = {
      rows: this.selectedRows,
      cols: this.selectedCols,
      hasHeader,
      caption: caption || undefined,
      summary: summary || undefined,
      width,
    };

    this.dispatchEvent(
      new CustomEvent('poa-table-insert', {
        bubbles: true,
        composed: true,
        detail: { options },
      }),
    );

    this.close();
  }
}
