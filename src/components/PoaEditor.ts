import DOMPurify from 'dompurify';
import { EditorCore } from '../core/EditorCore.js';
import { PoaToolbar } from './Toolbar.js';
import { PoaStatusBar } from './StatusBar.js';
import type { TextAlign, ToolbarState } from '../core/types.js';
import { ClipboardHandler } from '../modules/edit/ClipboardHandler.js';
import { FindReplace } from '../modules/edit/FindReplace.js';
import type { PoaFindReplaceDialog } from './dialogs/FindReplaceDialog.js';
import type { PoaImageEditDialog } from './dialogs/ImageEditDialog.js';

const INDENT_STEP_EM = 2;
const BLOCK_TAGS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre']);

export class PoaEditor extends HTMLElement {
  private shadow: ShadowRoot;
  private core!: EditorCore;
  private contentEl!: HTMLDivElement;
  private toolbar!: PoaToolbar;
  private statusBar!: PoaStatusBar;

  /** 마지막으로 contentEl 안에 있던 선택 범위 — select/color-picker 포커스 이탈 후 복원에 사용 */
  private savedRange: Range | null = null;
  private clipboardHandler!: ClipboardHandler;
  private findReplace!: FindReplace;
  private findDialog!: PoaFindReplaceDialog;
  private imageDialog!: PoaImageEditDialog;

  private readonly selectionHandler = (): void => { this.syncToolbar(); };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadow.innerHTML = `
<style>
:host {
  display: flex; flex-direction: column; box-sizing: border-box;
  border: 1px solid var(--poa-editor-border, #ccc);
  border-radius: 4px; overflow: hidden;
}
.content {
  flex: 1; overflow-y: auto;
  padding: 16px 20px; outline: none;
  line-height: 1.6; min-height: 200px;
  color: var(--poa-editor-color, #222);
  background: var(--poa-editor-bg, #fff);
  font-size: 14px;
  font-family: var(--poa-editor-font, '맑은 고딕', 'Malgun Gothic', sans-serif);
}
.content:empty::before {
  content: attr(data-placeholder); color: #aaa; pointer-events: none;
}
</style>
<poa-toolbar></poa-toolbar>
<div class="content" role="textbox" aria-multiline="true" spellcheck="true"></div>
<poa-status-bar></poa-status-bar>
<poa-find-replace-dialog></poa-find-replace-dialog>
<poa-image-edit-dialog></poa-image-edit-dialog>`;

    this.toolbar     = this.shadow.querySelector('poa-toolbar')           as PoaToolbar;
    this.contentEl   = this.shadow.querySelector('.content')              as HTMLDivElement;
    this.statusBar   = this.shadow.querySelector('poa-status-bar')        as PoaStatusBar;
    this.findDialog  = this.shadow.querySelector('poa-find-replace-dialog') as PoaFindReplaceDialog;
    this.imageDialog = this.shadow.querySelector('poa-image-edit-dialog') as PoaImageEditDialog;

    const placeholder = this.getAttribute('placeholder') ?? '';
    if (placeholder) this.contentEl.dataset.placeholder = placeholder;

    const readonly = this.hasAttribute('readonly');
    this.core = new EditorCore({ placeholder, readonly });
    this.core.mount(this.contentEl);

    this.clipboardHandler = new ClipboardHandler(this.contentEl, {
      onPaste: () => {
        void this.core.captureHistory('paste');
        this.statusBar.update(this.contentEl.innerHTML);
      },
    });
    this.clipboardHandler.register();

    this.findReplace = new FindReplace(this.contentEl);

    this.shadow.addEventListener('poa-action', (e) => {
      void this.handleAction(e as CustomEvent<{ type: string; value?: string }>);
    });

    // 찾기/바꾸기 이벤트 처리
    this.shadow.addEventListener('poa-find-search', (e) => {
      const { query, caseSensitive, wholeWord } = (e as CustomEvent).detail as {
        query: string; caseSensitive: boolean; wholeWord: boolean;
      };
      const state = this.findReplace.find(query, { caseSensitive, wholeWord });
      this.findDialog.updateResult(state.count, state.current);
    });
    this.shadow.addEventListener('poa-find-next', () => {
      const state = this.findReplace.next();
      this.findDialog.updateResult(state.count, state.current);
    });
    this.shadow.addEventListener('poa-find-prev', () => {
      const state = this.findReplace.prev();
      this.findDialog.updateResult(state.count, state.current);
    });
    this.shadow.addEventListener('poa-find-replace', (e) => {
      const { replacement } = (e as CustomEvent).detail as { replacement: string };
      const state = this.findReplace.replaceCurrent(replacement);
      void this.core.captureHistory('replace');
      this.findDialog.updateResult(state.count, state.current);
    });
    this.shadow.addEventListener('poa-find-replace-all', (e) => {
      const { query, replacement, caseSensitive, wholeWord } = (e as CustomEvent).detail as {
        query: string; replacement: string; caseSensitive: boolean; wholeWord: boolean;
      };
      const count = this.findReplace.replaceAll(query, replacement, { caseSensitive, wholeWord });
      void this.core.captureHistory('replaceAll');
      this.findDialog.updateResult(0, -1);
      this.statusBar.update(this.contentEl.innerHTML);
      if (count > 0) alert(`${count}개 항목을 바꿨습니다.`);
    });
    this.shadow.addEventListener('poa-find-clear', () => {
      this.findReplace.clearMarks();
    });

