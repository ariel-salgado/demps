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
	class="flex w-full h-10 bg-primary-600 hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300 rounded-md text-white items-center justify-center cursor-pointer"
>
	<label class="flex w-full h-full cursor-pointer py-2 justify-center gap-x-2" for="fileUpload">
		<slot />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="w-5 h-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			/>
		</svg>
	</label>

	<input
		class="hidden"
		type="file"
		id="fileUpload"
		{accept}
		bind:files
		on:change={onUpload}
		{...rest}
	/>
</div>
