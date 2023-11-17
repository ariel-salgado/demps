<script lang="ts">
	import type { ActionData } from './$types';
	import { Leaflet } from '$lib/components/leaflet';
	import { Codemirror, Widgets, Clipboard, Download, FileUpload } from '$lib/components/codemirror';
	import { GeoJSONStore } from '$lib/stores';

	export let form: ActionData;

	$: if (form?.data) {
		GeoJSONStore.set(form?.data);
	}

	// Viña del Mar, Chile
	const initialView: L.LatLngExpression = [-33.015348, -71.550499];
	const zoom: number = 15;
</script>

<div class="grid grid-cols-3">
	<div class="col-span-2">
		<Leaflet view={initialView} {zoom} />
	</div>
	<div class="h-[calc(100vh-5rem)] col-span-1">
		<Codemirror source={$GeoJSONStore}>
			<Widgets slot="widgets">
				<Clipboard slot="clipboard" />
				<Download slot="download" />
			</Widgets>

			<FileUpload slot="file-upload" accept=".geojson" />
		</Codemirror>
	</div>
</div>
