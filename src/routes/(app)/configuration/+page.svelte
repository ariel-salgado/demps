<script lang="ts">
	import { FormTitle, FormGroup, Input, Select, Label, Hint } from '$lib/components/ui/form';
	import { configurationFormFields as fields } from '$lib/utils/form-fields';
	import { toKebabCase, capitalize } from '$lib/utils/helpers';

	let formData = {};
</script>

<form action="">
	{#each Object.keys(fields) as section}
		<FormTitle id={toKebabCase(section)}>{capitalize(section)}</FormTitle>
		{#each Object.values(fields[section]) as el}
			<FormGroup>
				<Label for={el.name.toLowerCase()}>{el.name}</Label>
				{#if el.element === 'input'}
					<Input
						name={toKebabCase(el.name)}
						type={el.attributes.type}
						placeholder={el.attributes.placeholder}
						bind:value={formData[toKebabCase(el.name)]}
					/>
				{:else}
					<Select
						name={toKebabCase(el.name)}
						placeholder={el.attributes.placeholder}
						bind:value={formData[toKebabCase(el.name)]}
						options={el.attributes.options}
					/>
				{/if}
				<Hint>{el.hint}</Hint>
			</FormGroup>
		{/each}
	{/each}
</form>

<style lang="postcss">
	form {
		@apply w-full flex flex-col gap-y-2 px-14 py-4;
	}
</style>
