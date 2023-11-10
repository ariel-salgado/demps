<script lang="ts">
	import { Header } from '$lib/components/ui';
</script>

<div class="w-full h-full grid grid-rows-[auto_1fr]">
	<Header />

	<main>
		<slot />
	</main>
</div>
