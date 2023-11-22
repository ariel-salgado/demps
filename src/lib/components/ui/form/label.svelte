<script lang="ts">
	import type { HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLLabelAttributes>();
</script>

<label {...rest}>
	<slot />
</label>

<style lang="postcss">
	label {
		@apply text-lg leading-relaxed p-1;
	}
</style>
