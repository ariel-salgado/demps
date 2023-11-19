<script lang="ts">
	export let href: string;
	export let title: string;
	export let selected: boolean = false;
</script>

<li class:selected>
	<a {href}>{title}</a>
	{#if $$slots}
		<ul>
			<slot />
		</ul>
	{/if}
</li>

<style lang="postcss">
	.selected {
		@apply bg-primary-600 text-white;
	}
</style>