    // 이미지 편집 다이얼로그 결과 처리
    this.shadow.addEventListener('poa-image-edit-confirm', (e) => {
      const { original, edited } = (e as CustomEvent).detail as { original: string; edited: string };
      const imgs = this.contentEl.querySelectorAll<HTMLImageElement>('img');
      imgs.forEach((img) => {
        if (img.src === original || img.getAttribute('src') === original) {
          img.src = edited;
        }
      });
      void this.core.captureHistory('imageEdit');
    });

    // 이미지 더블클릭 → 이미지 편집 다이얼로그 열기
    this.contentEl.addEventListener('dblclick', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        void this.imageDialog.open((target as HTMLImageElement).src);
      }
    });

    // Ctrl+F → 찾기/바꾸기 열기
    this.contentEl.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        this.findDialog.open();
      }
    });

    document.addEventListener('selectionchange', this.selectionHandler);

    // blur 시점에 selection을 저장 — select/color-picker 클릭으로 포커스가 이탈하기 전 마지막 범위
    this.contentEl.addEventListener('blur', () => {
      const sel = this.contentEl.ownerDocument.getSelection();
      if (sel && sel.rangeCount > 0) {
        this.savedRange = sel.getRangeAt(0).cloneRange();
      }
    });

    this.contentEl.addEventListener('input', () => {
      this.statusBar.update(this.contentEl.innerHTML);
    });

    this.statusBar.update(this.contentEl.innerHTML);
    this.syncToolbar();
  }

  disconnectedCallback(): void {
    document.removeEventListener('selectionchange', this.selectionHandler);
    this.clipboardHandler.unregister();
    this.findReplace.clearMarks();
    this.core.unmount();
  }

  // ── Public API ──────────────────────────────────────────────────────────

  getHTML(): string {
    return DOMPurify.sanitize(this.contentEl.innerHTML);
  }

  setHTML(html: string): void {
    this.contentEl.innerHTML = DOMPurify.sanitize(html);
    this.savedRange = null;
    this.statusBar.update(this.contentEl.innerHTML);
  }

  // ── Action dispatch from toolbar ────────────────────────────────────────

  /** 저장된 선택 범위를 복원하고 contentEl에 포커스를 돌려준다 */
  private restoreSelection(): void {
    if (!this.savedRange) {
      this.contentEl.focus();
      return;
    }
    // focus() 호출이 selectionchange → syncToolbar()를 동기적으로 트리거해
    // savedRange를 덮어쓸 수 있으므로 로컬 변수에 먼저 복사한다.
    const range = this.savedRange.cloneRange();
    this.contentEl.focus();
    try {
      const sel = this.contentEl.ownerDocument.getSelection();
      if (!sel) return;
      sel.removeAllRanges();
      sel.addRange(range);
    } catch {
      // innerHTML 교체 이후 분리된(detached) 노드 참조 시 DOMException 발생 → 무시하고 초기화
      this.savedRange = null;
    }
  }

  private async handleAction(e: CustomEvent<{ type: string; value?: string }>): Promise<void> {
    const { type, value } = e.detail;

    // select/color-picker가 포커스를 가져간 경우 선택 범위를 먼저 복원한다.
    // format(mousedown+preventDefault)·undo·redo는 이미 올바른 상태이지만 호출해도 무해하다.
    this.restoreSelection();

    switch (type) {
      case 'format':
        if      (value === 'bold')      await this.core.bold();
        else if (value === 'italic')    await this.core.italic();
        else if (value === 'underline') await this.core.underline();
        else if (value === 'strike')    await this.core.strike();
        break;
      case 'undo':
        await this.core.undo();
        this.savedRange = null; // innerHTML 교체로 기존 범위 무효화
        break;
      case 'redo':
        await this.core.redo();
        this.savedRange = null;
        break;

      case 'align':
        this.applyBlockStyle('text-align', value ?? 'left');
        await this.core.captureHistory(`align:${value}`);
        break;
      case 'indent':
        this.applyIndent(1);
        await this.core.captureHistory('indent');
        break;
      case 'outdent':
        this.applyIndent(-1);
        await this.core.captureHistory('outdent');
        break;

      case 'fontFamily':
        this.applyInlineStyle('font-family', value ?? '');
        await this.core.captureHistory('fontFamily');
        break;
      case 'fontSize':
        this.applyInlineStyle('font-size', value ?? '');
        await this.core.captureHistory('fontSize');
        break;
      case 'lineHeight':
        this.applyBlockStyle('line-height', value ?? '');
        await this.core.captureHistory('lineHeight');
        break;
      case 'letterSpacing':
        this.applyInlineStyle('letter-spacing', value ?? '');
        await this.core.captureHistory('letterSpacing');
        break;
      case 'foreColor':
        this.applyInlineStyle('color', value ?? '');
        await this.core.captureHistory('foreColor');
        break;
      case 'backColor':
        this.applyInlineStyle('background-color', value ?? '');
        await this.core.captureHistory('backColor');
        break;
      case 'find-replace':
        this.findDialog.open();
        return; // syncToolbar / statusBar 갱신 불필요
    }

    this.syncToolbar();
    this.statusBar.update(this.contentEl.innerHTML);
  }

  // ── DOM style helpers ────────────────────────────────────────────────────

  private applyInlineStyle(cssProperty: string, value: string): void {
    const ownerDoc = this.contentEl.ownerDocument;
    const sel = ownerDoc.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const span = ownerDoc.createElement('span');
    span.style.setProperty(cssProperty, value);
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);

    // restore selection to the inserted span
    range.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private applyBlockStyle(cssProperty: string, value: string): void {
    const sel = this.contentEl.ownerDocument.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const block = this.findBlockAncestor(sel.getRangeAt(0).commonAncestorContainer);
    (block as HTMLElement).style.setProperty(cssProperty, value);
  }

  private applyIndent(delta: number): void {
    const sel = this.contentEl.ownerDocument.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const block = this.findBlockAncestor(sel.getRangeAt(0).commonAncestorContainer) as HTMLElement;
    const current = parseFloat(block.style.paddingLeft) || 0;
    const next = Math.max(0, current + delta * INDENT_STEP_EM);
    block.style.paddingLeft = next === 0 ? '' : `${next}em`;
  }

  private findBlockAncestor(node: Node | null): Element {
    let cur = node;
    while (cur && cur !== this.contentEl) {
      if (cur.nodeType === 1 && BLOCK_TAGS.has((cur as Element).tagName.toLowerCase())) {
        return cur as Element;
      }
      cur = cur.parentNode;
    }
    return this.contentEl;
  }

  // ── Toolbar state sync ───────────────────────────────────────────────────

  private syncToolbar(): void {
    const sel = this.contentEl.ownerDocument.getSelection();
    if (!sel?.anchorNode || !this.contentEl.contains(sel.anchorNode)) return;

    // selectionchange가 올 때마다 최신 범위를 보관 (blur보다 먼저 저장됨)
    if (sel.rangeCount > 0) this.savedRange = sel.getRangeAt(0).cloneRange();

    const anchor = sel.anchorNode;
    const state: ToolbarState = {
      bold:         this.hasAncestorTag(anchor, 'strong'),
      italic:       this.hasAncestorTag(anchor, 'em'),
      underline:    this.hasAncestorTag(anchor, 'u'),
      strike:       this.hasAncestorTag(anchor, 's'),
      align:        (this.getInlineStyle(anchor, 'text-align') || 'left') as TextAlign,
      canUndo:      this.core.canUndo(),
      canRedo:      this.core.canRedo(),
      fontSize:     this.getInlineStyle(anchor, 'font-size') || '12pt',
      fontFamily:   this.getInlineStyle(anchor, 'font-family') || 'inherit',
      lineHeight:   this.getInlineStyle(anchor, 'line-height') || '1.5',
      letterSpacing: this.getInlineStyle(anchor, 'letter-spacing') || '0px',
      foreColor:    this.rgbToHex(this.getComputedStyle(anchor, 'color')) || '#000000',
      backColor:    '#ffff00',
    };

    this.toolbar.setState(state);
  }

  private hasAncestorTag(node: Node | null, tag: string): boolean {
    let cur = node;
    while (cur && cur !== this.contentEl) {
      if (cur.nodeType === 1 && (cur as Element).tagName.toLowerCase() === tag) return true;
      cur = cur.parentNode;
    }
    return false;
  }

  private getInlineStyle(node: Node | null, cssProperty: string): string {
    let cur = node;
    while (cur && cur !== this.contentEl) {
      if (cur.nodeType === 1) {
        const val = (cur as HTMLElement).style.getPropertyValue(cssProperty);
        if (val) return val;
      }
      cur = cur.parentNode;
    }
    return '';
  }

  private getComputedStyle(node: Node | null, cssProperty: string): string {
    const el = node?.nodeType === 1 ? node as HTMLElement : (node?.parentElement ?? null);
    if (!el) return '';
    return window.getComputedStyle(el).getPropertyValue(cssProperty);
  }

  private rgbToHex(rgb: string): string {
    const m = rgb.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
    if (!m) return rgb.startsWith('#') ? rgb : '';
    return '#' + [m[1], m[2], m[3]]
      .map((n) => parseInt(n).toString(16).padStart(2, '0'))
      .join('');
  }
}
