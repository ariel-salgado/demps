<script lang="ts">
	import { getContext } from 'svelte';
	import { EnvStore } from '$lib/stores';
	import { stringify } from '$lib/utils/helpers';
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

	const layerToPolygon = (layer: L.Layer) => {
		if (layer instanceof L.Polygon) {
			const coordinates = layer.getLatLngs();
			return new L.Polygon(coordinates);
		}

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			return L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius), 32);
		}

		return new L.Polygon([]);
	};

	const addProperties = (feature: L.Polygon, properties: Record<string, string | number>) => {
		const jsonFeature = feature.toGeoJSON();

		jsonFeature.properties = {
			...jsonFeature.properties,
			...properties
		};

		return jsonFeature;
	};

	map.on('pm:create', (e: L.LeafletEvent) => {
		const layer = e.layer;
		let drawnFeature: L.Polygon = layerToPolygon(layer);

		EnvStore.update((current) => {
			current.data.features = [
				...current.data.features,
				addProperties(drawnFeature, { id: layer._leaflet_id })
			];
			current.trigger = 'map';

			return {
				...current
			};
		});
	});

	map.on('pm:remove', (e: L.LeafletEvent) => {
		const layer = e.layer;
		const deletedFeature = layerToPolygon(layer).toGeoJSON();

		EnvStore.update((current) => {
			current.data.features = current.data.features.filter((feature) => {
				return (
					// @ts-expect-error - GeoJSON types doesn't have coordinates property
					stringify(feature.geometry.coordinates, false) !==
					stringify(deletedFeature.geometry.coordinates, false)
				);
			});
			current.trigger = 'map';

			return {
				...current
			};
		});
	});
</script>
