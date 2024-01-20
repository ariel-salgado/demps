<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Layer, Polygon } from 'leaflet';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { key } from '$lib/components/leaflet';

	const { getMap, getStore, getLeaflet, getFeatureGroup, getOverlayLayer } =
		getContext<MapContext>(key);

	let map = getMap();
	let store = getStore();
	let L = getLeaflet();
	let featureGroup = getFeatureGroup();
	let overlayLayer = getOverlayLayer();

	onMount(async () => {
		if (map && !map.pm) {
			await import('@geoman-io/leaflet-geoman-free');
			await import('@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css');
		}

		featureGroup.eachLayer((layer) => {
			layer.options.pmIgnore = false;
			window.L.PM.reInitLayer(layer);
		});

		// @ts-expect-error - Map type is wrong in Geoman
		window.L.PM.reInitLayer(map);

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
	});

	const layerToFeature = (layer: Layer): Feature => {
		let feature: Feature;

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			feature = window.L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius), 18).toGeoJSON(
				6
			);
		} else {
			const coordinates = (layer as Polygon).getLatLngs();
			feature = new L.Polygon(coordinates).toGeoJSON(6);
		}

		return { id: crypto.randomUUID(), ...feature, properties: {} };
	};

	map.on('pm:create', ({ layer }) => {
		featureGroup.removeLayer(layer);

		const addedFeature = layerToFeature(layer);
		const addedFeatureGeoJSON = L.geoJSON(addedFeature);

		featureGroup.addLayer(addedFeatureGeoJSON);
		overlayLayer.addOverlay(
			addedFeatureGeoJSON,
			(addedFeature.properties?.nameID || addedFeature.id) as string
		);

		store.addFeature(addedFeature);
	});

	map.on('pm:remove', ({ layer }) => {
		featureGroup.removeLayer(layer);

		// @ts-expect-error - Leaflet types are a mess
		const removedFeatureID = layer.feature.id as string;
		overlayLayer.removeLayer(layer);
		store.removeFeatureByID(removedFeatureID);
	});

	// It handles edit, drag and rotate events
	featureGroup.on('pm:edit', ({ layer }) => {
		// @ts-expect-error - Geoman types are missing
		const editedFeature = layer.toGeoJSON(6) as Feature;
		const id = editedFeature.id as string;

		// @ts-expect-error - Geoman types are missing
		const coordinates = editedFeature.geometry.coordinates;

		store.updateFeatureCoords(id, coordinates);
	});
</script>
