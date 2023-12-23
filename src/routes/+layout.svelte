<script lang="ts">
	import '../app.pcss';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		// @ts-expect-error - startViewTransition is not in the types
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-expect-error - startViewTransition is not in the types
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{@render children()}
