import type { EditorView } from '@codemirror/view';

import Editor from './editor.svelte';
import Widgets from './widgets.svelte';
import Download from './download.svelte';
import Clipboard from './clipboard.svelte';

export { extensions } from './extensions';

export type EditorContext = {
	getEditor: () => EditorView;
};

export const contextKey = Symbol();

export { Editor, Widgets, Download, Clipboard };
