<script lang="ts">
	import { FormGroup, Input, Select, Label, Hint } from '$lib/components/ui/form';
	import { configurationFormFields as formFields } from '$lib/utils/form-fields';

	let formData = {};
</script>

<form>
	{#each Object.entries(formFields) as [title, value]}
		<h2 class="text-4xl">{title}</h2>
		{#each Object.entries(value) as [key, item]}
			{#if item.element === 'input'}
				<FormGroup>
					<Label for={item.field}>{item.name}</Label>
					<Input {...item.attributes} bind:value={formData[item.field]} />
					<Hint error={false}>{item.hint}</Hint>
				</FormGroup>
			{:else if item.element === 'select'}
				<!-- <Select {...item.attributes} bind:value={formData[item.field]} /> -->
				<p>select element</p>
			{:else if typeof value[key] === 'object'}
				{#each Object.entries(value[key]) as [nestedKey, nestedItem]}
					{#if nestedItem.element === 'input'}
						<FormGroup>
							<Label for={nestedItem.field}>{nestedItem.name}</Label>
							<Input {...nestedItem.attributes} bind:value={formData[nestedItem.field]} />
							<Hint error={false}>{nestedItem.hint}</Hint>
						</FormGroup>
					{:else if nestedItem.element === 'select'}
						<!-- <Select {...nestedItem.attributes} bind:value={formData[nestedItem.field]} /> -->
						<p>select element</p>
					{/if}
				{/each}
			{/if}
		{/each}
	{/each}
</form>

<!-- {#each Object.entries(formFields) as [title, first]}
	<h2 class="text-4xl">{title}</h2>
	{#each Object.entries(first) as [key, value]}
		<Field {...value} />
	{/each}
{/each}
 -->
<!-- <form action="">
	{#each Object.keys(formFields) as key}
		{#if key !== 'agents'}
			<FormTitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormTitle>
			{#each Object.values(formFields[key]) as item}
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
			{#each Object.keys(formFields[key]) as nestedKey}
				<FormSubtitle class="col-span-2" id={toKebabCase(nestedKey)}
					>{capitalize(nestedKey)}</FormSubtitle
				>
				{#each Object.values(formFields[key][nestedKey]) as item}
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
</form> -->

<style lang="postcss">
	form {
		@apply w-full grid grid-cols-2 gap-y-2 px-14 pt-4 pb-20;
	}
</style>
