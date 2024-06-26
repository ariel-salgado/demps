<script lang="ts">
	import type { z } from 'zod';
	import type { SelectOptions } from '$lib/types';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLSelectAttributes {
		value?: string | number;
		placeholder?: string | null;
		options: SelectOptions;
		validation?: z.ZodType;
	}

	let {
		value = $bindable(),
		placeholder,
		options,
		class: className,
		validation,
		...props
	}: Props = $props();

	const hasDefaultValue = options.some((option) => option.selected === true);

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
</script>

<select
	class={cn(
		'inline-flex h-9 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ring-offset-white focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:select-none disabled:bg-slate-100 disabled:text-neutral-600 disabled:ring-offset-slate-100 disabled:focus-within:ring-opacity-0',
		className
	)}
	class:error={validationError}
	bind:value
	onchange={validateField}
	{...props}
>
	{#if placeholder}
		<option value={undefined} disabled selected={!hasDefaultValue}>{placeholder}</option>
	{/if}
	{#each options as { label, value, selected }}
		<option {value} {selected}>{label}</option>
	{/each}
</select>

{#if validationError}
	<small class="text-red-600">{inputError}</small>
{/if}

<style lang="postcss">
	.error {
		@apply border-2 border-red-600 focus-within:ring-red-600;
	}
</style>
