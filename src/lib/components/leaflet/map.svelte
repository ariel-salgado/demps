<script context="module" lang="ts">
	export const contextKey = Symbol();
</script>

<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { createPopup } from './popup';

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
	let rendererCanvas: L.Renderer = $state(new L.Canvas({ padding: 0.5 }));
	let overlayLayer: L.Control.Layers = $state(new L.Control.Layers(undefined, undefined));

	setContext(contextKey, {
		getMap: () => map,
		getStore: () => store,
		getLeaflet: () => L,
		getFeatureGroup: () => featureGroup,
		getOverlayLayer: () => overlayLayer
	});

	const rasterLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		updateWhenIdle: true,
		updateWhenZooming: false,
		keepBuffer: 4,
		attribution:
			'© <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM Contributors</a>'
	});

	const mapOptions: L.MapOptions = {
		zoom: zoom,
		center: center,
		preferCanvas: true,
		worldCopyJump: false,
		layers: [rasterLayer],
		renderer: rendererCanvas
	};

	const loadFeatures = (features: FeatureCollection) => {
		L.geoJSON(features, {
			style: (feature) => {
				const attributes = feature?.properties;

				if (!attributes)
					return {
						smoothFactor: 1.5,
						renderer: rendererCanvas
					};

				return {
					smoothFactor: 1.5,
					renderer: rendererCanvas,
					...(attributes.fill && { fillColor: attributes.fill }),
					...(attributes.stroke && { color: attributes.stroke }),
					// https://github.com/Leaflet/Leaflet/issues/6075
					...(attributes['stroke-width'] && {
						weight: !Number.isNaN(attributes['stroke-width']) ? attributes['stroke-width'] : 3
					}),
					...(attributes['fill-opacity'] && { fillOpacity: attributes['fill-opacity'] }),
					...(attributes['stroke-opacity'] && { opacity: attributes['stroke-opacity'] })
				};
			},
			onEachFeature: (_, layer) => {
				layer.bindPopup(L.popup({ content: createPopup(layer), interactive: true }));

				featureGroup.addLayer(layer);
				if (overlay) {
					// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
					overlayLayer.addOverlay(layer, layer.feature.properties.nameID || layer.feature.id);
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

	const updateFeatureProps = (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const id = formData.get('id') as string;
		const props = Object.fromEntries(formData) as Record<string, string>;
		delete props.id;

		store?.updateFeatureProps(id, props);
	};

	const fitBounds = () => {
		if (
			featureGroup.getBounds().isValid() &&
			!map?.getBounds().intersects(featureGroup.getBounds())
		) {
			map?.fitBounds(featureGroup.getBounds(), {
				animate: true,
				maxZoom: 15
			});
		}
	};

	const toggleOverlay = () => {
		if (!overlay) return;

		if (featureGroup.getLayers().length === 0) {
			map?.removeControl(overlayLayer);
			return;
		}

		map?.addControl(overlayLayer);
	};

	const initMap: Action<HTMLDivElement, FeatureCollection | undefined> = (
		mapContainer: HTMLDivElement,
		features: FeatureCollection | undefined
	) => {
		map = L.map(mapContainer, mapOptions);

		featureGroup.addTo(map);

		if (features) {
			loadFeatures(features);
		}

		if (overlay && featureGroup.getLayers().length > 0) {
			overlayLayer.addTo(map);
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
				if (!updatedFeatures) return;
				resetLayers(featureGroup, overlayLayer);
				loadFeatures(updatedFeatures);
				toggleOverlay();
				fitBounds();
			},

			destroy: () => {
				map?.remove();
				map = undefined;
			}
		};
	};
</script>

<svelte:head>
	<link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
	<link rel="preconnect" href="https://tile.openstreetmap.org" />
</svelte:head>

<div class={cn('size-full outline-none', className)} {...props} use:initMap={$store}>
	{#if map && children}
		{@render children()}
	{/if}
</div>
