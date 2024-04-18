<script lang="ts">
	import type { PageData } from './$types';

	import { Map, Canvas } from '$lib/components/leaflet';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { numPoints, agents } = data;

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];
</script>

<svelte:head>
	<title>DEMPS | Simulation</title>
	<meta name="description" content="Simulación" />
</svelte:head>

<section class="h-full">
	<h2 class="absolute bottom-0 z-[500] bg-white px-2 py-0.5 text-xs opacity-90">
		Currently showing <span class="font-bold">{numPoints} agents</span>
	</h2>
	<Map {center} {zoom}>
		<Canvas coordinates={agents} />
	</Map>
</section>
