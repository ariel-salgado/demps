<script lang="ts">
	export let href: string;
	export let title: string;
	export let selected: boolean = false;
</script>

<li class:selected>
	<span />
	<a on:click {href}>{title}</a>
</li>

<style lang="postcss">
	li {
		@apply pl-6;
	}

	.selected a {
		@apply border-primary-200 bg-primary-400 text-white hover:border-primary-200 focus-within:border-primary-200 hover:bg-primary-700 focus-within:bg-primary-700 hover:text-white focus-within:text-white transition-colors duration-100;
	}

	a {
		@apply block w-full px-3 py-2 border-l-4 border-slate-200 hover:border-primary-300 focus-within:border-primary-300 hover:bg-primary-100 focus-within:bg-primary-100 transition-colors duration-100 rounded-r-md hover:shadow focus-within:shadow;
	}
</style>
