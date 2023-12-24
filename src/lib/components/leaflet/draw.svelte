<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Layer, Polygon } from 'leaflet';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
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

	const layerToFeature = (layer: Layer): Feature => {
		let feature: Feature;

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			feature = L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius), 18).toGeoJSON(6);
		} else {
			const coordinates = (layer as Polygon).getLatLngs();
			feature = new L.Polygon(coordinates).toGeoJSON(6);
		}

		return { id: crypto.randomUUID(), ...feature, properties: {} };
	};

	map.on('pm:create', ({ layer }) => {
		featureGroup.removeLayer(layer);
		const addedFeature = layerToFeature(layer);
		featureGroup.addLayer(L.geoJSON(addedFeature));
		data.addFeature(addedFeature);
	});

	map.on('pm:remove', ({ layer }) => {
		featureGroup.removeLayer(layer);

		// @ts-expect-error - Leaflet types are a mess
		const removedFeatureID = layer.feature.id as number;
		data.removeFeatureByID(removedFeatureID);
	});
</script>
