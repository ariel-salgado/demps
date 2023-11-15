<div>
	<slot />
</div>

<style lang="postcss">
	div {
		@apply w-full flex flex-col px-5 py-3 rounded-lg hover:bg-primary-50 focus-within:bg-primary-50 hover:shadow focus-within:shadow transition-colors duration-300;
	}
</style>
