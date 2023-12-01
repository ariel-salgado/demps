<script lang="ts">
	import type { ChangeEventHandler, HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		files: FileList | null;
		accept: string;
		onUpload: ChangeEventHandler<HTMLInputElement>;
	}

	let { files, accept, onUpload, ...rest } = $props<Props>();
</script>

<div
	class="flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-primary-600 text-white transition-colors duration-300 hover:bg-primary-800 focus-visible:bg-primary-800"
>
	<label class="flex h-full w-full cursor-pointer justify-center gap-x-2 py-2" for="fileUpload">
		<slot />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="h-5 w-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			></path>
		</svg>
	</label>

	<input
		class="hidden"
		type="file"
		id="fileUpload"
		{accept}
		bind:files
		on:change="{onUpload}"
		{...rest}
	/>
</div>
