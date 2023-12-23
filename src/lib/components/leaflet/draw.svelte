<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { coordsToFeature } from '$lib/utils';
	import { key } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getLeaflet, getFeatureGroup, getData } = getContext<MapContext>(key);

	let L = getLeaflet();
	let map = getMap();
	let featureGroup = getFeatureGroup();
	let data = getData();

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

	featureGroup.on('layeradd', ({ layer }) => {
		// @ts-expect-error - Leaflet typings are messed up
		const featureCoords = L.GeoJSON.latLngsToCoords(layer._latlngs[0]);
		const addedFeature = coordsToFeature(featureCoords);
		data.addFeature(addedFeature);
	});

	featureGroup.on('layerremove', ({ layer }) => {
		if ('feature' in layer) {
			// @ts-expect-error - Leaflet typings are messed up
			const removedFeatureID = layer.feature.id as number;
			data.removeFeatureByID(removedFeatureID);
		} else {
			// @ts-expect-error - Leaflet typings are messed up
			const featureCoords = L.GeoJSON.latLngsToCoords(layer._latlngs[0]);
			data.removeFeatureByCoords(featureCoords);
		}
	});

	map.on('pm:create', ({ layer }) => {
		featureGroup.addLayer(layer);
	});

	map.on('pm:remove', ({ layer }) => {
		featureGroup.removeLayer(layer);
	});
</script>
