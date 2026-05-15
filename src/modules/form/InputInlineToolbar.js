/**
 * 선택된 input 위에 인라인 툴바를 표시한다.
 *
 * 표 안 input 툴바: [너비 px] [셀에 맞춤] [에디터 너비에 맞춤] [정렬▼]
 * 표 밖 input 툴바: [너비 px] [에디터 너비에 맞춤] [정렬▼]
 *
 * 정렬 드롭다운:
 *   글자 정렬 그룹 — input.style.textAlign 조작
 *   위치 정렬 그룹 — 표 안: td.style.textAlign / 표 밖: margin + display:block
 *
 * - position:fixed + document.body → contentEl 레이아웃에 영향 없음
 * - contentEl scroll & window scroll 모두 위치 동기화
 */
export class InputInlineToolbar {
    cb;
    toolbar = null;
    input = null;
    contentEl = null;
    wInput = null;
    alignSel = null;
    constructor(callbacks = {}) {
        this.cb = callbacks;
    }
    // ── 공개 API ─────────────────────────────────────────────────────────────────
    show(input, contentEl) {
        this.hide();
        this.input = input;
        this.contentEl = contentEl;
        this._createToolbar();
        contentEl.addEventListener('scroll', this.onScroll);
        window.addEventListener('scroll', this.onScroll, true);
    }
    hide() {
        this.toolbar?.remove();
        this.contentEl?.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('scroll', this.onScroll, true);
        this.toolbar = null;
        this.input = null;
        this.contentEl = null;
        this.wInput = null;
        this.alignSel = null;
    }
    /** input 너비가 외부에서 변경됐을 때 입력값과 위치를 동기화한다 */
    syncPosition() {
        this._updatePosition();
        this._syncValues();
    }
    // ── 툴바 생성 ─────────────────────────────────────────────────────────────────
    _createToolbar() {
        if (!this.input || !this.contentEl)
            return;
        const isInCell = !!this.input.closest('td, th');
        const bar = document.createElement('div');
        bar.dataset.poaTemp = 'true';
        bar.style.cssText =
            'position:fixed;display:flex;align-items:center;gap:6px;' +
                'background:#fff;border:1px solid #ccc;border-radius:4px;' +
                'box-shadow:0 2px 8px rgba(0,0,0,.15);padding:4px 8px;' +
                'font-size:12px;white-space:nowrap;z-index:99998;';
        bar.addEventListener('mousedown', (e) => e.stopPropagation());
        // ── 너비 섹션 ────────────────────────────────────────────────────
        bar.appendChild(this._makeLabel('너비'));
        const wInput = document.createElement('input');
        wInput.type = 'number';
        wInput.min = '60';
        wInput.max = '9999';
        wInput.style.cssText = 'width:60px;padding:1px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
        const curW = Math.round(this.input.getBoundingClientRect().width) || 100;
        wInput.value = String(curW);
        this.wInput = wInput;
        bar.appendChild(wInput);
        bar.appendChild(this._makeLabel('px'));
        wInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this._applyWidth();
            }
        });
        wInput.addEventListener('blur', () => this._applyWidth());
        bar.appendChild(this._makeSep());
        // ── 셀에 맞춤 버튼 (표 안 input 전용) ───────────────────────────
        if (isInCell) {
            const fitCellBtn = document.createElement('button');
            fitCellBtn.textContent = '셀에 맞춤';
            fitCellBtn.style.cssText = this._btnStyle();
            fitCellBtn.addEventListener('click', () => this._applyCellFit());
            bar.appendChild(fitCellBtn);
        }
        // ── 에디터 너비에 맞춤 버튼 ─────────────────────────────────────
        const fitEditorBtn = document.createElement('button');
        fitEditorBtn.textContent = '에디터 너비에 맞춤';
        fitEditorBtn.style.cssText = this._btnStyle();
        fitEditorBtn.addEventListener('click', () => this._applyEditorFit());
        bar.appendChild(fitEditorBtn);
        bar.appendChild(this._makeSep());
        // ── 정렬 드롭다운 ────────────────────────────────────────────────
        bar.appendChild(this._makeLabel('정렬'));
        const alignSel = document.createElement('select');
        alignSel.style.cssText = 'padding:1px;border:1px solid #ccc;border-radius:3px;font-size:12px;';
        const textGroup = document.createElement('optgroup');
        textGroup.label = '글자 정렬';
        for (const [val, lbl] of [
            ['text-left', '왼쪽'],
            ['text-center', '가운데'],
            ['text-right', '오른쪽'],
        ]) {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = lbl;
            textGroup.appendChild(opt);
        }
        alignSel.appendChild(textGroup);
        const posGroup = document.createElement('optgroup');
        posGroup.label = '위치 정렬';
        for (const [val, lbl] of [
            ['pos-left', '왼쪽 배치'],
            ['pos-center', '가운데 배치'],
            ['pos-right', '오른쪽 배치'],
        ]) {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = lbl;
            posGroup.appendChild(opt);
        }
        alignSel.appendChild(posGroup);
        alignSel.value = this._getCurrentAlignValue();
        alignSel.addEventListener('change', () => this._applyAlign(alignSel.value));
        this.alignSel = alignSel;
        bar.appendChild(alignSel);
        this.toolbar = bar;
        document.body.appendChild(bar);
        this._updatePosition();
    }
    // ── 적용 함수 ─────────────────────────────────────────────────────────────────
    /** 너비 입력값을 컨테이너(셀/에디터) 너비로 클램핑하여 적용한다 */
    _applyWidth() {
        if (!this.input || !this.wInput || !this.contentEl)
            return;
        const raw = Math.max(60, parseFloat(this.wInput.value) || 60);
        const cell = this.input.closest('td, th');
        const maxRaw = cell ? cell.offsetWidth : this.contentEl.clientWidth;
        const maxW = maxRaw > 0 ? maxRaw - 16 : 9999;
        const v = Math.min(raw, Math.max(60, maxW));
        this.wInput.value = String(Math.round(v));
        this.input.style.width = `${Math.round(v)}px`;
        this._updatePosition();
        this.cb.onResized?.();
    }
    /** 셀에 맞춤 (표 안 전용): width:100% */
    _applyCellFit() {
        if (!this.input)
            return;
        this.input.style.width = '100%';
        this.input.style.maxWidth = '100%';
        this._syncValues();
        this._updatePosition();
        this.cb.onResized?.();
    }
    /** 에디터 너비에 맞춤: contentEl 기준 너비 적용 */
    _applyEditorFit() {
        if (!this.input || !this.contentEl)
            return;
        const w = this.contentEl.clientWidth > 0 ? this.contentEl.clientWidth - 32 : 200;
        this.input.style.width = `${w}px`;
        this.input.style.maxWidth = `${w}px`;
        this._syncValues();
        this._updatePosition();
        this.cb.onResized?.();
    }
    /**
     * 정렬 적용.
     *
     * text-left/center/right: input.style.textAlign (글자 정렬)
     * pos-left/center/right:
     *   표 안 → td.style.textAlign
     *   표 밖 → input margin + display:block (위치 배치)
     */
    _applyAlign(value) {
        if (!this.input)
            return;
        const [type, dir] = value.split('-');
        const input = this.input;
        if (type === 'text') {
            input.style.textAlign = dir === 'left' ? '' : dir;
        }
        else if (type === 'pos') {
            const cell = input.closest('td, th');
            if (cell) {
                cell.style.textAlign = dir === 'left' ? '' : dir === 'center' ? 'center' : 'right';
            }
            else {
                input.style.display = 'block';
                if (dir === 'left') {
                    input.style.marginLeft = '0';
                    input.style.marginRight = 'auto';
                }
                else if (dir === 'center') {
                    input.style.marginLeft = 'auto';
                    input.style.marginRight = 'auto';
                }
                else {
                    input.style.marginLeft = 'auto';
                    input.style.marginRight = '0';
                }
            }
        }
        this.cb.onResized?.();
    }
    // ── 값 동기화 ─────────────────────────────────────────────────────────────────
    _syncValues() {
        if (!this.input || !this.wInput || !this.alignSel)
            return;
        const w = Math.round(this.input.getBoundingClientRect().width) || 100;
        this.wInput.value = String(w);
        this.alignSel.value = this._getCurrentAlignValue();
    }
    /**
     * 현재 input의 정렬 상태를 드롭다운 값으로 읽어 반환한다.
     *
     * 우선순위: textAlign(글자) → td textAlign(위치·표 안) → margin(위치·표 밖)
     */
    _getCurrentAlignValue() {
        if (!this.input)
            return 'text-left';
        const input = this.input;
        // 글자 정렬 (center/right 만 명시; 기본은 left)
        const ta = input.style.textAlign;
        if (ta === 'center')
            return 'text-center';
        if (ta === 'right')
            return 'text-right';
        // 위치 정렬 — 표 안
        const cell = input.closest('td, th');
        if (cell && cell.style.textAlign) {
            const ca = cell.style.textAlign;
            if (ca === 'center')
                return 'pos-center';
            if (ca === 'right')
                return 'pos-right';
            return 'pos-left';
        }
        // 위치 정렬 — 표 밖 (margin 기반)
        const ml = input.style.marginLeft;
        const mr = input.style.marginRight;
        if (ml === 'auto' && mr === 'auto')
            return 'pos-center';
        if (ml === 'auto')
            return 'pos-right';
        if (mr === 'auto')
            return 'pos-left';
        return 'text-left';
    }
    // ── 위치 동기화 ───────────────────────────────────────────────────────────────
    /**
     * 툴바를 input 위에 배치한다.
     * - 상단 부족: input 아래에 표시
     * - 우측 초과: 왼쪽으로 당김
     */
    _updatePosition() {
        const bar = this.toolbar;
        const inp = this.input;
        if (!bar || !inp)
            return;
        const ir = inp.getBoundingClientRect();
        const barH = bar.offsetHeight || 32;
        const barW = bar.offsetWidth || 200;
        // 상단 — input 위쪽에 우선 배치, 공간 부족 시 아래에 표시
        let top = ir.top - barH - 4;
        if (top < 4)
            top = ir.bottom + 4;
        // 좌측 — input 좌측에 맞추되 화면 우측 밖으로 나가면 당김
        let left = ir.left;
        const maxLeft = window.innerWidth - barW - 4;
        if (left > maxLeft)
            left = maxLeft;
        if (left < 4)
            left = 4;
        bar.style.top = `${top}px`;
        bar.style.left = `${left}px`;
    }
    onScroll = () => { this._updatePosition(); };
    // ── DOM 헬퍼 ─────────────────────────────────────────────────────────────────
    _makeLabel(text) {
        const s = document.createElement('span');
        s.textContent = text;
        s.style.color = '#555';
        return s;
    }
    _makeSep() {
        const d = document.createElement('div');
        d.style.cssText = 'width:1px;height:16px;background:#ddd;margin:0 2px;flex-shrink:0;';
        return d;
    }
    _btnStyle() {
        return ('border:1px solid #ccc;border-radius:3px;background:#f5f5f5;' +
            'padding:1px 8px;cursor:pointer;font-size:12px;color:#333;white-space:nowrap;');
    }
}
