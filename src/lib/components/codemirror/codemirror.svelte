<script lang="ts">
	import type { Action } from 'svelte/action';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror';

	export let json: any;

	let editor: EditorView | undefined;

	// @ts-ignore
	const initEditor: Action<HTMLDivElement, any> = (editorContainer: HTMLDivElement, json: any) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(json, null, 2),
				extensions: [...extensions]
			})
		});

		return {
			update: (json: any) => {
				if (editor) {
					editor?.dispatch({
						changes: {
							from: 0,
							to: editor.state.doc.length,
							insert: JSON.stringify(json, null, 2)
						}
					});
				}
			},
			destroy: () => {
				editor?.destroy();
				editor = undefined;
			}
		};
	};
</script>

<div class="w-full h-full overflow-y-scroll text-base" use:initEditor={json} />
