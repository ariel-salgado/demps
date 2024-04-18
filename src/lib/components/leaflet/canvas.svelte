<script lang="ts">
	import type { MapContext } from '$lib/components/leaflet';

	import { getContext, onMount } from 'svelte';
	import { contextKey } from '$lib/components/leaflet';

	interface Props {
		coordinates: [number, number][];
	}

	let { coordinates }: Props = $props();

	const { getMap } = getContext<MapContext>(contextKey);
	const halfLength = Math.ceil(coordinates.length / 2);
	const firstHalf = coordinates.slice(0, halfLength);
	const secondHalf = coordinates.slice(halfLength);

	let map = getMap();

	onMount(async () => {
		// @ts-ignore
		await import('leaflet-maskcanvas');

		// @ts-ignore
		const markerLayer1 = window.L.TileLayer.maskCanvas({
			radius: 1,
			useAbsoluteRadius: true,
			color: '#7E4BB9',
			opacity: 1,
			noMask: true,
			lineColor: '#6A3D9E'
		});

		// @ts-ignore
		const markerLayer2 = window.L.TileLayer.maskCanvas({
			radius: 1,
			useAbsoluteRadius: true,
			color: '#3D8C40',
			opacity: 1,
			noMask: true,
			lineColor: '#3D8C40'
		});

		markerLayer1.setData(firstHalf);
		markerLayer2.setData(secondHalf);

		const bounds1 = markerLayer1.bounds;
		const bounds2 = markerLayer2.bounds;

		markerLayer1.addTo(map);
		markerLayer2.addTo(map);

		if (bounds1.isValid() && bounds2.isValid()) {
			map.fitBounds(bounds1.extend(bounds2));
		}
	});
</script>
