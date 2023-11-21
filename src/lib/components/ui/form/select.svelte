<script lang="ts">
	export let value: string | number | boolean | null;
	export let options: Array<{
		value: string | number | boolean;
		text: string;
		selected?: boolean | undefined;
	}>;
	export let placeholder: string | undefined;

	const hasDefaultValue = (input: typeof options) =>
		input.some((option) => option.selected === true);
</script>

<select {...$$restProps} bind:value>
	{#if placeholder}
		<option value={null} disabled selected={!hasDefaultValue(options)}>{placeholder}</option>
	{/if}
	{#each options as { value, text, selected }}
		<option {value} {selected}>{text}</option>
	{/each}
</select>

<style lang="postcss">
	select {
		@apply block w-full h-10 border border-slate-300 rounded-md px-3 py-2 shadow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent;
	}

	select:has(option:checked:disabled) {
		@apply text-neutral-400;
	}

	select option {
		@apply text-black;
	}
</style>
