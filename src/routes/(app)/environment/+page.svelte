<script lang="ts">
	import { SEO } from '$lib/components';
	import { EnvStore } from '$lib/stores';

	import simplify from '@turf/simplify';
	import { isValidGeoJSON } from '$lib/utils/helpers';

	import { FileUpload } from '$lib/components/ui';
	import { Codemirror, Widgets, Clipboard, Download } from '$lib/components/codemirror';
	import { Leaflet, LeafletGeoman, LeafletGeosearch, Marker } from '$lib/components/leaflet';

	let files: FileList | null = $state(null);

	const uploadFile = () => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const raw = reader.result as string;

				if (!isValidGeoJSON(raw)) {
					alert('Invalid GeoJSON');
					return;
				}

				const data = JSON.parse(raw);
				const simplified = simplify(data, { tolerance: 0.0001, highQuality: true, mutate: true });
				EnvStore.set({ data: simplified, trigger: 'fileUploader' });
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};

	// Viña del Mar, Chile
	const center: L.LatLngExpression = [-33.015348, -71.550499];
	const zoom: number = 15;
</script>

<SEO title="DEMPS | Environment" description="DEMPS Environment Configuration" />

<div class="grid grid-cols-3">
	<div class="col-span-2">
		<Leaflet {center} {zoom}>
			<LeafletGeosearch />
			<LeafletGeoman />
			<Marker {center} />
		</Leaflet>
	</div>
	<div class="h-[calc(100vh-5rem)] col-span-1">
		<Codemirror>
			<Widgets slot="widgets">
				<Clipboard slot="clipboard" />
				<Download slot="download" />
			</Widgets>

			<div
				class="p-4 outline outline-1 outline-slate-300 rounded-t-md bg-primary-50"
				slot="file-upload"
			>
				<FileUpload bind:files accept=".geojson" onUpload={uploadFile}>Upload GeoJSON</FileUpload>
			</div>
		</Codemirror>
	</div>
</div>
