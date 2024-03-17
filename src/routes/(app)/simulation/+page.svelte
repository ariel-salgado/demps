<script lang="ts">
	import type { FeatureCollection, Point } from 'geojson';

	import { simStore } from '$lib/stores';
	import { Map } from '$lib/components/leaflet';

	interface Props {
		data: FeatureCollection<Point>;
	}

	let { data }: Props = $props();

	simStore.set(data);

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];
</script>

<svelte:head>
	<title>DEMPS | Simulation</title>
	<meta name="description" content="DEMPS | Simulation" />
</svelte:head>

<section class="h-full">
	<Map {center} {zoom} overlay={false}>
		<!--  -->
	</Map>
</section>
