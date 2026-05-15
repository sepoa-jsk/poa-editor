import { InputResizer } from './InputResizer.js';
import { InputInlineToolbar } from './InputInlineToolbar.js';
/**
 * contenteditable 내 폼 컨트롤 편집기.
 *
 * 삽입 경로에 따른 DOM 구조 차이:
 *   표 안 삽입 → <td><input data-poa-form="..."></td>   (래퍼 없음)
 *   표 밖 삽입 → <div class="poa-form-group" data-poa-form="..."><label/><input/></div>
 *
 * 클릭 감지 통일 전략:
 *   1. 클릭 대상이 input/textarea(data-poa-form) 또는 poa-form-group 내부 input/textarea
 *      → InputResizer + InputInlineToolbar 활성화
 *   2. 그 외 poa-form-group (체크박스·라디오·버튼 등)
 *      → 그룹만 선택
 */
export class FormControlEditor {
    contentEl;
    selectedEl = null;
    selectedInput = null;
    ctxMenu = null;
    inputResizer = new InputResizer();
    inputToolbar;
    clickHandler = (e) => this._onClick(e);
    ctxHandler = (e) => this._onContextMenu(e);
    docClickHandler = (e) => this._onDocClick(e);
    constructor(contentEl) {
        this.contentEl = contentEl;
        this.inputToolbar = new InputInlineToolbar({
            onResized: () => this._dispatchResized(),
        });
    }
    attach() {
        this.contentEl.addEventListener('click', this.clickHandler);
        this.contentEl.addEventListener('contextmenu', this.ctxHandler);
        document.addEventListener('click', this.docClickHandler);
    }
    detach() {
        this.contentEl.removeEventListener('click', this.clickHandler);
        this.contentEl.removeEventListener('contextmenu', this.ctxHandler);
        document.removeEventListener('click', this.docClickHandler);
        this.deselectAll();
    }
    getSelected() { return this.selectedEl; }
    getSelectedInput() { return this.selectedInput; }
    getConfig(el) {
        const group = el.closest('.poa-form-group');
        const src = group ?? (el.dataset.poaForm ? el : null);
        if (!src?.dataset.poaForm)
            return null;
        try {
            return JSON.parse(src.dataset.poaForm);
        }
        catch {
            return null;
        }
    }
    deselectAll() {
        this.selectedEl?.classList.remove('poa-form-selected');
        this.selectedEl = null;
        if (this.selectedInput) {
            this.selectedInput.classList.remove('poa-input-selected');
            this.selectedInput = null;
        }
        this.inputResizer.detach();
        this.inputToolbar.hide();
        this._hideCtxMenu();
    }
    deselect() { this.deselectAll(); }
    // ── 클릭 핸들러 ─────────────────────────────────────────────────────────────
    _onClick(e) {
        const target = e.target;
        const group = target.closest('.poa-form-group');
        // 표 안/밖 공통으로 리사이즈 가능한 input/textarea 탐색
        const ri = this._findResizableInput(target);
        if (ri) {
            // input / textarea — 리사이저 + 툴바 활성화
            e.stopPropagation();
            this.deselectAll();
            if (group) {
                this.selectedEl = group;
                group.classList.add('poa-form-selected');
            }
            this.selectedInput = ri;
            ri.classList.add('poa-input-selected');
            this.inputResizer.attach(ri, () => this._dispatchResized(), this.contentEl);
            this.inputToolbar.show(ri, this.contentEl);
            this.contentEl.dispatchEvent(new CustomEvent('poa-input-select', {
                bubbles: true, detail: { el: ri },
            }));
        }
        else if (group) {
            // select / checkbox / radio / button 등 나머지 그룹 컨트롤
            e.stopPropagation();
            this.deselectAll();
            this.selectedEl = group;
            group.classList.add('poa-form-selected');
        }
        else {
            // 직접 삽입 select/button (data-poa-form, 셀 안)
            const ci = this._findCellInput(target);
            if (ci) {
                e.stopPropagation();
                this.deselectAll();
                this.selectedInput = ci;
                ci.classList.add('poa-input-selected');
                this.contentEl.dispatchEvent(new CustomEvent('poa-input-select', {
                    bubbles: true, detail: { el: ci },
                }));
            }
            else {
                this.deselectAll();
            }
        }
    }
    _onContextMenu(e) {
        const target = e.target;
        const group = target.closest('.poa-form-group');
        const ri = this._findResizableInput(target);
        if (ri) {
            // input / textarea
            e.preventDefault();
            e.stopPropagation();
            this.deselectAll();
            if (group) {
                this.selectedEl = group;
                group.classList.add('poa-form-selected');
            }
            this.selectedInput = ri;
            ri.classList.add('poa-input-selected');
            this.inputResizer.attach(ri, () => this._dispatchResized(), this.contentEl);
            this.inputToolbar.show(ri, this.contentEl);
            this._showCtxMenu(ri, e.clientX, e.clientY);
        }
        else if (group) {
            e.preventDefault();
            e.stopPropagation();
            this.deselectAll();
            this.selectedEl = group;
            group.classList.add('poa-form-selected');
            this.contentEl.dispatchEvent(new CustomEvent('poa-form-contextmenu', {
                bubbles: true,
                detail: { el: group, x: e.clientX, y: e.clientY },
            }));
        }
        else {
            const ci = this._findCellInput(target);
            if (ci) {
                e.preventDefault();
                e.stopPropagation();
                this.deselectAll();
                this.selectedInput = ci;
                ci.classList.add('poa-input-selected');
                this._showCtxMenu(ci, e.clientX, e.clientY);
            }
        }
    }
    _onDocClick(e) {
        const t = e.target;
        if (t.closest('[data-poa-resize-handle]') || t.closest('[data-poa-input-menu]'))
            return;
        this.deselectAll();
    }
    // ── 입력 요소 탐색 ──────────────────────────────────────────────────────────
    /**
     * 리사이즈 가능한 input/textarea를 찾는다.
     *
     * 두 경로를 통일 처리:
     * - 표 안 직접 삽입: `input[data-poa-form]` / `textarea[data-poa-form]`
     * - 표 밖 그룹 삽입: `.poa-form-group` 내부 input / textarea
     */
    _findResizableInput(target) {
        // 1) 직접 삽입 (셀 안) — data-poa-form이 element 자신에게 있음
        const direct = target.closest('input[data-poa-form], textarea[data-poa-form]');
        if (direct)
            return direct;
        // 2) 그룹 래퍼 안의 input/textarea (표 밖 삽입)
        const group = target.closest('.poa-form-group');
        if (group) {
            return group.querySelector('input, textarea') ?? null;
        }
        return null;
    }
    /** select / button 등 나머지 셀 직접 삽입 컨트롤 */
    _findCellInput(target) {
        return target.closest('input[data-poa-form], textarea[data-poa-form], select[data-poa-form], button[data-poa-form]');
    }
    // ── 이벤트 ──────────────────────────────────────────────────────────────────
    _dispatchResized() {
        this.contentEl.dispatchEvent(new CustomEvent('poa-input-resized', { bubbles: true }));
        this.inputResizer.syncHandle();
        this.inputToolbar.syncPosition();
    }
    // ── 컨텍스트 메뉴 ───────────────────────────────────────────────────────────
    _showCtxMenu(input, x, y) {
        this._hideCtxMenu();
        const cell = input.closest('td, th');
        const menu = document.createElement('div');
        menu.dataset.poaInputMenu = 'true';
        menu.style.cssText =
            `position:fixed;top:${y}px;left:${x}px;` +
                'background:#fff;border:1px solid #e5e7eb;border-radius:8px;' +
                'box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:99999;' +
                'padding:4px 0;min-width:190px;font-size:13px;';
        const makeItem = (label, action, danger = false) => {
            const btn = document.createElement('button');
            btn.style.cssText =
                'display:block;width:100%;padding:7px 14px;border:none;background:transparent;' +
                    `cursor:pointer;text-align:left;font-size:13px;color:${danger ? '#d32f2f' : '#222'};`;
            btn.textContent = label;
            btn.addEventListener('mouseenter', () => { btn.style.background = '#f5f5f5'; });
            btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
            btn.addEventListener('mousedown', (e) => { e.stopPropagation(); action(); this._hideCtxMenu(); });
            menu.appendChild(btn);
        };
        const makeSep = () => {
            const s = document.createElement('div');
            s.style.cssText = 'height:1px;background:#f3f4f6;margin:4px 0;';
            menu.appendChild(s);
        };
        const makeSubHdr = (label) => {
            const h = document.createElement('div');
            h.style.cssText = 'padding:5px 14px 2px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.04em;';
            h.textContent = label;
            menu.appendChild(h);
        };
        const dispatch = (name, detail = {}) => {
            this.contentEl.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
        };
        makeSubHdr('너비');
        makeItem('  셀에 맞춤 (100%)', () => {
            input.style.width = '100%';
            input.style.maxWidth = '100%';
            this._dispatchResized();
        });
        makeItem('  절반 (50%)', () => {
            input.style.width = '50%';
            this._dispatchResized();
        });
        if (cell) {
            const cw = Math.floor(cell.getBoundingClientRect().width);
            makeItem(`  현재 셀 전체 (${cw}px)`, () => {
                input.style.width = `${cw}px`;
                input.style.maxWidth = '100%';
                this._dispatchResized();
            });
        }
        makeSep();
        makeSubHdr('텍스트 정렬');
        makeItem('  왼쪽', () => { input.style.textAlign = ''; this._dispatchResized(); });
        makeItem('  가운데', () => { input.style.textAlign = 'center'; this._dispatchResized(); });
        makeItem('  오른쪽', () => { input.style.textAlign = 'right'; this._dispatchResized(); });
        makeSep();
        makeItem('입력 요소 속성', () => {
            dispatch('poa-input-contextmenu', { el: input, x, y });
        });
        makeItem('입력 요소 삭제', () => {
            input.closest('.poa-form-group')?.remove()
                ?? input.remove();
            this.deselectAll();
            dispatch('poa-input-resized');
        }, true);
        document.body.appendChild(menu);
        this.ctxMenu = menu;
        // 화면 경계 조정
        const r = menu.getBoundingClientRect();
        if (r.bottom > window.innerHeight - 8)
            menu.style.top = `${y - r.height}px`;
        if (r.right > window.innerWidth - 8)
            menu.style.left = `${x - r.width}px`;
    }
    _hideCtxMenu() {
        this.ctxMenu?.remove();
        this.ctxMenu = null;
    }
}
