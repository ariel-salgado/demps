<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { key } from './key';

	import type L from 'leaflet';
	import type D from 'leaflet-draw';
	import type S from 'leaflet-geosearch';

	import 'leaflet/dist/leaflet.css';
	import 'leaflet-draw/dist/leaflet.draw.css';
	import 'leaflet-geosearch/dist/geosearch.css';

	export let view: L.LatLngExpression;
	export let zoom: number;

	let leaflet: typeof L;
	let leaflet_draw: typeof D;
	let leaflet_path_drag: any;
	let leaflet_geosearch: typeof S;

	let map: L.Map;
	let draw: L.Control.Draw;
	let features: L.FeatureGroup;
	let mapContainer: HTMLDivElement;

	setContext(key, {
		getLeaflet: () => leaflet,
		getMap: () => map
	});

	onMount(async () => {
		leaflet = await import('leaflet');
		leaflet_draw = await import('leaflet-draw');
		// @ts-expect-error - no types for leaflet-path-drag
		leaflet_path_drag = await import('leaflet-path-drag');
		leaflet_geosearch = await import('leaflet-geosearch');

		map = leaflet.map(mapContainer).setView(view, zoom);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		features = new leaflet.FeatureGroup().addTo(map);
		draw = new leaflet.Control.Draw({
			draw: {
				marker: false,
				polyline: false,
				rectangle: false,
				circlemarker: false
			},
			edit: {
				featureGroup: features
			}
		}).addTo(map);

		// @ts-expect-error - no types for leaflet-geosearch
		const search = new leaflet_geosearch.GeoSearchControl({
			provider: new leaflet_geosearch.OpenStreetMapProvider(),
			style: 'bar'
		}).addTo(map);

		map.on('draw:created', (e: L.LeafletEvent) => {
			const layer = e.layer;

			if (layer instanceof leaflet.Polygon) {
				// @ts-expect-error - bad types for leaflet
				const coordinates = [...layer._latlngs][0];
				const polygon = new leaflet.Polygon([coordinates], {
					// @ts-expect-error - no types for leaflet-path-drag
					draggable: true
				});

				features.addLayer(polygon);
			}
			if (layer instanceof leaflet.Circle) {
				// @ts-expect-error - bad types for leaflet
				const coordinates = layer._latlng;
				// @ts-expect-error - bad types for leaflet
				const radius = layer._mRadius;
				const circle = new leaflet.Circle(coordinates, radius, {
					// @ts-expect-error - no types for leaflet-path-drag
					draggable: true
				});

				features.addLayer(circle);
			}
		});
	});
</script>

<div class="w-full h-full" bind:this={mapContainer}>
	{#if leaflet && mapContainer}
		<slot />
	{/if}
</div>

<style lang="postcss">
	:global(.leaflet-marker-icon) {
		@apply rounded-full;
	}

	:global(.leaflet-geosearch-bar button) {
		@apply text-lg;
	}
</style>
