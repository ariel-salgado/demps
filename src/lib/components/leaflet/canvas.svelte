<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	interface Props {
		coordinates: [number, number][];
	}

	let { coordinates }: Props = $props();

	const { getMap } = getContext<MapContext>(contextKey);

	let map = getMap();

	onMount(async () => {
		// @ts-ignore
		await import('leaflet-maskcanvas');

		// @ts-ignore
		const markerLayer = window.L.TileLayer.maskCanvas({
			radius: 1,
			useAbsoluteRadius: true,
			color: '#7E4BB9',
			opacity: 1,
			noMask: true,
			lineColor: '#6A3D9E'
		});

		markerLayer.setData(coordinates);

		const bounds = markerLayer.bounds;

		markerLayer.addTo(map);

		if (bounds.isValid()) {
			map.fitBounds(bounds);
		}
	});
</script>
