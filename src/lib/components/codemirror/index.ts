import type { EditorView } from '@codemirror/view';
import Codemirror from './codemirror.svelte';
import Clipboard from './clipboard.svelte';
import FileUpload from './file-upload.svelte';
import { extensions } from './config';
import { key } from './key';

export type EditorContext = {
	getEditor: () => EditorView;
};

export { Codemirror, Clipboard, FileUpload, extensions, key };
