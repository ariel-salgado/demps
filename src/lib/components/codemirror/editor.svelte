<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { Environment } from '$lib/states.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { contextKey, extensions } from '$lib/components/codemirror';

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

	const initEditor: Action<HTMLDivElement, Environment> = (
		editorContainer: HTMLDivElement,
		content: Environment
	) => {
		topPosition = editorContainer.getBoundingClientRect().top;

		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: JSON.stringify(content.value, null, 2),
				extensions: [extensions]
			})
		});

		return {
			update(content: Environment) {
				editor?.dispatch({
					changes: {
						from: 0,
						to: editor.state.doc.length,
						insert: JSON.stringify(content.value, null, 2)
					}
				});
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
