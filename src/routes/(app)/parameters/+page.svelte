<script lang="ts">
	import type { FormField } from './form';

	import { page } from '$app/stores';
	import { getFormData } from './form';
	import { Description, FormGroup, Input, Label, Select } from '$lib/components/ui/forms/';

	const { form, items } = getFormData();

	let selected: string | undefined = $state($page.url.hash.slice(1));

	$effect(() => {
		selected = $page.url.hash.slice(1);
	});

	const setSelected = (s: string) => (selected = s);
</script>

<svelte:head>
	<title>DEMPS | Parameters</title>
	<meta name="description" content="DEMPS | Parameters" />
</svelte:head>

{#snippet navItems(items: Record<string, string | Record<string, string>>, isSubKey: boolean)}
	{#each Object.entries(items) as [key, value]}
		<li>
			<a
				class={`block w-full rounded-md ${isSubKey ? 'px-10' : 'px-4'} py-2 text-base font-medium capitalize text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900`}
				class:active={selected === key}
				onclick={() => {
					setSelected(key);
				}}
				href={`#${key}`}
				>{key}
			</a>
		</li>

		{#if typeof value === 'object'}
			{@render navItems(value, true)}
		{/if}
	{/each}
{/snippet}

{#snippet formField(field: FormField)}
	<FormGroup>
		<Label for={field.attributes.name}>{field.label}</Label>
		{#if field.type === 'input'}
			<Input id={field.attributes.name} {...field.attributes} validation={field.validation} />
		{:else if field.type === 'select'}
			<Select
				id={field.attributes.name}
				{...field.attributes}
				options={field.options}
				validation={field.validation}
			/>
		{/if}
		<Description>{field.description}</Description>
	</FormGroup>
{/snippet}

<section class="flex divide-x-2">
	<aside
		class="sticky top-14 grid h-[calc(100vh-3.5rem)] flex-[1] grid-rows-[auto_1fr_auto] gap-y-4 bg-white p-8 shadow-md"
	>
		<h1
			class="scroll-m-20 border-b pb-2 pl-5 text-3xl font-semibold capitalize tracking-tight first:mt-0"
		>
			Parametros
		</h1>
		<nav>
			<ul>
				{@render navItems(items, false)}
			</ul>
		</nav>
	</aside>
	<form class="grid flex-[3] grid-cols-2 gap-4 px-10 py-8" data-sveltekit-keepfocus>
		{#each form as field}
			{#if 'title' in field}
				<h2
					id={field.title}
					class="col-span-2 scroll-m-20 border-b pb-2 pl-5 text-3xl font-semibold capitalize tracking-tight first:mt-0"
				>
					{field.title}
				</h2>
			{:else if 'subtitle' in field}
				<h3
					id={field.subtitle}
					class="col-span-2 scroll-m-[4.5rem] pl-5 text-2xl font-semibold capitalize tracking-tight"
				>
					{field.subtitle}
				</h3>
			{:else}
				{@render formField(field)}
			{/if}
		{/each}
	</form>
</section>

<style lang="postcss">
	.active {
		@apply bg-primary-600 text-white hover:bg-primary-700 hover:text-white;
	}
</style>
