<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { areEqualGeoJSON } from '$lib/utils';
	import { key } from '$lib/components/leaflet';

	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		zoom: number;
		data: GeoJSONStore;
		center: L.LatLngExpression;
	}

	let { data, children, center, zoom, class: className, ...props } = $props<Props>();

	let map: L.Map | undefined = $state();
	let featureGroup: L.FeatureGroup = $state(new L.FeatureGroup());

	setContext(key, {
		getMap: () => map,
		getLeaflet: () => L,
		getFeatureGroup: () => featureGroup,
		getData: () => data
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

	const loadFeatures = (features: FeatureCollection) => {
		L.geoJSON(features, {
			style: (feature) => {
				const defaultAttributes = {
					stroke: '#3388ff',
					'stroke-width': 3,
					'stroke-opacity': 1,
					fill: '#3388ff',
					'fill-opacity': 0.2
				};

				const attributes = {
					...defaultAttributes,
					...feature?.properties
				};

				return {
					smoothFactor: 1.5,
					color: attributes.stroke,
					weight: attributes['stroke-width'],
					opacity: attributes['stroke-opacity'],
					fillColor: attributes.fill,
					fillOpacity: attributes['fill-opacity']
				};
			},
			onEachFeature: (_, layer) => {
				featureGroup.addLayer(layer);
			}
		});
	};

	const initMap: Action<HTMLDivElement, FeatureCollection> = (
		mapContainer: HTMLDivElement,
		features: FeatureCollection
	) => {
		map = L.map(mapContainer, mapOptions);

		featureGroup.addTo(map);

		loadFeatures(features);

		map.whenReady(() => {
			map?.invalidateSize();
		});

		return {
			update: (update: FeatureCollection) => {
				if (!areEqualGeoJSON(features, update)) {
					featureGroup.clearLayers();
					loadFeatures(update);
				}
			},

			destroy: () => {
				map?.remove();
				map = undefined;
			}
		};
	};
</script>

<div class={cn('h-full w-full outline-none', className)} {...props} use:initMap={$data}>
	{#if map && children}
		{@render children()}
	{/if}
</div>
