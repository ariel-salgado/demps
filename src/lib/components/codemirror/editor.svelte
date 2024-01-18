<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { debounce, strEqualsObj } from '$lib/utils';
	import { key, extensions } from '$lib/components/codemirror';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		store: GeoJSONStore;
	}

	let { store, class: className, ...props } = $props<Props>();

	let editor: EditorView | undefined = $state();

	setContext(key, {
		getEditor: () => editor
	});

	const updateStore = debounce((value: string) => {
		store.set(JSON.parse(value));
	}, 750);

	const editorOnChange = EditorView.updateListener.of((v) => {
		const value = v.state.doc.toString();
		if (v.docChanged && !strEqualsObj(value, $store)) {
			updateStore(value);
		}
	});

	const updateEditor = (value: FeatureCollection) => {
		if (!strEqualsObj(editor!.state.doc.toString(), value)) {
			editor?.dispatch({
				changes: {
					from: 0,
					to: editor.state.doc.length,
					insert: JSON.stringify(value, null, 2)
				}
			});
		}
	};

	const initEditor: Action<HTMLDivElement, FeatureCollection> = (
		editorContainer: HTMLDivElement,
		features: FeatureCollection
	) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(features, null, 2),
				extensions: [extensions, editorOnChange]
			})
		});

		return {
			update(value: FeatureCollection) {
				updateEditor(value);
			},

			destroy() {
				editor?.destroy();
				editor = undefined;
			}
		};
	};
</script>

<div class="h-full w-full overflow-y-auto" use:initEditor={$store}></div>
