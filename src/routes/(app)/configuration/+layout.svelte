<script lang="ts">
	import { SEO } from '$lib/components';
	import { capitalize, toKebabCase } from '$lib/utils/helpers';
	import { SideMenu, Item, SubItem } from '$lib/components/ui/menu';
	import { configurationFormFields as formFields } from '$lib/utils/form-fields';

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

<div class="wrapper">
	<SideMenu title="Configuration">
		{#each asideItems as item, index}
			<Item title={capitalize(item)} href={`#${toKebabCase(item)}`} selected={false}>
				{#if typeof item === 'object'}
					{#each Object.values(item)[0] as subItem}
						<SubItem
							title={capitalize(subItem.toString())}
							href={`#${toKebabCase(subItem.toString())}`}
							selected={false}
						/>
					{/each}
				{/if}
			</Item>
		{/each}
	</SideMenu>
	<div class="slot">
		<slot />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply w-full flex relative;
	}

	.slot {
		@apply w-full;
	}
</style>
