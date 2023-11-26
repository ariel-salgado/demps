<script lang="ts">
	import { getContext } from 'svelte';
	import { key, type MapContext } from '$lib/components/leaflet';
	import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

	import 'leaflet-geosearch/dist/geosearch.css';

	const { getMap } = getContext<MapContext>(key);

	let map = getMap();

	// @ts-expect-error - no types for leaflet-geosearch
	const search = new GeoSearchControl({
		provider: new OpenStreetMapProvider(),
		style: 'button',
		showMarker: false,
		searchLabel: 'Buscar una dirección'
	});

	map.addControl(search);
</script>

<style lang="postcss">
	:global(.leaflet-geosearch-bar button) {
		@apply text-lg;
	}
</style>
