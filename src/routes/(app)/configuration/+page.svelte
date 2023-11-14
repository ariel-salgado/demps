<script lang="ts">
	import { FormGroup, Input, Select, Label, Hint } from '$lib/components/ui/form';
	import { configurationFormFields as fields } from '$lib/utils/form-fields';
	import { capitalize, toKebabCase } from '$lib/utils/helpers';

	let selected: number | null = null;
	let formData = {};

	const asideItems: Array<{ title: string; href: string }> = Object.keys(fields).map((section) => {
		return {
			title: capitalize(section),
			href: `#${toKebabCase(section)}`
		};
	});

	const handleSelected = (index: number) => {
		selected = index;
	};
</script>

<div class="w-full h-full grid grid-cols-4">
	<aside class="grid grid-rows-[auto_auto_1fr] gap-y-3 col-span-1 p-8 shadow-md bg-primary-50">
		<span class="text-center">
			<h2 class="text-3xl font-medium">Configuration</h2>
		</span>

		<hr />

		<ul class="h-min flex flex-col py-4">
			{#each asideItems as { title, href }, index}
				<li
					class="w-full text-primary-900 border-l-4 border-primary-200 hover:bg-primary-400 focus-within:bg-primary-400 hover:border-primary-600 focus-within:border-primary-600 hover:text-white focus-within:text-white transition-colors duration-300 rounded-r-md"
					class:selected={index === selected}
				>
					<a class="block px-3 py-2" {href} on:click={() => handleSelected(index)}>{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
	<div class="col-span-3">
		<form class="flex flex-col gap-y-2 px-14 py-6" action="">
			{#each Object.keys(fields) as section}
				<div class="py-4" id={section.toLowerCase()}>
					<h2 class="text-3xl font-medium p-3">
						{capitalize(section)}
					</h2>
					<hr />
				</div>
				{#each Object.values(fields[section]) as el}
					<FormGroup>
						<Label for={el.name.toLowerCase}>{el.name}</Label>
						{#if el.element === 'input'}
							<Input
								name={el.name.toLowerCase()}
								type={el.attributes.type}
								placeholder={el.attributes.placeholder}
								bind:value={formData[el.name.toLowerCase()]}
							/>
						{:else}
							<Select
								name={el.name.toLowerCase()}
								placeholder={el.attributes.placeholder}
								bind:value={formData[el.name.toLowerCase()]}
								options={el.attributes.options}
							/>
						{/if}
						<Hint>{el.hint}</Hint>
					</FormGroup>
				{/each}
			{/each}
		</form>
	</div>
</div>

<style lang="postcss">
	.selected {
		@apply bg-primary-600 border-primary-600 text-white;
	}
</style>
