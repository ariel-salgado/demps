<script lang="ts">
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { SEO } from '$lib/components';
	import { FileUpload } from '$lib/components/ui';
	import { configFormStore } from '$lib/utils/stores';
	import type { InputFormField } from '$lib/utils/types';
	import { SideMenu, Item, SubItem } from '$lib/components/ui/menu';
	import { capitalize, extractKeys, flatten, stringify, toKebabCase } from '$lib/utils/helpers';
	import { configurationFormFields as formFields } from '$lib/utils/form-fields';
	import {
		FormTitle,
		FormSubtitle,
		FormGroup,
		Input,
		Select,
		Label,
		Hint
	} from '$lib/components/ui/form';

	let files: FileList | null = $state(null);
	let selected: string | null = $state(null);

	$effect(() => {
		if (Object.keys(get(configFormStore)).length === 0) setDefaultValues(formFields);
	});

	const setDefaultValues = (fields: object) => {
		const defaultValues: Array<{ field: string; value: string | number }> = [];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const traverseFields = (obj: any) => {
			if (obj && typeof obj === 'object') {
				if ('attributes' in obj && obj.attributes.value) {
					defaultValues.push({ field: obj.field, value: obj.attributes.value });
				} else {
					Object.values(obj).forEach(traverseFields);
				}
			}
		};

		traverseFields(fields);

		defaultValues.forEach(({ field, value }) => {
			configFormStore.update((store) => {
				store[field] = value;
				return store;
			});
		});
	};

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

	const uploadFile = () => {
		if (!!files && files.length > 0) {
			const reader = new FileReader();

			reader.onload = () => {
				const data = flatten(JSON.parse(reader.result as string));
				configFormStore.set(data);
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};

	const setSelectedItem = (index: string) => (selected = index);

	const sections = extractKeys(formFields);
</script>

<SEO title="DEMPS | Configuration" description="DEMPS Configuration" />

{#snippet formElement(item: InputFormField)}
	{#if item.element === 'input'}
		<FormGroup>
			<Label for="{item.field}">{item.name}</Label>
			<Input
				{...item.attributes}
				bind:value="{$configFormStore[item.field as keyof typeof $configFormStore]}"
			/>
			<Hint>{item.hint}</Hint>
		</FormGroup>
	{:else if item.element === 'select'}
		<FormGroup>
			<Label for="{item.field}">{item.name}</Label>
			<Select
				{...item.attributes}
				options="{item.options}"
				bind:value="{$configFormStore[item.field as keyof typeof $configFormStore]}"
			/>
			<Hint>{item.hint}</Hint>
		</FormGroup>
	{/if}
{/snippet}

<div class="relative flex w-full">
	<!-- Side menu -->
	<SideMenu title="Configuration">
		<!-- List of nav items -->
		<svelte:fragment slot="list">
			{#each sections as section, index}
				<Item
					title="{capitalize(section)}"
					href="{`#${toKebabCase(section)}`}"
					on:click="{() => setSelectedItem(`${index}`)}"
					selected="{String(selected).split('-').at(0) === `${index}`}"
				>
					{#if typeof section === 'object'}
						{#each Object.values(section)[0] as ArrayLike<string> as subSection, subIndex}
							<SubItem
								title="{capitalize(subSection)}"
								href="{`#${toKebabCase(subSection)}`}"
								on:click="{() => setSelectedItem(`${index}-${subIndex}`)}"
								selected="{selected === `${index}-${subIndex}`}"
							/>
						{/each}
					{/if}
				</Item>
			{/each}
		</svelte:fragment>

		<!-- Action buttons -->
		<svelte:fragment slot="actions">
			<!-- File configuration action button -->
			<FileUpload bind:files accept=".json, .config" onUpload="{uploadFile}"
				>Upload Configuration</FileUpload
			>

			<!-- Download configuration action button -->
			<button
				class="flex h-10 w-full justify-center gap-x-2 rounded-md bg-primary-600 py-2 text-white transition-colors duration-300 hover:bg-primary-800 focus-visible:bg-primary-800"
				type="submit"
				form="configuration-form"
			>
				<span>Download Configuration</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
					></path>
				</svg>
			</button>
		</svelte:fragment>
	</SideMenu>

	<!-- Configuration form -->
	<form
		class="grid w-full grid-cols-2 gap-y-2 px-14 pb-20 pt-4"
		id="configuration-form"
		method="POST"
		action="?/download"
		data-sveltekit-keepfocus
		use:enhance="{handleSubmit}"
	>
		{#each Object.entries(formFields) as [title, value]}
			<FormTitle class="col-span-2 px-2 py-4" id="{toKebabCase(title)}"
				>{capitalize(title)}</FormTitle
			>
			{#each Object.entries(value) as [key, item]}
				{@render formElement(item)}
				{#if typeof value[key as keyof typeof value] === 'object' && !('element' in item)}
					<FormSubtitle class="col-span-2 px-4 py-3" id="{toKebabCase(key)}"
						>{capitalize(key)}</FormSubtitle
					>
					{#each Object.values(value[key as keyof typeof value]) as nestedItem}
						{@render formElement(nestedItem)}
					{/each}
				{/if}
			{/each}
		{/each}
	</form>
</div>
