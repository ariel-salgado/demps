<script lang="ts">
	import { envStore } from '$lib/stores';
	import { Editor } from '$lib/components/codemirror';

	const zoom: number = 15;
	const center: [number, number] = [-33.015348, -71.550499];
</script>

<section class="h-full">
	<Editor class="col-span-2" store={envStore} />
</section>
