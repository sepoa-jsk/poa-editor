import type { TableOptions, HeaderPosition } from '../../modules/table/TableBuilder.js';

const CSS = `
:host { display: none; }
:host(.open) { display: block; }
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 8000; padding: 16px;
}
.dialog {
  background: #fff; border-radius: 6px;
  box-shadow: 0 4px 28px rgba(0,0,0,0.22);
  padding: 18px 22px 14px;
  width: 420px; max-width: 100%;
  max-height: 90vh; overflow-y: auto;
  font-size: 13px; color: #333;
}
h3 { margin: 0 0 14px; font-size: 15px; font-weight: 600; }
fieldset {
  border: 1px solid #ddd; border-radius: 4px;
  padding: 10px 14px 12px; margin: 0 0 10px;
}
legend { font-weight: 600; font-size: 12px; color: #555; padding: 0 4px; }
.row { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; flex-wrap: wrap; }
.row:last-child { margin-bottom: 0; }
label.lbl { width: 72px; flex-shrink: 0; color: #555; font-size: 12px; text-align: right; }
input[type="number"], input[type="text"] {
  height: 26px; padding: 0 7px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; box-sizing: border-box;
}
input[type="number"] { width: 70px; }
input[type="text"]   { flex: 1; min-width: 0; }
input[type="color"] {
  height: 26px; width: 48px; padding: 1px 2px;
  border: 1px solid #ccc; border-radius: 3px; cursor: pointer;
}
select {
  height: 26px; padding: 0 6px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; background: #fff; cursor: pointer;
}
.unit { font-size: 12px; color: #666; }
.hint { font-size: 11px; color: #999; margin-left: 4px; }
.check-row { display: flex; align-items: center; gap: 5px; }
.actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px; }
.btn {
  height: 30px; padding: 0 18px;
  border: 1px solid #ccc; border-radius: 4px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary { background: #1565c0; color: #fff; border-color: #1565c0; }
.btn-primary:hover { background: #1251a3; }
.btn:hover { background: #f5f5f5; }
`;

const HTML = `
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <h3 id="dlg-title">표 삽입</h3>

    <!-- 기본 설정 -->
    <fieldset>
      <legend>기본 설정</legend>
      <div class="row">
        <label class="lbl">행</label>
        <input type="number" id="inp-rows" value="3" min="1" max="100">
        <label class="lbl" style="width:26px;">열</label>
        <input type="number" id="inp-cols" value="3" min="1" max="100">
      </div>
      <div class="row">
        <label class="lbl">너비</label>
        <input type="number" id="inp-width-val" value="100" min="1">
        <select id="sel-width-unit" style="width:52px;">
          <option value="%">%</option>
          <option value="px">px</option>
        </select>
        <label class="lbl" style="width:30px;">높이</label>
        <input type="number" id="inp-height" value="0" min="0" placeholder="auto">
        <span class="unit">px</span>
      </div>
      <div class="row">
        <label class="lbl">테두리</label>
        <input type="number" id="inp-border" value="1" min="0" max="20">
        <span class="unit">px</span>
        <label class="lbl" style="width:50px;">왼쪽 여백</label>
        <input type="number" id="inp-margin" value="0" min="0">
        <span class="unit">px</span>
      </div>
      <div class="row">
        <label class="lbl">정렬</label>
        <select id="sel-align">
          <option value="left">왼쪽</option>
          <option value="center">가운데</option>
          <option value="right">오른쪽</option>
        </select>
        <label class="lbl" style="width:56px;">헤더 위치</label>
        <select id="sel-header">
          <option value="none">없음</option>
          <option value="top">상단</option>
          <option value="left">좌측</option>
        </select>
      </div>
    </fieldset>

    <!-- 스타일 -->
    <fieldset>
      <legend>스타일</legend>
      <div class="row">
        <label class="lbl">테두리 색</label>
        <input type="color" id="inp-border-color" value="#000000">
      </div>
      <div class="row">
        <label class="lbl">배경색</label>
        <input type="color" id="inp-bg-color" value="#ffffff">
        <div class="check-row" style="margin-left:4px;">
          <input type="checkbox" id="chk-bg">
          <label for="chk-bg" style="font-size:12px;cursor:pointer;">배경색 사용</label>
        </div>
      </div>
    </fieldset>

    <!-- 속성 -->
    <fieldset>
      <legend>속성</legend>
      <div class="row">
        <label class="lbl">ID</label>
        <input type="text" id="inp-id" placeholder="">
      </div>
      <div class="row">
        <label class="lbl">Class</label>
        <input type="text" id="inp-class" placeholder="">
      </div>
    </fieldset>

    <!-- 캡션 / 요약 -->
    <fieldset>
      <legend>캡션 / 요약정보</legend>
      <div class="row">
        <label class="lbl">캡션</label>
        <input type="text" id="inp-caption" placeholder="표 제목" style="flex:1;">
        <div class="check-row">
          <input type="checkbox" id="chk-caption-visible" checked>
          <label for="chk-caption-visible" style="font-size:12px;cursor:pointer;">보이기</label>
        </div>
      </div>
      <div class="row">
        <label class="lbl">요약정보</label>
        <input type="text" id="inp-summary" placeholder="스크린 리더용 (화면 미표시)" style="flex:1;">
      </div>
    </fieldset>

    <div class="actions">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn btn-primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>
`;

