<script lang="ts">
	import '../app.postcss';
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

<slot />
