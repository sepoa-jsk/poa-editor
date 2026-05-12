import './style.css';

// ── Public API ────────────────────────────────────────────────────────────────

export { PoaEditor } from './components/PoaEditor.js';
export { EditorCore } from './core/EditorCore.js';
export type { EditorConfig, Command, FormatTag, TextAlign, ToolbarState, FormatName, MenuTab } from './core/types.js';
export { HistoryManager } from './core/history/HistoryManager.js';
export { Snapshot } from './core/history/Snapshot.js';
export { FormatCommand } from './core/commands/FormatCommand.js';
export { ClipboardHandler } from './modules/edit/ClipboardHandler.js';
export { FindReplace } from './modules/edit/FindReplace.js';
export { ImageEditor } from './modules/edit/ImageEditor.js';
export { ImageInserter, ALLOWED_IMG_EXTENSIONS } from './modules/insert/ImageInserter.js';
export { MultiImageUploader, MULTI_ALLOWED_EXTENSIONS } from './modules/insert/MultiImageUploader.js';
export { LinkInserter, validateLinkUrl } from './modules/insert/LinkInserter.js';
export { BookmarkManager } from './modules/insert/BookmarkManager.js';
export { ImageResizer } from './modules/insert/ImageResizer.js';
export { ViewManager } from './modules/view/ViewManager.js';
export type { ViewMode, ViewManagerCallbacks } from './modules/view/ViewManager.js';
export { PageView, PageGuide } from './modules/view/PageView.js';
export type { PageMargin } from './modules/view/PageView.js';
export { TableBuilder } from './modules/table/TableBuilder.js';
export { CellMerger, buildGridMap } from './modules/table/CellMerger.js';
export { TableNavigator } from './modules/table/TableNavigator.js';
export { TableResizer } from './modules/table/TableResizer.js';
export { TableSelector } from './modules/table/TableSelector.js';
export { TableHandle } from './modules/table/TableHandle.js';
export { TableWholeResizer } from './modules/table/TableWholeResizer.js';
export { TableInlineToolbar } from './modules/table/TableInlineToolbar.js';
export type { TableWholeResizerCallbacks } from './modules/table/TableWholeResizer.js';
export type { TableInlineToolbarCallbacks } from './modules/table/TableInlineToolbar.js';
export { TABLE_PRESETS, applyPreset } from './modules/table/TablePresets.js';
export type { TablePreset } from './modules/table/TablePresets.js';
export { TableContextMenu } from './modules/table/TableContextMenu.js';
export { PoaCellSplitDialog } from './components/dialogs/CellSplitDialog.js';
export type { TableOptions, HeaderPosition } from './modules/table/TableBuilder.js';
export type { GridCell, CellProperties, MergeResult } from './modules/table/CellMerger.js';
export type { TableNavigatorCallbacks } from './modules/table/TableNavigator.js';
export type { TableContextCallbacks } from './modules/table/TableContextMenu.js';
export type { FindOptions, FindState } from './modules/edit/FindReplace.js';
export type { CropRect, RotateDegrees, FlipDirection } from './modules/edit/ImageEditor.js';
export type { ImageAttributes, UploadConfig } from './modules/insert/ImageInserter.js';
export type { UploadItem, MultiUploadOptions, ValidationResult } from './modules/insert/MultiImageUploader.js';
export type { LinkAttributes } from './modules/insert/LinkInserter.js';
export type { BookmarkEntry } from './modules/insert/BookmarkManager.js';
export type { ImageResizerCallbacks } from './modules/insert/ImageResizer.js';
export { AccessibilityChecker } from './modules/accessibility/AccessibilityChecker.js';
export type { AccessibilityIssue, AccessibilityResult, IssueLevel } from './modules/accessibility/AccessibilityChecker.js';
export { PrivacyChecker } from './modules/privacy/PrivacyChecker.js';
export type { PrivacyMatch, PrivacyType, RiskLevel } from './modules/privacy/PrivacyChecker.js';
export { TableFormulaManager, calculate, formatResult, getCellAt, getCellPosition } from './modules/table/TableFormula.js';
export type { Formula, FormulaFn, FormulaFormat } from './modules/table/TableFormula.js';
export { VideoInserter, parseEmbedUrl, buildVideoHtml, buildEmbedHtml } from './modules/insert/VideoInserter.js';
export type { VideoAttributes, EmbedAttributes, ParsedEmbed, VideoMimeType, EmbedProvider } from './modules/insert/VideoInserter.js';
export { PoaVideoDialog } from './components/dialogs/VideoDialog.js';
export { FormControlInserter, buildFormControlHtml, generateControlId } from './modules/form/FormControlInserter.js';
export type { FormControl, ControlType, ButtonType, ButtonStyle, ResizeMode, RadioOption, SelectOption } from './modules/form/FormControlInserter.js';
export { FormControlEditor } from './modules/form/FormControlEditor.js';
export { InputResizer } from './modules/form/InputResizer.js';
export { InputInlineToolbar } from './modules/form/InputInlineToolbar.js';
export type { InputInlineToolbarCallbacks } from './modules/form/InputInlineToolbar.js';
export { PoaFormControlDialog } from './components/dialogs/FormControlDialog.js';
export { TemplateManager } from './modules/template/TemplateManager.js';
export type { TemplateNode } from './modules/template/TemplateManager.js';
export { PoaTemplateTree } from './components/TemplateTree.js';
export { PoaTemplateDialog } from './components/dialogs/TemplateDialog.js';
export { SignatureManager, buildSignatureHtml, MAX_LOGO_BYTES } from './modules/signature/SignatureManager.js';
export type { Signature, SignatureFields, SignatureLayout } from './modules/signature/SignatureManager.js';
export { PoaSignatureDialog } from './components/dialogs/SignatureDialog.js';
export { EmojiInserter, searchEmojis, EMOJI_CATEGORIES, EMOJI_KEYWORDS } from './modules/insert/EmojiInserter.js';
export type { EmojiCategory } from './modules/insert/EmojiInserter.js';
export { TooltipManager } from './modules/insert/TooltipManager.js';
export type { TooltipEntry } from './modules/insert/TooltipManager.js';
export { FieldInserter } from './modules/insert/FieldInserter.js';
export { DOCUMENT_FIELDS, FIELD_MAP, getActiveDocumentFields, getActiveFieldMap, loadFieldDefinitions, loadFieldCategories, saveFieldDefinitions, saveFieldCategories, NUMBER_FORMAT_OPTIONS, DATE_FORMAT_OPTIONS } from './modules/insert/DocumentFields.js';
export type { DocumentField, FieldDefinition, FieldCategory } from './modules/insert/DocumentFields.js';
export { PoaEmojiDialog }          from './components/dialogs/EmojiDialog.js';
export { PoaTooltipDialog }        from './components/dialogs/TooltipDialog.js';
export { PoaInputPropertyDialog }  from './components/dialogs/InputPropertyDialog.js';
export { PoaSettingsDialog, loadSettings } from './components/dialogs/SettingsDialog.js';
export type { PoaSettings } from './components/dialogs/SettingsDialog.js';
export { PoaFileManagerDialog } from './components/dialogs/FileManagerDialog.js';
export { PoaDocumentListDialog } from './components/dialogs/DocumentListDialog.js';
export { PoaDocTitleDialog }     from './components/dialogs/DocTitleDialog.js';
export { DocumentApiClient } from './modules/document/DocumentApiClient.js';
export type { DocumentMeta, DocumentDetail } from './modules/document/DocumentApiClient.js';
export { PoaShortcutsDialog } from './components/dialogs/ShortcutsDialog.js';
export { PoaUserGuideDialog }  from './components/dialogs/UserGuideDialog.js';