export class PoaTableDialog extends HTMLElement {
  private shadow: ShadowRoot;
  private editTable: HTMLTableElement | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `<style>${CSS}</style>${HTML}`;
    this.bindEvents();
  }

  /** 새 표 삽입 모드로 다이얼로그를 연다 */
  open(existingTable?: HTMLTableElement): void {
    this.editTable = existingTable ?? null;
    this.classList.add('open');
    this.fillForm(existingTable);

    const title  = this.shadow.getElementById('dlg-title')!;
    const btnOk  = this.shadow.getElementById('btn-confirm') as HTMLButtonElement;
    const rowInp = this.shadow.getElementById('inp-rows') as HTMLInputElement;

    if (existingTable) {
      title.textContent   = '표 속성';
      btnOk.textContent   = '적용';
      rowInp.closest('.row')!.setAttribute('hidden', '');     // 기존 표 수정 시 행/열 수 비활성
    } else {
      title.textContent   = '표 삽입';
      btnOk.textContent   = '삽입';
      rowInp.closest('.row')!.removeAttribute('hidden');
    }
  }

  close(): void {
    this.classList.remove('open');
    this.editTable = null;
  }

  // ── Private ───────────────────────────────────────────────────────

  private fillForm(table?: HTMLTableElement): void {
    const s = this.shadow;

    if (!table) {
      // 기본값 초기화
      (s.getElementById('inp-rows') as HTMLInputElement).value  = '3';
      (s.getElementById('inp-cols') as HTMLInputElement).value  = '3';
      (s.getElementById('inp-width-val') as HTMLInputElement).value = '100';
      (s.getElementById('sel-width-unit') as HTMLSelectElement).value = '%';
      (s.getElementById('inp-height') as HTMLInputElement).value  = '0';
      (s.getElementById('inp-border') as HTMLInputElement).value  = '1';
      (s.getElementById('inp-margin') as HTMLInputElement).value  = '0';
      (s.getElementById('sel-align') as HTMLSelectElement).value  = 'left';
      (s.getElementById('sel-header') as HTMLSelectElement).value = 'none';
      (s.getElementById('inp-border-color') as HTMLInputElement).value = '#000000';
      (s.getElementById('inp-bg-color') as HTMLInputElement).value    = '#ffffff';
      (s.getElementById('chk-bg') as HTMLInputElement).checked = false;
      (s.getElementById('inp-id') as HTMLInputElement).value      = '';
      (s.getElementById('inp-class') as HTMLInputElement).value   = '';
      (s.getElementById('inp-caption') as HTMLInputElement).value = '';
      (s.getElementById('chk-caption-visible') as HTMLInputElement).checked = true;
      (s.getElementById('inp-summary') as HTMLInputElement).value = '';
      return;
    }

    // 기존 표에서 읽기 (동적 import 없이 직접 파싱)
    const w = table.style.width || '';
    const numMatch = w.match(/^([\d.]+)(px|%)?$/);
    if (numMatch) {
      (s.getElementById('inp-width-val') as HTMLInputElement).value = numMatch[1];
      (s.getElementById('sel-width-unit') as HTMLSelectElement).value = (numMatch[2] ?? '%') as string;
    }

    const h = parseFloat(table.style.height) || 0;
    (s.getElementById('inp-height') as HTMLInputElement).value = String(h);

    const bAttr = parseInt(table.getAttribute('border') ?? '1', 10) || 0;
    (s.getElementById('inp-border') as HTMLInputElement).value = String(bAttr);

    const ml = parseFloat(table.style.marginLeft) || 0;
    (s.getElementById('inp-margin') as HTMLInputElement).value = String(ml);

    let align: string = 'left';
    if (table.style.marginLeft === 'auto' && table.style.marginRight === 'auto') align = 'center';
    else if (table.style.marginLeft === 'auto') align = 'right';
    (s.getElementById('sel-align') as HTMLSelectElement).value = align;

    let hdr: string = 'none';
    if (table.querySelector('thead')) hdr = 'top';
    else if (table.querySelector('tbody tr th')) hdr = 'left';
    (s.getElementById('sel-header') as HTMLSelectElement).value = hdr;

    const firstCell = table.querySelector<HTMLElement>('td, th');
    if (firstCell) {
      const bm = firstCell.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i);
      if (bm) (s.getElementById('inp-border-color') as HTMLInputElement).value = bm[1];
    }

    const bg = table.style.backgroundColor;
    if (bg) {
      (s.getElementById('inp-bg-color') as HTMLInputElement).value = PoaTableDialog.colorToHex(bg);
      (s.getElementById('chk-bg') as HTMLInputElement).checked = true;
    }

    (s.getElementById('inp-id') as HTMLInputElement).value    = table.id;
    (s.getElementById('inp-class') as HTMLInputElement).value = table.className;

    const cap = table.querySelector('caption');
    (s.getElementById('inp-caption') as HTMLInputElement).value = cap?.textContent?.trim() ?? '';
    (s.getElementById('chk-caption-visible') as HTMLInputElement).checked = cap ? cap.style.display !== 'none' : true;
    (s.getElementById('inp-summary') as HTMLInputElement).value = table.getAttribute('summary') ?? '';
  }

  private bindEvents(): void {
    const s = this.shadow;

    s.getElementById('btn-cancel')?.addEventListener('click', () => this.close());
    s.getElementById('overlay')?.addEventListener('click', (e) => {
      if (e.target === s.getElementById('overlay')) this.close();
    });
    s.getElementById('btn-confirm')?.addEventListener('click', () => this.confirm());
  }

  private confirm(): void {
    const s       = this.shadow;
    const widthVal  = (s.getElementById('inp-width-val')  as HTMLInputElement).value;
    const widthUnit = (s.getElementById('sel-width-unit') as HTMLSelectElement).value;
    const heightVal = parseInt((s.getElementById('inp-height') as HTMLInputElement).value, 10) || 0;
    const border    = parseInt((s.getElementById('inp-border') as HTMLInputElement).value, 10) || 0;
    const marginLeft = parseInt((s.getElementById('inp-margin') as HTMLInputElement).value, 10) || 0;
    const align     = (s.getElementById('sel-align')  as HTMLSelectElement).value as 'left' | 'center' | 'right';
    const headerPos = (s.getElementById('sel-header') as HTMLSelectElement).value as HeaderPosition;
    const borderColor = (s.getElementById('inp-border-color') as HTMLInputElement).value;
    const useBg       = (s.getElementById('chk-bg') as HTMLInputElement).checked;
    const bgColor     = useBg ? (s.getElementById('inp-bg-color') as HTMLInputElement).value : '';
    const id          = (s.getElementById('inp-id')      as HTMLInputElement).value.trim();
    const className   = (s.getElementById('inp-class')   as HTMLInputElement).value.trim();
    const caption     = (s.getElementById('inp-caption') as HTMLInputElement).value.trim();
    const captionVisible = (s.getElementById('chk-caption-visible') as HTMLInputElement).checked;
    const summary     = (s.getElementById('inp-summary') as HTMLInputElement).value.trim();

    const options: TableOptions = {
      rows:    parseInt((s.getElementById('inp-rows') as HTMLInputElement).value, 10) || 3,
      cols:    parseInt((s.getElementById('inp-cols') as HTMLInputElement).value, 10) || 3,
      width:   widthVal ? `${widthVal}${widthUnit}` : '',
      height:  heightVal > 0 ? `${heightVal}px` : '',
      border,
      marginLeft,
      align,
      headerPosition: headerPos,
      borderColor,
      bgColor,
      id,
      className,
      caption,
      captionVisible,
      summary,
    };

    if (this.editTable) {
      this.dispatchEvent(new CustomEvent('poa-table-update', {
        bubbles: true, composed: true,
        detail: { options, table: this.editTable },
      }));
    } else {
      this.dispatchEvent(new CustomEvent('poa-table-insert', {
        bubbles: true, composed: true,
        detail: { options },
      }));
    }
    this.close();
  }

  /** rgb(r, g, b) → #rrggbb 변환 */
  static colorToHex(color: string): string {
    const m = color.match(/\d+/g);
    if (!m || m.length < 3) return '#ffffff';
    return '#' + m.slice(0, 3).map((n) => parseInt(n).toString(16).padStart(2, '0')).join('');
  }
}

