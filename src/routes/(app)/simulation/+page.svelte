<script lang="ts">
	import type { FeatureCollection, Point } from 'geojson';

	import { simStore } from '$lib/stores';
	import { Map, MarkerCluster } from '$lib/components/leaflet';

	interface Props {
		data: FeatureCollection<Point>;
	}

	let { data } = $props<Props>();

	simStore.set(data);

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];
</script>

<section class="h-full">
	<Map {center} {zoom} overlay={false}>
		<MarkerCluster geojson={simStore} />
	</Map>
</section>
