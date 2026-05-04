import DOMPurify from 'dompurify';
import { EditorCore } from '../core/EditorCore.js';
import { PoaToolbar } from './Toolbar.js';
import { PoaStatusBar } from './StatusBar.js';
import type { TextAlign, ToolbarState, FormatName } from '../core/types.js';
import { FORMAT_TAG_MAP } from '../core/types.js';
import { ClipboardHandler } from '../modules/edit/ClipboardHandler.js';
import { FindReplace } from '../modules/edit/FindReplace.js';
import { ImageInserter } from '../modules/insert/ImageInserter.js';
import type { ImageAttributes } from '../modules/insert/ImageInserter.js';
import { FileManager } from '../modules/file/FileManager.js';
import { AutoSave } from '../modules/file/AutoSave.js';
import type { PoaFindReplaceDialog } from './dialogs/FindReplaceDialog.js';
import type { PoaImageEditDialog } from './dialogs/ImageEditDialog.js';
import type { PoaImageDialog } from './dialogs/ImageDialog.js';
import type { PoaSettingsDialog } from './dialogs/SettingsDialog.js';

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
  private imageInserter!: ImageInserter;
  private fileManager!: FileManager;
  private autoSave!: AutoSave;
  private findDialog!: PoaFindReplaceDialog;
  private imageDialog!: PoaImageEditDialog;
  private imageInsertDialog!: PoaImageDialog;
  private settingsDialog!: PoaSettingsDialog;

  /**
   * 커서만 있을 때 설정한 인라인 스타일 — 다음 키 입력 시 span으로 감싸 적용.
   * restoreSelection 직후에 발생하는 selectionchange로 인한 오지우기를 방지하기 위해
   * pendingStylesJustSet 플래그로 한 번의 selectionchange를 건너뛴다.
   */
  private pendingStyles = new Map<string, string>();
  private pendingStylesJustSet = false;

  private readonly selectionHandler = (): void => {
    if (this.pendingStyles.size > 0) {
      if (this.pendingStylesJustSet) {
        this.pendingStylesJustSet = false; // 다음 selectionchange에서 클리어
      } else {
        this.pendingStyles.clear();        // 커서 이동 → 대기 스타일 취소
      }
    }
    this.syncToolbar();
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    // contentEl은 shadow DOM이 아닌 light DOM에 배치한다.
    // shadow DOM 안의 contenteditable에서 발생하는 Chrome Selection API 리타깃 버그 우회:
    // document.getSelection().getRangeAt(0)가 shadow 내 선택을 BODY로 리타깃해 항상 collapsed
    // → contentEl을 light DOM에 두면 getRangeAt(0)이 정상적으로 텍스트 노드를 반환한다.
    this.shadow.innerHTML = `
<style>
:host {
  display: flex; flex-direction: column; box-sizing: border-box;
  border: 1px solid var(--poa-editor-border, #ccc);
  border-radius: 4px; overflow: hidden;
}
slot[name="content"] { display: contents; }
</style>
<poa-toolbar></poa-toolbar>
<slot name="content"></slot>
<poa-status-bar></poa-status-bar>
<poa-find-replace-dialog></poa-find-replace-dialog>
<poa-image-edit-dialog></poa-image-edit-dialog>
<poa-image-dialog></poa-image-dialog>
<poa-settings-dialog></poa-settings-dialog>`;

    // contentEl을 light DOM(poa-editor의 직계 자식)으로 생성 — Selection API가 정상 작동
    this.contentEl = (this.querySelector('.poa-editor-content') as HTMLDivElement | null)
      ?? document.createElement('div');
    this.contentEl.className = 'poa-editor-content';
    this.contentEl.setAttribute('slot', 'content');
    this.contentEl.setAttribute('role', 'textbox');
    this.contentEl.setAttribute('aria-multiline', 'true');
    this.contentEl.setAttribute('spellcheck', 'true');
    // flex: 1 등 레이아웃 스타일을 인라인으로 적용 (shadow CSS ::slotted는 specificity 낮음)
    this.contentEl.style.cssText = [
      'flex: 1', 'overflow-y: auto', 'padding: 16px 20px', 'outline: none',
      'line-height: 1.6', 'min-height: 200px', 'box-sizing: border-box',
      'color: var(--poa-editor-color, #222)', 'background: var(--poa-editor-bg, #fff)',
      'font-size: 14px',
      "font-family: var(--poa-editor-font, '맑은 고딕', 'Malgun Gothic', sans-serif)",
    ].join('; ');
    if (!this.contentEl.parentElement) this.appendChild(this.contentEl);

    // placeholder ::before는 인라인 스타일로 설정 불가 → 문서 head에 한 번만 주입
    PoaEditor.injectContentStyles();

    this.toolbar     = this.shadow.querySelector('poa-toolbar')           as PoaToolbar;
    this.statusBar   = this.shadow.querySelector('poa-status-bar')        as PoaStatusBar;
    this.findDialog        = this.shadow.querySelector('poa-find-replace-dialog') as PoaFindReplaceDialog;
    this.imageDialog       = this.shadow.querySelector('poa-image-edit-dialog')   as PoaImageEditDialog;
    this.imageInsertDialog = this.shadow.querySelector('poa-image-dialog')        as PoaImageDialog;
    this.settingsDialog    = this.shadow.querySelector('poa-settings-dialog')     as PoaSettingsDialog;

    const placeholder = this.getAttribute('placeholder') ?? '';
    if (placeholder) this.contentEl.dataset.placeholder = placeholder;

    const readonly = this.hasAttribute('readonly');
    this.core = new EditorCore({
      placeholder,
      readonly,
      onHistoryPush: () => this.syncToolbar(),
    });
    this.core.mount(this.contentEl);

    this.imageInserter = new ImageInserter(this.contentEl);

    this.fileManager = new FileManager();
    this.autoSave    = new AutoSave();
    this.settingsDialog.setAutoSave(this.autoSave);
    this.settingsDialog.setFileManager(this.fileManager);
    this.autoSave.start(() => this.contentEl.innerHTML);

    this.clipboardHandler = new ClipboardHandler(this.contentEl, {
      onPaste: () => {
        void this.core.captureHistory('paste');
        this.statusBar.update(this.contentEl.innerHTML);
      },
    });
    this.clipboardHandler.register();

    this.findReplace = new FindReplace(this.contentEl);

    this.shadow.addEventListener('poa-action', (e) => {
      this.handleAction(e as CustomEvent<{ type: string; value?: string }>).catch((err: unknown) => {
        console.error('[poa-editor] handleAction 오류:', err);
      });
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

    // 이미지 삽입 다이얼로그 → ImageInserter로 삽입
    this.shadow.addEventListener('poa-image-insert', (e) => {
      const { attrs } = (e as CustomEvent).detail as { attrs: ImageAttributes };
      try {
        this.imageInserter.insertFromUrl(attrs);
        void this.core.captureHistory('insertImage');
        this.statusBar.update(this.contentEl.innerHTML);
        this.checkAltWarning();
      } catch {
        // alt 비어있는 경우 등 — 다이얼로그에서 이미 검증하므로 도달하지 않음
      }
    });

    // 이미지 편집 다이얼로그 결과 처리 (canvas 편집 + 속성 변경)
    this.shadow.addEventListener('poa-image-edit-confirm', (e) => {
      const { original, edited, attrs } = (e as CustomEvent).detail as {
        original: string; edited: string; attrs?: Partial<ImageAttributes>;
      };
      const imgs = this.contentEl.querySelectorAll<HTMLImageElement>('img');
      imgs.forEach((img) => {
        if (img.src === original || img.getAttribute('src') === original) {
          if (edited !== original) img.src = edited;
          if (attrs) {
            if (attrs.alt   !== undefined) img.alt   = attrs.alt;
            if (attrs.title !== undefined) img.title = attrs.title;
            if (attrs.width)  img.style.width  = attrs.width;
            if (attrs.height) img.style.height = attrs.height;
            if (attrs.border) img.style.border = attrs.border;
            if (attrs.align === 'left' || attrs.align === 'right') img.style.float = attrs.align;
            if (attrs.id)        img.id        = attrs.id;
            if (attrs.className) img.className = attrs.className;
          }
        }
      });
      void this.core.captureHistory('imageEdit');
      this.checkAltWarning();
    });

    // 이미지 더블클릭 → 편집 다이얼로그 열기 (기존 속성 전달)
    this.contentEl.addEventListener('dblclick', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        void this.imageDialog.open(img.src, {
          alt:       img.alt,
          title:     img.title || undefined,
          width:     img.style.width || undefined,
          height:    img.style.height || undefined,
          border:    img.style.border || undefined,
          align:     (img.style.float as 'left' | 'right' | '') || undefined,
          id:        img.id || undefined,
          className: img.className || undefined,
        });
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

    // blur 시점에 selection을 저장 (blur보다 selectionchange가 먼저 오는 브라우저용 보조 저장)
    this.contentEl.addEventListener('blur', () => {
      const r = this.getActualRange();
      if (r && this.contentEl.contains(r.startContainer)) {
        this.savedRange = r;
      }
    });

    // 툴바의 어떤 요소(select, color-picker 등)를 클릭하기 직전 — selection이 사라지기 전에 캡처.
    // mousedown은 blur보다 먼저 발생하므로 이 시점의 selection이 가장 정확하다.
    this.shadow.addEventListener('mousedown', (e) => {
      // contentEl 자체 클릭은 제외 (클릭 후 커서 이동이 자연스럽게 savedRange를 갱신함)
      if (this.contentEl.contains(e.target as Node)) return;
      const r = this.getActualRange();
      console.log('[shadow mousedown capture] getActualRange:', r,
        '| collapsed:', r?.collapsed,
        '| toString:', r?.toString(),
        '| startContainer in contentEl:', r ? this.contentEl.contains(r.startContainer) : 'n/a');
      if (r && this.contentEl.contains(r.startContainer)) {
        this.savedRange = r.cloneRange();
        console.log('[shadow mousedown capture] savedRange 저장 완료 | text:', this.savedRange.toString());
      }
    }, true); // capture phase — select/button mousedown보다 먼저 실행됨

    // mouseup/keyup은 contentEl 내부 이벤트 — getActualRange로 리타깃 없이 실제 Range를 캡처
    const captureRange = (): void => {
      const r = this.getActualRange();
      if (r && this.contentEl.contains(r.startContainer)) {
        this.savedRange = r;
      }
    };
    this.contentEl.addEventListener('mouseup', captureRange);
    this.contentEl.addEventListener('keyup', captureRange);

    this.contentEl.addEventListener('input', () => {
      this.statusBar.update(this.contentEl.innerHTML);
      this.fileManager.markDirty();
    });

    // 커서만 있을 때 스타일을 설정한 뒤 타이핑하면 해당 스타일의 span으로 감싸 삽입.
    // IME 조합 중(insertCompositionText)에는 개입하지 않고 insertText만 처리한다.
    this.contentEl.addEventListener('beforeinput', (e: InputEvent) => {
      if (this.pendingStyles.size === 0) return;
      if (e.inputType !== 'insertText' || !e.data) return;

      e.preventDefault();
      const ownerDoc = this.contentEl.ownerDocument;
      const sel = ownerDoc.getSelection();
      if (!sel || sel.rangeCount === 0) { this.pendingStyles.clear(); return; }

      const range = sel.getRangeAt(0);
      range.deleteContents();

      const span = ownerDoc.createElement('span');
      this.pendingStyles.forEach((val, prop) => span.style.setProperty(prop, val));
      span.textContent = e.data;
      range.insertNode(span);

      // 커서를 span 안 텍스트 끝으로 이동 → 이후 타이핑이 자연스럽게 span 안에 이어짐
      range.setStart(span.firstChild!, e.data.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      this.pendingStyles.clear();

      // preventDefault로 인해 input 이벤트가 발생하지 않으므로 수동으로 처리
      this.statusBar.update(this.contentEl.innerHTML);
      this.fileManager.markDirty();
      // EditorCore의 debounce를 트리거하기 위해 합성 input 이벤트 발송
      this.contentEl.dispatchEvent(new InputEvent('input', { bubbles: true }));
    });

    // 파일 관리 이벤트
    this.shadow.addEventListener('poa-file-new', () => {
      if (this.fileManager.isDirty() && !confirm('저장되지 않은 변경사항이 있습니다. 계속할까요?')) return;
      this.fileManager.newDocument();
      this.setHTML('');
      void this.core.captureHistory('fileNew');
    });
    this.shadow.addEventListener('poa-file-open', () => {
      void this.fileManager.openFile().then((file) => {
        if (!file) return;
        this.setHTML(file.html);
        void this.core.captureHistory('fileOpen');
      });
    });
    this.shadow.addEventListener('poa-file-save', () => {
      void this.fileManager.saveFile(this.getHTML());
    });
    this.shadow.addEventListener('poa-file-saveas', () => {
      void this.fileManager.saveAsFile(this.getHTML());
    });
    this.shadow.addEventListener('poa-autosave-restore', (e) => {
      const { html } = (e as CustomEvent).detail as { html: string };
      this.setHTML(html);
      void this.core.captureHistory('autoSaveRestore');
    });

    this.statusBar.update(this.contentEl.innerHTML);
    this.syncToolbar();
  }

  disconnectedCallback(): void {
    document.removeEventListener('selectionchange', this.selectionHandler);
    this.clipboardHandler.unregister();
    this.findReplace.clearMarks();
    this.autoSave.stop();
    this.fileManager.destroy();
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

  /**
   * 저장된 선택 범위를 복원하고 contentEl에 포커스를 돌려준다.
   *
   * contentEl 안에 이미 유효한 selection이 있으면 건드리지 않는다.
   * (format 버튼 등 mousedown+preventDefault로 selection이 살아있는 경우
   *  removeAllRanges를 호출하면 오히려 selection이 망가진다.)
   */
  private restoreSelection(): void {
    const ownerDoc = this.contentEl.ownerDocument;

    // contentEl 안에 이미 살아있는 selection → 건드리지 않음
    const existing = this.getActualRange();
    if (existing && this.contentEl.contains(existing.startContainer)) return;

    if (!this.savedRange) {
      this.contentEl.focus();
      return;
    }

    // focus() 호출이 selectionchange → syncToolbar()를 동기적으로 트리거해
    // savedRange를 덮어쓸 수 있으므로 로컬 변수에 먼저 복사한다.
    const range = this.savedRange.cloneRange();
    this.contentEl.focus();
    try {
      const s = ownerDoc.getSelection();
      if (!s) return;
      s.removeAllRanges();
      s.addRange(range);
    } catch {
      // innerHTML 교체 이후 분리된(detached) 노드 참조 시 DOMException 발생 → 무시하고 초기화
      this.savedRange = null;
    }
  }

  private async handleAction(e: CustomEvent<{ type: string; value?: string }>): Promise<void> {
    const { type, value } = e.detail;
    console.log('[handleAction] type:', type, '| value:', value,
      '| canUndo:', this.core.canUndo(), '| canRedo:', this.core.canRedo(),
      '| savedRange:', this.savedRange?.toString());

    if (type !== 'format') this.restoreSelection();

    switch (type) {
      case 'format': {
        const tag = value ? FORMAT_TAG_MAP[value as FormatName] : undefined;
        console.log('[handleAction format] tag:', tag,
          '| savedRange:', this.savedRange,
          '| collapsed:', this.savedRange?.collapsed,
          '| toString:', this.savedRange?.toString());
        if (tag && this.savedRange && !this.savedRange.collapsed) {
          await this.core.applyFormatWithRange(tag, this.savedRange);
        }
        break;
      }
      case 'undo':
        console.log('[handleAction undo] canUndo:', this.core.canUndo());
        await this.core.undo();
        console.log('[handleAction undo] 완료 | innerHTML 길이:', this.contentEl.innerHTML.length);
        this.savedRange = null;
        break;
      case 'redo':
        console.log('[handleAction redo] canRedo:', this.core.canRedo());
        await this.core.redo();
        console.log('[handleAction redo] 완료 | innerHTML 길이:', this.contentEl.innerHTML.length);
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
        return;
      case 'image':
        this.imageInserter.saveSelection();
        this.imageInsertDialog.open();
        return;
      case 'settings':
        void this.settingsDialog.show();
        return;
    }

    this.syncToolbar();
    this.statusBar.update(this.contentEl.innerHTML);
  }

  // ── DOM style helpers ────────────────────────────────────────────────────

  private applyInlineStyle(cssProperty: string, value: string): void {
    const ownerDoc = this.contentEl.ownerDocument;
    const sel = ownerDoc.getSelection();
    console.log('[applyInlineStyle]', cssProperty, '| rangeCount:', sel?.rangeCount,
      '| collapsed:', sel?.rangeCount ? sel.getRangeAt(0).collapsed : 'n/a',
      '| toString:', sel?.toString());
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    if (range.collapsed) {
      // 텍스트 미선택 → 다음 타이핑 시 적용할 대기 스타일로 저장
      this.pendingStyles.set(cssProperty, value);
      this.pendingStylesJustSet = true;
      return;
    }

    // 텍스트 선택됨 → 즉시 적용, 대기 스타일은 취소
    this.pendingStyles.clear();
    this.pendingStylesJustSet = false;

    const span = ownerDoc.createElement('span');
    span.style.setProperty(cssProperty, value);
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);

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

  /** alt 없는 이미지가 있으면 경고 배너를 표시 */
  checkAltWarning(): void {
    const noAlt = this.contentEl.querySelectorAll('img:not([alt]), img[alt=""]').length > 0;
    let banner = this.shadow.getElementById('alt-warning-banner');
    if (noAlt && !banner) {
      banner = document.createElement('div');
      banner.id = 'alt-warning-banner';
      banner.style.cssText =
        'background:#fff3cd;color:#856404;padding:5px 12px;font-size:12px;' +
        'border-top:1px solid #ffc107;';
      banner.textContent = '⚠ alt 텍스트가 없는 이미지가 있습니다. 접근성을 위해 설명을 추가하세요.';
      this.contentEl.insertAdjacentElement('afterend', banner);
    } else if (!noAlt && banner) {
      banner.remove();
    }
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
    const canUndo = this.core.canUndo();
    const canRedo = this.core.canRedo();
    console.log('[syncToolbar] canUndo:', canUndo, '| canRedo:', canRedo);

    const range = this.getActualRange();

    // selection이 없어도 canUndo/canRedo는 항상 최신값으로 갱신 (입력 디바운스 후 즉시 반영)
    if (!range || !this.contentEl.contains(range.startContainer)) {
      console.log('[syncToolbar] → setHistoryState only (no valid range in contentEl)');
      this.toolbar.setHistoryState(canUndo, canRedo);
      return;
    }

    // selectionchange가 올 때마다 최신 범위를 보관 (blur보다 먼저 저장됨)
    this.savedRange = range;

    const anchor = range.startContainer;
    const state: ToolbarState = {
      bold:         this.hasAncestorTag(anchor, 'strong'),
      italic:       this.hasAncestorTag(anchor, 'em'),
      underline:    this.hasAncestorTag(anchor, 'u'),
      strike:       this.hasAncestorTag(anchor, 's'),
      align:        (this.getInlineStyle(anchor, 'text-align') || 'left') as TextAlign,
      canUndo,
      canRedo,
      fontSize:     this.getInlineStyle(anchor, 'font-size') || '12pt',
      fontFamily:   this.getInlineStyle(anchor, 'font-family') || 'inherit',
      lineHeight:   this.getInlineStyle(anchor, 'line-height') || '1.5',
      letterSpacing: this.getInlineStyle(anchor, 'letter-spacing') || '0px',
      foreColor:    this.rgbToHex(this.getComputedStyle(anchor, 'color')) || '#000000',
      backColor:    '#ffff00',
    };

    console.log('[syncToolbar] → setState (canUndo:', canUndo, ')');
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

  /**
   * contentEl이 light DOM에 있으므로 document.getSelection().getRangeAt(0)이 정상 동작한다.
   * (Shadow DOM 시절의 Chrome 리타깃 버그 우회 — contentEl 이동으로 근본 해결)
   */
  private getActualRange(): Range | null {
    const sel = this.contentEl.ownerDocument.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const r = sel.getRangeAt(0);
    console.log('[getActualRange] collapsed:', r.collapsed,
      '| toString:', r.toString(),
      '| startContainer.nodeName:', r.startContainer.nodeName,
      '| inContentEl:', this.contentEl.contains(r.startContainer));
    return r;
  }

  private static _stylesInjected = false;
  private static injectContentStyles(): void {
    if (PoaEditor._stylesInjected) return;
    PoaEditor._stylesInjected = true;
    const style = document.createElement('style');
    style.id = 'poa-editor-content-styles';
    style.textContent = [
      '.poa-editor-content:empty::before {',
      '  content: attr(data-placeholder);',
      '  color: #aaa;',
      '  pointer-events: none;',
      '  display: block;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }
}
