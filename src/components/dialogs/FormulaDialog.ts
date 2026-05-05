import type { Formula, FormulaFn, FormulaFormat } from '../../modules/table/TableFormula.js';

const CSS = `
:host { display: none; }
:host([open]) { display: block; }

* { box-sizing: border-box; margin: 0; padding: 0; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.overlay.pick-mode { pointer-events: none; }

.dialog {
  background: #fff; border-radius: 8px;
  width: 440px; max-width: 96vw; max-height: 88vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  overflow: hidden;
  pointer-events: all;
}

.header {
  background: #1F2937; color: #fff;
  padding: 13px 18px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { font-size: 14px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; padding: 2px 6px; line-height: 1;
}
.header button:hover { color: #fff; }

.body { overflow-y: auto; flex: 1; padding: 0 18px; }
.body::-webkit-scrollbar { width: 5px; }
.body::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.section {
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
}
.section:last-child { border-bottom: none; }

.section-title {
  font-size: 12px; font-weight: 600; color: #374151;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}

.radio-group { display: flex; flex-direction: column; gap: 5px; }
.radio-group label,
.radio-row label {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: #374151; cursor: pointer;
}
.radio-row { display: flex; flex-wrap: wrap; gap: 10px; }

.range-row {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #6B7280;
  flex-wrap: wrap;
}
.range-row label { display: flex; align-items: center; gap: 3px; font-size: 12px; }
.range-row span { font-weight: 600; color: #374151; margin-right: 2px; }
.separator { color: #D1D5DB; margin: 0 4px; font-size: 16px; }

input[type="number"] {
  width: 52px; padding: 4px 6px;
  border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 12px; text-align: center;
}
input[type="number"]:focus { outline: none; border-color: #3B82F6; }

input[type="color"] {
  width: 36px; height: 28px; border: 1px solid #D1D5DB;
  border-radius: 4px; cursor: pointer; padding: 1px 2px;
}

.target-other-row {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #6B7280; margin-top: 5px;
  flex-wrap: wrap;
}
.target-other-row label { display: flex; align-items: center; gap: 3px; }

.style-row { display: flex; gap: 20px; }
.style-row label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #374151; }

.btn-pick {
  padding: 2px 8px; border: 1px solid #3B82F6; border-radius: 3px;
  background: #EFF6FF; color: #1D4ED8; font-size: 11px; cursor: pointer;
}
.btn-pick:hover { background: #DBEAFE; }

.footer {
  padding: 12px 18px;
  border-top: 1px solid #E5E7EB;
  display: flex; justify-content: flex-end; gap: 8px;
  flex-shrink: 0;
}
.btn {
  padding: 6px 16px; border-radius: 4px; font-size: 13px; cursor: pointer;
  border: 1px solid #D1D5DB; background: #fff; color: #374151;
}
.btn:hover { background: #F3F4F6; }
.btn.primary { background: #1F2937; color: #fff; border-color: #1F2937; }
.btn.primary:hover { background: #374151; }

.decimal-places-wrap {
  display: inline-flex; align-items: center; gap: 4px; font-size: 12px;
}
.decimal-places-wrap input { width: 44px; }
`;

