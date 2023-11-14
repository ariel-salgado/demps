<script lang="ts">
	const asideItems: Array<{ title: string; href: string }> = [
		{ title: 'Hola', href: '#section-1' },
		{ title: 'Como', href: '#section-2' },
		{ title: 'estas?', href: '#section-3' }
	];
</script>

<div class="w-full h-full grid grid-cols-4">
	<aside class="grid grid-rows-[auto_auto_1fr] gap-y-4 col-span-1 p-8 shadow-md bg-primary-50">
		<span class="text-center">
			<h2 class="text-2xl font-medium">Configuration</h2>
		</span>

		<hr />

		<ul class="h-min flex flex-col border-l-4 border-primary-400">
			{#each asideItems as { title, href }}
				<li
					class="w-full text-primary-900 hover:bg-primary-600 focus-within:bg-primary-600 hover:text-white focus-within:text-white transition-colors duration-300 rounded-r-md"
				>
					<a class="block px-3 py-1.5" {href}>{title}</a>
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
