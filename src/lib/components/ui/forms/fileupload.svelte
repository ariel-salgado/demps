<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChangeEventHandler, HTMLAttributes } from 'svelte/elements';

	import { Button } from '$lib/components/ui/button';

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		accept: string;
		files: FileList | null;
		onUpload: ChangeEventHandler<HTMLInputElement>;
		children: Snippet<void>;
	}

	let { accept, files, onUpload, children, ...props } = $props<Props>();
</script>

<Button {...props} aria-label="Upload file">
	<label class="flex h-full w-full cursor-pointer justify-center gap-x-2" for="fileUpload">
		{@render children()}
	</label>

	<input class="hidden" type="file" id="fileUpload" {accept} bind:files onchange={onUpload} />
</Button>
