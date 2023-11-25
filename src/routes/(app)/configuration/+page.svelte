<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { SEO } from '$lib/components';
	import { configFormStore } from '$lib/stores';
	import { FileUpload } from '$lib/components/ui';
	import { SideMenu, Item, SubItem } from '$lib/components/ui/menu';
	import { capitalize, flatten, stringify, toKebabCase } from '$lib/utils/helpers';
	import { configurationFormFields as formFields, type TFormElement } from '$lib/utils/form-fields';
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
	
	const setSelectedItem = (index: string) => {
		selected = index;
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
				let data = JSON.parse(reader.result as string);
				data = flatten(data);
				configFormStore.set(data);
			};

			const file = files[0] as File;
			const blob = new Blob([file], { type: file.type });

			reader.readAsText(blob);
		}
	};

	const extractKeys = (obj: object) => {
		const keys: Array<string | object> = Object.keys(obj);

		for (const key in obj) {
			if (
				typeof obj[key as keyof typeof obj] === 'object' &&
				!Array.isArray(obj[key as keyof typeof obj])
			) {
				keys[keys.indexOf(key)] = { [key]: Object.keys(obj[key as keyof typeof obj]) };
			}
		}

		return keys;
	};


	const asideItems = extractKeys(formFields);
</script>

<SEO title="DEMPS | Configuration" description="DEMPS Configuration" />

{#snippet formElement(item: TFormElement)}
	{#if item.element === 'input'}
	<FormGroup>
		<Label for={item.field}>{item.name}</Label>
		<Input {...item.attributes} bind:value={$configFormStore[item.field]} />
		<Hint error={false}>{item.hint}</Hint>
	</FormGroup>
	{:else if item.element === 'select'}
	<FormGroup>
		<Label for={item.field}>{item.name}</Label>
		<Select
			{...item.attributes}
			options={item.options}
			bind:value={$configFormStore[item.field]}
		/>
		<Hint error={false}>{item.hint}</Hint>
	</FormGroup>
	{/if}
{/snippet}

<div class="relative w-full flex">

	<!-- Side menu -->
	<SideMenu title="Configuration" >
		
		<!-- List of nav items -->
		<svelte:fragment slot="list">
			{#each asideItems as item, index}
				<Item
					title={capitalize(item)}
					href={`#${toKebabCase(item)}`}
					on:click={() => setSelectedItem(`${index}`)}
					selected={String(selected).split('-')[0] === `${index}`}
				>
					{#if typeof item === 'object'}
						{#each Object.values(item)[0] as subItem, subIndex}
							<SubItem
								title={capitalize(subItem)}
								href={`#${toKebabCase(subItem)}`}
								on:click={() => setSelectedItem(`${index}-${subIndex}`)}
								selected={selected === `${index}-${subIndex}`}
							/>
						{/each}
					{/if}
				</Item>
			{/each}
		</svelte:fragment>
	
		<!-- Action buttons -->
		<svelte:fragment slot="actions">

			<!-- File configuration action button -->
			<FileUpload bind:files accept=".json, .config" onUpload={uploadFile}
				>Upload Configuration</FileUpload
			>

			<!-- Download configuration action button -->
			<button
				class="flex w-full h-10 bg-primary-600 py-2 justify-center gap-x-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300"
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
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
					/>
				</svg>
			</button>
		</svelte:fragment>
	</SideMenu>

	<!-- Configuration form -->
	<form
		class="w-full grid grid-cols-2 gap-y-2 px-14 pt-12 pb-20"
		id="configuration-form"
		method="POST"
		action="?/download"
		data-sveltekit-keepfocus
		use:enhance={handleSubmit}
	>
		{#each Object.entries(formFields) as [title, value]}
			<FormTitle class="col-span-2" id={toKebabCase(title)}>{capitalize(title)}</FormTitle>
			{#each Object.entries(value) as [key, item]}
				{@render formElement(item)}
				{#if typeof value[key as keyof typeof value] === 'object' && item.element !== 'select' && item.element !== 'input'}
					<FormSubtitle class="col-span-2" id={toKebabCase(key)}>{capitalize(key)}</FormSubtitle>
					{#each Object.values(value[key as keyof typeof value]) as nestedItem}
						{@render formElement(nestedItem)}
					{/each}
				{/if}
			{/each}
		{/each}
	</form>
</div>
