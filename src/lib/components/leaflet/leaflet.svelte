<script lang="ts">
	import { get } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { Action } from 'svelte/action';

	import { EnvStore } from '$lib/stores';
	import { key } from '$lib/components/leaflet';

	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	interface Props {
		center: L.LatLngExpression;
		zoom: number;
	}

	let { center, zoom } = $props<Props>();

	let map: L.Map | undefined = $state(undefined);
	let source: L.GeoJSON<any, GeoJSON.Geometry> = $state(new L.GeoJSON());
	let overlay = $state(L.control.layers());

	setContext(key, {
		getMap: () => map,
		getLeaflet: () => L
	});

	const rasterLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
		updateWhenIdle: true,
		updateWhenZooming: false
	});

	const mapOptions: L.MapOptions = {
		zoom: zoom,
		center: center,
		preferCanvas: true,
		layers: [rasterLayer]
	};

	const getFeatures = () => {
		return L.geoJSON(get(EnvStore).data, {
			style: function (feature) {
				// Default attributes
				const defaultAttributes = {
					stroke: '#3388ff',
					'stroke-width': 3,
					'stroke-opacity': 1,
					fill: '#3388ff',
					'fill-opacity': 0.2
				};

				const featureProperties = feature?.properties || {};

				const attributes = {
					...defaultAttributes,
					...featureProperties
				};

				return {
					smoothFactor: 1.5,
					color: attributes.stroke,
					weight: attributes['stroke-width'],
					opacity: attributes['stroke-opacity'],
					fillColor: attributes.fill,
					fillOpacity: attributes['fill-opacity']
				};
			}
		});
	};

	const getOverlay = () => {
		const features: Record<string, L.Layer> = {};

		source.getLayers().forEach((layer) => {
			// @ts-expect-error - Bad types
			features[layer.feature.id] = layer;
		});

		return L.control.layers(undefined, features);
	};

	const initMap: Action<HTMLDivElement> = (mapContainer: HTMLDivElement) => {
		map = L.map(mapContainer, mapOptions);
		source = getFeatures();
		overlay = getOverlay();

		map.addLayer(source);
		map.addControl(overlay);

		map.whenReady(() => {
			map?.invalidateSize();
		});

		return {
			destroy: () => {
				map?.remove();
				map = undefined;
			}
		};
	};

	EnvStore.subscribe((update) => {
		if (map) {
			if (update.trigger === 'fileUploader') {
				// Cleaning up old layers
				map.removeLayer(source as L.Layer);
				map.removeControl(overlay as L.Control);

				// Getting the new ones
				source = getFeatures();
				overlay = getOverlay();

				// Adding the new features
				map.addLayer(source);
				map.addControl(overlay);
			}
		}
	});
</script>

<div class="w-full h-full" use:initMap>
	{#if map}
		<slot />
	{/if}
</div>
