<script lang="ts">
	import { configFormStore } from '$lib/utils/stores';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		type?: 'text' | 'number';
	}

	let { type, value, ...rest } = $props<Props>();

	const typeAction = (element: HTMLInputElement) => {
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

		return {
			destroy() {
				element.removeEventListener('keydown', () => {});
			}
		};
	};
</script>

<input
	class="block h-10 w-full rounded-md border border-slate-300 px-3 py-2 shadow focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600"
	{...rest}
	bind:value
	use:typeAction
	on:input="{() => {
		$configFormStore[rest.name as keyof typeof $configFormStore] = value;
	}}"
/>

<style lang="postcss">
	input:read-only {
		@apply cursor-not-allowed bg-slate-100 text-slate-400 ring-0;
	}
</style>
