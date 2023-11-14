<script lang="ts">
	let selected: number | null = null;

	const asideItems: Array<{ title: string; href: string }> = [
		{ title: 'Hola', href: '#section-1' },
		{ title: 'Como', href: '#section-2' },
		{ title: 'estas?', href: '#section-3' }
	];

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
		<form action="">
			<div id="section-1">
				<div>
					<label for="">Input 1</label>
					<input type="text" name="" />
				</div>
			</div>
			<div id="section-2">
				<div>
					<label for="">Input 1</label>
					<input type="text" name="" />
				</div>
			</div>
			<div id="section-3">
				<div>
					<label for="">Input 1</label>
					<input type="text" name="" />
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.selected {
		@apply bg-primary-600 border-primary-600 text-white;
	}
</style>
