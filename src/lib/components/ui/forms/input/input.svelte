<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLInputAttributes {}

	let { type: type, class: className, value: value, ...props } = $props<Props>();

	const initInput: Action<HTMLInputElement> = (element: HTMLInputElement) => {
		if (type !== 'number') element.type = 'text';

		if (type === 'number') {
			element.addEventListener('keydown', (e: KeyboardEvent) => {
				if (
					e.key === 'Backspace' ||
					e.key === 'Delete' ||
					e.key.startsWith('Arrow') ||
					e.key === 'Tab'
				) {
					return;
				}
				if (!/[\d.]/.test(e.key)) {
					e.preventDefault();
				}
			});
		}

		return {
			destroy() {
				element.removeEventListener('keydown', () => {});
				element.remove();
			}
		};
	};
</script>

<input
	class={cn(
		'inline-flex h-9 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...props}
	bind:value
	use:initInput
/>
