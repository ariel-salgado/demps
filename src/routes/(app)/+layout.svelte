<script lang="ts">
	import { Header } from '$lib/components/ui/header';

	let { children } = $props();
</script>

<div class="grid h-full grid-rows-[auto_1fr_auto]">
	<Header></Header>

	<main>
		{@render children()}
	</main>

	<footer></footer>
</div>
