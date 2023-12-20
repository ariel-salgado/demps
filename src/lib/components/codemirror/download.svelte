<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { EditorContext } from '$lib/components/codemirror';

	import { getContext } from 'svelte';
	import { key } from '$lib/components/codemirror';
	import { DownloadIcon } from '$lib/components/icons';

	interface Props extends HTMLAttributes<HTMLAnchorElement> {}

	const { ...props } = $props<Props>();

	const { getEditor } = getContext<EditorContext>(key);
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
	class="h-min w-min cursor-pointer rounded-md bg-white p-1 shadow outline outline-1 outline-slate-300"
	href={URLdata}
	download={'data.geojson'}
	onclick={downloadGeoJSON}
	role="button"
	aria-label="Download data"
	data-sveltekit-preload-data="false"
	{...props}
>
	<DownloadIcon />
</a>
