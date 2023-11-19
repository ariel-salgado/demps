<script lang="ts">
	export let href: string;
	export let title: string;
	export let selected: boolean = false;
</script>

<li class:selected>
	<a {href}>{title}</a>
</li>

<style lang="postcss">
	li {
		@apply bg-primary-50 pl-4;
	}

	.selected a {
		@apply bg-primary-600 text-white;
	}
</style>
