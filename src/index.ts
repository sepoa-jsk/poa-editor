export { EditorCore } from './core/EditorCore.js';
export type { EditorConfig, Command, FormatTag, TextAlign, ToolbarState, FormatName } from './core/types.js';
export { HistoryManager } from './core/history/HistoryManager.js';
export { Snapshot } from './core/history/Snapshot.js';
export { FormatCommand } from './core/commands/FormatCommand.js';

import { PoaToolbar } from './components/Toolbar.js';
import { PoaEditor } from './components/PoaEditor.js';
import { PoaStatusBar } from './components/StatusBar.js';

if (!customElements.get('poa-toolbar'))    customElements.define('poa-toolbar',    PoaToolbar);
if (!customElements.get('poa-editor'))     customElements.define('poa-editor',     PoaEditor);
if (!customElements.get('poa-status-bar')) customElements.define('poa-status-bar', PoaStatusBar);
