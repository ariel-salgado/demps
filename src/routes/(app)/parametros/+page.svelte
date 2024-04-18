<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { FormField, FormFields, ParametersSchema } from '$lib/types';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { parametersFormFields } from '$lib';
	import { createParameters } from '$lib/states.svelte';
	import { flattenJSON, deflattenJSON } from '$lib/utils';
	import { DownloadIcon, UploadIcon } from '$lib/components/icons';
	import {
		Button,
		Description,
		Fileupload,
		FormGroup,
		Input,
		Label,
		Select
	} from '$lib/components/ui';

	const parameters = createParameters();

	let files: FileList | null = $state(null);
	let selected: string = $state($page.url.hash.slice(1) || 'general');

	function handleUpload(e: Event) {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const uploadedData = reader.result as string;

				try {
					const data = flattenJSON(JSON.parse(uploadedData));
					const form = document.getElementById('parameters-form') as HTMLFormElement;

					const fieldNames = Array.from(form.elements)
						.filter((element) => element.hasAttribute('name'))
						.map((element) => element.getAttribute('name'));

					if (Object.keys(data).every((element) => fieldNames.includes(element))) {
						parameters.value = data as ParametersSchema;
					} else {
						alert('Archivo de configuración inválido');
					}
				} catch (_) {
					alert('Archivo de configuración inválido');
				} finally {
					(e.target! as HTMLInputElement).value = '';
				}
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	}

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const sectionId = entry.target.id;

					if (entry.isIntersecting) {
						selected = sectionId;
					}
				});
			},
			{ threshold: 1, rootMargin: '-12px 0px -75% 0px' }
		);

		const sections = document.querySelectorAll('.observed');

		sections.forEach((section) => {
			observer.observe(section);
		});
	});

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
			const deflatten = JSON.stringify(deflattenJSON(result.data), null, '\t');
			const blob = new Blob([deflatten], { type: 'application/json' });
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

{#snippet navItems(items: FormFields, isNested: boolean)}
	{#each Object.entries(items) as [key, value]}
		<li
			class={`rounded-md text-base font-medium text-slate-500 transition-colors focus-within:bg-primary-50 focus-within:text-slate-900 hover:bg-primary-50 hover:text-slate-900 ${isNested && `pl-4`} ${selected === key && `bg-primary-700 text-white focus-within:bg-primary-600 focus-within:text-white hover:bg-primary-600 hover:text-white`}`}
		>
			<a href={`#${key}`} class="block px-4 py-1.5 capitalize">{key}</a>
		</li>

		{#if !Array.isArray(value)}
			{@render navItems(value, true)}
		{/if}
	{/each}
{/snippet}

{#snippet form(fields: FormFields, isNested: boolean)}
	{#each Object.entries(fields) as [key, value]}
		<div class={`grid scroll-m-24 grid-cols-2 gap-2 first:mt-0 ${isNested && 'col-span-2'}`}>
			{#if isNested}
				<h3
					id={key}
					class="observed col-span-2 mb-2 mt-4 scroll-m-20 px-5 text-2xl font-semibold capitalize tracking-tight"
				>
					{key}
				</h3>
			{:else}
				<h2
					id={key}
					class="observed col-span-2 scroll-m-24 border-b px-5 pb-2 text-3xl font-semibold capitalize tracking-tight"
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
				bind:value={parameters.value[(field.attributes.name as keyof ParametersSchema)]}
				{...field.attributes}
				validation={field.validation}
			/>
		{:else if field.type === 'select'}
			<Select
				id={field.attributes.name}
				bind:value={parameters.value[(field.attributes.name as keyof ParametersSchema)]}
				{...field.attributes}
				options={field.options}
				validation={field.validation}
			/>
		{/if}
		<Description>{field.description}</Description>
	</FormGroup>
{/snippet}

<svelte:head>
	<title>DEMPS | Parameters</title>
	<meta name="description" content="Configuración de parámetros" />
</svelte:head>

<section class="flex divide-x-2">
	<aside class="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between p-10">
		<div>
			<h2 class="border-b px-5 pb-2 text-3xl font-semibold tracking-tight">Navegación</h2>

			<nav>
				<ul class="space-y-1 py-4">
					{@render navItems(parametersFormFields, false)}
				</ul>
			</nav>
		</div>

		<div class="space-y-2.5 border-t border-slate-300 pt-6">
			<Fileupload
				accept=".config"
				bind:files
				onchange={handleUpload}
				role="button"
				aria-label="Cargar configuración"
			>
				<span> Cargar configuración </span>
				<UploadIcon />
			</Fileupload>
			<Button type="submit" form="parameters-form">
				<span> Descargar configuración </span>
				<DownloadIcon />
			</Button>
		</div>
	</aside>
	<form
		id="parameters-form"
		class="flex-[4] space-y-10 px-12 py-10"
		method="POST"
		action="?/download"
		use:enhance={handleSubmit}
		data-sveltekit-keepfocus
	>
		{@render form(parametersFormFields, false)}
	</form>
</section>
