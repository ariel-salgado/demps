<script lang="ts">
	import { PlayIcon } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/forms';

	const navItems: { name: string; href: string }[] = [
		{ name: 'inicio', href: '/' },
		{ name: 'environment', href: '/environment' },
		{ name: 'parameters', href: '/parameters' }
	];
</script>

<header
	class="sticky top-0 z-30 flex h-14 w-full items-center justify-evenly gap-x-4 bg-white px-10 shadow"
>
	<span class="p-2 text-2xl font-medium">
		<a class="block" href="/">DEMPS</a>
	</span>

	<nav>
		<ul class="inline-flex gap-x-4">
			{#each navItems as { name, href }}
				<li
					class="p-2 font-medium text-slate-500 transition-colors focus-within:text-slate-900 hover:text-slate-900"
				>
					<a class="block" {href}>{name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="inline-flex gap-x-8 p-2">
		<Button as="a" href="/simulation">
			<span>Run</span>
			<PlayIcon />
		</Button>
	</div>
</header>
