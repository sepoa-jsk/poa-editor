const STYLE = `
*, *::before, *::after { box-sizing: border-box; }

:host { display:none; position:fixed; inset:0; z-index:10000; align-items:center; justify-content:center; }
:host([open]) { display:flex; background:rgba(0,0,0,.45); }

.dlg {
  background:#fff; border-radius:12px; width:min(380px,92vw);
  box-shadow:0 8px 32px rgba(0,0,0,.28);
  display:flex; flex-direction:column; overflow:hidden;
}

/* 헤더 */
.hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 20px 12px; border-bottom:1px solid #f3f4f6;
}
.hdr h3 { margin:0; font-size:15px; font-weight:700; color:#111827; }
.x-btn {
  background:none; border:none; font-size:20px; cursor:pointer;
  color:#9ca3af; line-height:1; padding:0 4px; border-radius:4px;
}
.x-btn:hover { color:#374151; background:#f3f4f6; }

/* 바디 */
.body { padding:18px 20px 4px; }
.field { margin-bottom:16px; }
.field > label {
  display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:6px;
}
.hint { font-size:11px; color:#9ca3af; margin-top:3px; }

/* 너비 라디오 그룹 */
.w-group { display:flex; flex-direction:column; gap:8px; }
.w-row { display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; }
.w-row input[type=radio] { accent-color:#2563eb; cursor:pointer; flex-shrink:0; }
.w-row input[type=number] {
  width:72px; border:1.5px solid #e5e7eb; border-radius:6px;
  padding:5px 8px; font-size:13px; color:#111827; outline:none;
}
.w-row input[type=number]:focus { border-color:#2563eb; }
.w-row input[type=number]:disabled { background:#f9fafb; color:#aaa; }

/* select */
select {
  width:100%; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:7px 10px; font-size:13px; color:#111827; outline:none;
  background:#fff; cursor:pointer;
}
select:focus { border-color:#2563eb; }

/* text input */
input[type=text] {
  width:100%; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:7px 12px; font-size:13px; color:#111827; outline:none;
}
input[type=text]:focus { border-color:#2563eb; }

/* 체크행 */
.chk-row { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.chk-row input[type=checkbox] { width:15px; height:15px; accent-color:#2563eb; cursor:pointer; }
.chk-row label { font-size:13px; color:#374151; cursor:pointer; }

/* 푸터 */
.ftr {
  display:flex; justify-content:flex-end; gap:8px;
  padding:14px 20px; border-top:1px solid #f3f4f6;
}
.btn-cancel {
  padding:7px 18px; border:1.5px solid #e5e7eb; border-radius:8px;
  background:#fff; cursor:pointer; font-size:13px; color:#374151; font-weight:500;
}
.btn-cancel:hover { background:#f9fafb; }
.btn-apply {
  padding:7px 22px; border:none; border-radius:8px;
  background:#2563eb; cursor:pointer; font-size:13px; color:#fff; font-weight:600;
}
.btn-apply:hover { background:#1d4ed8; }
`;
export class PoaInputPropertyDialog extends HTMLElement {
    shadow;
    targetInput = null;
    connectedCallback() {
        if (this.shadow)
            return;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${STYLE}</style>${this._tpl()}`;
        this._bindEvents();
    }
    open(input) {
        if (!this.shadow)
            this.connectedCallback();
        this.targetInput = input;
        this._populate(input);
        this.setAttribute('open', '');
    }
    close() { this.removeAttribute('open'); }
    // ── 템플릿 ──────────────────────────────────────────────────────────────────
    _tpl() {
        return `<div class="dlg">
  <div class="hdr">
    <h3>입력 요소 속성</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="field">
      <label>너비</label>
      <div class="w-group">
        <label class="w-row">
          <input type="radio" name="w-mode" value="full"> 셀에 맞춤 (100%)
        </label>
        <label class="w-row">
          <input type="radio" name="w-mode" value="px">
          <input type="number" id="w-px" min="40" max="2000" placeholder="200"> px
        </label>
        <label class="w-row">
          <input type="radio" name="w-mode" value="pct">
          <input type="number" id="w-pct" min="10" max="100" placeholder="100"> %
        </label>
      </div>
    </div>

    <div class="field">
      <label>정렬 <span style="font-weight:400;color:#9ca3af">(셀 안 input 위치)</span></label>
      <select id="align">
        <option value="left">왼쪽</option>
        <option value="center">가운데</option>
        <option value="right">오른쪽</option>
      </select>
    </div>

    <div class="field">
      <label>텍스트 정렬</label>
      <select id="text-align">
        <option value="">왼쪽 (기본)</option>
        <option value="center">가운데</option>
        <option value="right">오른쪽</option>
      </select>
    </div>

    <div class="field">
      <label>안내 문구 (placeholder)</label>
      <input type="text" id="placeholder" placeholder="입력창 안에 표시되는 도움말">
    </div>

    <div class="chk-row">
      <input type="checkbox" id="required">
      <label for="required">필수 입력</label>
    </div>
    <div class="chk-row">
      <input type="checkbox" id="disabled">
      <label for="disabled">비활성화</label>
    </div>
  </div>
  <div class="ftr">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-apply"  id="btn-apply">적용</button>
  </div>
</div>`;
    }
    // ── 현재 input 속성으로 필드 채우기 ────────────────────────────────────────
    _populate(input) {
        const s = this.shadow;
        const w = input.style.width;
        // 너비 모드 감지
        const radios = s.querySelectorAll('input[name="w-mode"]');
        const wpx = s.getElementById('w-px');
        const wpct = s.getElementById('w-pct');
        if (!w || w === '100%') {
            radios[0].checked = true;
        }
        else if (w.endsWith('px')) {
            radios[1].checked = true;
            wpx.value = parseFloat(w).toString();
        }
        else if (w.endsWith('%')) {
            radios[2].checked = true;
            wpct.value = parseFloat(w).toString();
        }
        else {
            radios[0].checked = true;
        }
        wpx.disabled = !radios[1].checked;
        wpct.disabled = !radios[2].checked;
        // 정렬 (셀 내 위치)
        const ml = input.style.marginLeft;
        const mr = input.style.marginRight;
        const alignSel = s.getElementById('align');
        if (ml === 'auto' && mr === 'auto')
            alignSel.value = 'center';
        else if (ml === 'auto')
            alignSel.value = 'right';
        else
            alignSel.value = 'left';
        // 텍스트 정렬
        s.getElementById('text-align').value = input.style.textAlign || '';
        // placeholder
        const ph = s.getElementById('placeholder');
        ph.value = input.placeholder ?? '';
        // required / disabled
        s.getElementById('required').checked = input.required ?? false;
        s.getElementById('disabled').checked = input.disabled ?? false;
    }
    // ── 이벤트 바인딩 ───────────────────────────────────────────────────────────
    _bindEvents() {
        this.shadow.querySelector('.x-btn').addEventListener('click', () => this.close());
        this.shadow.getElementById('btn-cancel').addEventListener('click', () => this.close());
        this.shadow.getElementById('btn-apply').addEventListener('click', () => this._apply());
        // 너비 라디오 → 숫자 필드 활성화 토글
        this.shadow.addEventListener('change', (e) => {
            const t = e.target;
            if (t.name === 'w-mode') {
                const v = t.value;
                this.shadow.getElementById('w-px').disabled = (v !== 'px');
                this.shadow.getElementById('w-pct').disabled = (v !== 'pct');
            }
        });
        this.addEventListener('click', (e) => {
            if (e.composedPath()[0] === this)
                this.close();
        });
    }
    // ── 적용 ────────────────────────────────────────────────────────────────────
    _apply() {
        const input = this.targetInput;
        if (!input) {
            this.close();
            return;
        }
        const s = this.shadow;
        // 너비
        const wMode = (s.querySelector('input[name="w-mode"]:checked'))?.value ?? 'full';
        if (wMode === 'full') {
            input.style.width = '100%';
            input.style.maxWidth = '100%';
        }
        else if (wMode === 'px') {
            const v = parseFloat(s.getElementById('w-px').value);
            if (v > 0)
                input.style.width = `${v}px`;
        }
        else {
            const v = parseFloat(s.getElementById('w-pct').value);
            if (v > 0)
                input.style.width = `${v}%`;
        }
        // 정렬 (셀 내 위치)
        const align = s.getElementById('align').value;
        input.style.display = 'block';
        input.style.marginLeft = align === 'center' || align === 'right' ? 'auto' : '';
        input.style.marginRight = align === 'center' || align === 'left' ? 'auto' : '';
        if (align === 'left') {
            input.style.marginLeft = '';
            input.style.marginRight = 'auto';
        }
        if (align === 'right') {
            input.style.marginLeft = 'auto';
            input.style.marginRight = '';
        }
        // 텍스트 정렬
        input.style.textAlign = s.getElementById('text-align').value;
        // placeholder
        input.placeholder =
            s.getElementById('placeholder').value;
        // required / disabled
        input.required =
            s.getElementById('required').checked;
        input.disabled =
            s.getElementById('disabled').checked;
        this.dispatchEvent(new CustomEvent('poa-input-props-apply', {
            bubbles: true, composed: true, detail: { el: input },
        }));
        this.close();
    }
}
