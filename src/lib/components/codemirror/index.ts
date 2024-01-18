import type { EditorView } from '@codemirror/view';

import { key } from './context';
import { extensions } from './extensions';

import Editor from './editor.svelte';
import Widgets from './widgets.svelte';
import Download from './download.svelte';
import Clipboard from './clipboard.svelte';

export type EditorContext = {
	getEditor: () => EditorView;
};

export { key, extensions, Editor, Widgets, Download, Clipboard };