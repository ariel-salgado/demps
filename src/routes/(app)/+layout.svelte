<script lang="ts">
	import { Header } from '$lib/components/ui/header';

	const { children } = $props();
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<Header />

	<main class="h-full">
		{@render children()}
	</main>

	<footer></footer>
</div>
