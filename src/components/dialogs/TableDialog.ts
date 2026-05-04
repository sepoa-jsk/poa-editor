import type { TableOptions } from '../../modules/table/TableBuilder.js';
import { TABLE_PRESETS } from '../../modules/table/TablePresets.js';

const GRID_COLS = 10;
const GRID_ROWS = 10;
const CELL_PX   = 22;
const GAP_PX    = 2;

const CSS = `
:host { display: none; }
:host(.open) { display: block; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 8000;
}
.dialog {
  background: #fff; border-radius: 6px;
  box-shadow: 0 4px 28px rgba(0,0,0,.22);
  width: 280px; overflow: hidden;
  font-size: 13px; color: #333;
  user-select: none;
}

/* ── 헤더 ──────────────────────────────────── */
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

/* ── 본문 ──────────────────────────────────── */
.dlg-body { padding: 12px 14px 14px; }

/* ── 프리셋 ────────────────────────────────── */
.preset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 11px;
}
.preset-item {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  cursor: pointer; border-radius: 4px; padding: 4px 2px;
  border: 2px solid transparent; transition: border-color .12s;
}
.preset-item:hover  { border-color: #90caf9; }
.preset-item.active { border-color: #1565c0; }
.preset-item svg    { display: block; pointer-events: none; }
.preset-lbl {
  font-size: 10px; color: #777; text-align: center;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;
  pointer-events: none;
}
.preset-item.active .preset-lbl { color: #1565c0; font-weight: 600; }

/* ── 구분선 ────────────────────────────────── */
.sep { border: none; border-top: 1px solid #eee; margin: 0 0 12px; }

/* ── 그리드 피커 ────────────────────────────── */
.grid-wrap { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.grid-picker {
  display: grid;
  grid-template-columns: repeat(${GRID_COLS}, ${CELL_PX}px);
  gap: ${GAP_PX}px;
  cursor: crosshair;
}
.gc {
  width: ${CELL_PX}px; height: ${CELL_PX}px;
  border: 1px solid #ddd; background: #fff;
  border-radius: 2px; box-sizing: border-box;
  pointer-events: none;
}
.gc.hl { background: #bbdefb; border-color: #1565c0; }
.grid-size {
  font-size: 13px; color: #444; font-weight: 500; height: 18px; line-height: 18px;
}

/* ── 속성 모드 ──────────────────────────────── */
.props-form {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 7px 10px; align-items: center;
}
.p-lbl { font-size: 12px; color: #666; text-align: right; }
.p-inp {
  height: 26px; padding: 0 7px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; box-sizing: border-box; width: 100%;
}
.p-sel {
  height: 26px; padding: 0 5px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; background: #fff; width: 100%;
}
.p-clr {
  height: 26px; width: 60px;
  border: 1px solid #ccc; border-radius: 3px;
  padding: 1px 2px; cursor: pointer;
}
.props-actions {
  display: flex; justify-content: flex-end;
  gap: 8px; margin-top: 14px;
}
.btn {
  height: 28px; padding: 0 14px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary { background: #1565c0; color: #fff; border-color: #1565c0; }
.btn-primary:hover { background: #1251a3; }
.btn:not(.btn-primary):hover { background: #f5f5f5; }
`;

export class PoaTableDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private selectedPreset = 'border-all';
  private gridCells: HTMLDivElement[] = [];

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dlg-hd">
      <span id="dlg-title">표</span>
      <button class="dlg-close" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="dlg-body" id="dlg-body"></div>
  </div>
