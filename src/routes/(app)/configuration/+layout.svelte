<script lang="ts">
	import { SEO } from '$lib/components';
	import { configFormStore } from '$lib/stores';
	import { FileUpload } from '$lib/components/ui';
	import { SideMenu, Item, SubItem } from '$lib/components/ui/menu';
	import { capitalize, flatten, toKebabCase } from '$lib/utils/helpers';
	import { configurationFormFields as formFields } from '$lib/utils/form-fields';

	let files: FileList | null = $state(null);
	let selected: string | null = $state(null);

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

	const setSelectedItem = (index: string) => {
		selected = index;
	};

	const asideItems = extractKeys(formFields);
</script>

<SEO title="DEMPS | Configuration" description="DEMPS Configuration" />

<div class="w-full flex relative">
	<SideMenu title="Configuration">
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
		<svelte:fragment slot="actions">
			<FileUpload bind:files accept=".json, .config" onUpload={uploadFile}
				>Upload Configuration</FileUpload
			>
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
	<div class="w-full">
		<slot />
	</div>
</div>
