<script lang="ts">
	import '../app.postcss';
	import { SEO } from '$lib/components';
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

<SEO title="DEMPS" description="DEMPS" />

<div>
	<Header />

	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	div {
		@apply w-full min-h-full grid grid-rows-[auto_1fr];
	}
</style>
