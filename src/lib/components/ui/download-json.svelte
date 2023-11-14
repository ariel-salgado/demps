<script lang="ts">
	import { get } from 'svelte/store';
	import { GeoJSONStore } from '$lib/stores';

	let URLdata: string;

	const downloadGeoJSON = () => {
		const data = get(GeoJSONStore);

		if (data.features.length > 0) {
			const convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
			URLdata = 'data:' + convertedData;
		} else {
			// alert('El mapa no tiene datos para exportar');
		}
	};
</script>

<a href={URLdata} download={'data.geojson'} on:click={downloadGeoJSON} class="button"
	>Download GeoJSON</a
>

<style lang="postcss">
	.button {
		@apply block h-10 bg-primary-600 px-6 py-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300;
	}
</style>
