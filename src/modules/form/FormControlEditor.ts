import type { FormControl } from './FormControlInserter.js';
import { InputResizer }        from './InputResizer.js';
import { InputInlineToolbar }  from './InputInlineToolbar.js';

type CellInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement;

/**
 * contenteditable 내 폼 컨트롤 편집기.
 * - .poa-form-group: 래퍼 그룹 클릭/우클릭 → 선택 + 편집 다이얼로그
 * - 셀 직접 삽입 input (data-poa-form): 선택 + 리사이즈 핸들 + 인라인 툴바 + 컨텍스트 메뉴
 */
export class FormControlEditor {
  private selectedEl:    HTMLElement | null = null;
  private selectedInput: CellInput   | null = null;

  private ctxMenu: HTMLDivElement | null = null;

  private readonly inputResizer  = new InputResizer();
  private readonly inputToolbar: InputInlineToolbar;

  private readonly clickHandler    = (e: MouseEvent): void => this._onClick(e);
  private readonly ctxHandler      = (e: MouseEvent): void => this._onContextMenu(e);
  private readonly docClickHandler = (e: MouseEvent): void => this._onDocClick(e);

  constructor(private readonly contentEl: HTMLElement) {
    this.inputToolbar = new InputInlineToolbar({
      onResized: () => this._dispatchResized(),
    });
  }

  attach(): void {
    this.contentEl.addEventListener('click',       this.clickHandler);
    this.contentEl.addEventListener('contextmenu', this.ctxHandler);
    document.addEventListener('click', this.docClickHandler);
  }

  detach(): void {
    this.contentEl.removeEventListener('click',       this.clickHandler);
    this.contentEl.removeEventListener('contextmenu', this.ctxHandler);
    document.removeEventListener('click', this.docClickHandler);
    this.deselectAll();
  }

  getSelected():      HTMLElement | null { return this.selectedEl;    }
  getSelectedInput(): CellInput   | null { return this.selectedInput; }

  getConfig(el: HTMLElement): FormControl | null {
    const group = el.closest<HTMLElement>('.poa-form-group');
    const src   = group ?? (el.dataset.poaForm ? el : null);
    if (!src?.dataset.poaForm) return null;
    try { return JSON.parse(src.dataset.poaForm) as FormControl; }
    catch { return null; }
  }

  deselectAll(): void {
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

  deselect(): void { this.deselectAll(); }

  // ── 클릭 핸들러 ─────────────────────────────────────────────────────────────

  private _onClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const group  = target.closest<HTMLElement>('.poa-form-group');
    const ci     = group ? null : this._findCellInput(target);

    if (group) {
      e.stopPropagation();
      this.deselectAll();
      this.selectedEl = group;
      group.classList.add('poa-form-selected');
    } else if (ci) {
      e.stopPropagation();
      this.deselectAll();
      this.selectedInput = ci;
      ci.classList.add('poa-input-selected');

      // 리사이즈 + 인라인 툴바 활성화 (input / textarea만)
      if (ci instanceof HTMLInputElement || ci instanceof HTMLTextAreaElement) {
        this.inputResizer.attach(ci, () => this._dispatchResized());
        this.inputToolbar.show(ci, this.contentEl);
      }

      this.contentEl.dispatchEvent(new CustomEvent('poa-input-select', {
        bubbles: true, detail: { el: ci },
      }));
    } else {
      this.deselectAll();
    }
  }

  private _onContextMenu(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const group  = target.closest<HTMLElement>('.poa-form-group');
    const ci     = group ? null : this._findCellInput(target);

    if (group) {
      e.preventDefault(); e.stopPropagation();
      this.deselectAll();
      this.selectedEl = group;
      group.classList.add('poa-form-selected');
      this.contentEl.dispatchEvent(new CustomEvent('poa-form-contextmenu', {
        bubbles: true,
        detail: { el: group, x: e.clientX, y: e.clientY },
      }));
    } else if (ci) {
      e.preventDefault(); e.stopPropagation();
      this.deselectAll();
      this.selectedInput = ci;
      ci.classList.add('poa-input-selected');

      if (ci instanceof HTMLInputElement || ci instanceof HTMLTextAreaElement) {
        this.inputResizer.attach(ci, () => this._dispatchResized());
        this.inputToolbar.show(ci, this.contentEl);
      }

      this._showCtxMenu(ci, e.clientX, e.clientY);
    }
  }

