<script lang="ts">
	import '../app.pcss';

	import { Header } from '$lib/components/ui';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<Header />

	<main class="h-full">
		{@render children()}
	</main>

	<footer></footer>
</div>
