<script context="module">
	export const key = Symbol();
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { HTMLAttributes } from 'svelte/elements';

	import { setContext } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { extensions } from '$lib/components/codemirror/extensions';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}

	let { children, ...props } = $props<Props>();

	let editor: EditorView | undefined = $state(undefined);

	setContext(key, {
		getEditor: () => editor
	});

	const initEditor: Action<HTMLDivElement> = (editorContainer: HTMLDivElement) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: 'Hello World',
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

<div use:initEditor {...props}>
	{#if editor && children}
		{@render children()}
	{/if}
</div>
