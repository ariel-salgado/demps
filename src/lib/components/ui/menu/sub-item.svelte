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

	a {
		@apply block w-full hover:bg-blue-500;
	}
</style>
