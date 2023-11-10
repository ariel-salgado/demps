<script lang="ts">
	import { getContext } from 'svelte';
	import { key, type MapContext } from '.';

	export let lat: number;
	export let lon: number;
	export let label: string;

	const { getLeaflet, getMap } = getContext<MapContext>(key);

	const leaflet = getLeaflet();
	const map = getMap();

	const marker = leaflet.marker([lat, lon]).addTo(map);
	marker.bindPopup(label);
</script>
