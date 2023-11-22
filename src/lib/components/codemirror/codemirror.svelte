<script lang="ts">
	import { setContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import { EditorView } from '@codemirror/view';
	import { stringify } from '$lib/utils/helpers';
	import { EditorState } from '@codemirror/state';
	import { key } from '$lib/components/codemirror';
	import { extensions } from '$lib/components/codemirror';

	interface Props {
		source: GeoJSON.FeatureCollection;
	}

	let { source } = $props<Props>();
	let editor: EditorView | undefined = $state(undefined);

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
				doc: stringify(source),
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
							insert: stringify(source)
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

<div class="h-full grid grid-rows-[1fr_auto]">
	<div class="relative overflow-y-scroll text-sm" use:initEditor={source}>
		{#if editor}
			<slot name="widgets" />
		{/if}
	</div>
	{#if editor}
		<slot name="file-upload" />
	{/if}
</div>
