<script lang="ts">
	interface Props {
		error: boolean;
	}

	let { error = false } = $props<Props>();
</script>

<small class="text-slate-600 italic p-1" class:error>
	<slot />
</small>

<style lang="postcss">
	.error {
		@apply text-red-500;
	}
</style>
