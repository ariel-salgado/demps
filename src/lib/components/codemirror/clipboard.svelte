<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { EditorContext } from '$lib/components/codemirror';

	import { getContext } from 'svelte';
	import { contextKey } from '$lib/components/codemirror';
	import { CheckedClipboardIcon, ClipboardIcon } from '$lib/components/icons';

	interface Props extends HTMLButtonAttributes {}

	const { ...props } = $props<Props>();

	const { getEditor } = getContext<EditorContext>(contextKey);

	const editor = getEditor();

	let copied: boolean = $state(false);

	const copyToClipboard = () => {
		if (editor) {
			navigator.clipboard.writeText(editor.state.doc.toString()).then(() => {
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 1500);
			});
		}
	};
</script>

<button
	type="button"
	class="inline-flex size-[30px] items-center justify-center rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300 transition-colors focus-within:bg-neutral-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-neutral-100"
	onclick={copyToClipboard}
	aria-label="Copy to clipboard"
	{...props}
>
	{#if !copied}
		<ClipboardIcon />
	{:else}
		<CheckedClipboardIcon />
	{/if}
</button>
