import {
  buildFormControlHtml, generateControlId,
} from '../../modules/form/FormControlInserter.js';
import type {
  FormControl, ControlType, ButtonType, ButtonStyle,
  RadioOption, SelectOption,
} from '../../modules/form/FormControlInserter.js';

// ── 아이콘 SVG ──────────────────────────────────────────────────────────────

const ICONS: Record<ControlType, string> = {
  text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="9" width="18" height="6" rx="2"/>
    <line x1="7" y1="12" x2="10" y2="12"/>
  </svg>`,
  textarea: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="15" x2="13" y2="15"/>
  </svg>`,
  checkbox: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="4" y="4" width="16" height="16" rx="3"/>
    <polyline points="7,12 10.5,15.5 17,8"/>
  </svg>`,
  radio: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
  </svg>`,
  select: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="8" width="18" height="8" rx="2"/>
    <polyline points="15,11 18,11 16.5,13.5"/>
  </svg>`,
  button: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="8" width="18" height="8" rx="4"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
  </svg>`,
  date: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>
    <rect x="7" y="13" width="4" height="4" rx="1" fill="currentColor" stroke="none"/>
  </svg>`,
};

const TYPE_LABELS: Record<ControlType, string> = {
  text: '텍스트', textarea: '여러 줄', checkbox: '체크박스',
  radio: '라디오', select: '목록 선택', button: '버튼', date: '날짜 선택',
};

const TYPES: ControlType[] = ['text', 'textarea', 'checkbox', 'radio', 'select', 'button', 'date'];

// ── 스타일 ──────────────────────────────────────────────────────────────────

const STYLE = `
:host { display:none; position:fixed; inset:0; z-index:9999; align-items:center; justify-content:center; }
:host([open]) { display:flex; background:rgba(0,0,0,.45); }
.dlg { background:#fff; border-radius:12px; width:520px; max-height:92vh;
       overflow-y:auto; box-shadow:0 8px 32px rgba(0,0,0,.28);
       display:flex; flex-direction:column; }

/* 헤더 */
.hdr { display:flex; align-items:center; justify-content:space-between;
       padding:18px 20px 14px; border-bottom:1px solid #f3f4f6; }
.hdr h3 { margin:0; font-size:16px; font-weight:700; color:#111827; }
.x-btn { background:none; border:none; font-size:22px; cursor:pointer; color:#9ca3af;
          line-height:1; padding:0 4px; border-radius:4px; }
.x-btn:hover { color:#374151; background:#f3f4f6; }

/* 타입 카드 그리드 */
.type-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px;
             padding:16px 20px 12px; border-bottom:1px solid #f3f4f6; }
.type-card { display:flex; flex-direction:column; align-items:center; justify-content:center;
             gap:6px; height:72px; border:1.5px solid #e5e7eb; border-radius:8px;
             background:#fff; cursor:pointer; color:#6b7280; font-size:12px; font-weight:500;
             transition:all .15s; user-select:none; }
.type-card:hover { background:#f9fafb; border-color:#d1d5db; color:#374151; }
.type-card.active { border:2px solid #2563eb; background:#eff6ff; color:#2563eb; }
.type-card svg { flex-shrink:0; }

/* 폼 바디 */
.body { padding:16px 20px 0; flex:1; }
.field { margin-bottom:14px; }
.field > label { display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:5px; }
.field .hint { font-size:11px; color:#9ca3af; margin-top:4px; }
input[type=text], input[type=number], select, textarea {
  width:100%; box-sizing:border-box; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:8px 12px; font-size:14px; color:#111827; outline:none; transition:border-color .15s;
  font-family:inherit; }
input[type=text]:focus, input[type=number]:focus, select:focus, textarea:focus {
  border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
textarea { resize:vertical; min-height:72px; }
.row2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }

/* 체크 */
.chk-row { display:flex; align-items:center; gap:8px; }
.chk-row input[type=checkbox] { width:16px; height:16px; accent-color:#2563eb; cursor:pointer; flex-shrink:0; }
.chk-row label { font-size:13px; color:#374151; cursor:pointer; user-select:none; }

/* 옵션 리스트 (radio/select) */
.opt-list { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
.opt-row { display:flex; gap:6px; align-items:center; }
.opt-row input[type=text] { flex:1; padding:6px 10px; }
.opt-row .del-btn { flex:none; width:28px; height:28px; border:1px solid #fca5a5;
                    border-radius:6px; background:none; color:#ef4444; cursor:pointer;
                    font-size:14px; display:flex; align-items:center; justify-content:center; }
.opt-row .del-btn:hover { background:#fee2e2; }
.add-opt { width:100%; padding:7px; border:1.5px dashed #d1d5db; border-radius:8px;
           background:none; cursor:pointer; color:#6b7280; font-size:13px; margin-bottom:4px; }
.add-opt:hover { background:#f9fafb; border-color:#9ca3af; }

/* 버튼 역할 라디오 */
.btn-role { display:flex; gap:12px; }
.btn-role label { display:flex; align-items:center; gap:5px; font-size:13px;
                  color:#374151; cursor:pointer; }
.btn-role input[type=radio] { accent-color:#2563eb; }

/* 추가 설정 접기/펼치기 */
.adv-toggle { width:100%; background:none; border:none; text-align:left; cursor:pointer;
              font-size:13px; color:#6b7280; padding:8px 0; display:flex; align-items:center; gap:6px; }
.adv-toggle:hover { color:#374151; }
.adv-toggle .arrow { transition:transform .2s; display:inline-block; }
.adv-toggle.open .arrow { transform:rotate(180deg); }
.adv-body { display:none; border:1.5px solid #f3f4f6; border-radius:8px; padding:12px 14px;
            margin-bottom:12px; background:#fafafa; }
.adv-body.show { display:block; }

/* 미리보기 */
.preview-wrap { margin:0 -20px; padding:12px 20px; background:#f9fafb;
                border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; }
.preview-label { font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase;
                 letter-spacing:.06em; margin-bottom:8px; }
.preview-box { min-height:60px; display:flex; align-items:flex-start; }
.preview-box .poa-form-group { border:none !important; padding:0 !important; margin:0 !important; }
.preview-box label { display:block; font-size:13px; color:#374151; margin-bottom:4px; font-weight:500; }
.preview-box input[type=text],.preview-box input[type=date],
.preview-box textarea,.preview-box select {
  border:1.5px solid #e5e7eb; border-radius:6px; padding:6px 10px; font-size:13px;
  color:#374151; width:auto; min-width:200px; outline:none; box-shadow:none; }
.preview-box .poa-checkbox-label { font-size:13px; color:#374151; display:flex; align-items:center; gap:6px; }
.preview-box .poa-radio-group { display:flex; flex-direction:column; gap:4px; }
.preview-box .poa-radio-group label { font-size:13px; color:#374151; margin:0; font-weight:normal; display:flex; align-items:center; gap:5px; }
.preview-box .poa-btn { padding:6px 16px; border:1.5px solid #d1d5db; border-radius:6px;
                        background:#f9fafb; font-size:13px; color:#374151; cursor:default; }
.preview-box .poa-btn-primary { background:#2563eb; border-color:#2563eb; color:#fff; }
.preview-box .poa-btn-danger  { background:#ef4444; border-color:#ef4444; color:#fff; }

/* 푸터 */
.ftr { display:flex; justify-content:flex-end; gap:8px; padding:14px 20px; }
.btn-cancel  { padding:8px 20px; border:1.5px solid #e5e7eb; border-radius:8px; background:#fff;
               cursor:pointer; font-size:14px; color:#374151; font-weight:500; }
.btn-cancel:hover  { background:#f9fafb; }
.btn-confirm { padding:8px 24px; border:none; border-radius:8px; background:#2563eb;
               cursor:pointer; font-size:14px; color:#fff; font-weight:600; }
.btn-confirm:hover { background:#1d4ed8; }
`;

// ── 헬퍼 ───────────────────────────────────────────────────────────────────

function field(label: string, inner: string, hint = ''): string {
  return `<div class="field">
    <label>${label}</label>${inner}${hint ? `<div class="hint">${hint}</div>` : ''}
  </div>`;
}
function inp(id: string, ph = '', type = 'text'): string {
  return `<input type="${type}" id="${id}" placeholder="${ph}">`;
}
function sel(id: string, opts: [string, string][]): string {
  return `<select id="${id}">${opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>`;
}

// ── 컴포넌트 ──────────────────────────────────────────────────────────────

export class PoaFormControlDialog extends HTMLElement {
  private shadow!: ShadowRoot;
  private activeType: ControlType = 'text';

  connectedCallback(): void {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `<style>${STYLE}</style>${this._tpl()}`;
    this._buildTypeCards();
    this._bindEvents();
    this._setType('text');
  }

  open(existing?: FormControl): void {
    const title = this.shadow.getElementById('dlg-title')!;
    const confirmBtn = this.shadow.getElementById('btn-confirm')!;
    title.textContent = existing ? '입력 요소 편집' : '입력 요소 추가';
    confirmBtn.textContent = existing ? '수정하기' : '추가하기';

    if (existing) {
      this._setType(existing.type);
      this._fillFields(existing);
    } else {
      this._setType('text');
      this._clearFields();
    }
    this.setAttribute('open', '');
    (this.shadow.getElementById('f-label') as HTMLInputElement)?.focus();
  }

  close(): void { this.removeAttribute('open'); }

  // ── 템플릿 ──────────────────────────────────────────────────────────────

  private _tpl(): string {
    return `<div class="dlg">
  <div class="hdr">
    <h3 id="dlg-title">입력 요소 추가</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>

  <div id="type-grid" class="type-grid"></div>

  <div class="body">
    ${this._secText()}
    ${this._secTextarea()}
    ${this._secCheckbox()}
    ${this._secRadio()}
    ${this._secSelect()}
    ${this._secButton()}
    ${this._secDate()}
  </div>

  <div class="preview-wrap">
    <div class="preview-label">미리보기</div>
    <div class="preview-box" id="preview-box"></div>
  </div>

  <div class="ftr">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-confirm" id="btn-confirm">추가하기</button>
  </div>
</div>`;
  }

  private _adv(inner: string): string {
    return `
    <button type="button" class="adv-toggle" data-adv>
      <span class="arrow">▼</span> 추가 설정
    </button>
    <div class="adv-body" data-adv-body>${inner}</div>`;
  }

  private _secText(): string {
    return `<div class="specific-section" id="sec-text">
      ${field('항목 이름', inp('f-label', '예) 이름, 이메일 주소…'), '사용자에게 보여지는 항목 설명입니다')}
      ${field('안내 문구', inp('f-text-ph', '예) 홍길동'), '입력창 안에 표시되는 도움말입니다')}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-aria-req"><label for="f-aria-req">필수 입력 항목으로 표시</label>
        </div>
        ${field('최대 글자 수', inp('f-text-ml', '제한 없음', 'number'))}
        ${field('기본값', inp('f-text-val', '미리 채울 내용'))}
        ${field('name 속성', inp('f-name', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secTextarea(): string {
    return `<div class="specific-section" id="sec-textarea">
      ${field('항목 이름', inp('f-ta-label', '예) 내용, 자기소개…'))}
      ${field('안내 문구', inp('f-ta-ph', '예) 간단하게 소개해 주세요'))}
      ${field('줄 수', `<input type="number" id="f-ta-rows" value="4" min="2" max="20" style="width:80px">`,
        '입력창의 기본 높이를 줄 수로 조정합니다')}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-ta-req"><label for="f-ta-req">필수 입력 항목으로 표시</label>
        </div>
        ${field('name 속성', inp('f-ta-name', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secCheckbox(): string {
    return `<div class="specific-section" id="sec-checkbox">
      ${field('체크박스 텍스트', inp('f-cb-lbl', '예) 개인정보 수집에 동의합니다'),
        '체크박스 옆에 표시되는 설명입니다')}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-cb-checked"><label for="f-cb-checked">처음부터 체크된 상태로 표시</label>
        </div>
      </div>
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-cb-req"><label for="f-cb-req">필수 체크 항목으로 표시</label>
        </div>
        ${field('name 속성', inp('f-cb-name', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secRadio(): string {
    return `<div class="specific-section" id="sec-radio">
      ${field('그룹 제목', inp('f-radio-label', '예) 성별, 선호 연락 방법…'),
        '라디오 버튼 그룹 위에 표시되는 제목입니다')}
      <div class="field">
        <label>선택지 목록</label>
        <div class="opt-list" id="radio-opts"></div>
        <button type="button" class="add-opt" id="add-radio-opt">+ 선택지 추가</button>
      </div>
      ${this._adv(`
        <div class="hint" style="margin-bottom:8px">기본 선택값은 각 선택지 행 오른쪽 ★ 버튼으로 지정하세요.</div>
        ${field('그룹 name 속성', inp('f-radio-gn', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secSelect(): string {
    return `<div class="specific-section" id="sec-select">
      ${field('항목 이름', inp('f-sel-label', '예) 지역, 직군…'))}
      <div class="field">
        <label>선택지 목록</label>
        <div class="opt-list" id="select-opts"></div>
        <button type="button" class="add-opt" id="add-select-opt">+ 항목 추가</button>
      </div>
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-sel-multi"><label for="f-sel-multi">여러 개 동시 선택 가능</label>
        </div>
      </div>
      ${this._adv(`
        <div class="hint" style="margin-bottom:8px">기본 선택값은 각 항목 행 오른쪽 ★ 버튼으로 지정하세요.</div>
        ${field('name 속성', inp('f-sel-name', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secButton(): string {
    return `<div class="specific-section" id="sec-button">
      ${field('버튼 텍스트', inp('f-btn-text', '예) 제출, 확인, 다음'))}
      <div class="field">
        <label>버튼 역할</label>
        <div class="btn-role">
          <label><input type="radio" name="btn-type" value="submit"> 양식 제출</label>
          <label><input type="radio" name="btn-type" value="reset">  내용 초기화</label>
          <label><input type="radio" name="btn-type" value="button" checked> 일반 버튼</label>
        </div>
      </div>
      ${this._adv(`
        <div class="field">
          <label>버튼 색상 스타일</label>
          ${sel('f-btn-style', [['default','기본 (회색)'],['primary','강조 (파랑)'],['danger','경고 (빨강)']])}
        </div>
        ${field('name 속성', inp('f-btn-name', '자동 생성'))}
      `)}
    </div>`;
  }

  private _secDate(): string {
    return `<div class="specific-section" id="sec-date">
      ${field('항목 이름', inp('f-date-label', '예) 생년월일, 예약일…'))}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-date-req"><label for="f-date-req">필수 입력 항목으로 표시</label>
        </div>
      </div>
      ${this._adv(`
        ${field('선택 가능한 시작일', inp('f-date-min', 'YYYY-MM-DD'))}
        ${field('선택 가능한 종료일', inp('f-date-max', 'YYYY-MM-DD'))}
        ${field('기본 날짜', inp('f-date-val', 'YYYY-MM-DD'))}
        ${field('name 속성', inp('f-date-name', '자동 생성'))}
      `)}
    </div>`;
  }

  // ── 타입 카드 ──────────────────────────────────────────────────────────

  private _buildTypeCards(): void {
    const grid = this.shadow.getElementById('type-grid')!;
    for (const type of TYPES) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'type-card';
      card.dataset.type = type;
      card.innerHTML = `${ICONS[type]}<span>${TYPE_LABELS[type]}</span>`;
      card.addEventListener('click', (e) => { e.stopPropagation(); this._setType(type); });
      grid.appendChild(card);
    }
  }

  // ── 이벤트 바인딩 ─────────────────────────────────────────────────────

  private _bindEvents(): void {
    this.shadow.querySelector('.x-btn')!.addEventListener('click', () => this.close());
    this.shadow.getElementById('btn-cancel')!.addEventListener('click', () => this.close());
    this.shadow.getElementById('btn-confirm')!.addEventListener('click', () => this._confirm());

    this.shadow.getElementById('add-radio-opt')!.addEventListener('click', () => {
      this._addRadioRow();
      this._updatePreview();
    });
    this.shadow.getElementById('add-select-opt')!.addEventListener('click', () => {
      this._addSelectRow();
      this._updatePreview();
    });

    // 추가 설정 접기/펼치기
    this.shadow.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-adv]') as HTMLElement | null;
      if (!btn) return;
      btn.classList.toggle('open');
      const body = btn.nextElementSibling as HTMLElement | null;
      body?.classList.toggle('show');
    });

    // 배경(호스트 엘리먼트 자체) 클릭 시만 닫기.
    // Shadow DOM 이벤트 리타깃팅 때문에 e.target은 항상 호스트가 되므로
    // composedPath()[0] (실제 클릭된 엘리먼트)이 호스트 자신일 때만 닫는다.
    this.addEventListener('click', (e) => {
      if (e.composedPath()[0] === this) this.close();
    });

    // 실시간 미리보기: input 이벤트 전파
    this.shadow.addEventListener('input', () => this._updatePreview());
    this.shadow.addEventListener('change', () => this._updatePreview());
  }

  // ── 유형 전환 ─────────────────────────────────────────────────────────

  private _setType(type: ControlType): void {
    this.activeType = type;
    this.shadow.querySelectorAll<HTMLElement>('.type-card').forEach(c => {
      c.classList.toggle('active', c.dataset.type === type);
    });
    this.shadow.querySelectorAll<HTMLElement>('.specific-section').forEach(s => {
      s.style.display = s.id === `sec-${type}` ? 'block' : 'none';
    });
    this._updatePreview();
  }

  // ── 옵션 행 추가 ──────────────────────────────────────────────────────

  private _addRadioRow(opt?: RadioOption): void {
    const list = this.shadow.getElementById('radio-opts')!;
    const row = document.createElement('div');
    row.className = 'opt-row';

    const inp1 = document.createElement('input');
    inp1.type = 'text'; inp1.className = 'opt-label';
    inp1.placeholder = '선택지 텍스트';
    inp1.value = opt?.label ?? '';
    inp1.addEventListener('input', () => this._updatePreview());

    const defBtn = document.createElement('button');
    defBtn.type = 'button';
    defBtn.title = '기본 선택';
    defBtn.style.cssText = 'flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;';
    defBtn.textContent = '★';
    if (opt?.defaultChecked) { defBtn.style.color = '#f59e0b'; defBtn.dataset.default = '1'; }
    defBtn.addEventListener('click', () => {
      // 같은 목록의 다른 ★ 초기화
      list.querySelectorAll<HTMLButtonElement>('button[title="기본 선택"]').forEach(b => {
        b.style.color = '#d1d5db'; delete b.dataset.default;
      });
      defBtn.style.color = '#f59e0b'; defBtn.dataset.default = '1';
      this._updatePreview();
    });

    const del = document.createElement('button');
    del.type = 'button'; del.className = 'del-btn'; del.title = '삭제'; del.textContent = '✕';
    del.addEventListener('click', () => { row.remove(); this._updatePreview(); });

    row.appendChild(inp1);
    row.appendChild(defBtn);
    row.appendChild(del);
    list.appendChild(row);
  }

  private _addSelectRow(opt?: SelectOption): void {
    const list = this.shadow.getElementById('select-opts')!;
    const row = document.createElement('div');
    row.className = 'opt-row';

    const inp1 = document.createElement('input');
    inp1.type = 'text'; inp1.className = 'opt-label';
    inp1.placeholder = '항목 텍스트';
    inp1.value = opt?.label ?? '';
    inp1.addEventListener('input', () => this._updatePreview());

    const defBtn = document.createElement('button');
    defBtn.type = 'button';
    defBtn.title = '기본 선택';
    defBtn.style.cssText = 'flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;';
    defBtn.textContent = '★';
    if (opt?.selected) { defBtn.style.color = '#f59e0b'; defBtn.dataset.default = '1'; }
    defBtn.addEventListener('click', () => {
      list.querySelectorAll<HTMLButtonElement>('button[title="기본 선택"]').forEach(b => {
        b.style.color = '#d1d5db'; delete b.dataset.default;
      });
      defBtn.style.color = '#f59e0b'; defBtn.dataset.default = '1';
      this._updatePreview();
    });

    const del = document.createElement('button');
    del.type = 'button'; del.className = 'del-btn'; del.title = '삭제'; del.textContent = '✕';
    del.addEventListener('click', () => { row.remove(); this._updatePreview(); });

    row.appendChild(inp1);
    row.appendChild(defBtn);
    row.appendChild(del);
    list.appendChild(row);
  }

  // ── 필드 초기화 ───────────────────────────────────────────────────────

  private _clearFields(): void {
    const set = (id: string, v: string) => {
      const el = this.shadow.getElementById(id) as HTMLInputElement | null;
      if (el) el.value = v;
    };
    const chk = (id: string, v: boolean) => {
      const el = this.shadow.getElementById(id) as HTMLInputElement | null;
      if (el) el.checked = v;
    };

    set('f-label', ''); set('f-text-ph', ''); set('f-text-ml', ''); set('f-text-val', ''); set('f-name', '');
    set('f-ta-label', ''); set('f-ta-ph', ''); set('f-ta-rows', '4'); set('f-ta-name', '');
    set('f-cb-lbl', ''); set('f-cb-name', '');
    set('f-radio-label', ''); set('f-radio-gn', '');
    set('f-sel-label', ''); set('f-sel-name', '');
    set('f-btn-text', ''); set('f-btn-name', '');
    set('f-date-label', ''); set('f-date-min', ''); set('f-date-max', ''); set('f-date-val', ''); set('f-date-name', '');

    chk('f-aria-req', false); chk('f-ta-req', false); chk('f-cb-checked', false);
    chk('f-cb-req', false); chk('f-sel-multi', false); chk('f-date-req', false);

    const btnType = this.shadow.querySelector<HTMLInputElement>('input[name="btn-type"][value="button"]');
    if (btnType) btnType.checked = true;
    const btnStyle = this.shadow.getElementById('f-btn-style') as HTMLSelectElement | null;
    if (btnStyle) btnStyle.value = 'default';

    this.shadow.getElementById('radio-opts')!.innerHTML = '';
    this._addRadioRow(); this._addRadioRow();
    this.shadow.getElementById('select-opts')!.innerHTML = '';
    this._addSelectRow(); this._addSelectRow();

    // 추가 설정 닫기
    this.shadow.querySelectorAll<HTMLElement>('[data-adv]').forEach(btn => {
      btn.classList.remove('open');
      const body = btn.nextElementSibling as HTMLElement | null;
      body?.classList.remove('show');
    });
  }

  private _fillFields(c: FormControl): void {
    this._clearFields();
    switch (c.type) {
      case 'text':
        this._sv('f-label', c.label);
        this._sv('f-text-ph', c.placeholder);
        this._sv('f-text-ml', c.maxlength != null ? String(c.maxlength) : '');
        this._sv('f-text-val', c.value);
        this._sv('f-name', c.name);
        this._sc('f-aria-req', c.ariaRequired);
        break;
      case 'textarea':
        this._sv('f-ta-label', c.label);
        this._sv('f-ta-ph', c.placeholder);
        this._sv('f-ta-rows', String(c.rows ?? 4));
        this._sv('f-ta-name', c.name);
        this._sc('f-ta-req', c.ariaRequired);
        break;
      case 'checkbox':
        this._sv('f-cb-lbl', c.checkLabel ?? c.label);
        this._sv('f-cb-name', c.name);
        this._sc('f-cb-checked', c.checked);
        this._sc('f-cb-req', c.ariaRequired);
        break;
      case 'radio':
        this._sv('f-radio-label', c.label);
        this._sv('f-radio-gn', c.groupName);
        this.shadow.getElementById('radio-opts')!.innerHTML = '';
        (c.options ?? []).forEach(o => this._addRadioRow(o));
        if (!(c.options?.length)) { this._addRadioRow(); this._addRadioRow(); }
        break;
      case 'select':
        this._sv('f-sel-label', c.label);
        this._sv('f-sel-name', c.name);
        this._sc('f-sel-multi', c.multiple);
        this.shadow.getElementById('select-opts')!.innerHTML = '';
        (c.options ?? []).forEach(o => this._addSelectRow(o));
        if (!(c.options?.length)) { this._addSelectRow(); this._addSelectRow(); }
        break;
      case 'button':
        this._sv('f-btn-text', c.text);
        this._sv('f-btn-name', c.name);
        const t = this.shadow.querySelector<HTMLInputElement>(`input[name="btn-type"][value="${c.btnType ?? 'button'}"]`);
        if (t) t.checked = true;
        const s = this.shadow.getElementById('f-btn-style') as HTMLSelectElement | null;
        if (s) s.value = c.btnStyle ?? 'default';
        break;
      case 'date':
        this._sv('f-date-label', c.label);
        this._sv('f-date-min', c.min);
        this._sv('f-date-max', c.max);
        this._sv('f-date-val', c.value);
        this._sv('f-date-name', c.name);
        this._sc('f-date-req', c.ariaRequired);
        break;
    }
  }

  private _sv(id: string, v?: string): void {
    const el = this.shadow.getElementById(id) as HTMLInputElement | null;
    if (el && v != null) el.value = v;
  }
  private _sc(id: string, v?: boolean): void {
    const el = this.shadow.getElementById(id) as HTMLInputElement | null;
    if (el) el.checked = v ?? false;
  }

  // ── config 수집 ───────────────────────────────────────────────────────

  private _v(id: string): string {
    return ((this.shadow.getElementById(id) as HTMLInputElement | null)?.value ?? '').trim();
  }
  private _c(id: string): boolean {
    return (this.shadow.getElementById(id) as HTMLInputElement | null)?.checked ?? false;
  }

  private _buildConfig(): FormControl {
    const id = generateControlId(this.activeType);

    switch (this.activeType) {
      case 'text': return {
        type: 'text',
        label:         this._v('f-label')    || undefined,
        name:          this._v('f-name')     || undefined,
        id,
        placeholder:   this._v('f-text-ph') || undefined,
        maxlength:     Number(this._v('f-text-ml')) || undefined,
        value:         this._v('f-text-val') || undefined,
        ariaRequired:  this._c('f-aria-req') || undefined,
        autoLabel:     true,
      };
      case 'textarea': return {
        type: 'textarea',
        label:        this._v('f-ta-label') || undefined,
        name:         this._v('f-ta-name')  || undefined,
        id,
        placeholder:  this._v('f-ta-ph')   || undefined,
        rows:         Number(this._v('f-ta-rows')) || 4,
        ariaRequired: this._c('f-ta-req')  || undefined,
        autoLabel:    true,
      };
      case 'checkbox': return {
        type: 'checkbox',
        checkLabel:   this._v('f-cb-lbl')  || undefined,
        name:         this._v('f-cb-name') || undefined,
        id,
        checked:      this._c('f-cb-checked') || undefined,
        ariaRequired: this._c('f-cb-req')  || undefined,
      };
      case 'radio': {
        const opts: RadioOption[] = [];
        this.shadow.getElementById('radio-opts')!.querySelectorAll<HTMLElement>('.opt-row').forEach(row => {
          const lbl = (row.querySelector('.opt-label') as HTMLInputElement).value.trim();
          const defBtn = row.querySelector<HTMLButtonElement>('button[title="기본 선택"]');
          const isDef  = !!defBtn?.dataset.default;
          if (lbl) opts.push({ label: lbl, value: lbl, defaultChecked: isDef || undefined });
        });
        const gn = this._v('f-radio-gn') || id;
        return {
          type: 'radio',
          label:     this._v('f-radio-label') || undefined,
          name:      gn,
          groupName: gn,
          id,
          options:   opts,
          autoLabel: true,
        };
      }
      case 'select': {
        const opts: SelectOption[] = [];
        this.shadow.getElementById('select-opts')!.querySelectorAll<HTMLElement>('.opt-row').forEach(row => {
          const lbl = (row.querySelector('.opt-label') as HTMLInputElement).value.trim();
          const defBtn = row.querySelector<HTMLButtonElement>('button[title="기본 선택"]');
          const isSel  = !!defBtn?.dataset.default;
          if (lbl) opts.push({ label: lbl, value: lbl, selected: isSel || undefined });
        });
        return {
          type: 'select',
          label:    this._v('f-sel-label') || undefined,
          name:     this._v('f-sel-name')  || undefined,
          id,
          multiple: this._c('f-sel-multi') || undefined,
          options:  opts,
          autoLabel: true,
        };
      }
      case 'button': {
        const btnType = (this.shadow.querySelector<HTMLInputElement>('input[name="btn-type"]:checked')?.value ?? 'button') as ButtonType;
        const btnStyle = ((this.shadow.getElementById('f-btn-style') as HTMLSelectElement | null)?.value ?? 'default') as ButtonStyle;
        return {
          type: 'button',
          text:     this._v('f-btn-text') || '버튼',
          name:     this._v('f-btn-name') || undefined,
          id,
          btnType,
          btnStyle,
        };
      }
      case 'date': return {
        type: 'date',
        label:        this._v('f-date-label') || undefined,
        name:         this._v('f-date-name')  || undefined,
        id,
        min:          this._v('f-date-min')   || undefined,
        max:          this._v('f-date-max')   || undefined,
        value:        this._v('f-date-val')   || undefined,
        ariaRequired: this._c('f-date-req')   || undefined,
        autoLabel:    true,
      };
    }
  }

  // ── 미리보기 ──────────────────────────────────────────────────────────

  private _updatePreview(): void {
    const box = this.shadow.getElementById('preview-box');
    if (!box) return;
    try {
      const config = this._buildConfig();
      const html   = buildFormControlHtml(config);
      box.innerHTML = html;
    } catch { box.innerHTML = ''; }
  }

  // ── 확인 ─────────────────────────────────────────────────────────────

  private _confirm(): void {
    const config = this._buildConfig();
    this.dispatchEvent(new CustomEvent('poa-form-insert', {
      bubbles: true, composed: true,
      detail: { config },
    }));
    this.close();
  }
}
