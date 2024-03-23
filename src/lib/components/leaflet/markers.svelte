<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	import 'leaflet-maskcanvas';

	interface Props {
		data: [number, number][];
	}

	let { data }: Props = $props();

	const { getMap, getLeaflet } = getContext<MapContext>(contextKey);

	let map = getMap();
	let L = getLeaflet();

	// @ts-expect-error - maskCanvas is not typed
	const markerLayer = L.TileLayer.maskCanvas({
		radius: 1,
		useAbsoluteRadius: true,
		color: '#7E4BB9',
		opacity: 1,
		noMask: true,
		lineColor: '#6A3D9E'
	});

	markerLayer.setData(data);

	markerLayer.addTo(map);

	if (markerLayer.bounds) {
		map.fitBounds(markerLayer.bounds);
	}
</script>
