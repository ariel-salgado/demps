<script lang="ts">
	import type { Action } from 'svelte/action';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror';

	export let geojson: GeoJSON.FeatureCollection;

	let editor: EditorView | undefined;

	const initEditor: Action<HTMLDivElement, GeoJSON.FeatureCollection> = (
		editorContainer: HTMLDivElement,
		geojson: GeoJSON.FeatureCollection
	) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(geojson, null, 2),
				extensions: [...extensions]
			})
		});

		return {
			update: (geojson: GeoJSON.FeatureCollection) => {
				if (editor) {
					editor?.dispatch({
						changes: {
							from: 0,
							to: editor.state.doc.length,
							insert: JSON.stringify(geojson, null, 2)
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

<div class="w-full h-full overflow-y-scroll text-sm" use:initEditor={geojson} />
