<script lang="ts">
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import { key, type MapContext } from '$lib/components/leaflet';

	interface Props {
		center: L.LatLngExpression;
	}

	let { center } = $props<Props>();

	const { getMap, getLeaflet } = getContext<MapContext>(key);

	let map = getMap();
	let L = getLeaflet();

	const initMarker: Action = () => {
		const marker = L.marker(center);
		map.addLayer(marker);

		return {
			destroy: () => {
				marker.remove();
			}
		};
	};
</script>

<div use:initMarker />
