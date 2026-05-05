import type { FormControl } from './FormControlInserter.js';

/**
 * contenteditable 내 .poa-form-group 클릭·우클릭을 감지하여
 * 선택 하이라이트와 컨텍스트 이벤트를 발생시킨다.
 */
export class FormControlEditor {
  private selectedEl: HTMLElement | null = null;

  private readonly clickHandler   = (e: MouseEvent): void => this.onClick(e);
  private readonly ctxHandler     = (e: MouseEvent): void => this.onContextMenu(e);
  private readonly docClickHandler = (): void => this.deselect();

  constructor(private readonly contentEl: HTMLElement) {}

  attach(): void {
    this.contentEl.addEventListener('click',       this.clickHandler);
    this.contentEl.addEventListener('contextmenu', this.ctxHandler);
    document.addEventListener('click', this.docClickHandler);
  }

  detach(): void {
    this.contentEl.removeEventListener('click',       this.clickHandler);
    this.contentEl.removeEventListener('contextmenu', this.ctxHandler);
    document.removeEventListener('click', this.docClickHandler);
    this.deselect();
  }

  /** 현재 선택된 폼 그룹 반환 */
  getSelected(): HTMLElement | null {
    return this.selectedEl;
  }

  /** 선택된 요소의 FormControl 설정 반환 (data-poa-form) */
  getConfig(el: HTMLElement): FormControl | null {
    const group = el.closest<HTMLElement>('.poa-form-group');
    if (!group?.dataset.poaForm) return null;
    try { return JSON.parse(group.dataset.poaForm) as FormControl; }
    catch { return null; }
  }

  deselect(): void {
    this.selectedEl?.classList.remove('poa-form-selected');
    this.selectedEl = null;
  }

  // ── 내부 핸들러 ──────────────────────────────────────────────────────────────

  private onClick(e: MouseEvent): void {
    const group = (e.target as HTMLElement).closest<HTMLElement>('.poa-form-group');
    if (!group) { this.deselect(); return; }

    e.stopPropagation();
    this.deselect();
    this.selectedEl = group;
    group.classList.add('poa-form-selected');
  }

  private onContextMenu(e: MouseEvent): void {
    const group = (e.target as HTMLElement).closest<HTMLElement>('.poa-form-group');
    if (!group) return;

    e.preventDefault();
    e.stopPropagation();

    // 선택 상태 유지
    this.deselect();
    this.selectedEl = group;
    group.classList.add('poa-form-selected');

    this.contentEl.dispatchEvent(new CustomEvent('poa-form-contextmenu', {
      bubbles: true,
      detail: { el: group, x: e.clientX, y: e.clientY },
    }));
  }
}
