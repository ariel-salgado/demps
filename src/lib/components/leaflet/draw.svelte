<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { key } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getFeatureGroup } = getContext<MapContext>(key);

	// let L = getLeaflet();
	let map = getMap();
	let featureGroup = getFeatureGroup();

	map.pm.setGlobalOptions({
		layerGroup: featureGroup
	});

	map.pm.addControls({
		position: 'topleft',
		drawText: false,
		drawMarker: false,
		cutPolygon: false,
		drawPolyline: false,
		drawCircleMarker: false
	});

	map.pm.setLang('es');
</script>
