<script lang="ts">
	export let href: string;
	export let title: string;
	export let selected: boolean = false;
</script>

<li class:selected>
	<a {href} on:click>{title}</a>
	{#if $$slots}
		<ul>
			<slot />
		</ul>
	{/if}
</li>

<style lang="postcss">
	.selected a {
		@apply bg-primary-600 text-white;
	}

	a {
		@apply block w-full hover:bg-green-500;
	}
</style>
