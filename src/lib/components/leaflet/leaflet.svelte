<script lang="ts">
	import { setContext } from 'svelte';
	import type { Action } from 'svelte/action';

	import { key } from '$lib/components/leaflet';

	import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	interface Props {
		center: L.LatLngExpression;
		zoom: number;
	}

	let { center, zoom } = $props<Props>();

	let map: L.Map | undefined = $state(undefined);

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

	const initMap: Action<HTMLDivElement> = (mapContainer: HTMLDivElement) => {
		map = L.map(mapContainer, mapOptions);

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
