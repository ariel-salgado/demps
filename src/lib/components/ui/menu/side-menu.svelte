<script lang="ts">
	export let title: string;
</script>

<aside class="side-menu">
	<span>
		<h2>
			{title}
		</h2>
		<hr />
	</span>
	<ul>
		<slot />
	</ul>
</aside>

<style lang="postcss">
	.side-menu {
		@apply sticky top-20 min-w-[20rem] min-h-[calc(100vh-5rem)] h-min flex flex-col gap-y-3 px-8 py-6 shadow-md bg-primary-50;
	}
</style>
