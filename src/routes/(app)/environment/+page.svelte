<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import type { Feature, FeatureCollection } from 'geojson';

	import { isValidGeoJSON } from '$lib/utils';
	import { Fileupload } from '$lib/components/ui';
	import { UploadIcon } from '$lib/components/icons';
	import { Map, Draw, Search } from '$lib/components/leaflet';
	import { envStore, toleranceOptions, toleranceStore } from '$lib/stores';
	import { Editor, Widgets, Enhance, Clipboard, Download } from '$lib/components/codemirror';

	import simplify from '@turf/simplify';
	import truncate from '@turf/truncate';

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];

	let files: FileList | null = $state(null);

	const preprocessGeoJSON = (geojson: FeatureCollection, tolerance?: number) => {
		const metadata = {
			'@context': {
				'@simplified': tolerance! > 0 ? true : false,
				...(tolerance! > 0
					? {
							'@tolerance': Object.keys(toleranceOptions).find(
								(key) => toleranceOptions[key] === tolerance
							)
						}
					: {})
			}
		};

		let processedGeoJSON = truncate(geojson, {
			precision: 6,
			coordinates: Number.MAX_VALUE,
			mutate: true
		});

		if (tolerance && tolerance > 0) {
			processedGeoJSON.features = geojson.features.map((feature) => {
				if (feature.properties?.zoneType === 'flood') {
					const simplifiedFeature = simplify(feature.geometry, {
						tolerance: tolerance,
						highQuality: true,
						mutate: true
					});
					return {
						...feature,
						geometry: simplifiedFeature
					};
				} else {
					return feature;
				}
			});
		}

		processedGeoJSON.features = processedGeoJSON.features.map(({ id, ...feature }: Feature) => ({
			id: id || crypto.randomUUID(),
			...feature
		}));

		processedGeoJSON = {
			...metadata,
			...processedGeoJSON
		};

		return processedGeoJSON as FeatureCollection;
	};

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

<section class="grid h-full grid-flow-col grid-cols-3">
	<Map class="col-span-2" store={envStore} {center} {zoom}>
		<Search />
		<Draw />
	</Map>
	<Editor class="col-span-1" store={envStore}>
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