export class PoaFormulaDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private currentTable: HTMLTableElement | null = null;
  private currentRow = 1;
  private currentCol = 1;
  private pickBar: HTMLElement | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `<style>${CSS}</style>`;
  }

  open(params: {
    table:            HTMLTableElement;
    cell:             HTMLTableCellElement;
    cellRow:          number;
    cellCol:          number;
    initialRange?:    [number, number, number, number];
    existingFormula?: Formula;
  }): void {
    this.currentTable = params.table;
    this.currentRow   = params.cellRow;
    this.currentCol   = params.cellCol;
    this.setAttribute('open', '');
    this.render(params.existingFormula, params.initialRange);
  }

  close(): void {
    this.removeAttribute('open');
    this.exitPickMode();
    this.currentTable = null;
  }

  /** PoaEditor가 드래그 선택 완료 후 호출 */
  applyRange(sr: number, sc: number, er: number, ec: number): void {
    this.exitPickMode();
    const q = (id: string) => this.shadow.getElementById(id) as HTMLInputElement | null;
    const set = (id: string, v: number) => { const el = q(id); if (el) el.value = String(v); };
    set('sr', sr); set('sc', sc); set('er', er); set('ec', ec);
  }

  // ── 렌더 ─────────────────────────────────────────────────────────────────────

  private render(existing?: Formula, initialRange?: [number, number, number, number]): void {
    const fn:     FormulaFn     = existing?.fn     ?? 'SUM';
    const format: FormulaFormat = existing?.format ?? 'integer';
    const dp  = existing?.decimalPlaces ?? 2;
    const [sr, sc, er, ec] = existing?.range ?? initialRange ?? [1, 1, 1, 1];
    const tRow  = existing?.targetRow ?? this.currentRow;
    const tCol  = existing?.targetCol ?? this.currentCol;
    const isCurrent = !existing || (existing.targetRow === this.currentRow && existing.targetCol === this.currentCol);
    const bgColor   = existing?.style?.backgroundColor ?? '#ffffff';
    const txtColor  = existing?.style?.color           ?? '#000000';

    const fnOpt = (v: FormulaFn, lbl: string) =>
      `<label><input type="radio" name="fn" value="${v}"${fn === v ? ' checked' : ''}> ${v} (${lbl})</label>`;
    const fmtOpt = (v: FormulaFormat, lbl: string) =>
      `<label><input type="radio" name="format" value="${v}"${format === v ? ' checked' : ''}> ${lbl}</label>`;

    this.shadow.innerHTML = `<style>${CSS}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>계산식 설정</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="body">
      <!-- 함수 선택 -->
      <div class="section">
        <div class="section-title">함수 선택</div>
        <div class="radio-group">
          ${fnOpt('SUM',      '합계')}
          ${fnOpt('AVERAGE',  '평균')}
          ${fnOpt('PRODUCT',  '곱셈')}
          ${fnOpt('SUBTRACT', '뺄셈')}
        </div>
      </div>

      <!-- 계산 범위 -->
      <div class="section">
        <div class="section-title">
          계산 범위
          <button class="btn-pick" id="btn-pick">범위 선택</button>
        </div>
        <div class="range-row">
          <span>시작</span>
          <label>행 <input id="sr" type="number" min="1" value="${sr}"></label>
          <label>열 <input id="sc" type="number" min="1" value="${sc}"></label>
          <span class="separator">→</span>
          <span>끝</span>
          <label>행 <input id="er" type="number" min="1" value="${er}"></label>
          <label>열 <input id="ec" type="number" min="1" value="${ec}"></label>
        </div>
      </div>

      <!-- 결과 셀 -->
      <div class="section">
        <div class="section-title">결과 셀</div>
        <div class="radio-group">
          <label>
            <input type="radio" name="target" value="current"${isCurrent ? ' checked' : ''}>
            현재 셀에 출력
          </label>
          <label>
            <input type="radio" name="target" value="other"${!isCurrent ? ' checked' : ''}>
            다른 셀 지정
          </label>
        </div>
        <div class="target-other-row" id="target-other-row" style="${isCurrent ? 'opacity:.4;pointer-events:none' : ''}">
          <label>행 <input id="tr" type="number" min="1" value="${tRow}"></label>
          <label>열 <input id="tc" type="number" min="1" value="${tCol}"></label>
        </div>
      </div>

      <!-- 결과 포맷 -->
      <div class="section">
        <div class="section-title">결과 포맷</div>
        <div class="radio-row">
          ${fmtOpt('integer', '정수')}
          <label>
            <input type="radio" name="format" value="decimal"${format === 'decimal' ? ' checked' : ''}>
            소수점
            <span class="decimal-places-wrap">
              <input id="dp" type="number" min="0" max="10" value="${dp}"> 자리
            </span>
          </label>
          ${fmtOpt('currency', '통화 (₩)')}
          ${fmtOpt('percent',  '퍼센트 (%)')}
        </div>
      </div>

      <!-- 스타일 -->
      <div class="section">
        <div class="section-title">결과 셀 스타일 <span style="font-weight:400;color:#9CA3AF">(선택)</span></div>
        <div class="style-row">
          <label>배경색 <input type="color" id="bg-color" value="${bgColor}"></label>
          <label>글자색 <input type="color" id="text-color" value="${txtColor}"></label>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">확인</button>
    </div>
  </div>
</div>`;

    this.bindEvents();
  }

  private bindEvents(): void {
    const sd = this.shadow;

    sd.getElementById('btn-close')?.addEventListener('click',  () => this.close());
    sd.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
    sd.getElementById('overlay')?.addEventListener('click',    () => this.close());
    sd.getElementById('dialog')?.addEventListener('click',     e => e.stopPropagation());

    // 결과 셀 라디오 — 다른 셀 지정 행/열 활성화
    sd.querySelectorAll<HTMLInputElement>('input[name="target"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const row = sd.getElementById('target-other-row') as HTMLElement | null;
        if (!row) return;
        if (radio.value === 'other') {
          row.style.opacity = '1';
          row.style.pointerEvents = 'auto';
        } else {
          row.style.opacity = '0.4';
          row.style.pointerEvents = 'none';
        }
      });
    });

    // 범위 선택 모드
    sd.getElementById('btn-pick')?.addEventListener('click', () => {
      this.enterPickMode();
    });

    // 확인
    sd.getElementById('btn-confirm')?.addEventListener('click', () => this.confirm());
  }

  private confirm(): void {
    if (!this.currentTable) return;

    const q  = (id: string) => this.shadow.getElementById(id) as HTMLInputElement | null;
    const iv = (id: string) => Math.max(1, parseInt((q(id)?.value ?? '1'), 10));
    const fn       = (this.shadow.querySelector<HTMLInputElement>('input[name="fn"]:checked')?.value ?? 'SUM') as FormulaFn;
    const format   = (this.shadow.querySelector<HTMLInputElement>('input[name="format"]:checked')?.value ?? 'integer') as FormulaFormat;
    const target   = this.shadow.querySelector<HTMLInputElement>('input[name="target"]:checked')?.value ?? 'current';
    const dp       = parseInt(q('dp')?.value ?? '2', 10);
    const bgColor  = q('bg-color')?.value  ?? '';
    const txtColor = q('text-color')?.value ?? '';

    const targetRow = target === 'current' ? this.currentRow : iv('tr');
    const targetCol = target === 'current' ? this.currentCol : iv('tc');

    const formula: Formula = {
      fn,
      range:        [iv('sr'), iv('sc'), iv('er'), iv('ec')],
      targetRow,
      targetCol,
      format,
      decimalPlaces: format === 'decimal' ? dp : undefined,
      style: {
        backgroundColor: bgColor  !== '#ffffff' ? bgColor  : undefined,
        color:           txtColor !== '#000000' ? txtColor : undefined,
      },
    };

    this.dispatchEvent(new CustomEvent('poa-formula-apply', {
      bubbles:   true,
      composed:  false,
      detail:    { formula, table: this.currentTable },
    }));

    this.close();
  }

  // ── 범위 선택 모드 ────────────────────────────────────────────────────────────

  private enterPickMode(): void {
    const overlay = this.shadow.getElementById('overlay');
    overlay?.classList.add('pick-mode');

    const bar = document.createElement('div');
    bar.style.cssText = [
      'position:fixed', 'top:20px', 'left:50%', 'transform:translateX(-50%)',
      'background:#1F2937', 'color:#fff', 'padding:8px 18px', 'border-radius:6px',
      'display:flex', 'align-items:center', 'gap:14px', 'z-index:100000',
      'font-size:13px', 'font-family:system-ui,sans-serif',
      'box-shadow:0 4px 12px rgba(0,0,0,.3)',
    ].join(';');

    bar.innerHTML = `
      <span>표에서 셀을 드래그하여 범위를 선택하세요</span>
      <button id="cancel-pick" style="
        background:#374151;border:none;color:#fff;padding:4px 10px;
        border-radius:4px;cursor:pointer;font-size:12px;
      ">취소</button>`;

    document.body.appendChild(bar);
    this.pickBar = bar;

    bar.querySelector('#cancel-pick')?.addEventListener('click', () => this.exitPickMode());

    this.dispatchEvent(new CustomEvent('poa-formula-start-pick', { bubbles: true }));
  }

  private exitPickMode(): void {
    const overlay = this.shadow.getElementById('overlay');
    overlay?.classList.remove('pick-mode');
    this.pickBar?.remove();
    this.pickBar = null;
  }
}