</div>`;

    this.shadow.getElementById('btn-close')!
      .addEventListener('click', () => this.close());
    this.shadow.getElementById('overlay')!
      .addEventListener('click', (e) => {
        if ((e.target as HTMLElement).id === 'overlay') this.close();
      });
  }

  open(existingTable?: HTMLTableElement): void {
    this.classList.add('open');
    const body  = this.shadow.getElementById('dlg-body')!;
    const title = this.shadow.getElementById('dlg-title')!;

    if (existingTable) {
      title.textContent = '표 속성';
      this.renderProps(body, existingTable);
    } else {
      title.textContent = '표';
      this.renderInsert(body);
    }
  }

  close(): void {
    this.classList.remove('open');
    this.gridCells = [];
  }

  // ── 삽입 모드 ────────────────────────────────────────────────────────

  private renderInsert(body: HTMLElement): void {
    const doc = body.ownerDocument;
    body.innerHTML = '';

    // 프리셋 그리드
    const presetGrid = doc.createElement('div');
    presetGrid.className = 'preset-grid';

    for (const preset of TABLE_PRESETS) {
      const item = doc.createElement('div');
      item.className = 'preset-item' + (preset.id === this.selectedPreset ? ' active' : '');
      item.dataset.pid = preset.id;
      item.innerHTML = `${preset.icon}<span class="preset-lbl">${preset.label}</span>`;
      item.addEventListener('click', () => this.selectPreset(preset.id));
      presetGrid.appendChild(item);
    }
    body.appendChild(presetGrid);

    // 구분선
    const sep = doc.createElement('hr');
    sep.className = 'sep';
    body.appendChild(sep);

    // 그리드 피커
    const gridWrap = doc.createElement('div');
    gridWrap.className = 'grid-wrap';

    const gridPicker = doc.createElement('div');
    gridPicker.className = 'grid-picker';

    this.gridCells = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const cell = doc.createElement('div');
        cell.className = 'gc';
        cell.dataset.r = String(r);
        cell.dataset.c = String(c);
        gridPicker.appendChild(cell);
        this.gridCells.push(cell);
      }
    }

    const sizeLabel = doc.createElement('div');
    sizeLabel.className = 'grid-size';
    sizeLabel.textContent = '';

    // 이벤트는 컨테이너에서 위임 처리
    gridPicker.addEventListener('mousemove', (e) => {
      const gc = (e.target as HTMLElement).closest<HTMLElement>('.grid-picker');
      if (!gc) return;
      const rect = gridPicker.getBoundingClientRect();
      const step = CELL_PX + GAP_PX;
      const c = Math.min(Math.floor((e.clientX - rect.left)  / step), GRID_COLS - 1);
      const r = Math.min(Math.floor((e.clientY - rect.top)   / step), GRID_ROWS - 1);
      this.highlightGrid(r, c);
      sizeLabel.textContent = `${c + 1} × ${r + 1}`;
    });

    gridPicker.addEventListener('mouseleave', () => {
      this.highlightGrid(-1, -1);
      sizeLabel.textContent = '';
    });

    gridPicker.addEventListener('click', (e) => {
      const rect = gridPicker.getBoundingClientRect();
      const step = CELL_PX + GAP_PX;
      const c = Math.min(Math.floor((e.clientX - rect.left) / step), GRID_COLS - 1);
      const r = Math.min(Math.floor((e.clientY - rect.top)  / step), GRID_ROWS - 1);
      this.insertTable(r + 1, c + 1);
    });

    gridWrap.appendChild(gridPicker);
    gridWrap.appendChild(sizeLabel);
    body.appendChild(gridWrap);
  }

  private selectPreset(id: string): void {
    this.selectedPreset = id;
    this.shadow.querySelectorAll<HTMLElement>('.preset-item').forEach((el) => {
      el.classList.toggle('active', el.dataset.pid === id);
    });
  }

  private highlightGrid(maxR: number, maxC: number): void {
    for (const cell of this.gridCells) {
      const r = parseInt(cell.dataset.r ?? '0');
      const c = parseInt(cell.dataset.c ?? '0');
      cell.classList.toggle('hl', r <= maxR && c <= maxC);
    }
  }

  private insertTable(rows: number, cols: number): void {
    const preset = TABLE_PRESETS.find(p => p.id === this.selectedPreset) ?? TABLE_PRESETS[0]!;
    const options: TableOptions = {
      rows,
      cols,
      width: '100%',
      ...preset.baseOptions,
    } as TableOptions;

    this.dispatchEvent(new CustomEvent('poa-table-insert', {
      bubbles: true, composed: true,
      detail: { options, presetId: preset.id },
    }));
    this.close();
  }

  // ── 속성 모드 ────────────────────────────────────────────────────────

  private renderProps(body: HTMLElement, table: HTMLTableElement): void {
    const width   = table.style.width || '100%';
    const bgColor = PoaTableDialog.rgbToHex(table.style.backgroundColor) || '#ffffff';
    const firstCell = table.querySelector<HTMLElement>('td,th');
    const bm = firstCell?.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i);
    const borderColor = bm ? bm[1] : '#000000';
    let align: string = 'left';
    if (table.style.marginLeft === 'auto' && table.style.marginRight === 'auto') align = 'center';
    else if (table.style.marginLeft === 'auto') align = 'right';

    body.innerHTML = `
<div class="props-form">
  <label class="p-lbl">너비</label>
  <input  class="p-inp" id="pp-w"  type="text"  value="${width}">
  <label class="p-lbl">테두리 색</label>
  <input  class="p-clr" id="pp-bc" type="color" value="${borderColor}">
  <label class="p-lbl">배경색</label>
  <input  class="p-clr" id="pp-bg" type="color" value="${bgColor}">
  <label class="p-lbl">정렬</label>
  <select class="p-sel" id="pp-al">
    <option value="left">왼쪽</option>
    <option value="center">가운데</option>
    <option value="right">오른쪽</option>
  </select>
</div>
<div class="props-actions">
  <button class="btn"         id="pp-cancel">취소</button>
  <button class="btn btn-primary" id="pp-ok">적용</button>
</div>`;

    (body.querySelector('#pp-al') as HTMLSelectElement).value = align;

    body.querySelector('#pp-cancel')!.addEventListener('click', () => this.close());
    body.querySelector('#pp-ok')!.addEventListener('click', () => {
      const opts: Partial<TableOptions> = {
        width:       (body.querySelector('#pp-w')  as HTMLInputElement).value.trim(),
        borderColor: (body.querySelector('#pp-bc') as HTMLInputElement).value,
        bgColor:     (body.querySelector('#pp-bg') as HTMLInputElement).value,
        align:       (body.querySelector('#pp-al') as HTMLSelectElement).value as 'left' | 'center' | 'right',
      };
      this.dispatchEvent(new CustomEvent('poa-table-update', {
        bubbles: true, composed: true,
        detail: { options: opts, table },
      }));
      this.close();
    });
  }

  // ── 유틸 ──────────────────────────────────────────────────────────────

  static rgbToHex(color: string): string {
    const m = color.match(/\d+/g);
    if (!m || m.length < 3) return '';
    return '#' + m.slice(0, 3).map((n) => parseInt(n).toString(16).padStart(2, '0')).join('');
  }

  /** 하위 호환 — 구 코드가 colorToHex 로 호출하는 경우를 위해 유지 */
  static colorToHex(color: string): string { return PoaTableDialog.rgbToHex(color) || '#ffffff'; }
}
