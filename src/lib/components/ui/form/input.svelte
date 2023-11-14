<script lang="ts">
	export let type: 'text' | 'number';
	export let value: string | number;
	export let name: string;

	const typeAction = (element: HTMLInputElement) => {
		if (type === 'number') {
			element.addEventListener('keydown', (event) => {
				if (event.key === 'Backspace' || event.key === 'Delete' || event.key.startsWith('Arrow')) {
					return;
				}
				if (!/[\d.]/.test(event.key)) {
					event.preventDefault();
				}
			});
		}
	};
</script>

<input type="text" use:typeAction bind:value {name} {...$$restProps} />

<style lang="postcss">
	input {
		@apply block w-full h-10 border border-slate-300 rounded-md px-3 py-2 shadow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent;
	}
</style>
