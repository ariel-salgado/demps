<script lang="ts">
	import { getContext } from 'svelte';
	import { EnvStore } from '$lib/stores';
	import { key, type MapContext } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getLeaflet } = getContext<MapContext>(key);

	let map = getMap();
	let L = getLeaflet();

	map.pm.setLang('es');
	map.pm.addControls({
		position: 'topleft',
		drawCircleMarker: false
	});

	map.on('pm:create', (e: L.LeafletEvent) => {
		const layer = e.layer;
		let drawnFeature: L.Polygon;

		if (layer instanceof L.Polygon) {
			const coordinates = layer.getLatLngs();
			drawnFeature = new L.Polygon(coordinates);
		}

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			drawnFeature = L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius));
		}

		EnvStore.update((current) => {
			current.data.features = [...current.data.features, drawnFeature.toGeoJSON()];
			current.trigger = 'map';

			return {
				...current
			};
		});
	});
</script>
