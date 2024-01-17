<script lang="ts">
	const { children } = $props();
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<header></header>

	<main class="h-full">
		{@render children()}
	</main>

	<footer></footer>
</div>
