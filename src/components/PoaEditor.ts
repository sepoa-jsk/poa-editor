import DOMPurify from 'dompurify';
import { EditorCore } from '../core/EditorCore.js';
import { PoaToolbar } from './Toolbar.js';
import { PoaStatusBar } from './StatusBar.js';
import type { TextAlign, ToolbarState, FormatName, MenuTab } from '../core/types.js';
import { FORMAT_TAG_MAP } from '../core/types.js';
import { eventBus, BusEvent } from '../utils/eventBus.js';
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
import type { PoaTableDialog } from './dialogs/TableDialog.js';
import type { PoaCellSplitDialog } from './dialogs/CellSplitDialog.js';
import { TableBuilder } from '../modules/table/TableBuilder.js';
import type { TableOptions } from '../modules/table/TableBuilder.js';
import { CellMerger } from '../modules/table/CellMerger.js';
import { TableNavigator } from '../modules/table/TableNavigator.js';
import type { TableNavigatorCallbacks } from '../modules/table/TableNavigator.js';
import { TableResizer } from '../modules/table/TableResizer.js';
import { TableSelector } from '../modules/table/TableSelector.js';
import { TableHandle } from '../modules/table/TableHandle.js';
import { TableContextMenu } from '../modules/table/TableContextMenu.js';
import type { TableContextCallbacks } from '../modules/table/TableContextMenu.js';
import { applyPreset } from '../modules/table/TablePresets.js';
import { LinkInserter } from '../modules/insert/LinkInserter.js';
import type { LinkAttributes } from '../modules/insert/LinkInserter.js';
import { BookmarkManager } from '../modules/insert/BookmarkManager.js';
import type { PoaLinkDialog } from './dialogs/LinkDialog.js';
import { ImageResizer } from '../modules/insert/ImageResizer.js';
import type { PoaImageToolbar } from './ImageToolbar.js';
import { ViewManager } from '../modules/view/ViewManager.js';
import type { ViewMode } from '../modules/view/ViewManager.js';
import { getSelectedBlocks, getImageAlign, getTableAlign } from '../utils/dom.js';
import { TableWholeResizer } from '../modules/table/TableWholeResizer.js';
import { TableInlineToolbar } from '../modules/table/TableInlineToolbar.js';
import { FormatPainter } from '../modules/format/FormatPainter.js';
import { ListManager } from '../modules/format/ListManager.js';
import { PoaToast } from './Toast.js';
import type { PoaConfirmDialog } from './ConfirmDialog.js';
import type { PoaAccessibilityDialog } from './dialogs/AccessibilityDialog.js';
import { AccessibilityChecker } from '../modules/accessibility/AccessibilityChecker.js';
import type { PoaPrivacyDialog } from './dialogs/PrivacyDialog.js';
import { PrivacyChecker } from '../modules/privacy/PrivacyChecker.js';
import type { PoaFormulaDialog } from './dialogs/FormulaDialog.js';
import { TableFormulaManager } from '../modules/table/TableFormula.js';
import type { PoaVideoDialog } from './dialogs/VideoDialog.js';
import { VideoInserter } from '../modules/insert/VideoInserter.js';
import type { PoaFormControlDialog } from './dialogs/FormControlDialog.js';
import { FormControlInserter } from '../modules/form/FormControlInserter.js';
import type { FormControl } from '../modules/form/FormControlInserter.js';
import { FormControlEditor } from '../modules/form/FormControlEditor.js';
import type { PoaTemplateDialog } from './dialogs/TemplateDialog.js';
import type { PoaSignatureDialog } from './dialogs/SignatureDialog.js';
import type { PoaEmojiDialog }     from './dialogs/EmojiDialog.js';
import type { PoaTooltipDialog }        from './dialogs/TooltipDialog.js';
import type { PoaInputPropertyDialog }  from './dialogs/InputPropertyDialog.js';
import { EmojiInserter }               from '../modules/insert/EmojiInserter.js';
import { TooltipManager }              from '../modules/insert/TooltipManager.js';

const INDENT_STEP_EM = 2;
const BLOCK_TAGS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre']);

/**
 * 공백이 포함된 폰트명을 CSS font-family 값으로 안전하게 변환한다.
 * 각 폰트명에 공백이 있으면 따옴표로 감싼다.
 * e.g. '맑은 고딕, sans-serif' → '"맑은 고딕", sans-serif'
 */
