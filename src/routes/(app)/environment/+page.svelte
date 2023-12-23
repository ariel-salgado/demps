<script lang="ts">
	import { Map } from '$lib/components/leaflet';
	import { Draw } from '$lib/components/leaflet';
	import { envStore } from '$lib/stores';
	import { UploadIcon } from '$lib/components/icons';
	import { Fileupload } from '$lib/components/ui/forms';
	import { isValidGeoJSON, preprocessGeoJSON } from '$lib/utils';
	import { Editor, Widgets, Clipboard, Download, Enhance } from '$lib/components/codemirror';
	import { writable } from 'svelte/store';

	let files: FileList | null = $state(null);

	// Defaults to Viña del Mar, CHile
	const center: [number, number] = [-33.015348, -71.550499];
	const zoom: number = 15;

	const tolerance = writable(0);

	const handleUpload = () => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const uploadedData = reader.result as string;

				if (!isValidGeoJSON(uploadedData)) {
					alert('Invalid GeoJSON');
					return;
				}

				const geojson = preprocessGeoJSON(JSON.parse(uploadedData), $tolerance);
				envStore.set(geojson);
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};
</script>

<section class="grid h-full grid-flow-col grid-cols-5">
	<Map class="col-span-3" data={envStore} {center} {zoom}>
		<Draw />
	</Map>
	<Editor class="col-span-2" data={envStore}>
		{#snippet widgets()}
			<Widgets>
				<Enhance bind:tolerance={$tolerance} />
				<Clipboard />
				<Download />
			</Widgets>
		{/snippet}
		{#snippet actions()}
			<Fileupload accept=".geojson" bind:files onUpload={handleUpload}>
				<span>Upload GeoJSON</span>
				<UploadIcon class="mt-0.5 h-5 w-5" />
			</Fileupload>
		{/snippet}
	</Editor>
</section>
