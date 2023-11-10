<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type L from 'leaflet';
	import { key } from './key';

	import 'leaflet/dist/leaflet.css';

	export let view: L.LatLngExpression;
	export let zoom: number;

	let leaflet: typeof L;
	let mapContainer: HTMLDivElement;
	let map: L.Map;

	setContext(key, {
		getLeaflet: () => leaflet,
		getMap: () => map
	});

	onMount(async () => {
		leaflet = await import('leaflet');
		map = leaflet.map(mapContainer).setView(view, zoom);
		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
	});
</script>

<div class="w-full h-full" bind:this={mapContainer}>
	{#if leaflet && mapContainer}
		<slot />
	{/if}
</div>
