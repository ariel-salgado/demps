<script lang="ts">
	interface Props {
		href: string;
		title: string;
		selected?: boolean;
	}

	let { href, title, selected = false } = $props<Props>();
</script>

<li class="pl-6" class:selected>
	<a
		class="block w-full rounded-r-md border-l-4 border-slate-200 px-3 py-2 transition-colors duration-100 focus-within:border-primary-300 focus-within:bg-primary-100 focus-within:shadow hover:border-primary-300 hover:bg-primary-100 hover:shadow"
		on:click
		{href}>{title}</a
	>
</li>

<style lang="postcss">
	.selected a {
		@apply border-primary-200 bg-primary-400 text-white transition-colors duration-100 focus-within:border-primary-200 focus-within:bg-primary-700 focus-within:text-white hover:border-primary-200 hover:bg-primary-700 hover:text-white;
	}
</style>
