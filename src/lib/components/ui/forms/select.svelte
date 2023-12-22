<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLAttributes<HTMLSelectElement> {
		value?: string | number | null;
		placeholder?: string;
		options: Array<{
			value: string | number | boolean;
			text: string;
			selected?: boolean | undefined;
		}>;
	}

	let { value, placeholder, options, class: className, ...props } = $props<Props>();
</script>

<select
	class={cn(
		'flex h-10 items-center justify-between rounded-md border border-slate-300 px-3 py-2 shadow ring-offset-white focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	{...props}
>
	{#if placeholder}
		<option value={undefined} disabled>{placeholder}</option>
	{/if}
	{#each options as { value, text, selected }}
		<option {value} {selected}>{text}</option>
	{/each}
</select>