  private _onDocClick(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    if (t.closest('[data-poa-resize-handle]') || t.closest('[data-poa-input-menu]')) return;
    this.deselectAll();
  }

  // ── 셀 input 감지 ───────────────────────────────────────────────────────────

  private _findCellInput(target: HTMLElement): CellInput | null {
    return target.closest<CellInput>(
      'input[data-poa-form], textarea[data-poa-form], select[data-poa-form], button[data-poa-form]',
    );
  }

  // ── 이벤트 ──────────────────────────────────────────────────────────────────

  private _dispatchResized(): void {
    this.contentEl.dispatchEvent(new CustomEvent('poa-input-resized', { bubbles: true }));
    this.inputResizer.syncHandle();
    this.inputToolbar.syncPosition();
  }

  // ── 컨텍스트 메뉴 ───────────────────────────────────────────────────────────

  private _showCtxMenu(input: CellInput, x: number, y: number): void {
    this._hideCtxMenu();
    const cell = (input as HTMLElement).closest('td, th') as HTMLElement | null;
    const menu = document.createElement('div');
    menu.dataset.poaInputMenu = 'true';
    menu.style.cssText =
      `position:fixed;top:${y}px;left:${x}px;` +
      'background:#fff;border:1px solid #e5e7eb;border-radius:8px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:99999;' +
      'padding:4px 0;min-width:190px;font-size:13px;';

    const makeItem = (label: string, action: () => void, danger = false): void => {
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
    const makeSep = (): void => {
      const s = document.createElement('div');
      s.style.cssText = 'height:1px;background:#f3f4f6;margin:4px 0;';
      menu.appendChild(s);
    };
    const makeSubHdr = (label: string): void => {
      const h = document.createElement('div');
      h.style.cssText = 'padding:5px 14px 2px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.04em;';
      h.textContent = label;
      menu.appendChild(h);
    };

    const dispatch = (name: string, detail: Record<string, unknown> = {}): void => {
      this.contentEl.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
    };

    makeSubHdr('너비');
    makeItem('  셀에 맞춤 (100%)', () => {
      (input as HTMLElement).style.width    = '100%';
      (input as HTMLElement).style.maxWidth = '100%';
      this._dispatchResized();
    });
    makeItem('  절반 (50%)', () => {
      (input as HTMLElement).style.width = '50%';
      this._dispatchResized();
    });
    if (cell) {
      const cw = Math.floor(cell.getBoundingClientRect().width);
      makeItem(`  현재 셀 전체 (${cw}px)`, () => {
        (input as HTMLElement).style.width    = `${cw}px`;
        (input as HTMLElement).style.maxWidth = '100%';
        this._dispatchResized();
      });
    }

    makeSep();
    makeSubHdr('텍스트 정렬');
    makeItem('  왼쪽',   () => { (input as HTMLElement).style.textAlign = '';       this._dispatchResized(); });
    makeItem('  가운데', () => { (input as HTMLElement).style.textAlign = 'center'; this._dispatchResized(); });
    makeItem('  오른쪽', () => { (input as HTMLElement).style.textAlign = 'right';  this._dispatchResized(); });

    makeSep();
    makeItem('입력 요소 속성', () => {
      dispatch('poa-input-contextmenu', { el: input, x, y });
    });
    makeItem('입력 요소 삭제', () => {
      (input as HTMLElement).remove();
      this.deselectAll();
      dispatch('poa-input-resized');
    }, true);

    document.body.appendChild(menu);
    this.ctxMenu = menu;

    // 화면 경계 조정
    const r = menu.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 8) menu.style.top  = `${y - r.height}px`;
    if (r.right  > window.innerWidth  - 8) menu.style.left = `${x - r.width}px`;
  }

  private _hideCtxMenu(): void {
    this.ctxMenu?.remove();
    this.ctxMenu = null;
  }
}
