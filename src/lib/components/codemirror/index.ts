import type { EditorView } from '@codemirror/view';

import { key } from './context'
import Editor from './editor.svelte';
import Widgets from './widgets.svelte';
import Clipboard from './clipboard.svelte';
import Download from './download.svelte';

export type EditorContext = {
	getEditor: () => EditorView;
};

export {
    key,
    Editor,
    Widgets,
    Clipboard,
    Download
}