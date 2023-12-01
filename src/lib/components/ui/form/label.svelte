<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLLabelAttributes>();
</script>

<label {...rest}>
	<slot />
</label>

<style lang="postcss">
	label {
		@apply p-1 text-lg leading-relaxed;
	}
</style>
