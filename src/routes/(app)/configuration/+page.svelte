<script lang="ts">
	import {
		FormTitle,
		FormSubtitle,
		FormGroup,
		Input,
		Select,
		Label,
		Hint
	} from '$lib/components/ui/form';
	import { configurationFormFields as formFields } from '$lib/utils/form-fields';
	import { capitalize, toKebabCase } from '$lib/utils/helpers';

	let formData = {};
</script>

<form>
	{#each Object.entries(formFields) as [title, value]}
		<FormTitle class="col-span-2" id={toKebabCase(title)}>{capitalize(title)}</FormTitle>
		{#each Object.entries(value) as [key, item]}
			{#if item.element === 'input'}
				<FormGroup>
					<Label for={item.field}>{item.name}</Label>
					<Input {...item.attributes} bind:value={formData[item.field]} />
					<Hint error={false}>{item.hint}</Hint>
				</FormGroup>
			{:else if item.element === 'select'}
				<FormGroup>
					<Label for={item.field}>{item.name}</Label>
					<Select {...item.attributes} options={item.options} bind:value={formData[item.field]} />
					<Hint error={false}>{item.hint}</Hint>
				</FormGroup>
			{:else if typeof value[key] === 'object'}
				<FormSubtitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormSubtitle>
				{#each Object.values(value[key]) as nestedItem}
					{#if nestedItem.element === 'input'}
						<FormGroup>
							<Label for={nestedItem.field}>{nestedItem.name}</Label>
							<Input {...nestedItem.attributes} bind:value={formData[nestedItem.field]} />
							<Hint error={false}>{nestedItem.hint}</Hint>
						</FormGroup>
					{:else if nestedItem.element === 'select'}
						<FormGroup>
							<Label for={nestedItem.field}>{nestedItem.name}</Label>
							<Select
								{...nestedItem.attributes}
								options={nestedItem.options}
								bind:value={formData[nestedItem.field]}
							/>
							<Hint error={false}>{nestedItem.hint}</Hint>
						</FormGroup>
					{/if}
				{/each}
			{/if}
		{/each}
	{/each}
</form>

<style lang="postcss">
	form {
		@apply w-full grid grid-cols-2 gap-y-2 px-14 pt-4 pb-20;
	}
</style>
