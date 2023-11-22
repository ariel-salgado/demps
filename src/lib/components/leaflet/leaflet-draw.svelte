<script lang="ts">
	import { getContext } from 'svelte';
	import { key, type MapContext } from '$lib/components/leaflet';

	import 'leaflet-draw';
	import 'leaflet-path-drag';
	import 'leaflet-draw/dist/leaflet.draw.css';

	const { getMap, getLeaflet } = getContext<MapContext>(key);

	let map = getMap();
	let L = getLeaflet();

	let features = new L.FeatureGroup();
	let draw = new L.Control.Draw({
		draw: {
			marker: false,
			polyline: false,
			rectangle: false,
			circlemarker: false
		},
		edit: {
			featureGroup: features
		}
	});

	map.addLayer(features);
	map.addControl(draw);

	map.on('draw:created', (e: L.LeafletEvent) => {
		const layer = e.layer;

		if (layer instanceof L.Polygon) {
			// @ts-expect-error - bad types for leaflet
			const coordinates = [...layer._latlngs][0];
			const polygon = new L.Polygon([coordinates], {
				// @ts-expect-error - no types for leaflet-path-drag
				draggable: true
			});

			features.addLayer(polygon);
		}
		if (layer instanceof L.Circle) {
			// @ts-expect-error - bad types for leaflet
			const coordinates = layer._latlng;
			// @ts-expect-error - bad types for leaflet
			const radius = layer._mRadius;
			const circle = new L.Circle(coordinates, radius, {
				// @ts-expect-error - no types for leaflet-path-drag
				draggable: true
			});

			features.addLayer(circle);
		}
	});
</script>

<style lang="postcss">
	:global(.leaflet-marker-icon) {
		@apply rounded-full;
	}
</style>
