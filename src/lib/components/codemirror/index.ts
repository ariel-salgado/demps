import type { EditorView } from '@codemirror/view';
import Codemirror from './codemirror.svelte';
import Clipboard from './clipboard.svelte';
import { extensions } from './config';

export type EditorContext = {
	getEditor: () => EditorView;
};

export { Codemirror, Clipboard, extensions };
