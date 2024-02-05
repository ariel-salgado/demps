<script lang="ts">
	import { simStore } from '$lib/stores';
	import { Map, Cluster } from '$lib/components/leaflet';

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];
</script>

<section class="h-full">
	<Map store={simStore} {center} {zoom} overlay={false}>
		<Cluster />
	</Map>
</section>
