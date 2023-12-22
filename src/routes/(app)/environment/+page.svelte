<script lang="ts">
	import { envStore } from '$lib/stores';
	import { tolerance } from '$lib/stores';
	import { UploadIcon } from '$lib/components/icons';
	import { Fileupload } from '$lib/components/ui/forms';
	import { isValidGeoJSON, preprocessGeoJSON } from '$lib/utils';
	import { Editor, Widgets, Clipboard, Download, Enhance } from '$lib/components/codemirror';

	let files: FileList | null = $state(null);

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

<Editor data={envStore}>
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
