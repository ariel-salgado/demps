<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { GeoJSONStore } from '$lib/stores';

	export let accept: string;

	const uploadFile: SubmitFunction = ({ formData, cancel }) => {
		const { file } = Object.fromEntries(formData);

		if (file instanceof File) {
			const reader = new FileReader();

			reader.onload = () => {
				const data = JSON.parse(reader.result as string);

				GeoJSONStore.set(data);
			};

			reader.readAsText(file);
		}

		cancel();
	};
</script>

<form class="file-form" method="post" use:enhance={uploadFile} enctype="multipart/form-data">
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
		@apply flex p-4 outline outline-1 outline-slate-300 rounded-t-md bg-primary-50;
	}

	.file-form .file-input {
		@apply block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-l-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-800 border border-slate-300 rounded-l-md file:transition-colors file:duration-300 bg-white;
	}

	.file-form .file-upload {
		@apply px-3 py-2 rounded-r-md bg-primary-600 hover:bg-primary-800 focus-within:bg-primary-800 transition-colors duration-300;
	}

	.file-form .icon {
		@apply w-5 h-5;
	}
</style>
