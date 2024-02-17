<script lang="ts">
	import type { z } from 'zod';
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLInputAttributes {
		validation?: z.ZodType;
	}

	let { type: type, class: className, value: value, validation, ...props } = $props<Props>();

	let validationError: boolean = $state(false);
	let inputError: string | undefined = $state();

	const validateField = () => {
		if (!validation) return;

		const result = validation.safeParse(value);

		if (result.success) validationError = false;
		else {
			validationError = true;
			inputError = result.error.format()._errors.at(0);
		}
	};

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
	class:error={validationError}
	{...props}
	bind:value
	on:change={validateField}
	use:initInput
/>

{#if validationError}
	<small class="text-red-600">{inputError}</small>
{/if}

<style lang="postcss">
	.error {
		@apply border-2 border-red-600 focus-visible:ring-red-600;
	}
</style>
