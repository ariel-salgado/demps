<script lang="ts">
	import type { Action } from 'svelte/action';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror';

	let editor: EditorView | undefined;
	let doc: string | undefined;

	const initEditor: Action<HTMLDivElement> = (editorContainer: HTMLDivElement) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: doc,
				extensions: [...extensions]
			})
		});

		return {
			destroy: () => {
				editor?.destroy();
				editor = undefined;
			}
		};
	};
</script>

<div use:initEditor />
