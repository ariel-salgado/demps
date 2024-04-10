<script lang="ts">
	import type { FormField, FormFields } from '$lib/types';

	import { parametersFormFields } from '$lib';
	import { createParameters } from '$lib/states.svelte';
	import { Description, FormGroup, Input, Label, Select } from '$lib/components/ui';

	const parameters = createParameters();
</script>

{#snippet form(fields: FormFields, isNested: boolean)}
	{#each Object.entries(fields) as [key, value]}
		<div class={`mt-10 grid grid-cols-2 gap-2 first:mt-0 ${isNested && 'col-span-2'}`}>
			{#if isNested}
				<h3
					id={key}
					class="observed col-span-2 -mt-8 mb-2 scroll-m-[4.5rem] pl-5 text-2xl font-semibold capitalize tracking-tight"
				>
					{key}
				</h3>
			{:else}
				<h2
					id={key}
					class="observed col-span-2 scroll-m-[5.5rem] border-b pb-2 pl-5 text-3xl font-semibold capitalize tracking-tight"
				>
					{key}
				</h2>
			{/if}
			{#if Array.isArray(value)}
				{#each value as field}
					{@render formFields(field)}
				{/each}
			{:else}
				{@render form(value, true)}
			{/if}
		</div>
	{/each}
{/snippet}

{#snippet formFields(field: FormField)}
	<FormGroup>
		<Label for={field.attributes.name}>{field.label}</Label>
		{#if field.type === 'input'}
			<Input
				id={field.attributes.name}
				bind:value={parameters.value[(field.attributes.name!)]}
				{...field.attributes}
				validation={field.validation}
			/>
		{:else if field.type === 'select'}
			<Select
				id={field.attributes.name}
				bind:value={parameters.value[(field.attributes.name!)]}
				{...field.attributes}
				options={field.options}
				validation={field.validation}
			/>
		{/if}
		<Description>{field.description}</Description>
	</FormGroup>
{/snippet}

<section>
	<form class="px-12 py-10" action="">
		{@render form(parametersFormFields, false)}
	</form>
</section>
