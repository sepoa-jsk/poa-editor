import type {
  FormControl, ControlType, ButtonType, ButtonStyle, ResizeMode,
  RadioOption, SelectOption,
} from '../../modules/form/FormControlInserter.js';

const TYPES: { type: ControlType; label: string }[] = [
  { type: 'text',     label: '텍스트'   },
  { type: 'textarea', label: '텍스트영역' },
  { type: 'checkbox', label: '체크박스'  },
  { type: 'radio',    label: '라디오'   },
  { type: 'select',   label: '선택상자'  },
  { type: 'button',   label: '버튼'     },
  { type: 'date',     label: '날짜'     },
];

const TEMPLATE = `
<style>
  :host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
  :host([open]) { display: flex; background: rgba(0,0,0,.45); }
  .dlg { background: #fff; border-radius: 8px; width: 520px; max-height: 90vh; overflow-y: auto;
         box-shadow: 0 8px 32px rgba(0,0,0,.28); display: flex; flex-direction: column; }
  .dlg-header { display: flex; align-items: center; justify-content: space-between;
                padding: 16px 20px 12px; border-bottom: 1px solid #e5e7eb; }
  .dlg-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
  .close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #6b7280; line-height: 1; }
  .dlg-body { padding: 16px 20px; flex: 1; }

  .type-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .type-btn { padding: 5px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb;
              cursor: pointer; font-size: 13px; color: #374151; transition: all .15s; }
  .type-btn:hover { background: #f3f4f6; border-color: #9ca3af; }
  .type-btn.active { background: #2563eb; border-color: #2563eb; color: #fff; }

  .section-title { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;
                   letter-spacing: .05em; margin: 14px 0 8px; }
  .field { margin-bottom: 10px; }
  .field label { display: block; font-size: 13px; color: #374151; margin-bottom: 4px; }
  .field input[type=text], .field input[type=number], .field select, .field textarea {
    width: 100%; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px;
    padding: 6px 10px; font-size: 13px; color: #111827; outline: none;
    transition: border-color .15s; }
  .field input[type=text]:focus, .field input[type=number]:focus,
  .field select:focus, .field textarea:focus { border-color: #2563eb; }
  .field textarea { resize: vertical; min-height: 56px; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .check-row { display: flex; align-items: center; gap: 8px; }
  .check-row input[type=checkbox] { width: 16px; height: 16px; cursor: pointer; }
  .check-row label { font-size: 13px; color: #374151; cursor: pointer; user-select: none; }

  .opt-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 6px; max-height: 160px; overflow-y: auto; }
  .opt-row { display: flex; gap: 6px; align-items: center; }
  .opt-row input { flex: 1; }
  .opt-row .opt-default { flex: none; }
  .opt-row .remove-opt { flex: none; background: none; border: 1px solid #fca5a5; border-radius: 4px;
                          color: #ef4444; cursor: pointer; padding: 2px 7px; font-size: 12px; }
  .opt-row .remove-opt:hover { background: #fee2e2; }
  .add-opt-btn { padding: 4px 10px; font-size: 12px; border: 1px dashed #9ca3af; border-radius: 6px;
                 background: none; cursor: pointer; color: #6b7280; width: 100%; }
  .add-opt-btn:hover { background: #f9fafb; }
  .opt-header { display: grid; gap: 6px; font-size: 11px; color: #9ca3af; margin-bottom: 2px; }
  .radio-opt-header { grid-template-columns: 1fr 1fr 56px 28px; }
  .select-opt-header { grid-template-columns: 1fr 1fr 52px 28px; }

  .warn { color: #d97706; font-size: 12px; margin-top: 6px; display: none; }
  .warn.show { display: block; }

  .specific-section { display: none; }
  .specific-section.show { display: block; }

  .dlg-footer { padding: 14px 20px; border-top: 1px solid #e5e7eb; display: flex; justify-content: flex-end; gap: 8px; }
  .btn-cancel { padding: 7px 18px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff;
                cursor: pointer; font-size: 14px; color: #374151; }
  .btn-cancel:hover { background: #f9fafb; }
  .btn-confirm { padding: 7px 18px; border: none; border-radius: 6px; background: #2563eb;
                 cursor: pointer; font-size: 14px; color: #fff; font-weight: 500; }
  .btn-confirm:hover { background: #1d4ed8; }
</style>

<div class="dlg">
  <div class="dlg-header">
    <h3 id="dlg-title">폼 컨트롤 삽입</h3>
    <button class="close-btn" aria-label="닫기">×</button>
  </div>

  <div class="dlg-body">
    <!-- 유형 선택 -->
    <div class="section-title">컨트롤 유형</div>
    <div class="type-btns" id="type-btns"></div>

    <!-- 공통 속성 -->
    <div class="section-title">공통 속성</div>
    <div class="row2">
      <div class="field"><label>레이블</label><input type="text" id="f-label" placeholder="표시 이름"></div>
      <div class="field"><label>name 속성</label><input type="text" id="f-name" placeholder="form name"></div>
    </div>
    <div class="row3">
      <div class="field"><label>id 속성</label><input type="text" id="f-id" placeholder="자동 생성"></div>
      <div class="field"><label>class 추가</label><input type="text" id="f-class" placeholder="추가 클래스"></div>
      <div class="field" style="display:flex;align-items:flex-end;gap:12px;padding-bottom:2px">
        <div class="check-row"><input type="checkbox" id="f-disabled"><label for="f-disabled">비활성</label></div>
        <div class="check-row"><input type="checkbox" id="f-readonly"><label for="f-readonly">읽기전용</label></div>
      </div>
    </div>

    <!-- text 전용 -->
    <div class="specific-section" id="sec-text">
      <div class="section-title">텍스트 옵션</div>
      <div class="row2">
        <div class="field"><label>placeholder</label><input type="text" id="f-text-ph"></div>
        <div class="field"><label>maxlength</label><input type="number" id="f-text-ml" min="1"></div>
      </div>
      <div class="field"><label>기본값 (value)</label><input type="text" id="f-text-val"></div>
    </div>

    <!-- textarea 전용 -->
    <div class="specific-section" id="sec-textarea">
      <div class="section-title">텍스트영역 옵션</div>
      <div class="field"><label>placeholder</label><input type="text" id="f-ta-ph"></div>
      <div class="row3">
        <div class="field"><label>rows</label><input type="number" id="f-ta-rows" min="1" value="4"></div>
        <div class="field"><label>cols</label><input type="number" id="f-ta-cols" min="1" value="40"></div>
        <div class="field"><label>resize</label>
          <select id="f-ta-resize">
            <option value="both">양방향</option>
            <option value="vertical">세로만</option>
            <option value="horizontal">가로만</option>
            <option value="none">없음</option>
          </select>
        </div>
      </div>
    </div>

    <!-- checkbox 전용 -->
    <div class="specific-section" id="sec-checkbox">
      <div class="section-title">체크박스 옵션</div>
      <div class="row2">
        <div class="field"><label>체크박스 레이블</label><input type="text" id="f-cb-lbl" placeholder="클릭 가능한 텍스트"></div>
        <div class="field"><label>value</label><input type="text" id="f-cb-val"></div>
      </div>
      <div class="check-row"><input type="checkbox" id="f-cb-checked"><label for="f-cb-checked">기본 체크</label></div>
    </div>

    <!-- radio 전용 -->
    <div class="specific-section" id="sec-radio">
      <div class="section-title">라디오 그룹</div>
      <div class="field"><label>그룹 name</label><input type="text" id="f-radio-gn" placeholder="name 속성과 동일하게 사용"></div>
      <div class="section-title" style="margin-top:8px">옵션 목록</div>
      <div class="opt-header radio-opt-header">
        <span>레이블</span><span>value</span><span>기본선택</span><span></span>
      </div>
      <div class="opt-list" id="radio-opts"></div>
      <button class="add-opt-btn" id="add-radio-opt">+ 옵션 추가</button>
    </div>

    <!-- select 전용 -->
    <div class="specific-section" id="sec-select">
      <div class="section-title">선택상자 옵션</div>
      <div class="check-row" style="margin-bottom:10px">
        <input type="checkbox" id="f-sel-multi"><label for="f-sel-multi">다중 선택 (multiple)</label>
      </div>
      <div class="opt-header select-opt-header">
        <span>레이블</span><span>value</span><span>기본선택</span><span></span>
      </div>
      <div class="opt-list" id="select-opts"></div>
      <button class="add-opt-btn" id="add-select-opt">+ 옵션 추가</button>
    </div>

    <!-- button 전용 -->
    <div class="specific-section" id="sec-button">
      <div class="section-title">버튼 옵션</div>
      <div class="row3">
        <div class="field"><label>버튼 텍스트</label><input type="text" id="f-btn-text" value="버튼"></div>
        <div class="field"><label>타입</label>
          <select id="f-btn-type">
            <option value="button">button</option>
            <option value="submit">submit</option>
            <option value="reset">reset</option>
          </select>
        </div>
        <div class="field"><label>스타일</label>
          <select id="f-btn-style">
            <option value="default">기본</option>
            <option value="primary">Primary</option>
            <option value="danger">Danger</option>
          </select>
        </div>
      </div>
    </div>

    <!-- date 전용 -->
    <div class="specific-section" id="sec-date">
      <div class="section-title">날짜 옵션</div>
      <div class="row3">
        <div class="field"><label>기본값</label><input type="text" id="f-date-val" placeholder="YYYY-MM-DD"></div>
        <div class="field"><label>최솟값 (min)</label><input type="text" id="f-date-min" placeholder="YYYY-MM-DD"></div>
        <div class="field"><label>최댓값 (max)</label><input type="text" id="f-date-max" placeholder="YYYY-MM-DD"></div>
      </div>
    </div>

    <!-- 접근성 -->
    <div class="section-title">접근성</div>
    <div class="row2">
      <div class="check-row">
        <input type="checkbox" id="f-auto-label" checked>
        <label for="f-auto-label">label[for] 자동 연결 (autoLabel)</label>
      </div>
      <div class="check-row">
        <input type="checkbox" id="f-aria-req">
        <label for="f-aria-req">aria-required</label>
      </div>
    </div>
    <div class="field" style="margin-top:8px">
      <label>aria-describedby</label>
      <input type="text" id="f-aria-desc" placeholder="설명 요소의 id">
    </div>

    <div class="warn" id="label-warn">레이블이 비어 있으면 스크린리더 접근성이 저하될 수 있습니다.</div>
  </div>

  <div class="dlg-footer">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-confirm" id="btn-confirm">삽입</button>
  </div>
</div>
`;

