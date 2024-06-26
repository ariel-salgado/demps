<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { FeatureCollection } from 'geojson';
	import type { Environment } from '$lib/states.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { contextKey, extensions } from '$lib/components/codemirror';
	import { cn, debounce, isValidGeoJSON, strEqualsObj } from '$lib/utils';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		widgets?: Snippet;
		actions?: Snippet;
		content: Environment;
	}

	let { widgets, actions, content, class: className, ...props }: Props = $props();

	let editor: EditorView | undefined = $state();
	let topPosition: number | undefined = $state();
	let innerHeight: number | undefined = $state();

	setContext(contextKey, {
		getEditor: () => editor
	});

	const updateEnvironment = debounce((value: string) => {
		content.value = JSON.parse(value);
	}, 1000);

	const handleChanges = EditorView.updateListener.of((v) => {
		const value = v.state.doc.toString();
		if (v.docChanged && isValidGeoJSON(value) && !strEqualsObj(value, content.value!)) {
			updateEnvironment(value);
		}
	});

	function updateEditor(value: FeatureCollection) {
		if (!strEqualsObj(editor!.state.doc.toString(), value) && isValidGeoJSON(value)) {
			editor?.dispatch({
				changes: {
					from: 0,
					to: editor.state.doc.length,
					insert: JSON.stringify(value, null, 2)
				}
			});
		}
	}

	const initEditor: Action<HTMLDivElement, Environment> = (
		editorContainer: HTMLDivElement,
		content: Environment
	) => {
		topPosition = editorContainer.getBoundingClientRect().top;

		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(content.value, null, 2),
				extensions: [extensions, handleChanges]
			})
		});

		return {
			update(content: Environment) {
				updateEditor(content.value!);
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
	class={cn('flex size-full flex-col border border-x-slate-300', className)}
	style="max-height: {innerHeight! - topPosition! - 1}px"
	{...props}
>
	<div class="size-full overflow-y-auto" use:initEditor={content}>
		{#if editor && widgets}
			{@render widgets()}
		{/if}
	</div>

	{#if editor && actions}
		<div class="rounded-t-md border-t border-t-slate-300 p-4">
			{@render actions()}
		</div>
	{/if}
</div>
