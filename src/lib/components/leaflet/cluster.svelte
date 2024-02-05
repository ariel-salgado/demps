<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	import 'leaflet.markercluster';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

	const { getMap, getStore, getLeaflet } = getContext<MapContext>(contextKey);

	let map = getMap();
	let L = getLeaflet();
	let store = getStore();

	// @ts-expect-error - markerClusterGroup is not part of the leaflet types
	let markers = L.markerClusterGroup({
		animateAddingMarkers: true
	});

	store.subscribe((geojson) => {
		if (map) {
			// Remove all markers from the map, so markerCluster can handle them later
			map.eachLayer((layer) => {
				if (layer instanceof L.Marker) {
					map.removeLayer(layer);
				}
			});

			geojson.features.forEach((feature) => {
				// @ts-expect-error - marker is not part of the geometry types
				let marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
				markers.addLayer(marker);
			});

			map.addLayer(markers);
		}
	});
</script>
