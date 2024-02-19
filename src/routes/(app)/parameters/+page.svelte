<script lang="ts">
	import type { FormField } from './form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ConfigurationSchema } from '$lib/types';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { getFormData } from './form';
	import { flattenJSON } from '$lib/utils';
	import { configStore } from '$lib/stores';
	import { UploadIcon } from '$lib/components/icons';
	import {
		Button,
		Description,
		Fileupload,
		FormGroup,
		Input,
		Label,
		Select
	} from '$lib/components/ui/forms/';

	const { form, items } = getFormData();

	let files: FileList | null = $state(null);
	let selected: string | undefined = $state($page.url.hash.slice(1));

	$effect(() => {
		selected = $page.url.hash.slice(1) || 'general';
	});

	const setSelected = (s: string) => (selected = s);

	const handleUpload = () => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const uploadedData = reader.result as string;

				try {
					const data = JSON.parse(uploadedData);
					configStore.set(flattenJSON(data) as ConfigurationSchema);
				} catch (_) {
					alert('Invalid configuration file');
					return;
				}
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};

	const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			// @ts-expect-error - data is not in the types
			if ('errors' in result.data) {
				// @ts-expect-error - data is not in the types
				Object.keys(result.data.errors).forEach((id) => {
					const el = document.getElementById(id);
					const event = new Event('change', { bubbles: true, cancelable: true });
					el?.dispatchEvent(event);
				});
				return;
			}

			// @ts-expect-error - data is not in the types
			const parsedData = JSON.stringify(result.data, null, 2);
			const blob = new Blob([parsedData], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'parameters.config';

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			URL.revokeObjectURL(url);
		};
	};
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
			<Input
				id={field.attributes.name}
				{...field.attributes}
				validation={field.validation}
				bind:value={$configStore[(field.attributes.name!)]}
			/>
		{:else if field.type === 'select'}
			<Select
				id={field.attributes.name}
				{...field.attributes}
				options={field.options}
				validation={field.validation}
				bind:value={$configStore[(field.attributes.name!)]}
			/>
		{/if}
		<Description>{field.description}</Description>
	</FormGroup>
{/snippet}

<section class="flex divide-x-2">
	<aside
		class="sticky top-14 grid h-[calc(100vh-3.5rem)] flex-[1] grid-rows-[auto_1fr_auto] gap-y-4 bg-white p-8"
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

		<div class="space-y-3">
			<Fileupload
				accept=".config"
				bind:files
				onUpload={handleUpload}
				role="button"
				aria-label="Upload Configuration"
			>
				<span>Upload Configuration</span>
				<UploadIcon />
			</Fileupload>

			<Button type="submit" form="configuration-form">Download Configuration</Button>
		</div>
	</aside>
	<form
		class="grid flex-[3] grid-cols-2 gap-4 px-10 py-8"
		id="configuration-form"
		method="POST"
		action="?/download"
		use:enhance={handleSubmit}
		data-sveltekit-keepfocus
	>
		{#each form as field}
			{#if 'title' in field}
				<h2
					id={field.title}
					class="col-span-2 scroll-m-[5.5rem] border-b pb-2 pl-5 text-3xl font-semibold capitalize tracking-tight first:mt-0"
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
