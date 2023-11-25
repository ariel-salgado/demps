<script lang="ts">
	import { get } from 'svelte/store';
	import { EnvStore } from '$lib/stores';
	import { stringify } from '$lib/utils/helpers';

	let URLdata: string | null = $state(null);

	const downloadGeoJSON = () => {
		const data = get(EnvStore).data;

		if (data.features.length > 0) {
			const convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(stringify(data));
			URLdata = 'data:' + convertedData;
		} else {
			alert('El mapa no tiene datos para exportar');
		}
	};
</script>

<a
	class="block p-1 rounded-md bg-primary-50 hover:bg-primary-100 focus-within:bg-primary-100 outline outline-1 outline-slate-300 transition-colors duration-300"
	href={URLdata}
	download={'data.geojson'}
	on:click={downloadGeoJSON}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5 stroke-primary-800"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
		/>
	</svg>
</a>
