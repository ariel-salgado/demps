<div
	class="flex w-full flex-col rounded-lg px-5 py-3 transition-colors duration-300 focus-within:bg-primary-50 focus-within:shadow hover:bg-primary-50 hover:shadow"
>
	<slot />
</div>

<style lang="postcss">
	div:has(input:read-only),
	div:has(.readonly) {
		@apply bg-slate-100;
	}
</style>
