<script lang="ts">
	import { getContext } from 'svelte';
	import { EnvStore } from '$lib/stores';
	import { key, type MapContext } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getLeaflet } = getContext<MapContext>(key);

	let map = getMap();
	let L = getLeaflet();

	map.pm.setGlobalOptions({
		allowSelfIntersection: false,
		allowSelfIntersectionEdit: false
	});

	map.pm.addControls({
		position: 'topleft',
		drawText: false,
		cutPolygon: false,
		drawPolyline: false,
		drawCircleMarker: false
	});

	map.pm.setLang('es');

	const layerToPolygon = (layer: L.Layer) => {
		if (layer instanceof L.Polygon) {
			const coordinates = layer.getLatLngs();
			return new L.Polygon(coordinates);
		}

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			return L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius), 36);
		}

		return new L.Polygon([]);
	};

	map.on('pm:create', (e: L.LeafletEvent) => {
		map.removeLayer(e.layer);
		const created = layerToPolygon(e.layer);
		const feature = created.toGeoJSON();
		feature.id = e.layer._leaflet_id;

		EnvStore.update((current) => {
			current.data.features = [...current.data.features, feature];
			current.trigger = 'map';

			return {
				...current
			};
		});
	});

	map.on('pm:remove', (e: L.LeafletEvent) => {
		const feature = e.layer.feature;
		const targetID = feature.id || feature.properties.nameID || feature.properties.id || undefined;

		EnvStore.update((current) => {
			current.data.features = current.data.features.filter((feature) => {
				feature.id =
					feature.id || feature?.properties?.nameID || feature?.properties?.id || undefined;
				return feature?.id !== targetID;
			});
			current.trigger = 'map';

			return {
				...current
			};
		});
	});
</script>
