<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { FeatureCollection, Point } from 'geojson';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	import MarkerIcon from '$lib/assets/images/marker-icon-2x-red.png';
	import MarkerShadow from '$lib/assets/images/marker-shadow.png';

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

	const customMarker = L.icon({
		iconUrl: MarkerIcon,
		shadowUrl: MarkerShadow,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	// @ts-expect-error - markerClusterGroup is not part of the leaflet types
	let markers = window.L.markerClusterGroup({
		animateAddingMarkers: true
	});

	// At every update, clear the markers and add new ones
	store.subscribe((geojson) => {
		if (map) {
			if (usingMapStore) {
				map.eachLayer((layer) => {
					if (layer instanceof L.Marker) {
						map.removeLayer(layer);
					}
				});
			}

			markers.clearLayers();

			geojson.features.forEach((feature) => {
				if (feature.geometry.type === 'Point') {
					const marker = L.marker(
						[feature.geometry.coordinates[1]!, feature.geometry.coordinates[0]!],
						{ icon: customMarker }
					);
					markers.addLayer(marker);
				}
			});

			map.addLayer(markers);
		}
	});
</script>
