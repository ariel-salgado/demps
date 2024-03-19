<script context="module" lang="ts">
	export const contextKey = Symbol();
</script>

<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { setContext } from 'svelte';
	import { createPopup } from './popup';
	import { cn, areEqualObject } from '$lib/utils';

	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		zoom: number;
		overlay?: boolean;
		store?: GeoJSONStore;
		center: L.LatLngExpression;
	}

	let {
		zoom,
		store,
		center,
		children,
		overlay = true,
		class: className,
		...props
	}: Props = $props();

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

	const rasterLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		noWrap: true,
		updateWhenIdle: true,
		updateWhenZooming: true,
		attribution:
			'© <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM Contributors</a>'
	});

	const mapOptions: L.MapOptions = {
		zoom: zoom,
		center: center,
		preferCanvas: true,
		layers: [rasterLayer]
	};

	const updateFeatureProps = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const id = formData.get('id') as string;
		const props = Object.fromEntries(formData) as Record<string, string>;
		delete props.id;

		store?.updateFeatureProps(id, props);

		resetLayers(featureGroup, overlayLayer);
		loadFeatures($store!);
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
				layer.bindPopup(createPopup(layer));
				featureGroup.addLayer(layer);
				if (overlay) {
					// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
					overlayLayer?.addOverlay(layer, layer.feature.properties.nameID || layer.feature.id);
				}
			}
		});
	};

	const resetLayers = (featureGroup: L.FeatureGroup, overlayLayer?: L.Control.Layers) => {
		if (overlayLayer) {
			featureGroup.eachLayer((layer) => {
				overlayLayer.removeLayer(layer);
			});
		}

		featureGroup.clearLayers();
	};

	const initMap: Action<HTMLDivElement, FeatureCollection | undefined> = (
		mapContainer: HTMLDivElement,
		features: FeatureCollection | undefined
	) => {
		map = L.map(mapContainer, mapOptions);

		featureGroup.addTo(map);

		if (overlay) {
			overlayLayer?.addTo(map);
		}

		if (features) {
			loadFeatures(features);
		}

		if (featureGroup.getBounds().isValid()) {
			map.fitBounds(featureGroup.getBounds(), {
				animate: false,
				maxZoom: 15
			});
		}

		map.whenReady(() => {
			map?.invalidateSize();

			map?.on('popupopen', (event) => {
				const form = event.popup.getElement()?.querySelector('form');
				form?.addEventListener('submit', updateFeatureProps);
			});

			map?.on('popupclose', (event) => {
				const form = event.popup.getElement()?.querySelector('form');
				form?.removeEventListener('submit', updateFeatureProps);
			});
		});

		return {
			update: (updatedFeatures: FeatureCollection | undefined) => {
				if (!updatedFeatures || areEqualObject(features!, updatedFeatures)) return;

				resetLayers(featureGroup, overlayLayer);
				loadFeatures(updatedFeatures);
			},

			destroy: () => {
				map?.remove();
				map = undefined;
			}
		};
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://tile.openstreetmap.org" />
</svelte:head>

<div class={cn('size-full outline-none', className)} {...props} use:initMap={$store}>
	{#if map && children}
		{@render children()}
	{/if}
</div>
