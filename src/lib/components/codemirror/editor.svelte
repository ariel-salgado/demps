<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { key } from '$lib/components/codemirror';
	import { extensions } from '$lib/components/codemirror/extensions';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		widgets?: Snippet<void>;
		actions?: Snippet<void>;
	}

	let { widgets, actions, class: className, ...props } = $props<Props>();

	let editor: EditorView | undefined = $state(undefined);
	let topPosition: number | undefined = $state(undefined);
	let innerHeight: number | undefined = $state(undefined);

	setContext(key, {
		getEditor: () => editor
	});

	const initEditor: Action<HTMLDivElement> = (editorContainer: HTMLDivElement) => {
		topPosition = editorContainer.getBoundingClientRect().top;

		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify({ type: 'FeatureCollection', features: [] }, null, 2),
				extensions: [extensions]
			})
		});

		return {
			destroy() {
				editor?.destroy();
				editor = undefined;
			}
		};
	};
</script>

<svelte:window bind:innerHeight />

<div
	class={cn('flex h-full w-full flex-col overflow-y-auto', className)}
	style="max-height: {innerHeight! - topPosition!}px"
	{...props}
>
	<div class="h-full w-full" use:initEditor>
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
