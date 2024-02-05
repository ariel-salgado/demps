<script context="module" lang="ts">
	export const contextKey = Symbol();
</script>

<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Writable } from 'svelte/store';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { areEqualGeoJSON } from '$lib/utils';

	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		store: Writable<FeatureCollection>;
		center: L.LatLngExpression;
		zoom: number;
		overlay?: boolean;
	}

	let {
		children,
		store,
		center,
		zoom,
		overlay = true,
		class: className,
		...props
	} = $props<Props>();

	let map: L.Map | undefined = $state();
	let featureGroup: L.FeatureGroup = $state(new L.FeatureGroup());
	let overlayLayer: L.Control.Layers | undefined = $state(
		new L.Control.Layers(undefined, undefined, { hideSingleBase: true })
	);

	setContext(contextKey, {
		getMap: () => map,
		getStore: () => store,
		getLeaflet: () => L,
		getFeatureGroup: () => featureGroup,
		getOverlayLayer: () => overlayLayer
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
				if (overlay)
					// @ts-expect-error - Leaflet types are a mess
					overlayLayer.addOverlay(layer, layer.feature.properties.nameID || layer.feature.id);
			}
		});
	};

	const resetLayers = (featureGroup: L.FeatureGroup, overlayLayer?: L.Control.Layers) => {
		if (overlayLayer)
			featureGroup.eachLayer((layer) => {
				overlayLayer.removeLayer(layer);
			});
		featureGroup.clearLayers();
	};

	const initMap: Action<HTMLDivElement, FeatureCollection> = (
		mapContainer: HTMLDivElement,
		features: FeatureCollection
	) => {
		map = L.map(mapContainer, mapOptions);

		featureGroup.addTo(map);
		if (overlay) overlayLayer?.addTo(map);

		loadFeatures(features);

		if (featureGroup.getBounds().isValid())
			map.fitBounds(featureGroup.getBounds(), {
				animate: false,
				maxZoom: 20
			});

		map.whenReady(() => {
			map?.invalidateSize();
		});

		return {
			update: (update: FeatureCollection) => {
				if (!areEqualGeoJSON(features, update)) {
					resetLayers(featureGroup, overlayLayer);
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

<div class={cn('size-full outline-none', className)} {...props} use:initMap={$store}>
	{#if map && children}
		{@render children()}
	{/if}
</div>
