<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { FeatureCollection, Point } from 'geojson';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	import 'leaflet.markercluster';
	import 'leaflet.markercluster/dist/MarkerCluster.css';
	import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

	interface Props {
		geojson?: Writable<FeatureCollection<Point>>;
	}

	let { geojson } = $props<Props>();

	const { getMap, getStore, getLeaflet } = getContext<MapContext>(contextKey);

	let map = getMap();
	let L = getLeaflet();
	let mapStore = getStore();

	const usingMapStore = geojson === undefined;
	const store = geojson || mapStore;

	// @ts-expect-error - markerClusterGroup is not part of the leaflet types
	let markers = window.L.markerClusterGroup({
		animateAddingMarkers: true
	});

	store.subscribe((geojson) => {
		if (map) {
			if (usingMapStore) {
				map.eachLayer((layer) => {
					if (layer instanceof L.Marker) {
						map.removeLayer(layer);
					}
				});
			}

			// At every update, clear the markers and add new ones
			markers.clearLayers();

			geojson.features.forEach((feature) => {
				if (feature.geometry.type === 'Point') {
					// @ts-expect-error - marker is not part of the geometry types
					let marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
					markers.addLayer(marker);
				}
			});

			map.addLayer(markers);
		}
	});
</script>
