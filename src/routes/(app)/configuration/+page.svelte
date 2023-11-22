<script lang="ts">
	import { enhance } from '$app/forms';
	import { configFormStore } from '$lib/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { capitalize, stringify, toKebabCase } from '$lib/utils/helpers';
	import { configurationFormFields as formFields, type TFormElement } from '$lib/utils/form-fields';
	import {
		FormTitle,
		FormSubtitle,
		FormGroup,
		Input,
		Select,
		Label,
		Hint
	} from '$lib/components/ui/form';

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			// @ts-expect-error - Bad type definition
			const parsedData = stringify(result.data);

			const blob = new Blob([parsedData], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'config.json';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		};
	};
</script>

{#snippet formElement(item: TFormElement)}
	{#if item.element === 'input'}
	<FormGroup>
		<Label for={item.field}>{item.name}</Label>
		<Input {...item.attributes} bind:value={$configFormStore[item.field]} />
		<Hint error={false}>{item.hint}</Hint>
	</FormGroup>
	{:else if item.element === 'select'}
	<FormGroup>
		<Label for={item.field}>{item.name}</Label>
		<Select
			{...item.attributes}
			options={item.options}
			bind:value={$configFormStore[item.field]}
		/>
		<Hint error={false}>{item.hint}</Hint>
	</FormGroup>
	{/if}
{/snippet}

<form
	class="w-full grid grid-cols-2 gap-y-2 px-14 pt-12 pb-20"
	id="configuration-form"
	method="POST"
	action="?/download"
	data-sveltekit-keepfocus
	use:enhance={handleSubmit}
>
	{#each Object.entries(formFields) as [title, value]}
		<FormTitle class="col-span-2" id={toKebabCase(title)}>{capitalize(title)}</FormTitle>
		{#each Object.entries(value) as [key, item]}
			{@render formElement(item)}
			{#if typeof value[key as keyof typeof value] === 'object' && item.element !== 'select' && item.element !== 'input'}
				<FormSubtitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormSubtitle>
				{#each Object.values(value[key as keyof typeof value]) as nestedItem}
					{@render formElement(nestedItem)}
				{/each}
			{/if}
		{/each}
	{/each}
</form>
