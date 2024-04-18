<script lang="ts">
	import type { z } from 'zod';
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';
	import { onlyAllowNumbers } from '.';

	interface Props extends HTMLInputAttributes {
		validation?: z.ZodType;
	}

	let {
		type: type,
		class: className,
		value: value = $bindable(),
		validation,
		...props
	}: Props = $props();

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
			element.addEventListener('keydown', onlyAllowNumbers);
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
		'inline-flex h-9 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ring-offset-white read-only:cursor-not-allowed read-only:select-none read-only:bg-slate-100 read-only:text-neutral-600 read-only:ring-offset-slate-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 read-only:focus-within:ring-opacity-0',
		className
	)}
	class:error={validationError}
	{...props}
	bind:value
	onchange={validateField}
	use:initInput
/>

{#if validationError}
	<small class="text-red-600">{inputError}</small>
{/if}

<style lang="postcss">
	.error {
		@apply border-2 border-red-600 focus-within:ring-red-600;
	}
</style>