// ── Web Components 등록 ───────────────────────────────────────────────────────

import { PoaMenuBar } from './components/MenuBar.js';
import { PoaContextToolbar } from './components/ContextToolbar.js';
import { PoaToolbar } from './components/Toolbar.js';
import { PoaEditor } from './components/PoaEditor.js';
import { PoaStatusBar } from './components/StatusBar.js';
import { PoaSettingsDialog } from './components/dialogs/SettingsDialog.js';
import { PoaFileManagerDialog } from './components/dialogs/FileManagerDialog.js';
import { PoaFindReplaceDialog } from './components/dialogs/FindReplaceDialog.js';
import { PoaImageEditDialog } from './components/dialogs/ImageEditDialog.js';
import { PoaImageDialog } from './components/dialogs/ImageDialog.js';
import { PoaTableDialog } from './components/dialogs/TableDialog.js';
import { PoaCellSplitDialog as _PoaCellSplitDialog } from './components/dialogs/CellSplitDialog.js';
import { PoaLinkDialog } from './components/dialogs/LinkDialog.js';
import { PoaImageToolbar } from './components/ImageToolbar.js';
import { PoaConfirmDialog } from './components/ConfirmDialog.js';
import { PoaAccessibilityDialog } from './components/dialogs/AccessibilityDialog.js';
import { PoaPrivacyDialog } from './components/dialogs/PrivacyDialog.js';
import { PoaFormulaDialog } from './components/dialogs/FormulaDialog.js';
import { PoaVideoDialog as _PoaVideoDialog } from './components/dialogs/VideoDialog.js';
import { PoaFormControlDialog as _PoaFormControlDialog } from './components/dialogs/FormControlDialog.js';
import { PoaTemplateTree as _PoaTemplateTree } from './components/TemplateTree.js';
import { PoaTemplateDialog  as _PoaTemplateDialog  } from './components/dialogs/TemplateDialog.js';
import { PoaSignatureDialog as _PoaSignatureDialog } from './components/dialogs/SignatureDialog.js';
import { PoaEmojiDialog    as _PoaEmojiDialog    } from './components/dialogs/EmojiDialog.js';
import { PoaTooltipDialog       as _PoaTooltipDialog       } from './components/dialogs/TooltipDialog.js';
import { PoaInputPropertyDialog as _PoaInputPropertyDialog } from './components/dialogs/InputPropertyDialog.js';
import { PoaDocumentListDialog  as _PoaDocumentListDialog  } from './components/dialogs/DocumentListDialog.js';
import { PoaDocTitleDialog      as _PoaDocTitleDialog      } from './components/dialogs/DocTitleDialog.js';
import { PoaShortcutsDialog     as _PoaShortcutsDialog     } from './components/dialogs/ShortcutsDialog.js';
import { PoaUserGuideDialog     as _PoaUserGuideDialog     } from './components/dialogs/UserGuideDialog.js';

