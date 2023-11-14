<script lang="ts">
	export let value: string | number | boolean;
	export let options: Array<{ value: string | number | boolean; text: string }>;
	export let name: string;
	export let placeholder: string | undefined;
</script>

<select bind:value {name} {...$$restProps}>
	{#if placeholder}
		<option value="" disabled selected>{placeholder}</option>
	{/if}
	{#each options as { value, text }}
		<option {value}>{text}</option>
	{/each}
</select>

<style lang="postcss">
	select {
		@apply block w-full h-10 border border-slate-300 rounded-md px-3 py-2 shadow focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent;
	}
</style>
