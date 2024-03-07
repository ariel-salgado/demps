<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { Button } from '$lib/components/ui/forms';

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		accept: string;
		files: FileList | null;
		children: Snippet;
	}

	let { accept, files, children, ...props } = $props<Props>();
</script>

<Button class="p-0" {...props}>
	<label
		class="flex h-full w-full cursor-pointer items-center justify-center gap-x-1 px-4 py-2"
		for="fileUpload"
	>
		{@render children()}
	</label>

	<input class="hidden" type="file" id="fileUpload" {accept} bind:files />
</Button>
