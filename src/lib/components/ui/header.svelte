<script lang="ts">
	const navItems: Array<{ name: string; href: string }> = [
		{ name: 'inicio', href: '/' },
		{ name: 'environment', href: '/environment' },
		{ name: 'configuration', href: '/configuration' }
	];
</script>

<header
	class="sticky top-0 w-full h-20 flex justify-around items-center bg-primary-50 shadow-sm z-30"
>
	<span
		class="text-3xl font-medium hover:text-primary-600 focus-within:text-primary-600 hover:underline focus-within:underline underline-offset-2 transition-colors duration-300"
	>
		<a href="/">DEMPS</a>
	</span>
	<nav>
		<ul class="flex items-center gap-x-6">
			{#each navItems as { name, href }}
				<li
					class="hover:text-primary-600 focus-within:text-primary-600 transition-colors duration-300"
				>
					<a class="w-full block hover:underline focus-within:underline underline-offset-2" {href}
						>{name}</a
					>
				</li>
			{/each}
			<li
				class="hover:text-primary-600 focus-within:text-primary-600 transition-colors duration-300"
			>
				<button
					class="h-10 bg-primary-600 px-6 py-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300"
					>Run</button
				>
			</li>
		</ul>
	</nav>
</header>
