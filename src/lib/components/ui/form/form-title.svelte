<div {...$$restProps}>
	<h2>
		<slot />
	</h2>
	<hr />
</div>

<style lang="postcss">
	div {
		@apply px-2 py-4;
	}

	h2 {
		@apply text-3xl font-medium p-3;
	}
</style>
