<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import type { Metadata } from '$lib/types';
	import type { Action } from 'svelte/action';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Environment } from '$lib/states.svelte';

	import { cn } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import { SpinnerIcon } from '$lib/components/icons';
	import { contextKey } from '$lib/components/leaflet';
	import { createPopup } from '$lib/components/leaflet/popup';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		zoom: number;
		center: [number, number];
		environment?: Environment;
	}

	let { zoom, center, environment, children, class: className, ...props }: Props = $props();

	let L: typeof Leaflet;

	let map: L.Map | undefined = $state();
	let rendererCanvas: L.Renderer | undefined = $state();
	let featureGroup: L.FeatureGroup | undefined = $state();
	let overlayLayer: L.Control.Layers | undefined = $state();

	setContext(contextKey, {
		getMap: () => map,
		getEnvironment: () => environment,
		getFeatureGroup: () => featureGroup,
		getOverlayLayer: () => overlayLayer
	});

	function fitBounds(animate: boolean = false) {
		const mapBounds = map?.getBounds();
		const featureBounds = featureGroup?.getBounds();

		if (!featureBounds?.isValid() || mapBounds?.intersects(featureBounds!)) return;

		if (featureBounds!.isValid()) {
			map?.fitBounds(featureBounds!, {
				animate: animate,
				maxZoom: 15
			});
		}
	}

	function loadFeatures(features) {
		window.L.geoJSON(features, {
			style: (feature) => {
				const attributes = feature?.properties;

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
			onEachFeature: (feature, layer) => {
				if (feature.properties.radius && feature.properties.center) {
					const radius = feature.properties.radius;
					const center = new L.LatLng(feature.properties.center[0], feature.properties.center[1]);

					layer = new L.Circle(center, radius);
				}

				// @ts-expect-error - Adding the id to the layer for future reference
				layer.id = feature.id;

				layer.bindPopup(createPopup(feature));

				featureGroup?.addLayer(layer);
				overlayLayer?.addOverlay(layer, feature.properties.nameID || feature.id);
			}
		});
	}

	function toggleOverlay() {
		if (featureGroup?.getLayers().length === 0) {
			map?.removeControl(overlayLayer!);
			return;
		}

		map?.addControl(overlayLayer!);
	}

	function updateFeatureProps(e: SubmitEvent) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const id = formData.get('id') as string;
		const props = Object.fromEntries(formData) as Record<string, string>;
		delete props.id;

		environment?.updateFeatureProps(id, props);
	}

	const initMap: Action<HTMLDivElement, Metadata & FeatureCollection> = (
		mapContainer,
		features
	) => {
		onMount(async () => {
			L = await import('leaflet');
			await import('leaflet/dist/leaflet.css');

			rendererCanvas = new L.Canvas();
			featureGroup = new L.FeatureGroup();
			overlayLayer = new L.Control.Layers();

			const rasterLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				keepBuffer: 4,
				updateWhenIdle: true,
				updateWhenZooming: false,
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

			map = L.map(mapContainer!, mapOptions);

			map.whenReady(() => {
				map?.invalidateSize();
				map?.addLayer(featureGroup!);

				loadFeatures(features);
				toggleOverlay();
				fitBounds();

				map?.on('popupopen', (event) => {
					const form = event.popup.getElement()?.querySelector('form');
					form?.addEventListener('submit', updateFeatureProps);
				});

				map?.on('popupclose', (event) => {
					const form = event.popup.getElement()?.querySelector('form');
					form?.removeEventListener('submit', updateFeatureProps);
				});
			});
		});

		return {
			update(features) {
				featureGroup?.eachLayer((layer) => {
					overlayLayer?.removeLayer(layer);
				});
				featureGroup?.clearLayers();
				loadFeatures(features);
				toggleOverlay();
				fitBounds();
			},

			destroy() {
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

<div
	class={cn('grid size-full items-center justify-items-center outline-none', className)}
	aria-label="Mapa"
	use:initMap={environment?.value!}
	{...props}
>
	{#if map && children}
		{@render children()}
	{:else}
		<SpinnerIcon class="size-10" />
	{/if}
</div>
