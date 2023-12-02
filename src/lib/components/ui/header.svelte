<script lang="ts">
	const navItems: Array<{ name: string; href: string }> = [
		{ name: 'inicio', href: '/' },
		{ name: 'environment', href: '/environment' },
		{ name: 'configuration', href: '/configuration' }
	];
</script>

<header
	class="sticky top-0 z-30 flex h-20 w-full items-center justify-evenly bg-primary-50 shadow-sm"
>
	<span
		class="text-3xl font-medium underline-offset-2 transition-colors duration-300 focus-within:text-primary-600 focus-within:underline hover:text-primary-600 hover:underline"
	>
		<a href="/">DEMPS</a>
	</span>
	<nav>
		<ul class="flex items-center gap-x-6">
			{#each navItems as { name, href }}
				<li
					class="transition-colors duration-300 focus-within:text-primary-600 hover:text-primary-600"
				>
					<a class="block w-full underline-offset-2 focus-within:underline hover:underline" {href}
						>{name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
	<div>
		<button
			class="h-10 rounded-md bg-primary-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-primary-800 focus-visible:bg-primary-800"
			>Run</button
		>
	</div>
</header>
