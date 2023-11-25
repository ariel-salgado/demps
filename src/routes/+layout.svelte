<script lang="ts">
	import '../app.postcss';
	import { Header } from '$lib/components/ui';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		// @ts-expect-error - ViewTransition API is not in the types
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-expect-error - ViewTransition API is not in the types
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="w-full min-h-full grid grid-rows-[auto_1fr]">
	<Header />

	<main>
		<slot />
	</main>
</div>
