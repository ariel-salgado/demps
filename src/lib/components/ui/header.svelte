<script lang="ts">
	import { get } from 'svelte/store';
	import { GeoJSONStore } from '$lib/stores';

	const navItems: Array<{ name: string; href: string }> = [
		{ name: 'inicio', href: '/' },
		{ name: 'environment', href: '/environment' },
		{ name: 'configuration', href: '/configuration' }
	];

	let URLdata: any;

	const downloadGeoJSON = () => {
		const data = get(GeoJSONStore);

		if (data.features.length > 0) {
			const convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
			URLdata = 'data:' + convertedData;
		} else {
			// alert('El mapa no tiene datos para exportar');
		}
	};
</script>

<header class="w-full h-20 flex justify-around items-center bg-primary-50 shadow z-10">
	<span
		class="text-3xl font-medium hover:text-primary-600 focus-within:text-primary-600 hover:underline focus-within:underline underline-offset-2 transition-colors duration-300"
	>
		<a class="block" href="/">DEMPS</a>
	</span>
	<nav>
		<ul class="flex items-center gap-x-6">
			{#each navItems as { name, href }}
				<li
					class="hover:text-primary-600 focus-within:text-primary-600 hover:underline focus-within:underline underline-offset-2 transition-colors duration-300"
				>
					<a class="w-full block" {href}>{name}</a>
				</li>
			{/each}
			<li>
				<a
					href={URLdata}
					download={'data.geojson'}
					on:click={downloadGeoJSON}
					class="bg-primary-600 px-6 py-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300"
					>Download GeoJSON</a
				>
			</li>
			<li>
				<button
					class="bg-primary-600 px-6 py-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300"
				>
					Run
				</button>
			</li>
		</ul>
	</nav>
</header>