export class PoaFormControlDialog extends HTMLElement {
  private shadow!: ShadowRoot;
  private activeType: ControlType = 'text';

  connectedCallback(): void {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = TEMPLATE;
    this._buildTypeButtons();
    this._bindEvents();
  }

  open(existing?: FormControl): void {
    const title = this.shadow.getElementById('dlg-title')!;
    const confirmBtn = this.shadow.getElementById('btn-confirm')!;
    title.textContent = existing ? '폼 컨트롤 편집' : '폼 컨트롤 삽입';
    confirmBtn.textContent = existing ? '수정' : '삽입';

    if (existing) {
      this._setType(existing.type);
      this._fillFields(existing);
    } else {
      this._setType('text');
      this._clearFields();
    }
    this.setAttribute('open', '');
    (this.shadow.getElementById('f-label') as HTMLInputElement).focus();
  }

  close(): void {
    this.removeAttribute('open');
  }

  // ── 내부 빌드 ──────────────────────────────────────────────────────────────

  private _buildTypeButtons(): void {
    const container = this.shadow.getElementById('type-btns')!;
    for (const { type, label } of TYPES) {
      const btn = document.createElement('button');
      btn.className = 'type-btn' + (type === 'text' ? ' active' : '');
      btn.dataset.type = type;
      btn.textContent = label;
      btn.addEventListener('click', () => this._setType(type));
      container.appendChild(btn);
    }
  }

