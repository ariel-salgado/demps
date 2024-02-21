<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChangeEventHandler, HTMLAttributes } from 'svelte/elements';

	import { Button } from '$lib/components/ui/forms';

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		accept: string;
		files: FileList | null;
		onUpload: ChangeEventHandler<HTMLInputElement>;
		children: Snippet;
	}

	let { accept, files, onUpload, children, ...props } = $props<Props>();
</script>

<Button class="p-0" {...props}>
	<label
		class="flex h-full w-full cursor-pointer items-center justify-center gap-x-1 px-4 py-2"
		for="fileUpload"
	>
		{@render children()}
	</label>

	<input class="hidden" type="file" id="fileUpload" {accept} bind:files onchange={onUpload} />
</Button>
