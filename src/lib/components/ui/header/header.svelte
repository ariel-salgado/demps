<script lang="ts">
	import { PlayIcon } from '$lib/components/icons';
	import { Button } from '$lib/components/ui/button';

	const navItems: { name: string; href: string }[] = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Environment', href: '/environment' },
		{ name: 'Parameters', href: '/parameters' }
	];
</script>

<header
	class="sticky z-30 inline-flex h-14 w-full items-center justify-evenly gap-x-4 px-10 shadow"
>
	<!-- Logo -->
	<h2 class="p-2 text-2xl font-medium">
		<a href="/">DEMPS</a>
	</h2>

	<!-- Nav items -->
	<nav>
		<ul class="inline-flex gap-x-4">
			{#each navItems as { name, href }}
				<li
					class="p-2 font-medium text-slate-500 transition-colors focus-within:text-slate-900 hover:text-slate-900"
				>
					<a {href}>{name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Actions -->
	<div class="inline-flex gap-x-8 p-2">
		<Button>
			<span>Run</span>
			<PlayIcon class="mt-0.5 h-5 w-5" />
		</Button>
	</div>
</header>