  private _bindEvents(): void {
    this.shadow.getElementById('btn-cancel')!.addEventListener('click', () => this.close());
    this.shadow.querySelector('.close-btn')!.addEventListener('click', () => this.close());
    this.shadow.getElementById('btn-confirm')!.addEventListener('click', () => this._confirm());
    this.shadow.getElementById('add-radio-opt')!.addEventListener('click', () => this._addRadioOpt());
    this.shadow.getElementById('add-select-opt')!.addEventListener('click', () => this._addSelectOpt());
    this.addEventListener('click', (e) => { if (e.target === this) this.close(); });
  }

  // ── 유형 전환 ──────────────────────────────────────────────────────────────

  private _setType(type: ControlType): void {
    this.activeType = type;

    // 버튼 active 상태
    this.shadow.querySelectorAll('.type-btn').forEach(b => {
      b.classList.toggle('active', (b as HTMLElement).dataset.type === type);
    });

    // 전용 섹션 show/hide
    for (const { type: t } of TYPES) {
      const sec = this.shadow.getElementById(`sec-${t}`);
      sec?.classList.toggle('show', t === type);
    }
  }

  // ── 필드 초기화 / 채우기 ───────────────────────────────────────────────────

  private _clearFields(): void {
    (this.shadow.getElementById('f-label')    as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-name')     as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-id')       as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-class')    as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-disabled') as HTMLInputElement).checked = false;
    (this.shadow.getElementById('f-readonly') as HTMLInputElement).checked = false;
    (this.shadow.getElementById('f-auto-label') as HTMLInputElement).checked = true;
    (this.shadow.getElementById('f-aria-req')   as HTMLInputElement).checked = false;
    (this.shadow.getElementById('f-aria-desc')  as HTMLInputElement).value = '';

    // text
    (this.shadow.getElementById('f-text-ph')  as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-text-ml')  as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-text-val') as HTMLInputElement).value = '';
    // textarea
    (this.shadow.getElementById('f-ta-ph')    as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-ta-rows')  as HTMLInputElement).value = '4';
    (this.shadow.getElementById('f-ta-cols')  as HTMLInputElement).value = '40';
    (this.shadow.getElementById('f-ta-resize') as HTMLSelectElement).value = 'both';
    // checkbox
    (this.shadow.getElementById('f-cb-lbl')     as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-cb-val')     as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-cb-checked') as HTMLInputElement).checked = false;
    // radio
    (this.shadow.getElementById('f-radio-gn') as HTMLInputElement).value = '';
    this.shadow.getElementById('radio-opts')!.innerHTML = '';
    this._addRadioOpt();
    // select
    (this.shadow.getElementById('f-sel-multi') as HTMLInputElement).checked = false;
    this.shadow.getElementById('select-opts')!.innerHTML = '';
    this._addSelectOpt();
    // button
    (this.shadow.getElementById('f-btn-text')  as HTMLInputElement).value = '버튼';
    (this.shadow.getElementById('f-btn-type')  as HTMLSelectElement).value = 'button';
    (this.shadow.getElementById('f-btn-style') as HTMLSelectElement).value = 'default';
    // date
    (this.shadow.getElementById('f-date-val') as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-date-min') as HTMLInputElement).value = '';
    (this.shadow.getElementById('f-date-max') as HTMLInputElement).value = '';

    (this.shadow.getElementById('label-warn') as HTMLElement).classList.remove('show');
  }

  private _fillFields(c: FormControl): void {
    this._clearFields();
    (this.shadow.getElementById('f-label')    as HTMLInputElement).value = c.label    ?? '';
    (this.shadow.getElementById('f-name')     as HTMLInputElement).value = c.name     ?? '';
    (this.shadow.getElementById('f-id')       as HTMLInputElement).value = c.id       ?? '';
    (this.shadow.getElementById('f-class')    as HTMLInputElement).value = c.class    ?? '';
    (this.shadow.getElementById('f-disabled') as HTMLInputElement).checked = c.disabled ?? false;
    (this.shadow.getElementById('f-readonly') as HTMLInputElement).checked = c.readonly ?? false;
    (this.shadow.getElementById('f-auto-label') as HTMLInputElement).checked = c.autoLabel !== false;
    (this.shadow.getElementById('f-aria-req')   as HTMLInputElement).checked = c.ariaRequired ?? false;
    (this.shadow.getElementById('f-aria-desc')  as HTMLInputElement).value = c.ariaDescribedBy ?? '';

    switch (c.type) {
      case 'text':
        (this.shadow.getElementById('f-text-ph')  as HTMLInputElement).value = c.placeholder ?? '';
        (this.shadow.getElementById('f-text-ml')  as HTMLInputElement).value = c.maxlength != null ? String(c.maxlength) : '';
        (this.shadow.getElementById('f-text-val') as HTMLInputElement).value = c.value ?? '';
        break;
      case 'textarea':
        (this.shadow.getElementById('f-ta-ph')    as HTMLInputElement).value = c.placeholder ?? '';
        (this.shadow.getElementById('f-ta-rows')  as HTMLInputElement).value = String(c.rows ?? 4);
        (this.shadow.getElementById('f-ta-cols')  as HTMLInputElement).value = String(c.cols ?? 40);
        (this.shadow.getElementById('f-ta-resize') as HTMLSelectElement).value = c.resize ?? 'both';
        break;
      case 'checkbox':
        (this.shadow.getElementById('f-cb-lbl')     as HTMLInputElement).value = c.checkLabel ?? '';
        (this.shadow.getElementById('f-cb-val')     as HTMLInputElement).value = c.value ?? '';
        (this.shadow.getElementById('f-cb-checked') as HTMLInputElement).checked = c.checked ?? false;
        break;
      case 'radio':
        (this.shadow.getElementById('f-radio-gn') as HTMLInputElement).value = c.groupName ?? '';
        this.shadow.getElementById('radio-opts')!.innerHTML = '';
        for (const opt of (c.options ?? [])) this._addRadioOpt(opt);
        if (!(c.options?.length)) this._addRadioOpt();
        break;
      case 'select':
        (this.shadow.getElementById('f-sel-multi') as HTMLInputElement).checked = c.multiple ?? false;
        this.shadow.getElementById('select-opts')!.innerHTML = '';
        for (const opt of (c.options ?? [])) this._addSelectOpt(opt);
        if (!(c.options?.length)) this._addSelectOpt();
        break;
      case 'button':
        (this.shadow.getElementById('f-btn-text')  as HTMLInputElement).value = c.text ?? '버튼';
        (this.shadow.getElementById('f-btn-type')  as HTMLSelectElement).value = c.btnType ?? 'button';
        (this.shadow.getElementById('f-btn-style') as HTMLSelectElement).value = c.btnStyle ?? 'default';
        break;
      case 'date':
        (this.shadow.getElementById('f-date-val') as HTMLInputElement).value = c.value ?? '';
        (this.shadow.getElementById('f-date-min') as HTMLInputElement).value = c.min ?? '';
        (this.shadow.getElementById('f-date-max') as HTMLInputElement).value = c.max ?? '';
        break;
    }
  }

  // ── 옵션 추가 (radio / select) ─────────────────────────────────────────────

  private _addRadioOpt(opt?: RadioOption): void {
    const list = this.shadow.getElementById('radio-opts')!;
    const row = document.createElement('div');
    row.className = 'opt-row';
    row.innerHTML = `
      <input type="text" placeholder="레이블" class="opt-label" value="${opt?.label ?? ''}">
      <input type="text" placeholder="value"  class="opt-value" value="${opt?.value ?? ''}">
      <input type="checkbox" class="opt-default" title="기본 선택" ${opt?.defaultChecked ? 'checked' : ''}>
      <button class="remove-opt" title="삭제">✕</button>
    `;
    row.querySelector('.remove-opt')!.addEventListener('click', () => row.remove());
    list.appendChild(row);
  }

  private _addSelectOpt(opt?: SelectOption): void {
    const list = this.shadow.getElementById('select-opts')!;
    const row = document.createElement('div');
    row.className = 'opt-row';
    row.innerHTML = `
      <input type="text" placeholder="레이블" class="opt-label" value="${opt?.label ?? ''}">
      <input type="text" placeholder="value"  class="opt-value" value="${opt?.value ?? ''}">
      <input type="checkbox" class="opt-default" title="기본 선택" ${opt?.selected ? 'checked' : ''}>
      <button class="remove-opt" title="삭제">✕</button>
    `;
    row.querySelector('.remove-opt')!.addEventListener('click', () => row.remove());
    list.appendChild(row);
  }

  // ── 값 수집 ────────────────────────────────────────────────────────────────

  private _val(id: string): string {
    return (this.shadow.getElementById(id) as HTMLInputElement).value.trim();
  }
  private _checked(id: string): boolean {
    return (this.shadow.getElementById(id) as HTMLInputElement).checked;
  }
  private _sel(id: string): string {
    return (this.shadow.getElementById(id) as HTMLSelectElement).value;
  }

  private _buildConfig(): FormControl {
    const base = {
      type:             this.activeType,
      label:            this._val('f-label')    || undefined,
      name:             this._val('f-name')     || undefined,
      id:               this._val('f-id')       || undefined,
      class:            this._val('f-class')    || undefined,
      disabled:         this._checked('f-disabled') || undefined,
      readonly:         this._checked('f-readonly') || undefined,
      autoLabel:        this._checked('f-auto-label') ? undefined : false,
      ariaRequired:     this._checked('f-aria-req') || undefined,
      ariaDescribedBy:  this._val('f-aria-desc') || undefined,
    };

    switch (this.activeType) {
      case 'text': return {
        ...base, type: 'text',
        placeholder: this._val('f-text-ph')  || undefined,
        maxlength:   Number(this._val('f-text-ml')) || undefined,
        value:       this._val('f-text-val') || undefined,
      };
      case 'textarea': return {
        ...base, type: 'textarea',
        placeholder: this._val('f-ta-ph') || undefined,
        rows:   Number(this._val('f-ta-rows')) || 4,
        cols:   Number(this._val('f-ta-cols')) || 40,
        resize: this._sel('f-ta-resize') as ResizeMode,
      };
      case 'checkbox': return {
        ...base, type: 'checkbox',
        checkLabel: this._val('f-cb-lbl') || undefined,
        value:      this._val('f-cb-val') || undefined,
        checked:    this._checked('f-cb-checked') || undefined,
      };
      case 'radio': {
        const opts: RadioOption[] = [];
        this.shadow.getElementById('radio-opts')!.querySelectorAll('.opt-row').forEach(row => {
          const lbl = (row.querySelector('.opt-label') as HTMLInputElement).value.trim();
          const val = (row.querySelector('.opt-value') as HTMLInputElement).value.trim();
          const def = (row.querySelector('.opt-default') as HTMLInputElement).checked;
          if (lbl || val) opts.push({ label: lbl, value: val, defaultChecked: def || undefined });
        });
        return { ...base, type: 'radio', groupName: this._val('f-radio-gn') || undefined, options: opts };
      }
      case 'select': {
        const opts: SelectOption[] = [];
        this.shadow.getElementById('select-opts')!.querySelectorAll('.opt-row').forEach(row => {
          const lbl = (row.querySelector('.opt-label') as HTMLInputElement).value.trim();
          const val = (row.querySelector('.opt-value') as HTMLInputElement).value.trim();
          const sel = (row.querySelector('.opt-default') as HTMLInputElement).checked;
          if (lbl || val) opts.push({ label: lbl, value: val, selected: sel || undefined });
        });
        return { ...base, type: 'select', multiple: this._checked('f-sel-multi') || undefined, options: opts };
      }
      case 'button': return {
        ...base, type: 'button',
        text:     this._val('f-btn-text') || '버튼',
        btnType:  this._sel('f-btn-type')  as ButtonType,
        btnStyle: this._sel('f-btn-style') as ButtonStyle,
      };
      case 'date': return {
        ...base, type: 'date',
        value: this._val('f-date-val') || undefined,
        min:   this._val('f-date-min') || undefined,
        max:   this._val('f-date-max') || undefined,
      };
    }
  }

  private _confirm(): void {
    const config = this._buildConfig();

    const warn = this.shadow.getElementById('label-warn')!;
    if (!config.label) {
      warn.classList.add('show');
    } else {
      warn.classList.remove('show');
    }

    this.dispatchEvent(new CustomEvent('poa-form-insert', {
      bubbles: true,
      composed: true,
      detail: { config },
    }));
    this.close();
  }
}
