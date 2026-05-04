export { EditorCore } from './core/EditorCore.js';
export type { EditorConfig, Command, FormatTag, TextAlign, ToolbarState, FormatName } from './core/types.js';
export { HistoryManager } from './core/history/HistoryManager.js';
export { Snapshot } from './core/history/Snapshot.js';
export { FormatCommand } from './core/commands/FormatCommand.js';
export { ClipboardHandler } from './modules/edit/ClipboardHandler.js';
export { FindReplace } from './modules/edit/FindReplace.js';
export { ImageEditor } from './modules/edit/ImageEditor.js';
export type { FindOptions, FindState } from './modules/edit/FindReplace.js';
export type { CropRect, RotateDegrees, FlipDirection } from './modules/edit/ImageEditor.js';

import { PoaToolbar } from './components/Toolbar.js';
import { PoaEditor } from './components/PoaEditor.js';
import { PoaStatusBar } from './components/StatusBar.js';
import { PoaSettingsDialog } from './components/dialogs/SettingsDialog.js';
import { PoaFindReplaceDialog } from './components/dialogs/FindReplaceDialog.js';
import { PoaImageEditDialog } from './components/dialogs/ImageEditDialog.js';

if (!customElements.get('poa-toolbar'))              customElements.define('poa-toolbar',              PoaToolbar);
if (!customElements.get('poa-editor'))               customElements.define('poa-editor',               PoaEditor);
if (!customElements.get('poa-status-bar'))           customElements.define('poa-status-bar',           PoaStatusBar);
if (!customElements.get('poa-settings-dialog'))      customElements.define('poa-settings-dialog',      PoaSettingsDialog);
if (!customElements.get('poa-find-replace-dialog'))  customElements.define('poa-find-replace-dialog',  PoaFindReplaceDialog);
if (!customElements.get('poa-image-edit-dialog'))    customElements.define('poa-image-edit-dialog',    PoaImageEditDialog);
