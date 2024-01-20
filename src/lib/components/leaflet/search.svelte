<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { key } from '$lib/components/leaflet';

	const { getMap } = getContext<MapContext>(key);

	let map = getMap();

	onMount(async () => {
		const { GeoSearchControl, OpenStreetMapProvider } = await import('leaflet-geosearch');
		await import('leaflet-geosearch/dist/geosearch.css');

		const search = GeoSearchControl({
			provider: new OpenStreetMapProvider(),
			style: 'button',
			autoClose: true,
			showMarker: false,
			searchLabel: 'Buscar una dirección',
			notFoundMessage: 'No se encontraron resultados'
		});

		map.addControl(search);
	});
</script>
