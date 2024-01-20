<script lang="ts">
	import { envStore } from '$lib/stores';
	import { Map, Draw } from '$lib/components/leaflet';
	import { Editor, Widgets, Clipboard, Download } from '$lib/components/codemirror';

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499]; // Viña del Mar, Chile
</script>

<section class="grid h-full grid-flow-col grid-cols-5">
	<Map class="col-span-3" {center} {zoom} store={envStore}>
		<Draw />
	</Map>
	<Editor class="col-span-2" store={envStore}>
		{#snippet widgets()}
			<Widgets>
				<Clipboard />
				<Download />
			</Widgets>
		{/snippet}
	</Editor>
</section>
