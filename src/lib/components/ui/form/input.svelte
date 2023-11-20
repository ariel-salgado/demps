<script lang="ts">
	export let type: 'text' | 'number';
	export let value: string | number | undefined;

	const typeAction = (element: HTMLInputElement) => {
		if (value) element.value = value.toString();
		if (type === 'number') {
			element.addEventListener('keydown', (event) => {
				if (
					event.key === 'Backspace' ||
					event.key === 'Delete' ||
					event.key.startsWith('Arrow') ||
					event.key === 'Tab'
				) {
					return;
				}
				if (!/[\d.]/.test(event.key)) {
					event.preventDefault();
				}
			});
		}
	};
</script>

<input {...$$restProps} bind:value use:typeAction />

<style lang="postcss">
	input {
		@apply block w-full h-10 border border-slate-300 rounded-md px-3 py-2 shadow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent;
	}

	input:read-only {
		@apply bg-slate-100 text-slate-400 ring-slate-400;
	}
</style>
