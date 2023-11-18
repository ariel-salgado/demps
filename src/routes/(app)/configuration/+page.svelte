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
	import { configurationFormFields as fields } from '$lib/utils/form-fields';
	import { toKebabCase, capitalize, stringify, getNestedKeys } from '$lib/utils/helpers';

	let formData = {};
</script>

<form action="">
	{#each Object.keys(fields) as key}
		{#if key !== 'agents'}
			<FormTitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormTitle>
			{#each Object.values(fields[key]) as item}
				<FormGroup>
					<Label for={item.field}>{item.name}</Label>
					{#if item.element === 'input'}
						<Input
							type={item.attributes.type}
							name={item.field}
							id={item.field}
							placeholder={item.attributes.placeholder}
							bind:value={formData[item.field]}
						/>
					{:else}
						<Select
							name={item.field}
							id={item.field}
							placeholder={item.attributes.placeholder}
							bind:value={formData[item.field]}
							options={item.attributes.options}
						/>
					{/if}
					<Hint>{item.hint}</Hint>
				</FormGroup>
			{/each}
		{:else}
			<FormTitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormTitle>
			{#each Object.keys(fields[key]) as nestedKey}
				<FormSubtitle class="col-span-2" id={toKebabCase(nestedKey)}
					>{capitalize(nestedKey)}</FormSubtitle
				>
				{#each Object.values(fields[key][nestedKey]) as item}
					<FormGroup>
						<Label for={item.field}>{item.name}</Label>
						{#if item.element === 'input'}
							<Input
								type={item.attributes.type}
								name={item.field}
								id={item.field}
								placeholder={item.attributes.placeholder}
								bind:value={formData[item.field]}
							/>
						{:else}
							<Select
								name={item.field}
								id={item.field}
								placeholder={item.attributes.placeholder}
								bind:value={formData[item.field]}
								options={item.attributes.options}
							/>
						{/if}
						<Hint>{item.hint}</Hint>
					</FormGroup>
				{/each}
			{/each}
		{/if}
	{/each}
</form>

<style lang="postcss">
	form {
		@apply w-full grid grid-cols-2 gap-y-2 px-14 pt-4 pb-20;
	}
</style>
