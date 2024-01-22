<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLSelectAttributes {
		value?: string | number;
		placeholder?: string | null;
		options: Array<{
			label: string | null;
			value: string | number | boolean;
			selected?: boolean | undefined;
		}>;
	}

	let { value, placeholder, options, class: className, ...props } = $props<Props>();

	const hasDefaultValue = options.some((option) => option.selected === true);
</script>

<select
	class={cn(
		'inline-flex h-9 w-full rounded-md border border-slate-300 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	{...props}
>
	{#if placeholder}
		<option value={undefined} disabled selected={!hasDefaultValue}>{placeholder}</option>
	{/if}
	{#each options as { label, value, selected }}
		<option {value} {selected}>{label}</option>
	{/each}
</select>
