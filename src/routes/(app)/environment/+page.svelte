<script lang="ts">
	import type { Feature, FeatureCollection } from 'geojson';

	import { createEnvironment } from '$lib/states.svelte';

	import { UploadIcon } from '$lib/components/icons';
	import { Fileupload } from '$lib/components/ui/fileupload';
	import { Map, Search, Draw } from '$lib/components/leaflet';
	import { Editor, Widgets, Clipboard, Download } from '$lib/components/codemirror';

	// @ts-ignore
	import truncate from '@turf/truncate';

	const zoom = 15;
	const center: [number, number] = [-33.015348, -71.550002];

	const environment = createEnvironment();

	let files: FileList | null = $state(null);

	function handleUpload(e: Event) {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const uploadedData = reader.result as string;

				try {
					const geojson = preprocessGeoJSON(uploadedData);

					if (!geojson) return;

					environment.value = geojson;
				} catch (_) {
					alert('Archivo GeoJSON inválido.');
				} finally {
					(e.target! as HTMLInputElement).value = '';
				}
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	}

	function preprocessGeoJSON(data: string | FeatureCollection) {
		if (typeof data === 'string') {
			try {
				data = JSON.parse(data) as FeatureCollection;
			} catch (_) {
				alert('Error al parsear el archivo GeoJSON.');
				return;
			}
		}

		const features: Feature[] = [];

		for (let feature of data.features) {
			const randomID = crypto.randomUUID().split('-').at(-1) as string;
			feature = { id: String(feature.id) || randomID, ...feature };
			features.push(feature);
		}

		const geojson = truncate(
			{ type: 'FeatureCollection', features: features },
			{ precision: 6, coordinates: 2, mutate: true }
		) as FeatureCollection;

		return geojson;
	}
</script>

<svelte:head>
	<title>DEMPS | Environment</title>
	<meta name="description" content="DEMPS | Environment" />
</svelte:head>

<section class="grid size-full grid-cols-3">
	<Map class="col-span-2" {zoom} {center} {environment}>
		<Search />
		<Draw />
	</Map>
	<Editor class="col-span-1" content={environment}>
		{#snippet widgets()}
			<Widgets>
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
