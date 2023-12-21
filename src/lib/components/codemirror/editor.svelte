<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { ViewUpdate } from '@codemirror/view';
	import type { HTMLAttributes } from 'svelte/elements';

	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { key } from '$lib/components/codemirror';
	import { cn, debounce, strEqualsObj } from '$lib/utils';
	import { extensions } from '$lib/components/codemirror/extensions';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		widgets?: Snippet<void>;
		actions?: Snippet<void>;
		data: GeoJSONStore;
	}

	let { widgets, actions, data, class: className, ...props } = $props<Props>();

	let editor: EditorView | undefined = $state();
	let topPosition: number | undefined = $state();
	let innerHeight: number | undefined = $state();

	setContext(key, {
		getEditor: () => editor
	});

	const updateStore = debounce((value: string) => {
		data.set(JSON.parse(value));
	}, 750);

	const editorOnChange = EditorView.updateListener.of((v: ViewUpdate) => {
		const value = v.state.doc.toString();
		if (v.docChanged && !strEqualsObj(value, $data)) {
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
		topPosition = editorContainer.getBoundingClientRect().top;

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

<svelte:window bind:innerHeight />

<div
	class={cn('flex h-full w-full flex-col', className)}
	style="max-height: {innerHeight! - topPosition! - 1}px"
	{...props}
>
	<div class="h-full w-full overflow-y-auto" use:initEditor={$data}>
		{#if editor && widgets}
			{@render widgets()}
		{/if}
	</div>

	{#if editor}
		<div class="rounded-t-md border-x border-t border-x-slate-300 border-t-slate-300 p-6">
			{#if editor && actions}
				{@render actions()}
			{/if}
		</div>
	{/if}
</div>
