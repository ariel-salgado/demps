<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { EditorContext } from '$lib/components/codemirror';

	import { getContext } from 'svelte';
	import { DownloadIcon } from '$lib/components/icons';
	import { contextKey } from '$lib/components/codemirror';

	interface Props extends HTMLAnchorAttributes {}

	let { ...props }: Props = $props();

	const { getEditor } = getContext<EditorContext>(contextKey);

	const editor = getEditor();

	let URLdata: string | null = $state(null);

	const downloadGeoJSON = () => {
		const data = JSON.parse(editor.state.doc.toString());

		if (data.features.length > 0) {
			const convertedData =
				'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
			URLdata = 'data:' + convertedData;
		} else {
			alert('El mapa no tiene datos para exportar');
		}
	};
</script>

<a
	class="inline-flex size-[30px] items-center justify-center rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300 transition-colors focus-within:bg-neutral-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-neutral-100"
	href={URLdata}
	download={'data.geojson'}
	onclick={downloadGeoJSON}
	tabindex="0"
	role="button"
	aria-label="Descargar GeoJSON"
	data-sveltekit-preload-data="false"
	{...props}
>
	<DownloadIcon />
</a>
