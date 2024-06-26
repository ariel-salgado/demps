<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Polygon, Circle, Layer } from 'leaflet';
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	const { getMap, getEnvironment, getFeatureGroup, getOverlayLayer } =
		getContext<MapContext>(contextKey);

	let map = getMap();
	let environment = getEnvironment();
	let featureGroup = getFeatureGroup();
	let overlayLayer = getOverlayLayer();

	onMount(async () => {
		if (!map.pm) {
			await import('@geoman-io/leaflet-geoman-free');
			await import('@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css');
		}

		// @ts-expect-error - reInitLayer accepts the map object
		window.L.PM.reInitLayer(map);
		window.L.PM.reInitLayer(featureGroup);

		map.pm.setLang('es');

		map.pm.setGlobalOptions({
			resizableCircle: true,
			layerGroup: featureGroup,
			limitMarkersToCount: 20
		});

		map.pm.addControls({
			position: 'topleft',
			drawText: false,
			drawMarker: false,
			cutPolygon: false,
			drawPolyline: false,
			drawCircleMarker: false
		});

		// Add aria-label to the draw buttons
		window.document.querySelectorAll('a.leaflet-buttons-control-button').forEach((button) => {
			button.setAttribute('aria-label', button.parentElement!.getAttribute('title')!);
		});
	});

	function layerToPolygon<T extends Polygon | Circle>(layer: Layer) {
		let feature: T | undefined;

		if (layer instanceof window.L.Polygon) {
			const coordinates = layer.getLatLngs();
			feature = new window.L.Polygon(coordinates) as T;
		} else if (layer instanceof window.L.Circle) {
			const coordinates = layer.getLatLng();
			const radius = Number(layer.getRadius().toFixed(6));
			feature = new window.L.Circle(coordinates, radius) as T;
		} else {
			return;
		}

		return feature;
	}

	function polygonToGeoJSON<T extends Polygon | Circle>(feature: T) {
		let featureGeoJSON: Feature | undefined;

		if (feature instanceof window.L.Circle) {
			// @ts-expect-error - id is an added property
			const properties = environment.getFeatureById(feature.id)?.properties;

			featureGeoJSON = window.L.PM.Utils.circleToPolygon(feature as Circle, 18).toGeoJSON(6);
			featureGeoJSON.properties = {
				...properties,
				radius: Number((feature as Circle).getRadius().toFixed(6)),
				center: [
					Number((feature as Circle).getLatLng().lat.toFixed(6)),
					Number((feature as Circle).getLatLng().lng.toFixed(6))
				]
			};
		} else if (feature instanceof window.L.Polygon) {
			featureGeoJSON = feature.toGeoJSON(6);
		} else {
			return;
		}

		// @ts-expect-error - id is an added property
		featureGeoJSON = { id: feature.id, ...featureGeoJSON };

		return featureGeoJSON;
	}

	map.on('pm:create', ({ layer }: { layer: Layer }) => {
		featureGroup.removeLayer(layer);

		let feature = layerToPolygon(layer);

		if (!feature) return;

		const randomID = crypto.randomUUID().split('-').at(-1) as string;

		// @ts-expect-error - Adding id property to the layer for future reference
		feature.id = randomID;
		featureGroup.addLayer(feature);
		overlayLayer.addOverlay(feature, randomID);

		let featureGeoJSON = polygonToGeoJSON(feature);

		environment.addFeature(featureGeoJSON!);
	});

	featureGroup.on('pm:edit', ({ layer }) => {
		let featureGeoJSON = polygonToGeoJSON(layer as Polygon | Circle);

		// @ts-expect-error - id is an added property
		environment.updateFeature(layer.id, featureGeoJSON);
	});

	map.on('pm:remove', ({ layer }: { layer: Layer }) => {
		featureGroup.removeLayer(layer);
		overlayLayer.removeLayer(layer);

		// @ts-expect-error - id is an added property
		environment.removeFeature(layer.id as number);
	});

	featureGroup.on('pm:dragstart', ({ layer }) => {
		layer.removeEventListener('click');
	});

	featureGroup.on('pm:dragend', ({ layer }) => {
		layer.addEventListener('click', () => {
			layer.openPopup();
		});
	});
</script>
