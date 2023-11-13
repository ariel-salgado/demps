<script lang="ts">
	import type { Action } from 'svelte/action';
	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror';
	import { key } from '$lib/components/codemirror';

	export let source: GeoJSON.FeatureCollection;

	let editor: EditorView | undefined;

	setContext(key, {
		getEditor: () => editor
	});

	const initEditor: Action<HTMLDivElement, GeoJSON.FeatureCollection> = (
		editorContainer: HTMLDivElement,
		source: GeoJSON.FeatureCollection
	) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(source, null, 2),
				extensions: [...extensions]
			})
		});

		return {
			update: (source: GeoJSON.FeatureCollection) => {
				if (editor) {
					editor?.dispatch({
						changes: {
							from: 0,
							to: editor.state.doc.length,
							insert: JSON.stringify(source, null, 2)
						}
					});

					console.log(editor.state.doc.toString());
				}
			},
			destroy: () => {
				editor?.destroy();
				editor = undefined;
			}
		};
	};
</script>

<div class="h-full grid grid-rows-[1fr_auto]">
	<div class="relative overflow-y-scroll text-sm" use:initEditor={source}>
		{#if editor}
			<slot name="clipboard" />
		{/if}
	</div>
	{#if editor}
		<slot name="file-upload" />
	{/if}
</div>
