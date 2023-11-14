<script lang="ts">
	export let error: boolean = false;
</script>

<small class:error>
	<slot />
</small>

<style lang="postcss">
	small {
		@apply text-slate-600 italic p-1;
	}

	.error {
		@apply text-red-500;
	}
</style>
