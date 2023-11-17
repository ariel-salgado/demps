<script lang="ts">
	import type { Action } from 'svelte/action';
	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror';
	import { key } from '$lib/components/codemirror';
	import { stringify } from '$lib/utils/helpers';

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

<div class="map-container">
	<div class="map" use:initEditor={source}>
		{#if editor}
			<slot name="widgets" />
		{/if}
	</div>
	{#if editor}
		<slot name="file-upload" />
	{/if}
</div>

<style lang="postcss">
	.map-container {
		@apply h-full grid grid-rows-[1fr_auto];
	}
	.map-container > .map {
		@apply relative overflow-y-scroll text-sm;
	}
</style>
