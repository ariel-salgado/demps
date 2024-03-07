<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	import { UploadIcon } from '$lib/components/icons';
	import { Fileupload } from '$lib/components/ui/forms';
	import { envStore, toleranceStore } from '$lib/stores';
	import { Map, Draw, Search } from '$lib/components/leaflet';
	import { isValidGeoJSON, preprocessGeoJSON } from '$lib/utils';
	import { Editor, Widgets, Enhance, Clipboard, Download } from '$lib/components/codemirror';

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];

	let files: FileList | null = $state(null);

	const handleUpload: FormEventHandler<HTMLButtonElement> = (e: Event) => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const uploadedData = reader.result as string;

				if (!isValidGeoJSON(uploadedData)) {
					alert('Invalid GeoJSON');
					return;
				}

				envStore.set(preprocessGeoJSON(JSON.parse(uploadedData), $toleranceStore));

				(e.target! as HTMLInputElement).value = '';
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};
</script>

<svelte:head>
	<title>DEMPS | Environment</title>
	<meta name="description" content="DEMPS | Environment" />
</svelte:head>

<section class="grid h-full grid-flow-col grid-cols-5">
	<Map class="col-span-3" store={envStore} {center} {zoom}>
		<Search />
		<Draw />
	</Map>
	<Editor class="col-span-2" store={envStore}>
		{#snippet widgets()}
			<Widgets>
				<Enhance />
				<Clipboard />
				<Download />
			</Widgets>
		{/snippet}
		{#snippet actions()}
			<Fileupload
				accept=".geojson"
				bind:files
				onchange={handleUpload}
				role="button"
				aria-label="Upload GeoJSON"
			>
				<span>Upload GeoJSON</span>
				<UploadIcon />
			</Fileupload>
		{/snippet}
	</Editor>
</section>
