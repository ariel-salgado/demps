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
	let features: L.FeatureGroup = $state(new L.FeatureGroup());
	let featuresOverlay: Record<string, L.Layer> = $state({});
	let layersControl: ReturnType<typeof L.control.layers> | undefined = $state(undefined);

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

	const loadFeatures = () => {
		featuresOverlay = {};
		features = new L.FeatureGroup();

		L.geoJSON(get(EnvStore).data, {
			onEachFeature: function (feature, layer) {
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

				if (layer instanceof L.Polygon) {
					const coordinates = layer.getLatLngs();
					const polygon = new L.Polygon(coordinates, {
						smoothFactor: 1.5,
						color: attributes.stroke,
						weight: attributes['stroke-width'],
						opacity: attributes['stroke-opacity'],
						fillColor: attributes.fill,
						fillOpacity: attributes['fill-opacity']
					});

					featuresOverlay[
						feature.properties.nameID || feature.properties.id || feature.id || crypto.randomUUID()
					] = polygon;
					features.addLayer(polygon);
				}
			}
		});
	};

	const mapOptions: L.MapOptions = {
		zoom: zoom,
		center: center,
		preferCanvas: true,
		layers: [rasterLayer]
	};

	const initMap: Action<HTMLDivElement> = (mapContainer: HTMLDivElement) => {
		map = L.map(mapContainer, mapOptions);

		loadFeatures();

		map?.addLayer(features);

		if (Object.keys(featuresOverlay).length > 0) {
			layersControl = L.control.layers(undefined, featuresOverlay);
			map?.addControl(layersControl);
		}

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
		if (map && update.trigger === 'map') {
			console.log('Map updated');
		}
	});
</script>

<div class="w-full h-full" use:initMap>
	{#if map}
		<slot />
	{/if}
</div>
