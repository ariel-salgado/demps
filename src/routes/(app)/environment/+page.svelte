<script lang="ts">
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Leaflet } from '$lib/components/leaflet';
	import { Codemirror, Widgets, Clipboard, Download } from '$lib/components/codemirror';
	import { FileUpload } from '$lib/components/ui';
	import { GeoJSONStore } from '$lib/stores';

	export let form: ActionData;

	$: if (form?.data) {
		GeoJSONStore.set(form?.data);
	}

	const uploadFile: SubmitFunction = ({ formData, cancel }) => {
		const { file } = Object.fromEntries(formData);

		if (file instanceof File) {
			const reader = new FileReader();

			reader.onload = () => {
				const data = JSON.parse(reader.result as string);

				GeoJSONStore.set(data);
			};

			reader.readAsText(file);
		}

		cancel();
	};

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

			<FileUpload slot="file-upload" accept=".geojson" onSubmit={uploadFile} />
		</Codemirror>
	</div>
</div>
