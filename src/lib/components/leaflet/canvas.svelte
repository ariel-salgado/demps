<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	interface Props {
		agents: [number, number][];
	}

	let { agents }: Props = $props();

	const { getMap } = getContext<MapContext>(contextKey);

	let map = getMap();

	onMount(async () => {
		await import('leaflet-maskcanvas');

		// @ts-expect-error - maskCanvas is not typed
		const markerLayer = window.L.TileLayer.maskCanvas({
			radius: 1,
			useAbsoluteRadius: true,
			color: '#7E4BB9',
			opacity: 1,
			noMask: true,
			lineColor: '#6A3D9E'
		});

		markerLayer.setData(agents);

		markerLayer.addTo(map);

		if (markerLayer.bounds) {
			map.fitBounds(markerLayer.bounds);
		}
	});
</script>
