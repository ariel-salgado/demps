<script lang="ts">
	import { configFormStore } from '$lib/utils/stores';
	import type { HTMLInputAttributes, HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		value?: string | number;
		placeholder?: string;
		options: Array<{
			value: string | number | boolean;
			text: string;
			selected?: boolean | undefined;
		}>;
	}

	let { value, placeholder, options, ...rest } = $props<Props>();

	const hasDefaultValue = (input: typeof options) =>
		input.some((option) => option.selected === true);

	const readonly = (rest as HTMLInputAttributes).readonly ? true : false;
</script>

<select
	class="block h-10 w-full rounded-md border border-slate-300 px-3 py-2 shadow focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600"
	class:readonly
	{...rest}
	bind:value
	on:change="{() => {
		$configFormStore[rest.name as keyof typeof $configFormStore] = value as string;
	}}"
>
	{#if placeholder}
		<option class="text-black" value="{undefined}" disabled selected="{!hasDefaultValue(options)}"
			>{placeholder}</option
		>
	{/if}
	{#each options as { value, text, selected }}
		<option class="text-black" {value} {selected}>{text}</option>
	{/each}
</select>

<style lang="postcss">
	select:has(option:checked:disabled) {
		@apply text-neutral-400;
	}

	.readonly {
		@apply pointer-events-none cursor-not-allowed bg-slate-100 text-slate-400 ring-0;
	}
</style>
