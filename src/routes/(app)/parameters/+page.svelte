<script lang="ts">
	import type { FormField } from './form';

	import { flattenForm } from './form';
	import { Description, FormGroup, Input, Label, Select } from '$lib/components/ui/forms/';

	const form = flattenForm();
</script>

{#snippet formField(field: FormField)}
	<FormGroup>
		<Label for={field.label}>{field.label}</Label>
		{#if field.type === 'input'}
			<Input {...field.attributes} validation={field.validation} />
		{:else if field.type === 'select'}
			<Select {...field.attributes} options={field.options} validation={field.validation} />
		{/if}
		<Description>{field.description}</Description>
	</FormGroup>
{/snippet}

<section class="flex divide-x-2">
	<aside class="flex-1">
		<!--  -->
	</aside>
	<form class="grid flex-[3] grid-cols-2 gap-4 p-10" data-sveltekit-keepfocus>
		{#each form as field}
			{#if 'title' in field}
				<h2
					id={field.title}
					class="col-span-2 scroll-m-24 border-b pb-2 pl-5 text-3xl font-semibold capitalize tracking-tight first:mt-0"
				>
					{field.title}
				</h2>
			{:else if 'subtitle' in field}
				<h3
					id={field.subtitle}
					class="col-span-2 scroll-m-20 pl-5 text-2xl font-semibold capitalize tracking-tight"
				>
					{field.subtitle}
				</h3>
			{:else}
				{@render formField(field)}
			{/if}
		{/each}
	</form>
</section>