// poa-editor의 connectedCallback 시점에 모든 하위 요소가 이미 정의되어 있어야 한다.
// poa-editor를 마지막으로 등록하면 shadow.innerHTML 파싱 시 child 요소가 즉시 업그레이드된다.
if (!customElements.get('poa-menubar'))              customElements.define('poa-menubar',              PoaMenuBar);
if (!customElements.get('poa-context-toolbar'))      customElements.define('poa-context-toolbar',      PoaContextToolbar);
if (!customElements.get('poa-toolbar'))              customElements.define('poa-toolbar',              PoaToolbar);
if (!customElements.get('poa-status-bar'))           customElements.define('poa-status-bar',           PoaStatusBar);
if (!customElements.get('poa-settings-dialog'))      customElements.define('poa-settings-dialog',      PoaSettingsDialog);
if (!customElements.get('poa-file-manager-dialog'))  customElements.define('poa-file-manager-dialog',  PoaFileManagerDialog);
if (!customElements.get('poa-find-replace-dialog'))  customElements.define('poa-find-replace-dialog',  PoaFindReplaceDialog);
if (!customElements.get('poa-image-edit-dialog'))    customElements.define('poa-image-edit-dialog',    PoaImageEditDialog);
if (!customElements.get('poa-image-dialog'))         customElements.define('poa-image-dialog',         PoaImageDialog);
if (!customElements.get('poa-table-dialog'))         customElements.define('poa-table-dialog',         PoaTableDialog);
if (!customElements.get('poa-cell-split-dialog'))    customElements.define('poa-cell-split-dialog',    _PoaCellSplitDialog);
if (!customElements.get('poa-link-dialog'))          customElements.define('poa-link-dialog',          PoaLinkDialog);
if (!customElements.get('poa-image-toolbar'))        customElements.define('poa-image-toolbar',        PoaImageToolbar);
if (!customElements.get('poa-confirm-dialog'))         customElements.define('poa-confirm-dialog',         PoaConfirmDialog);
if (!customElements.get('poa-accessibility-dialog'))   customElements.define('poa-accessibility-dialog',   PoaAccessibilityDialog);
if (!customElements.get('poa-privacy-dialog'))         customElements.define('poa-privacy-dialog',         PoaPrivacyDialog);
if (!customElements.get('poa-formula-dialog'))         customElements.define('poa-formula-dialog',         PoaFormulaDialog);
if (!customElements.get('poa-video-dialog'))             customElements.define('poa-video-dialog',             _PoaVideoDialog);
if (!customElements.get('poa-form-control-dialog'))      customElements.define('poa-form-control-dialog',      _PoaFormControlDialog);
if (!customElements.get('poa-template-tree'))            customElements.define('poa-template-tree',            _PoaTemplateTree);
if (!customElements.get('poa-template-dialog'))          customElements.define('poa-template-dialog',          _PoaTemplateDialog);
if (!customElements.get('poa-signature-dialog'))         customElements.define('poa-signature-dialog',         _PoaSignatureDialog);
if (!customElements.get('poa-emoji-dialog'))             customElements.define('poa-emoji-dialog',             _PoaEmojiDialog);
if (!customElements.get('poa-tooltip-dialog'))           customElements.define('poa-tooltip-dialog',           _PoaTooltipDialog);
if (!customElements.get('poa-input-property-dialog'))    customElements.define('poa-input-property-dialog',    _PoaInputPropertyDialog);
if (!customElements.get('poa-document-list-dialog'))     customElements.define('poa-document-list-dialog',     _PoaDocumentListDialog);
if (!customElements.get('poa-doc-title-dialog'))         customElements.define('poa-doc-title-dialog',         _PoaDocTitleDialog);
if (!customElements.get('poa-shortcuts-dialog'))         customElements.define('poa-shortcuts-dialog',         _PoaShortcutsDialog);
if (!customElements.get('poa-user-guide-dialog'))        customElements.define('poa-user-guide-dialog',        _PoaUserGuideDialog);
if (!customElements.get('poa-editor'))                   customElements.define('poa-editor',                   PoaEditor);

// ── 팩토리 함수 ───────────────────────────────────────────────────────────────

/**
 * poa-editor 인스턴스를 생성하고 컨테이너에 추가한다.
 *
 * @param container - 에디터를 추가할 부모 요소
 * @param options.placeholder - 빈 에디터에 표시할 안내 문구
 * @param options.readonly - 읽기 전용 여부
 *
 * @example
 * ```ts
 * import { createEditor } from '@sepoa-jsk/poa-editor';
 * const editor = createEditor(document.getElementById('app'), {
 *   placeholder: '내용을 입력하세요...',
 * });
 * editor.setHTML('<p>안녕하세요!</p>');
 * ```
 */
export function createEditor(
  container: HTMLElement,
  options?: { placeholder?: string; readonly?: boolean },
): PoaEditor {
  const editor = document.createElement('poa-editor') as unknown as PoaEditor;
  if (options?.placeholder) editor.setAttribute('placeholder', options.placeholder);
  if (options?.readonly)    editor.setAttribute('readonly', '');
  container.appendChild(editor);
  return editor;
}
