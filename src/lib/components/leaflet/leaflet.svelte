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
	let features: L.FeatureGroup = new L.FeatureGroup();

	setContext(key, {
		getMap: () => map,
		getLeaflet: () => L,
		getFeatures: () => features
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

	const initMap: Action<HTMLDivElement> = (mapContainer: HTMLDivElement) => {
		map = L.map(mapContainer, mapOptions);

		// Add features to map
		L.geoJSON(get(EnvStore).data, {
			onEachFeature: function (feature, layer) {
				// Default attributes
				let attributes = {
					stroke: '#3388ff',
					'stroke-width': 3,
					'stroke-opacity': 1,
					fill: '#3388ff',
					'fill-opacity': 0.2
				};

				// Override default attributes with feature attributes
				if (Object.keys(feature.properties).length > 0) {
					attributes = feature.properties;
				}

				if (layer instanceof L.Polygon) {
					// @ts-expect-error - bad types for leaflet
					const coordinates = [...layer._latlngs][0];
					const polygon = new L.Polygon([coordinates], {
						smoothFactor: 1.0,
						color: attributes.stroke,
						weight: attributes['stroke-width'],
						opacity: attributes['stroke-opacity'],
						fillColor: attributes.fill,
						fillOpacity: attributes['fill-opacity']
					});

					features.addLayer(polygon);
				}
			}
		});

		map?.addLayer(features);

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
</script>

<div class="w-full h-full" use:initMap>
	{#if map}
		<slot />
	{/if}
</div>
