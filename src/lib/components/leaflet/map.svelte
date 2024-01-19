<script lang="ts">
	import type L from 'leaflet';
	import type { Action } from 'svelte/action';
	import type { GeoJSONStore } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';
	import { areEqualGeoJSON } from '$lib/utils';
	import { key } from '$lib/components/leaflet';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		store: GeoJSONStore;
		center: L.LatLngExpression;
		zoom: number;
	}

	const { children, store, center, zoom, class: className, ...props } = $props<Props>();

	let Leaflet: typeof L;
	let map: L.Map | undefined = $state();
	let featureGroup: L.FeatureGroup | undefined = $state();
	let overlayLayer: L.Control.Layers | undefined = $state();

	setContext(key, {
		getMap: () => map,
		getStore: () => store,
		getLeaflet: () => Leaflet,
		getFeatureGroup: () => featureGroup,
		getOverlayLayer: () => overlayLayer
	});

	const loadFeatures = (features: FeatureCollection) => {
		Leaflet.geoJSON(features, {
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
				featureGroup!.addLayer(layer);
				// @ts-expect-error - Leaflet types are a mess
				overlayLayer.addOverlay(layer, layer.feature.properties.nameID || layer.feature.id);
			}
		});
	};

	const resetLayers = (featureGroup: L.FeatureGroup, overlayLayer: L.Control.Layers) => {
		featureGroup.eachLayer((layer) => {
			overlayLayer.removeLayer(layer);
		});
		featureGroup.clearLayers();
	};

	// @ts-expect-error - Action type doesn't accept async functions
	const initMap: Action<HTMLDivElement, FeatureCollection> = async (
		mapContainer: HTMLDivElement,
		features: FeatureCollection
	) => {
		Leaflet = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		const rasterLayer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

		map = Leaflet.map(mapContainer, mapOptions);

		featureGroup = Leaflet.featureGroup();
		overlayLayer = Leaflet.control.layers();

		featureGroup.addTo(map);
		overlayLayer.addTo(map);

		loadFeatures(features);

		map.whenReady(() => {
			map?.invalidateSize();
		});

		return {
			update: (update: FeatureCollection) => {
				if (!areEqualGeoJSON(features, update)) {
					resetLayers(featureGroup!, overlayLayer!);
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