function normalizeFontFamilyCss(value: string): string {
  if (!value || value === 'inherit') return value;
  return value.split(',').map(part => {
    const name = part.trim().replace(/^['"](.*)['"]\s*$/, '$1'); // 기존 따옴표 제거
    return /\s/.test(name) ? `"${name}"` : name;
  }).join(', ');
}

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
  private tableDialog!: PoaTableDialog;
  private cellSplitDialog!: PoaCellSplitDialog;
  private cellMerger!: CellMerger;
  private tableNavigator!: TableNavigator;
  private tableResizer!: TableResizer;
  private tableSelector!: TableSelector;
  private tableHandle!: TableHandle;
  private tableContextMenu!: TableContextMenu;
  private linkInserter!: LinkInserter;
  private bookmarkManager!: BookmarkManager;
  private linkDialog!: PoaLinkDialog;
  private imageResizer!: ImageResizer;
  private imageToolbar!: PoaImageToolbar;
  private imgContextMenu: HTMLDivElement | null = null;
  private linkContextMenu: HTMLDivElement | null = null;
  private viewManager!: ViewManager;
  private tableWholeResizer!: TableWholeResizer;
  private tableInlineToolbar!: TableInlineToolbar;
  private formatPainter!: FormatPainter;
  private listManager!: ListManager;
  private toast!: PoaToast;
  private confirmDialog!: PoaConfirmDialog;
  private accessibilityDialog!: PoaAccessibilityDialog;
  private privacyDialog!: PoaPrivacyDialog;
  private formulaDialog!: PoaFormulaDialog;
  private formulaManager!: TableFormulaManager;
  private formulaPickMode = false;
  private videoDialog!: PoaVideoDialog;
  private videoInserter!: VideoInserter;
  private formControlDialog!: PoaFormControlDialog;
  private formControlInserter!: FormControlInserter;
  private formControlEditor!: FormControlEditor;
  private templateDialog!:  PoaTemplateDialog;
  private signatureDialog!: PoaSignatureDialog;
  private emojiDialog!:     PoaEmojiDialog;
  private tooltipDialog!:         PoaTooltipDialog;
  private inputPropertyDialog!:   PoaInputPropertyDialog;
  private emojiInserter!:         EmojiInserter;
  private tooltipManager!:        TooltipManager;
  /** 현재 선택(파란 outline)된 표 — null이면 미선택 */
  private selectedTable: HTMLTableElement | null = null;
  /** 표 컨텍스트 진입 직전 탭 — 표에서 벗어날 때 복귀에 사용 */
  private previousMenuTab: MenuTab = 'edit';
  private inTableContext = false;

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
<poa-menubar></poa-menubar>
<poa-context-toolbar></poa-context-toolbar>
<poa-toolbar></poa-toolbar>
<poa-find-replace-dialog></poa-find-replace-dialog>
<slot name="content"></slot>
<poa-status-bar></poa-status-bar>
<poa-image-edit-dialog></poa-image-edit-dialog>
<poa-image-dialog></poa-image-dialog>
<poa-settings-dialog></poa-settings-dialog>
<poa-table-dialog></poa-table-dialog>
<poa-cell-split-dialog></poa-cell-split-dialog>
<poa-link-dialog></poa-link-dialog>
<poa-image-toolbar></poa-image-toolbar>
<poa-confirm-dialog></poa-confirm-dialog>
<poa-accessibility-dialog></poa-accessibility-dialog>
<poa-privacy-dialog></poa-privacy-dialog>
<poa-formula-dialog></poa-formula-dialog>
<poa-video-dialog></poa-video-dialog>
<poa-form-control-dialog></poa-form-control-dialog>
<poa-template-dialog></poa-template-dialog>
<poa-signature-dialog></poa-signature-dialog>
<poa-emoji-dialog></poa-emoji-dialog>
<poa-tooltip-dialog></poa-tooltip-dialog>
<poa-input-property-dialog></poa-input-property-dialog>`;

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
      'flex: 1', 'overflow-y: auto', 'overflow-x: hidden', 'padding: 16px 20px', 'outline: none',
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
    this.tableDialog       = this.shadow.querySelector('poa-table-dialog')        as PoaTableDialog;
    this.cellSplitDialog   = this.shadow.querySelector('poa-cell-split-dialog')  as PoaCellSplitDialog;
    this.linkDialog        = this.shadow.querySelector('poa-link-dialog')        as PoaLinkDialog;
    this.imageToolbar      = this.shadow.querySelector('poa-image-toolbar')      as PoaImageToolbar;
    this.confirmDialog       = this.shadow.querySelector('poa-confirm-dialog')       as PoaConfirmDialog;
    this.accessibilityDialog = this.shadow.querySelector('poa-accessibility-dialog') as PoaAccessibilityDialog;
    this.accessibilityDialog.setup(this.contentEl, () => this.runAccessibilityCheck());
    this.privacyDialog = this.shadow.querySelector('poa-privacy-dialog') as unknown as PoaPrivacyDialog;
    this.privacyDialog.setup(
      () => { void this.core.captureHistory('privacyEdit'); this.statusBar.update(this.contentEl.innerHTML); },
      (msg) => this.confirmDialog.show(msg),
    );
    this.formulaManager = new TableFormulaManager();
    this.formulaDialog  = this.shadow.querySelector('poa-formula-dialog') as unknown as PoaFormulaDialog;
    this.videoInserter  = new VideoInserter(this.contentEl);
    this.videoDialog    = this.shadow.querySelector('poa-video-dialog') as unknown as PoaVideoDialog;
    this.formControlInserter = new FormControlInserter(this.contentEl);
    this.formControlEditor   = new FormControlEditor(this.contentEl);
    this.formControlEditor.attach();
    this.formControlDialog = this.shadow.querySelector('poa-form-control-dialog') as unknown as PoaFormControlDialog;
    this.templateDialog    = this.shadow.querySelector('poa-template-dialog')  as unknown as PoaTemplateDialog;
    this.templateDialog.setup(() => this.getHTML());
    this.signatureDialog   = this.shadow.querySelector('poa-signature-dialog') as unknown as PoaSignatureDialog;
    this.emojiDialog       = this.shadow.querySelector('poa-emoji-dialog')     as unknown as PoaEmojiDialog;
    this.tooltipDialog     = this.shadow.querySelector('poa-tooltip-dialog')   as unknown as PoaTooltipDialog;
    this.emojiInserter        = new EmojiInserter();
    this.inputPropertyDialog  = this.shadow.querySelector('poa-input-property-dialog') as unknown as PoaInputPropertyDialog;
    this.tooltipManager    = new TooltipManager(this.contentEl);
    TooltipManager.injectStyles();
    TooltipManager.attachHoverPopup(this.contentEl);

    this.toast = new PoaToast();
    this.imageInsertDialog.setOnError((msg) => this.toast.show(msg, 'error'));

    const placeholder = this.getAttribute('placeholder') ?? '';
    if (placeholder) this.contentEl.dataset.placeholder = placeholder;

    const readonly = this.hasAttribute('readonly');
    this.core = new EditorCore({
      placeholder,
      readonly,
      onHistoryPush: () => this.syncToolbar(),
    });
    this.core.mount(this.contentEl);

    this.imageInserter    = new ImageInserter(this.contentEl);
    this.linkInserter     = new LinkInserter(this.contentEl);
    this.bookmarkManager  = new BookmarkManager(this.contentEl);

    this.imageResizer = new ImageResizer(this.contentEl, {
      onActivate: (img) => {
        this.deselectTable(); // 표 선택 해제 후 이미지 활성화
        this.imageToolbar.show(img);
      },
      onResize: (img) => {
        this.imageToolbar.update(img);
      },
      onResizeEnd: () => {
        void this.core.captureHistory('imageResize');
        this.statusBar.update(this.contentEl.innerHTML);
      },
      onDeactivate: () => {
        this.imageToolbar.hide();
        this.hideImgContextMenu();
      },
      onContextMenu: (img, x, y) => {
        this.showImgContextMenu(img, x, y);
      },
    });
    this.imageResizer.attach();

    this.viewManager = new ViewManager(this.contentEl, {
      onViewChange: (mode) => {
        eventBus.emit(BusEvent.VIEW_CHANGE, { mode });
      },
      getBookmarks: () => this.bookmarkManager.getAll(),
    });
    this.viewManager.attach();

    this.tableWholeResizer = new TableWholeResizer(this.contentEl, {
      onResizeEnd: () => {
        void this.core.captureHistory('tableWholeResize');
        this.statusBar.update(this.contentEl.innerHTML);
        this.tableInlineToolbar.syncPosition();
      },
    });
    this.tableInlineToolbar = new TableInlineToolbar({
      onApply: () => {
        void this.core.captureHistory('tableResize');
        this.statusBar.update(this.contentEl.innerHTML);
        this.tableWholeResizer.syncHandles();
      },
    });

    this.formatPainter = new FormatPainter(this.contentEl, {
      onModeChange: (active) => {
        this.contentEl.style.cursor = active ? 'crosshair' : '';
      },
    });
    this.listManager = new ListManager(this.contentEl);

    this.fileManager = new FileManager();
    this.autoSave    = new AutoSave();
    this.settingsDialog.setAutoSave(this.autoSave);
    this.settingsDialog.setFileManager(this.fileManager);
    this.autoSave.start(() => this.contentEl.innerHTML);

    // ── 표 모듈 초기화 ─────────────────────────────────────────────
    this.cellMerger = new CellMerger();
    this.cellMerger.attach(this.contentEl);

    this.tableSelector = new TableSelector(this.cellMerger);
    this.tableSelector.attach(this.contentEl);

    const onTableModified = (): void => {
      void this.core.captureHistory('tableModified');
      this.statusBar.update(this.contentEl.innerHTML);
    };

    const navCallbacks: TableNavigatorCallbacks = {
      onMerge: () => {
        const cells = this.cellMerger.getSelectedCells();
        const tbl   = this.cellMerger.getSelectedTable();
        if (!cells.length || !tbl) return { success: false, message: '선택된 셀이 없습니다.' };
        const res = CellMerger.mergeCells(cells, tbl);
        if (res.success) this.cellMerger.clearSelection();
        return res;
      },
      onSplitH: (cell, table) => CellMerger.splitCellHorizontal(cell, table),
      onSplitV: (cell, table) => CellMerger.splitCellVertical(cell, table),
      onOpenTableProps: (table) => this.tableDialog.open(table),
      onModified: onTableModified,
      onError: (msg) => this.toast.show(msg, 'error'),
    };
    this.tableNavigator = new TableNavigator(navCallbacks, { noMenu: true });
    this.tableNavigator.attach(this.contentEl);

    const ctxCallbacks: TableContextCallbacks = {
      onMerge:          navCallbacks.onMerge,
      onSplitCell:      (cell) => this.cellSplitDialog.open(cell),
      onOpenTableProps: navCallbacks.onOpenTableProps,
      onModified:       onTableModified,
      canMerge:         () => this.tableSelector.canMerge,
      getSelectedCells: () => this.tableSelector.getCellSelection(),
      onError:          (msg) => this.toast.show(msg, 'error'),
    };
    this.tableContextMenu = new TableContextMenu(this.tableNavigator, ctxCallbacks);
    this.tableContextMenu.attach(this.contentEl);

    this.tableResizer = new TableResizer(onTableModified);
    this.tableResizer.attach(this.contentEl);

    this.tableHandle = new TableHandle((table) => {
      // 표 전체 셀 선택
      this.cellMerger.clearSelection();
      for (const cell of Array.from(table.querySelectorAll<HTMLTableCellElement>('td, th'))) {
        cell.classList.add('poa-cell-selected');
      }
    });
    this.tableHandle.attach(this.contentEl);

    this.clipboardHandler = new ClipboardHandler(this.contentEl, {
      onPaste: () => {
        void this.core.captureHistory('paste');
        this.statusBar.update(this.contentEl.innerHTML);
      },
    });
    this.clipboardHandler.register();

    this.findReplace = new FindReplace(this.contentEl);

    // 계산식 적용
    this.shadow.addEventListener('poa-formula-apply', (e) => {
      const { formula, table } = (e as CustomEvent).detail as {
        formula: Parameters<TableFormulaManager['applyFormula']>[1];
        table: HTMLTableElement;
      };
      const result = this.formulaManager.applyFormula(table, formula);
      if (result === 'circular') this.toast.show('순환 참조가 발견됐습니다. (#REF!)', 'error');
      else if (result === 'invalid') this.toast.show('대상 셀을 찾을 수 없습니다.', 'error');
      else {
        void this.core.captureHistory('formulaApply');
        this.statusBar.update(this.contentEl.innerHTML);
      }
    });

    // 드래그 범위 선택 모드
    this.shadow.addEventListener('poa-formula-start-pick', () => {
      this.formulaPickMode = true;
      const onUp = (): void => {
        if (!this.formulaPickMode) return;
        this.formulaPickMode = false;
        // 현재 선택된 셀 목록으로 범위 계산
        const selectedCells = this.tableSelector.getCellSelection();
        const tbl = selectedCells[0]?.closest('table') as HTMLTableElement | null;
        if (tbl && selectedCells.length > 0) {
          const bounds = TableFormulaManager.getSelectionBounds(tbl, selectedCells);
          if (bounds) this.formulaDialog.applyRange(...bounds);
        }
      };
      this.contentEl.addEventListener('mouseup', onUp, { once: true });
    });

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
      if (state.replaced) this.toast.show('바꿨습니다.', 'success', 1500);
    });
    this.shadow.addEventListener('poa-find-replace-all', (e) => {
      const { query, replacement, caseSensitive, wholeWord } = (e as CustomEvent).detail as {
        query: string; replacement: string; caseSensitive: boolean; wholeWord: boolean;
      };
      const count = this.findReplace.replaceAll(query, replacement, { caseSensitive, wholeWord });
      void this.core.captureHistory('replaceAll');
      this.findDialog.updateResult(0, -1);
      this.statusBar.update(this.contentEl.innerHTML);
      if (count > 0) {
        this.toast.show(`${count}개 항목을 바꿨습니다.`, 'success');
      } else {
        this.toast.show('바꿀 항목이 없습니다.', 'info');
      }
    });
    this.shadow.addEventListener('poa-find-clear', () => {
      this.findReplace.clearMarks();
    });

    // 비디오/임베드 삽입 다이얼로그 → VideoInserter로 삽입
    this.shadow.addEventListener('poa-video-insert', (e) => {
      const { html } = (e as CustomEvent).detail as { html: string };
      this.videoInserter.insert(html);
      void this.core.captureHistory('videoInsert');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 폼 컨트롤 삽입/편집 다이얼로그 → FormControlInserter로 삽입
    this.shadow.addEventListener('poa-form-insert', (e) => {
      const { config } = (e as CustomEvent).detail as { config: FormControl };
      const existing = this.formControlEditor.getSelected();
      if (existing) {
        // 편집 모드: 기존 요소를 새로 만든 것으로 교체
        const newEl = this.formControlInserter.buildElement(config);
        if (newEl) existing.replaceWith(newEl);
        this.formControlEditor.deselect();
      } else {
        this.restoreSelection();
        this.formControlInserter.insert(config);
      }
      void this.core.captureHistory('formControlInsert');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 서명 삽입 — 현재 커서 위치에 삽입
    this.shadow.addEventListener('poa-signature-insert', (e) => {
      const { html } = (e as CustomEvent).detail as { html: string };
      this.restoreSelection();
      const ownerDoc = this.contentEl.ownerDocument;
      const sel = ownerDoc.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const fragment = range.createContextualFragment(html);
        range.insertNode(fragment);
        range.collapse(false);
      } else {
        this.contentEl.insertAdjacentHTML('beforeend', html);
      }
      void this.core.captureHistory('signatureInsert');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 이모지 삽입
    this.shadow.addEventListener('poa-emoji-insert', (e) => {
      const { emoji } = (e as CustomEvent).detail as { emoji: string };
      this.emojiInserter.insert(emoji, this.contentEl);
      void this.core.captureHistory('emojiInsert');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 툴팁 생성 (poa-tooltip-insert)
    this.shadow.addEventListener('poa-tooltip-insert', (e) => {
      const { title, content } = (e as CustomEvent).detail as { title: string; content: string };
      if (!this.savedRange || !this.contentEl.contains(this.savedRange.startContainer)) return;
      this.tooltipManager.insert(title, content, this.savedRange.cloneRange());
      this.savedRange = null;
      void this.core.captureHistory('tooltipInsert');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 툴팁 수정
    this.shadow.addEventListener('poa-tooltip-update', (e) => {
      const { id, title, content } = (e as CustomEvent).detail as { id: string; title: string; content: string };
      this.tooltipManager.update(id, title, content);
      void this.core.captureHistory('tooltipUpdate');
    });

    // 툴팁 삭제
    this.shadow.addEventListener('poa-tooltip-remove', (e) => {
      const { id } = (e as CustomEvent).detail as { id: string };
      this.tooltipManager.remove(id);
      void this.core.captureHistory('tooltipRemove');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 툴팁 전체 삭제
    this.shadow.addEventListener('poa-tooltip-remove-all', () => {
      this.tooltipManager.removeAll();
      void this.core.captureHistory('tooltipRemoveAll');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 템플릿 삽입 (append: 현재 커서에 삽입, replace: 전체 교체)
    this.shadow.addEventListener('poa-tmpl-insert', (e) => {
      const { html, mode } = (e as CustomEvent).detail as { html: string; mode: 'append' | 'replace' };
      if (mode === 'replace') {
        void this.confirmDialog.show('현재 내용이 모두 교체됩니다. 계속할까요?').then((ok) => {
          if (!ok) return;
          this.setHTML(html);
          void this.core.captureHistory('templateReplace');
          this.templateDialog.close();
        });
      } else {
        this.restoreSelection();
        const ownerDoc = this.contentEl.ownerDocument;
        const sel = ownerDoc.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const fragment = range.createContextualFragment(html);
          range.insertNode(fragment);
          range.collapse(false);
        } else {
          this.contentEl.insertAdjacentHTML('beforeend', html);
        }
        void this.core.captureHistory('templateAppend');
        this.statusBar.update(this.contentEl.innerHTML);
      }
    });

    // 폼 컨트롤 우클릭 → 편집 다이얼로그 열기
    this.contentEl.addEventListener('poa-form-contextmenu', (e) => {
      const { el } = (e as CustomEvent).detail as { el: HTMLElement };
      const cfg = this.formControlEditor.getConfig(el);
      if (cfg) this.formControlDialog.open(cfg);
    });

    // 셀 직접 삽입 input 우클릭 → 속성 다이얼로그
    this.contentEl.addEventListener('poa-input-contextmenu', (e) => {
      const { el } = (e as CustomEvent).detail as { el: HTMLElement };
      this.inputPropertyDialog.open(el);
    });

    // 셀 input 속성 적용 완료 → 히스토리 캡처
    this.addEventListener('poa-input-props-apply', () => {
      void this.core.captureHistory('inputPropsEdit');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 셀 input 리사이즈/텍스트 정렬 변경 → 히스토리 캡처
    this.contentEl.addEventListener('poa-input-resized', () => {
      void this.core.captureHistory('inputResize');
      this.statusBar.update(this.contentEl.innerHTML);
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

    // 이미지 툴바: 너비/높이 직접 입력
    this.shadow.addEventListener('poa-img-size-change', (e) => {
      const { width, height } = (e as CustomEvent).detail as { width: number; height: number };
      const img = this.imageResizer.getActiveImage();
      if (!img) return;
      img.style.width  = `${width}px`;
      img.style.height = `${height}px`;
      this.imageResizer.syncOverlay();
      void this.core.captureHistory('imageResize');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 이미지 툴바: 원본크기 복원
    this.shadow.addEventListener('poa-img-reset-size', () => {
      const img = this.imageResizer.getActiveImage();
      if (!img) return;
      img.style.width  = img.naturalWidth  ? `${img.naturalWidth}px`  : '';
      img.style.height = img.naturalHeight ? `${img.naturalHeight}px` : '';
      this.imageResizer.syncOverlay();
      this.imageToolbar.update(img);
      void this.core.captureHistory('imageResize');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 하이퍼링크 삽입
    this.shadow.addEventListener('poa-link-insert', (e) => {
      const { attrs } = (e as CustomEvent).detail as { attrs: LinkAttributes };
      try {
        this.linkInserter.insertLink(attrs);
        void this.core.captureHistory('insertLink');
        this.statusBar.update(this.contentEl.innerHTML);
      } catch { /* validateLinkUrl 실패 — 다이얼로그에서 이미 검증 */ }
    });

    // 하이퍼링크 수정
    this.shadow.addEventListener('poa-link-update', (e) => {
      const { anchor, attrs } = (e as CustomEvent).detail as { anchor: HTMLAnchorElement; attrs: LinkAttributes };
      try {
        this.linkInserter.updateLink(anchor, attrs);
        void this.core.captureHistory('updateLink');
        this.statusBar.update(this.contentEl.innerHTML);
      } catch { /* 무시 */ }
    });

    // 책갈피로 링크 삽입 (#bookmark-id)
    this.shadow.addEventListener('poa-bookmark-link-insert', (e) => {
      const { bookmarkId, text } = (e as CustomEvent).detail as { bookmarkId: string; text: string };
      try {
        this.linkInserter.insertLink({ href: `#${bookmarkId}`, text, target: '_self' });
        void this.core.captureHistory('insertBookmarkLink');
        this.statusBar.update(this.contentEl.innerHTML);
      } catch { /* 무시 */ }
    });

    // 책갈피 생성
    this.shadow.addEventListener('poa-bookmark-create', (e) => {
      const { label } = (e as CustomEvent).detail as { label: string };
      this.bookmarkManager.insert(label);
      void this.core.captureHistory('insertBookmark');
      this.statusBar.update(this.contentEl.innerHTML);
      this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
    });

    // 책갈피 수정
    this.shadow.addEventListener('poa-bookmark-update', (e) => {
      const { id, label } = (e as CustomEvent).detail as { id: string; label: string };
      try {
        this.bookmarkManager.update(id, label);
        void this.core.captureHistory('updateBookmark');
        this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
      } catch { /* 존재하지 않는 id */ }
    });

    // 책갈피 삭제
    this.shadow.addEventListener('poa-bookmark-delete', (e) => {
      const { id } = (e as CustomEvent).detail as { id: string };
      this.bookmarkManager.remove(id);
      void this.core.captureHistory('deleteBookmark');
      this.statusBar.update(this.contentEl.innerHTML);
      this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
    });

    // 날짜·시간 삽입
    this.shadow.addEventListener('poa-datetime-insert', (e) => {
      const { text } = (e as CustomEvent).detail as { text: string };
      const ownerDoc = this.contentEl.ownerDocument;
      const sel = ownerDoc.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(ownerDoc.createTextNode(text));
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      void this.core.captureHistory('insertDatetime');
      this.statusBar.update(this.contentEl.innerHTML);
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

    // 표 삽입 다이얼로그 → TableBuilder로 삽입
    this.shadow.addEventListener('poa-table-insert', (e) => {
      const { options, presetId } = (e as CustomEvent).detail as { options: TableOptions; presetId?: string };
      const table = TableBuilder.build(options, this.contentEl.ownerDocument);
      if (presetId) applyPreset(presetId, table);
      this.restoreSelection();
      TableBuilder.insert(table, this.contentEl);
      void this.core.captureHistory('insertTable');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 셀 나누기 다이얼로그 → splitCell 실행
    this.shadow.addEventListener('poa-cell-split', (e) => {
      const { cell, cols, rows } = (e as CustomEvent).detail as {
        cell: HTMLTableCellElement; cols: number; rows: number;
      };
      const tbl = cell.closest('table') as HTMLTableElement | null;
      if (tbl) {
        CellMerger.splitCell(cell, tbl, cols, rows);
        onTableModified();
      }
    });

    // 표 속성 다이얼로그 → 기존 표 업데이트
    this.shadow.addEventListener('poa-table-update', (e) => {
      const { options, table } = (e as CustomEvent).detail as { options: TableOptions; table: HTMLTableElement };
      TableBuilder.applyOptions(table, options);
      void this.core.captureHistory('tableUpdate');
      this.statusBar.update(this.contentEl.innerHTML);
    });

    // 객체 클릭 감지 — mousedown은 selectionchange보다 먼저 발생
    this.contentEl.addEventListener('mousedown', (e) => {
      // 리사이즈 핸들(data-dir) 클릭은 stopPropagation되므로 여기 미도달 → 무시 불필요
      const table = this.findTableNode(e.target as Node);

      // ── 표 선택 테두리 + 이미지 교차 해제 ─────────────────────────
      if (table) {
        this.selectTable(table);
        if (this.imageResizer.getActiveImage()) this.imageResizer.deactivate();
      } else {
        this.deselectTable();
        // 이미지 해제는 ImageResizer.onRootClick(capture)이 처리
      }

      // ── 표 탭 전환: 표 안 → table 탭, 표 밖 → 이전 탭 ────────────
      const inTable = table !== null;
      if (inTable && !this.inTableContext) {
        this.inTableContext = true;
        eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: 'table' as MenuTab });
      } else if (!inTable && this.inTableContext) {
        this.inTableContext = false;
        eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: this.previousMenuTab });
      }
    });

    // 이미지 더블클릭 → 편집 다이얼로그 열기 (리사이즈 핸들 위는 제외)
    this.contentEl.addEventListener('dblclick', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && !target.dataset.dir) {
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

    // 하이퍼링크 클릭 → 기본 탐색 차단 + 수정 다이얼로그 열기
    this.contentEl.addEventListener('click', (e) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href]:not(.poa-bookmark)');
      if (!anchor) return;
      e.preventDefault();
      this.linkInserter.saveSelection();
      this.bookmarkManager.saveSelection();
      this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
      this.linkDialog.open('link', anchor);
    });

    // 하이퍼링크 우클릭 → 링크 컨텍스트 메뉴
    this.contentEl.addEventListener('contextmenu', (e) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href]:not(.poa-bookmark)');
      if (!anchor) return;
      e.preventDefault();
      e.stopPropagation();
      this.showLinkContextMenu(anchor, e.clientX, e.clientY);
    });

    // Ctrl+F → 찾기, Ctrl+H → 찾기+바꾸기 / ESC → 서식 페인터 해제 / Tab → 목록 들여쓰기
    this.contentEl.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        this.findDialog.open('find');
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        this.findDialog.open('replace');
        return;
      }
      this.formatPainter.handleKeydown(e);
      if (e.key === 'Tab') this.listManager.handleTab(e);
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
    this.contentEl.addEventListener('mouseup', () => this.formatPainter.handleMouseUp());
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
      void (async () => {
        if (this.fileManager.isDirty()) {
          const ok = await this.confirmDialog.show('저장되지 않은 변경사항이 있습니다. 계속할까요?');
          if (!ok) return;
        }
        this.fileManager.newDocument();
        this.setHTML('');
        void this.core.captureHistory('fileNew');
      })();
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

    // 사용자가 직접 메뉴 탭을 클릭할 때 previousMenuTab 갱신 (표 탭 제외)
    eventBus.on<{ tab: MenuTab }>(BusEvent.MENUBAR_CHANGE, ({ tab }) => {
      if (tab !== 'table') this.previousMenuTab = tab;
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
    this.cellMerger.detach();
    this.tableSelector.detach();
    this.tableNavigator.detach();
    this.tableContextMenu.detach();
    this.tableResizer.detach();
    this.tableHandle.detach();
    this.imageResizer.detach();
    this.viewManager.detach();
    this.tableWholeResizer.detach();
    this.tableInlineToolbar.hide();
    this.deselectTable();
    this.hideImgContextMenu();
    this.hideLinkContextMenu();
    PrivacyChecker.removeHighlights(this.contentEl);
    this.formulaManager.detachAll();
    this.formControlEditor.detach();
    this.core.unmount();
  }

  // ── Public API ──────────────────────────────────────────────────────────

  getHTML(): string {
    // 리사이즈 오버레이 등 data-poa-temp 요소를 클론에서 제거한 뒤 직렬화
    const clone = this.contentEl.cloneNode(true) as HTMLDivElement;
    clone.querySelectorAll('[data-poa-temp]').forEach((el) => el.remove());
    return DOMPurify.sanitize(clone.innerHTML);
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

      case 'align': {
        const align = (value ?? 'left') as TextAlign;
        const activeImg    = this.imageResizer.getActiveImage();
        const selCellInput = this.formControlEditor.getSelectedInput();
        if (activeImg) {
          this.applyImageAlign(activeImg, align);
        } else if (selCellInput) {
          // 선택된 셀 input → 텍스트 정렬 적용
          (selCellInput as HTMLElement).style.textAlign = align === 'left' ? '' : align;
        } else if (this.getFocusedCell()) {
          this.applyTextAlign(align);
        } else if (this.selectedTable) {
          this.applyTableAlign(this.selectedTable, align);
        } else {
          this.applyTextAlign(align);
        }
        await this.core.captureHistory(`align:${align}`);
        break;
      }
      case 'indent':
        this.applyIndent(1);
        await this.core.captureHistory('indent');
        break;
      case 'outdent':
        this.applyIndent(-1);
        await this.core.captureHistory('outdent');
        break;

      case 'fontFamily':
        this.applyInlineStyle('font-family', normalizeFontFamilyCss(value ?? ''));
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
        this.findDialog.open('find');
        return;
      case 'image':
        this.imageInserter.saveSelection();
        this.imageInsertDialog.open();
        return;
      case 'table':
        this.tableDialog.open();
        return;
      case 'settings':
        void this.settingsDialog.show();
        return;

      // ── 파일 탭 액션 ─────────────────────────────────────────────
      case 'file:new':
        if (this.fileManager.isDirty()) {
          const ok = await this.confirmDialog.show('저장되지 않은 변경사항이 있습니다. 계속할까요?');
          if (!ok) return;
        }
        this.fileManager.newDocument(); this.setHTML('');
        void this.core.captureHistory('fileNew'); return;
      case 'file:open':
        void this.fileManager.openFile().then((file) => {
          if (!file) return;
          this.setHTML(file.html);
          void this.core.captureHistory('fileOpen');
        }); return;
      case 'file:save':
        void this.fileManager.saveFile(this.getHTML()); return;
      case 'file:saveas':
        void this.fileManager.saveAsFile(this.getHTML()); return;
      case 'file:print':
        window.print(); return;

      // ── 편집 탭 액션 ─────────────────────────────────────────────
      case 'edit:cut':
        document.execCommand('cut'); return;
      case 'edit:copy':
        document.execCommand('copy'); return;
      case 'edit:paste':
        void navigator.clipboard.readText().then((text) => {
          this.restoreSelection();
          document.execCommand('insertText', false, text);
        }); return;
      case 'edit:paste-plain': {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (sel?.rangeCount) {
          void navigator.clipboard.readText().then((text) => {
            this.restoreSelection();
            document.execCommand('insertText', false, text);
          });
        } return;
      }
      case 'edit:select-all':
        this.contentEl.focus();
        this.contentEl.ownerDocument.execCommand('selectAll'); return;

      // ── 표 탭 액션 ───────────────────────────────────────────────
      case 'table:table-props': {
        const t = this.getFocusedTable();
        if (t) this.tableDialog.open(t); return;
      }
      case 'table:split-cell':
      case 'table:split-h':
      case 'table:split-v': {
        const cell = this.getFocusedCell();
        if (cell) this.cellSplitDialog.open(cell);
        return;
      }
      case 'table:cell-props':
      case 'table:merge':
      case 'table:row-above':
      case 'table:row-below':
      case 'table:col-left':
      case 'table:col-right':
      case 'table:row-delete':
      case 'table:col-delete':
      case 'table:delete': {
        const cell = this.getFocusedCell();
        const tbl  = cell?.closest('table') as HTMLTableElement | null;
        if (cell && tbl) this.tableNavigator.executeAction(type, cell, tbl);
        return;
      }

      // ── 서식 탭 액션 ─────────────────────────────────────────────
      case 'format:clear':
        this.formatPainter.clear();
        await this.core.captureHistory('formatClear');
        break;
      case 'insert:link':
        this.linkInserter.saveSelection();
        this.bookmarkManager.saveSelection();
        this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
        this.linkDialog.open('link');
        return;
      case 'insert:bookmark':
        this.linkInserter.saveSelection();
        this.bookmarkManager.saveSelection();
        this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
        this.linkDialog.open('bookmark');
        return;
      case 'insert:datetime':
        this.linkDialog.open('datetime');
        return;

      // ── 보기 탭 액션 ─────────────────────────────────────────────
      case 'view:design':
      case 'view:html':
      case 'view:preview':
      case 'view:text':
      case 'view:page': {
        const mode = type.replace('view:', '') as ViewMode;
        void this.viewManager.switchTo(mode);
        return;
      }
      case 'view:fullscreen':
        this.viewManager.toggleFullscreen(this);
        return;
      case 'view:ruler':
        this.viewManager.toggleRuler();
        return;
      case 'view:grid':
        this.viewManager.toggleGrid();
        return;
      case 'view:hidden-border':
        this.viewManager.toggleHiddenBorder();
        return;

      case 'format:painter-copy':
        this.formatPainter.copy(false);
        return;
      case 'format:painter-paste':
        this.formatPainter.paste();
        await this.core.captureHistory('formatPainterPaste');
        break;
      case 'format:ul':
        this.listManager.toggleList('ul');
        await this.core.captureHistory('formatUl');
        break;
      case 'format:ol':
        this.listManager.toggleList('ol');
        await this.core.captureHistory('formatOl');
        break;
      case 'format:sup':
        this.listManager.toggleSuperSub('sup');
        await this.core.captureHistory('formatSup');
        break;
      case 'format:sub':
        this.listManager.toggleSuperSub('sub');
        await this.core.captureHistory('formatSub');
        break;
      case 'misc:a11y':
        this.runAccessibilityCheck();
        return;
      case 'misc:privacy':
        this.runPrivacyCheck();
        return;
      case 'misc:calc':
        this.openFormulaDialog();
        return;
      case 'insert:video':
        this.restoreSelection();
        this.videoDialog.open('video');
        return;
      case 'insert:embed':
        this.restoreSelection();
        this.videoDialog.open('embed');
        return;
      case 'misc:form':
        this.restoreSelection();
        this.formControlDialog.open();
        return;
      case 'misc:template':
        this.templateDialog.open();
        return;
      case 'insert:signature':
        this.signatureDialog.open();
        return;
      case 'insert:emoji':
        this.emojiDialog.open();
        return;
      case 'insert:tooltip': {
        const sel = this.contentEl.ownerDocument.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.toString().trim() === '') {
          this.toast.show('툴팁을 추가할 텍스트를 선택하세요.', 'info');
          return;
        }
        this.savedRange = sel.getRangeAt(0).cloneRange();
        this.tooltipDialog.openAdd(sel.toString());
        return;
      }
      case 'insert:tooltip-list':
        this.tooltipDialog.openList(this.tooltipManager.getAll());
        return;
      case 'insert:hr': case 'insert:symbol': case 'insert:multi-image':
      case 'help:shortcuts': case 'help:guide': case 'help:about':
        this.toast.show(`'${type}' 기능은 준비 중입니다.`, 'info');
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

  private applyTextAlign(align: TextAlign): void {
    const sel = this.contentEl.ownerDocument.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const blocks = getSelectedBlocks(this.contentEl, sel.getRangeAt(0));
    for (const block of blocks) {
      block.style.textAlign = align === 'left' ? '' : align;
    }
  }

  private applyImageAlign(img: HTMLImageElement, align: TextAlign): void {
    img.style.float = '';
    img.style.display = '';
    img.style.marginLeft = '';
    img.style.marginRight = '';
    if (align === 'left') {
      img.style.float = 'left';
      img.style.marginRight = '8px';
    } else if (align === 'right') {
      img.style.float = 'right';
      img.style.marginLeft = '8px';
    } else if (align === 'center') {
      img.style.display = 'block';
      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
    }
    // float 변경은 플로우 레이아웃을 재계산하므로, 브라우저가 새 위치를 확정한
    // 다음 프레임에 오버레이를 재배치해야 빈 파란 박스가 잔존하지 않는다.
    requestAnimationFrame(() => this.imageResizer.syncOverlay());
  }

  private applyTableAlign(table: HTMLTableElement, align: TextAlign): void {
    table.style.marginLeft = '';
    table.style.marginRight = '';
    if (align === 'center') {
      table.style.marginLeft = 'auto';
      table.style.marginRight = 'auto';
    } else if (align === 'right') {
      table.style.marginLeft = 'auto';
      table.style.marginRight = '0';
    }
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

  private runAccessibilityCheck(): void {
    this.accessibilityDialog.startLoading();
    setTimeout(() => {
      const result = new AccessibilityChecker(this.contentEl).run();
      this.accessibilityDialog.show(result);
    }, 50);
  }

  private runPrivacyCheck(): void {
    PrivacyChecker.removeHighlights(this.contentEl);
    this.privacyDialog.startLoading();
    setTimeout(() => {
      const checker = new PrivacyChecker(this.contentEl);
      const matches = checker.run();
      if (matches.length > 0) PrivacyChecker.highlight(matches);
      this.privacyDialog.show(matches);
    }, 50);
  }

  private openFormulaDialog(): void {
    const cell = this.getFocusedCell();
    if (!cell) {
      this.toast.show('표 안에 커서를 놓고 계산식을 설정하세요.', 'info');
      return;
    }
    const table = cell.closest('table') as HTMLTableElement;
    if (!table) return;

    const pos = cell.dataset.formula
      ? (() => {
          try { return JSON.parse(cell.dataset.formula); } catch { return null; }
        })()
      : null;

    // 현재 셀의 행/열 (1-indexed)
    const rows  = Array.from(table.querySelectorAll('tr'));
    let cellRow = 1, cellCol = 1;
    rows.forEach((tr, ri) => {
      const cells = Array.from(tr.querySelectorAll('td, th'));
      const ci = cells.indexOf(cell);
      if (ci !== -1) { cellRow = ri + 1; cellCol = ci + 1; }
    });

    // 현재 선택 범위 (TableSelector)
    const selectedCells = this.tableSelector.getCellSelection();
    const initialRange = selectedCells.length > 1
      ? TableFormulaManager.getSelectionBounds(table, selectedCells) ?? undefined
      : undefined;

    this.formulaDialog.open({
      table, cell, cellRow, cellCol,
      existingFormula: pos ?? undefined,
      initialRange,
    });
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

    // 표 컨텍스트 자동 전환 — 커서가 셀 안이거나 표가 선택된 상태이면 유지
    const inTable = this.getFocusedCell() !== null || this.selectedTable !== null;
    if (inTable && !this.inTableContext) {
      this.inTableContext = true;
      eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: 'table' as MenuTab });
    } else if (!inTable && this.inTableContext) {
      this.inTableContext = false;
      eventBus.emit(BusEvent.MENUBAR_CHANGE, { tab: this.previousMenuTab });
    }

    // selectionchange가 올 때마다 최신 범위를 보관 (blur보다 먼저 저장됨)
    this.savedRange = range;

    const anchor = range.startContainer;
    const state: ToolbarState = {
      bold:         this.hasAncestorTag(anchor, 'strong'),
      italic:       this.hasAncestorTag(anchor, 'em'),
      underline:    this.hasAncestorTag(anchor, 'u'),
      strike:       this.hasAncestorTag(anchor, 's'),
      align:        (() => {
        const activeImg = this.imageResizer.getActiveImage();
        if (activeImg) return getImageAlign(activeImg) as TextAlign;
        if (this.selectedTable) return getTableAlign(this.selectedTable) as TextAlign;
        return (this.getInlineStyle(anchor, 'text-align') || 'left') as TextAlign;
      })(),
      canUndo,
      canRedo,
      fontSize:     this.getInlineStyle(anchor, 'font-size') || '12pt',
      fontFamily:   this.getInlineStyle(anchor, 'font-family') || 'inherit',
      lineHeight:   this.getInlineStyle(anchor, 'line-height') || '1.5',
      letterSpacing: this.getInlineStyle(anchor, 'letter-spacing') || '0px',
      foreColor:    this.rgbToHex(this.getComputedStyle(anchor, 'color')) || '#000000',
      backColor:    '#ffff00',
      inTable,
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

  /** 커서가 위치한 td/th 반환 — 없으면 null */
  private getFocusedCell(): HTMLTableCellElement | null {
    const range = this.getActualRange();
    if (!range) return null;
    let node: Node | null = range.startContainer;
    while (node && node !== this.contentEl) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as Element).tagName.toLowerCase();
        if (tag === 'td' || tag === 'th') return node as HTMLTableCellElement;
        if (tag === 'table') break;
      }
      node = node.parentNode;
    }
    return null;
  }

  /** 커서가 위치한 테이블 반환 — 없으면 null */
  private getFocusedTable(): HTMLTableElement | null {
    return this.getFocusedCell()?.closest('table') as HTMLTableElement | null ?? null;
  }

  /** 임의 Node에서 가장 가까운 TABLE 요소 반환 — 없으면 null */
  private findTableNode(node: Node): HTMLTableElement | null {
    let cur: Node | null = node;
    while (cur && cur !== this.contentEl) {
      if (cur.nodeType === Node.ELEMENT_NODE &&
          (cur as Element).tagName === 'TABLE') {
        return cur as HTMLTableElement;
      }
      cur = cur.parentNode;
    }
    return null;
  }

  /** 표 선택 테두리 + 리사이즈 핸들 + 인라인 툴바 표시 */
  private selectTable(table: HTMLTableElement): void {
    if (this.selectedTable === table) return;
    this.deselectTable();
    this.selectedTable = table;
    table.classList.add('poa-table-selected');
    this.tableWholeResizer.attach(table);
    this.tableInlineToolbar.show(table, this.contentEl);
  }

  /** 표 선택 해제 — 핸들 + 인라인 툴바 제거 */
  private deselectTable(): void {
    this.selectedTable?.classList.remove('poa-table-selected');
    this.selectedTable = null;
    this.tableWholeResizer.detach();
    this.tableInlineToolbar.hide();
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
      /* 하이퍼링크 hover 툴팁 — CSS Popover 방식 */
      '.poa-editor-content a[href]:not(.poa-bookmark) {',
      '  position: relative;',
      '}',
      '.poa-editor-content a[href]:not(.poa-bookmark)::after {',
      '  content: attr(href);',
      '  position: absolute;',
      '  top: 100%;',
      '  left: 0;',
      '  margin-top: 3px;',
      '  background: #1a1a1a;',
      '  color: #fff;',
      '  padding: 3px 8px;',
      '  border-radius: 3px;',
      '  font-size: 11px;',
      '  font-style: normal;',
      '  text-decoration: none;',
      '  white-space: nowrap;',
      '  max-width: 320px;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '  opacity: 0;',
      '  pointer-events: none;',
      '  transition: opacity 0.15s;',
      '  z-index: 9999;',
      '}',
      '.poa-editor-content a[href]:not(.poa-bookmark):hover::after {',
      '  opacity: 1;',
      '}',
      /* 책갈피 앵커 스타일 */
      '.poa-editor-content a.poa-bookmark {',
      '  color: #9e9e9e;',
      '  font-size: 12px;',
      '  border: 1px dashed #bdbdbd;',
      '  border-radius: 2px;',
      '  padding: 0 3px;',
      '  cursor: default;',
      '  user-select: none;',
      '  -webkit-user-select: none;',
      '}',
      /* 표 선택 테두리 */
      '.poa-editor-content table.poa-table-selected {',
      '  outline: 2px solid #0078d7;',
      '  outline-offset: 1px;',
      '}',
      /* 숨김 테두리 표시 모드 */
      '.poa-editor-content.poa-show-hidden-borders table,',
      '.poa-editor-content.poa-show-hidden-borders td,',
      '.poa-editor-content.poa-show-hidden-borders th {',
      '  border: 1px dashed #bbb !important;',
      '}',
      '.poa-editor-content.poa-show-hidden-borders div,',
      '.poa-editor-content.poa-show-hidden-borders p {',
      '  outline: 1px dashed rgba(0,120,212,.25);',
      '}',
      /* 표 영역 넘침 방지 */
      '.poa-editor-content table {',
      '  max-width: 100%;',
      '  box-sizing: border-box;',
      '}',
      /* 셀 안 폼 컨트롤 넘침 방지 */
      '.poa-editor-content td input, .poa-editor-content th input,',
      '.poa-editor-content td textarea, .poa-editor-content th textarea,',
      '.poa-editor-content td select, .poa-editor-content th select {',
      '  max-width: 100%;',
      '  box-sizing: border-box;',
      '}',
      /* 선택된 셀 input 파란 테두리 */
      '.poa-editor-content .poa-input-selected {',
      '  outline: 2px solid #2563EB !important;',
      '  outline-offset: 1px;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  // ── 이미지 컨텍스트 메뉴 ─────────────────────────────────────────────────

  private showImgContextMenu(img: HTMLImageElement, x: number, y: number): void {
    this.hideImgContextMenu();

    const menu = document.createElement('div');
    menu.dataset.poaImgMenu = 'true';
    menu.style.cssText =
      `position:fixed;top:${y}px;left:${x}px;` +
      'background:#fff;border:1px solid #ccc;border-radius:4px;' +
      'box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;' +
      'padding:4px 0;min-width:150px;font-size:13px;';

    const items: Array<{ label: string; action: () => void; danger?: boolean }> = [
      {
        label: '이미지 속성',
        action: () => {
          void this.imageDialog.open(img.src, {
            alt: img.alt, title: img.title || undefined,
            width: img.style.width || undefined, height: img.style.height || undefined,
            border: img.style.border || undefined,
            align: (img.style.float as 'left' | 'right' | '') || undefined,
            id: img.id || undefined, className: img.className || undefined,
          });
        },
      },
      {
        label: '이미지 편집',
        action: () => { void this.imageDialog.open(img.src, {}); },
      },
      {
        label: '원본 크기로',
        action: () => {
          img.style.width  = img.naturalWidth  ? `${img.naturalWidth}px`  : '';
          img.style.height = img.naturalHeight ? `${img.naturalHeight}px` : '';
          this.imageResizer.syncOverlay();
          this.imageToolbar.update(img);
          void this.core.captureHistory('imageResize');
        },
      },
      {
        label: '너비 맞춤 (100%)',
        action: () => {
          const maxW = this.contentEl.clientWidth;
          img.style.width  = `${maxW}px`;
          img.style.height = '';
          this.imageResizer.syncOverlay();
          this.imageToolbar.update(img);
          void this.core.captureHistory('imageResize');
        },
      },
      {
        label: '이미지 삭제',
        danger: true,
        action: () => {
          this.imageResizer.deactivate();
          img.remove();
          void this.core.captureHistory('imageDelete');
          this.statusBar.update(this.contentEl.innerHTML);
          this.checkAltWarning();
        },
      },
    ];

    for (const item of items) {
      const btn = document.createElement('button');
      btn.textContent = item.label;
      btn.style.cssText =
        'display:block;width:100%;padding:6px 14px;border:none;background:transparent;' +
        `cursor:pointer;text-align:left;font-size:13px;color:${item.danger ? '#d32f2f' : '#222'};`;
      btn.addEventListener('mouseenter', () => { btn.style.background = '#f5f5f5'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
      btn.addEventListener('click', () => { item.action(); this.hideImgContextMenu(); });
      menu.appendChild(btn);
    }

    document.body.appendChild(menu);
    this.imgContextMenu = menu;

    // 외부 클릭 시 닫기
    const close = (): void => {
      this.hideImgContextMenu();
      document.removeEventListener('mousedown', close, { capture: true });
    };
    // setTimeout으로 현재 이벤트 루프가 끝난 뒤 등록 (바로 닫히는 것 방지)
    setTimeout(() => document.addEventListener('mousedown', close, { capture: true, once: true }), 0);
  }

  private hideImgContextMenu(): void {
    this.imgContextMenu?.remove();
    this.imgContextMenu = null;
  }

  // ── 링크 컨텍스트 메뉴 ──────────────────────────────────────────────────

  private showLinkContextMenu(anchor: HTMLAnchorElement, x: number, y: number): void {
    this.hideLinkContextMenu();

    const menu = document.createElement('div');
    menu.dataset.poaLinkMenu = 'true';
    menu.style.cssText =
      `position:fixed;top:${y}px;left:${x}px;` +
      'background:#fff;border:1px solid #ccc;border-radius:4px;' +
      'box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;' +
      'padding:4px 0;min-width:140px;font-size:13px;';

    const items: Array<{ label: string; action: () => void; danger?: boolean }> = [
      {
        label: '링크 수정',
        action: () => {
          this.linkInserter.saveSelection();
          this.bookmarkManager.saveSelection();
          this.linkDialog.setBookmarks(this.bookmarkManager.getAll());
          this.linkDialog.open('link', anchor);
        },
      },
      {
        label: '링크 제거',
        danger: true,
        action: () => {
          this.linkInserter.removeLink(anchor);
          void this.core.captureHistory('removeLink');
          this.statusBar.update(this.contentEl.innerHTML);
        },
      },
      {
        label: '링크 열기',
        action: () => {
          window.open(anchor.href, anchor.target || '_blank', 'noopener,noreferrer');
        },
      },
    ];

    for (const item of items) {
      const btn = document.createElement('button');
      btn.textContent = item.label;
      btn.style.cssText =
        'display:block;width:100%;padding:6px 14px;border:none;background:transparent;' +
        `cursor:pointer;text-align:left;font-size:13px;color:${item.danger ? '#d32f2f' : '#222'};`;
      btn.addEventListener('mouseenter', () => { btn.style.background = '#f5f5f5'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
      btn.addEventListener('click', () => { item.action(); this.hideLinkContextMenu(); });
      menu.appendChild(btn);
    }

    document.body.appendChild(menu);
    this.linkContextMenu = menu;

    setTimeout(() => document.addEventListener('mousedown', () => this.hideLinkContextMenu(), {
      capture: true, once: true,
    }), 0);
  }

  private hideLinkContextMenu(): void {
    this.linkContextMenu?.remove();
    this.linkContextMenu = null;
  }
}
