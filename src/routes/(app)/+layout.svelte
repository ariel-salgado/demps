<script lang="ts">
	import { Header } from '$lib/components/ui';
</script>

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
