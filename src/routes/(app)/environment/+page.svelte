<script lang="ts">
	import type { Metadata } from '$lib/types';
	import type { Feature, FeatureCollection } from 'geojson';

	import { toleranceOptions } from '$lib';
	import { createEnvironment, createTolerance } from '$lib/states.svelte';

	import { UploadIcon } from '$lib/components/icons';
	import { Fileupload } from '$lib/components/ui/fileupload';
	import { Map, Search, Draw } from '$lib/components/leaflet';
	import { Editor, Widgets, Clipboard, Download, Enhance } from '$lib/components/codemirror';

	import simplify from '@turf/simplify';
	import truncate from '@turf/truncate';

	const zoom = 15;
	const center: [number, number] = [-33.015348, -71.550002];

	const tolerance = createTolerance();
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

		// Simplify flood zones
		let totalZonesSimplified: number = 0;
		let geojson: Feature[] | FeatureCollection = data.features.map((feature: Feature) => {
			feature = { id: feature.id || (crypto.randomUUID().split('-').at(-1) as string), ...feature };
			if (feature.properties?.zoneType === 'flood' && tolerance.value! > 0) {
				totalZonesSimplified++;
				return simplify(feature, {
					tolerance: tolerance.value,
					highQuality: true,
					mutate: true
				}) as Feature;
			}
			return feature;
		});

		// Truncate coordinates to 6 decimals
		geojson = truncate(
			{ type: 'FeatureCollection', features: geojson },
			{ precision: 6, coordinates: 2, mutate: true }
		) as FeatureCollection;

		// Add metadata
		const simplified: boolean = totalZonesSimplified > 0 && tolerance.value! > 0;
		const toleranceValue: keyof typeof toleranceOptions | undefined =
			totalZonesSimplified > 0
				? (Object.keys(toleranceOptions).find(
						(key) => toleranceOptions[key] === tolerance.value
					) as keyof typeof toleranceOptions)
				: undefined;

		const metadata: Metadata = {
			'@context': {
				'@simplified': simplified,
				...(toleranceValue && { '@tolerance': toleranceValue })
			}
		};

		return { ...metadata, ...geojson } as Metadata & FeatureCollection;
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
				<Enhance {tolerance} />
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
