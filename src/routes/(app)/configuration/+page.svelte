<script lang="ts">
	import { SEO } from '$lib/components';
	import { FormTitle, FormGroup, Input, Select, Label, Hint } from '$lib/components/ui/form';
	import { configurationFormFields as fields } from '$lib/utils/form-fields';
	import { toKebabCase, capitalize, parseObjectByKeys } from '$lib/utils/helpers';
	import type { TConfiguration } from '$lib/types';

	let formData: Partial<TConfiguration> = {};
</script>

<SEO title="DEMPS | Configuration" description="DEMPS Configuration" />

<form action="">
	{#each Object.keys(fields) as section}
		<FormTitle id={toKebabCase(section)}>{capitalize(section)}</FormTitle>
		{#each Object.values(fields[section]) as el}
			<FormGroup>
				<Label for={el.field}>{el.name}</Label>
				{#if el.element === 'input'}
					<Input
						name={el.field}
						type={el.attributes.type}
						placeholder={el.attributes.placeholder}
						bind:value={formData[el.field]}
					/>
				{:else}
					<Select
						name={el.field}
						placeholder={el.attributes.placeholder}
						bind:value={formData[el.field]}
						options={el.attributes.options}
					/>
				{/if}
				<Hint>{el.hint}</Hint>
			</FormGroup>
		{/each}
	{/each}
</form>

<pre>
	<code>
		{JSON.stringify(parseObjectByKeys(formData), null, 2)}
	</code>
</pre>

<style lang="postcss">
	form {
		@apply w-full flex flex-col gap-y-2 px-14 pt-4 pb-20;
	}
</style>
