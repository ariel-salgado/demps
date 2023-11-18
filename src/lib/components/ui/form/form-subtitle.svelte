<div {...$$restProps}>
	<h3>
		<slot />
	</h3>
	<hr />
</div>

<style lang="postcss">
	div {
		@apply px-4 py-3;
	}

	h3 {
		@apply text-2xl font-medium p-1;
	}
</style>
