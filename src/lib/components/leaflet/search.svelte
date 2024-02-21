<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, untrack } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';
	import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

	import 'leaflet-geosearch/dist/geosearch.css';

	const { getMap } = getContext<MapContext>(contextKey);

	let map = getMap();

	// Add name attribute to search input
	$effect(() => {
		untrack(() => {
			document
				.querySelector('.leaflet-geosearch-button form input')
				?.setAttribute('name', 'search');
		});
	});

	// @ts-expect-error - no types for leaflet-geosearch
	const search = new GeoSearchControl({
		provider: new OpenStreetMapProvider(),
		style: 'button',
		autoClose: true,
		showMarker: false,
		searchLabel: 'Buscar una dirección',
		notFoundMessage: 'No se encontraron resultados'
	});

	map.addControl(search);
</script>
