<script lang="ts">
	import '../app.pcss';

	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { Header } from '$lib/components/ui';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					const update = confirm('Hay una nueva versión disponible. ¿Desea actualizar?');
					if (update) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		!dev && detectSWUpdate();
	});
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<Header />

	<main class="h-full">
		{@render children()}
	</main>

	<footer></footer>
</div>
