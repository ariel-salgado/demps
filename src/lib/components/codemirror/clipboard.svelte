<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { EditorContext } from '$lib/components/codemirror';

	import { getContext } from 'svelte';
	import { key } from '$lib/components/codemirror';
	import { ClipboardCheckedIcon, ClipboardIcon } from '$lib/components/icons';

	interface Props extends HTMLAttributes<HTMLButtonElement> {}

	const { ...props } = $props<Props>();

	const { getEditor } = getContext<EditorContext>(key);
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
	class="h-min w-min rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300"
	onclick={copyToClipboard}
	aria-label="Copy to clipboard"
	{...props}
>
	{#if !copied}
		<ClipboardIcon />
	{:else}
		<ClipboardCheckedIcon />
	{/if}
</button>
