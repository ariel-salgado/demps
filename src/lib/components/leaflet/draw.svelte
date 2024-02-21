<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Layer, Polygon } from 'leaflet';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, untrack } from 'svelte';
	import { createPopup } from './popup';
	import { contextKey } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getStore, getLeaflet, getFeatureGroup, getOverlayLayer } =
		getContext<MapContext>(contextKey);

	let map = getMap();
	let L = getLeaflet();
	let store = getStore();
	let featureGroup = getFeatureGroup();
	let overlayLayer = getOverlayLayer();

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

	$effect(() => {
		untrack(() => {
			// Add aria-label to the draw buttons
			document.querySelectorAll('a.leaflet-buttons-control-button').forEach((button) => {
				button.setAttribute('aria-label', button.parentElement?.getAttribute('title')!);
			});
		});
	});

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
		const addedFeatureGeoJSON = L.geoJSON(addedFeature);

		// @ts-expect-error - Leaflet types are a mess
		const leafletID = addedFeatureGeoJSON._leaflet_id - 1;

		// @ts-expect-error - Leaflet types are a mess
		const popupLayer = addedFeatureGeoJSON._layers[leafletID];

		addedFeatureGeoJSON.bindPopup(createPopup(popupLayer));

		featureGroup.addLayer(addedFeatureGeoJSON);
		if (overlayLayer) {
			overlayLayer.addOverlay(
				addedFeatureGeoJSON,
				(addedFeature.properties?.nameID || addedFeature.id) as string
			);
		}

		store.addFeature(addedFeature);
	});

	map.on('pm:remove', ({ layer }) => {
		featureGroup.removeLayer(layer);

		// @ts-expect-error - Leaflet types are a mess
		const removedFeatureID = layer.feature.id as string;
		if (overlayLayer) {
			overlayLayer.removeLayer(layer);
		}

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

	featureGroup.on('pm:dragstart', ({ layer }) => {
		if (layer.hasEventListeners('click')) {
			layer.removeEventListener('click');
		}
	});

	featureGroup.on('pm:dragend', ({ layer }) => {
		if (layer.getPopup()) {
			layer.on('click', () => {
				layer.openPopup();
			});
		}
	});
</script>
