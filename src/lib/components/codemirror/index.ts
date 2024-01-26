import type { EditorView } from '@codemirror/view';

import { extensions } from './extensions';

//@ts-expect-error - TS doesn't know about the module context api
import Editor, { contextKey } from './editor.svelte';
import Widgets from './widgets.svelte';
import Enhance from './enhance.svelte';
import Download from './download.svelte';
import Clipboard from './clipboard.svelte';

export type EditorContext = {
	getEditor: () => EditorView;
};

export { contextKey, extensions, Editor, Widgets, Enhance, Download, Clipboard };