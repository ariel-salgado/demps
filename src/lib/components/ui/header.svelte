<script lang="ts">
	import { DownloadJson } from '$lib/components/ui';

	const navItems: Array<{ name: string; href: string }> = [
		{ name: 'inicio', href: '/' },
		{ name: 'environment', href: '/environment' },
		{ name: 'configuration', href: '/configuration' }
	];
</script>

<header>
	<span class="logo">
		<a href="/">DEMPS</a>
	</span>
	<nav>
		<ul>
			{#each navItems as { name, href }}
				<li>
					<a {href}>{name}</a>
				</li>
			{/each}
			<li>
				<DownloadJson />
			</li>
			<li>
				<button>Run</button>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply w-full h-20 flex justify-around items-center bg-primary-50 shadow z-30;
	}

	.logo {
		@apply text-3xl font-medium hover:text-primary-600 focus-within:text-primary-600 hover:underline focus-within:underline underline-offset-2 transition-colors duration-300;
	}

	ul {
		@apply flex items-center gap-x-6;
	}

	li {
		@apply hover:text-primary-600 focus-within:text-primary-600 transition-colors duration-300;
	}

	li > a {
		@apply w-full block hover:underline focus-within:underline underline-offset-2;
	}

	button {
		@apply h-10 bg-primary-600 px-6 py-2 text-white rounded-md hover:bg-primary-800 focus-visible:bg-primary-800 transition-colors duration-300;
	}
</style>
