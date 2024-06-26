<script lang="ts">
	import type * as Leaflet from 'leaflet';
	import type { Action } from 'svelte/action';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Environment } from '$lib/states.svelte';

	import { cn } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import { SpinnerIcon } from '$lib/components/icons';
	import { contextKey, createPopup } from '$lib/components/leaflet';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		zoom: number;
		center: [number, number];
		environment?: Environment;
	}

	let { zoom, center, environment, children, class: className, ...props }: Props = $props();

	let L: typeof Leaflet;
	let map: Leaflet.Map | undefined = $state();
	let rendererCanvas: Leaflet.Renderer | undefined = $state();
	let featureGroup: Leaflet.FeatureGroup | undefined = $state();
	let overlayLayer: Leaflet.Control.Layers | undefined = $state();

	setContext(contextKey, {
		getMap: () => map,
		getEnvironment: () => environment,
		getFeatureGroup: () => featureGroup,
		getOverlayLayer: () => overlayLayer
	});

	function fitBounds(animate: boolean = false) {
		if (featureGroup?.getLayers().length === 0) return;

		const featureBounds = featureGroup?.getBounds();

		if (!featureBounds?.isValid()) return;

		map?.fitBounds(featureBounds!, {
			animate: animate,
			maxZoom: 15
		});
	}

	function resetLayers() {
		featureGroup?.eachLayer((layer) => {
			overlayLayer?.removeLayer(layer);
		});
		featureGroup?.clearLayers();
	}

	function castProperties(properties: { [key: string]: string | number }) {
		const toConvert = ['stroke-width', 'fill-opacity', 'stroke-opacity'];

		for (const target of toConvert) {
			if (properties[target] && !Number.isNaN(properties[target])) {
				properties[target] = Number(properties[target]);
			}
		}

		return properties;
	}

	function loadFeatures(features: FeatureCollection) {
		window.L.geoJSON(features, {
			// @ts-expect-error - Some style properties are numbers
			style: (feature) => {
				const properties = castProperties(feature?.properties);

				return {
					smoothFactor: 1.5,
					renderer: rendererCanvas,
					...(properties.fill && { fillColor: properties.fill }),
					...(properties.stroke && { color: properties.stroke }),
					...(properties['stroke-width'] && { weight: properties['stroke-width'] }),
					...(properties['fill-opacity'] && { fillOpacity: properties['fill-opacity'] }),
					...(properties['stroke-opacity'] && { opacity: properties['stroke-opacity'] })
				};
			},
			onEachFeature: (feature, layer) => {
				if (feature.properties.radius && feature.properties.center) {
					const radius = feature.properties.radius;
					const center = new L.LatLng(feature.properties.center[0], feature.properties.center[1]);

					layer = new L.Circle(center, radius).setStyle(layer.options);
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
		let props = castProperties(Object.fromEntries(formData) as { [key: string]: string | number });
		delete props.id;

		environment?.updateFeatureProps(id, props);
	}

	const initMap: Action<HTMLDivElement, FeatureCollection | undefined> = (
		mapContainer: HTMLDivElement,
		features: FeatureCollection | undefined
	) => {
		onMount(async () => {
			L = await import('leaflet');
			await import('leaflet/dist/leaflet.css');

			L.Control.Layers.include({
				showLayers: function () {
					for (const i in this._layers) {
						if (this._layers[i].overlay) {
							if (!this._map.hasLayer(this._layers[i].layer)) {
								this._map.addLayer(this._layers[i].layer);
							}
						}
					}
				},
				hideLayers: function () {
					for (const i in this._layers) {
						if (this._layers[i].overlay) {
							if (this._map.hasLayer(this._layers[i].layer)) {
								this._map.removeLayer(this._layers[i].layer);
							}
						}
					}
				}
			});

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

			const mapOptions: Leaflet.MapOptions = {
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

				if (features) {
					loadFeatures(features);
					toggleOverlay();
					fitBounds();
				}

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
			update(features: FeatureCollection | undefined) {
				if (features) {
					resetLayers();
					loadFeatures(features);
					toggleOverlay();
				}
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
	use:initMap={environment?.value}
	{...props}
>
	{#if map && children}
		{@render children()}
	{:else}
		<SpinnerIcon class="size-10" />
	{/if}
</div>
