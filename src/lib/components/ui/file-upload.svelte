<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let files: FileList | null = null;
	export let accept: string;
	export let onUpload: ChangeEventHandler<HTMLInputElement>;
</script>

<div
	class="flex w-full h-10 bg-primary-600 rounded-md text-white items-center justify-center cursor-pointer"
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
		{...$$restProps}
	/>
</div>

<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let accept: string;
	export let onSubmit: SubmitFunction;
</script>

<form class="file-form" method="post" use:enhance={onSubmit} enctype="multipart/form-data">
	<input class="file-input" type="file" name="file" {accept} />
	<button class="file-upload" type="submit">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="icon"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			/>
		</svg>
	</button>
</form>

<style lang="postcss">
	.file-form {
		@apply flex;
	}

	.file-form .file-input {
		@apply block w-full h-10 text-sm text-slate-500 file:mr-4 file:py-[9px] file:px-3 file:rounded-l-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-800 border border-slate-300 rounded-l-md file:transition-colors file:duration-300 bg-white;
	}

	.file-form .file-upload {
		@apply px-3 py-2 rounded-r-md bg-primary-600 hover:bg-primary-800 focus-within:bg-primary-800 transition-colors duration-300;
	}

	.file-form .icon {
		@apply w-5 h-5;
	}
</style>
 -->
