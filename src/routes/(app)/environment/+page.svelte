<script lang="ts">
	import { GeoJSONStore } from '$lib/stores';
	import { FileUpload } from '$lib/components/ui';
	import { Codemirror, Widgets, Clipboard, Download } from '$lib/components/codemirror';
	import { Leaflet, LeafletDraw, LeafletGeosearch, Marker } from '$lib/components/leaflet';

	let files: FileList | null = $state(null);

	const uploadFile = () => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const data = JSON.parse(reader.result as string);
				GeoJSONStore.set(data);
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

<div class="grid grid-cols-3">
	<div class="col-span-2">
		<Leaflet {center} {zoom}>
			<LeafletDraw />
			<LeafletGeosearch />
			<Marker {center} />
		</Leaflet>
	</div>
	<div class="h-[calc(100vh-5rem)] col-span-1">
		<Codemirror source={$GeoJSONStore}>
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
