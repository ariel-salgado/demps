<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		error?: boolean;
	}

	let { error = false, ...rest } = $props<Props>();
</script>

<small class="text-slate-600 italic p-1" class:error {...rest}>
	<slot />
</small>

<style lang="postcss">
	.error {
		@apply text-red-500;
	}
</style>
