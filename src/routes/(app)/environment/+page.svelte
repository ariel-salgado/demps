<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Leaflet } from '$lib/components/leaflet';
	import { Codemirror } from '$lib/components/codemirror';
	import { GeoJSONStore } from '$lib/stores';

	export let form: ActionData;

	$: if (form?.data) {
		GeoJSONStore.set(form?.data);
	}

	// Viña del Mar, Chile
	const initialView: L.LatLngExpression = [-33.015348, -71.550499];
	const zoom: number = 15;
</script>

<div class="w-full h-[calc(100vh-5rem)] flex">
	<div class="w-2/3">
		<Leaflet view={initialView} {zoom} />
	</div>
	<div class="w-1/3 grid grid-rows-[1fr_auto]">
		<div class="w-auto overflow-auto">
			<Codemirror geojson={$GeoJSONStore} />
		</div>
		<form
			class="flex px-4 py-6 outline outline-1 outline-slate-300 rounded-t-md"
			method="post"
			use:enhance
			enctype="multipart/form-data"
		>
			<input
				class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-800 border border-slate-300 rounded-l-md file:transition-colors file:duration-300"
				type="file"
				name="fileToUpload"
				accept=".geojson"
			/>
			<button
				class="px-3 py-1.5 rounded-r-md bg-primary-600 hover:bg-primary-800 focus-within:bg-primary-800 transition-colors duration-300"
				type="submit"
			>
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
			</button>
		</form>
	</div>
</div>
