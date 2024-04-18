<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui';
	import { PlayIcon } from '$lib/components/icons';

	const navItems: { name: string; href: string }[] = [
		{ name: 'inicio', href: '/' },
		{ name: 'entorno', href: '/entorno' },
		{ name: 'parametros', href: '/parametros' }
	];
</script>

<header
	class="sticky top-0 z-30 flex h-14 w-full items-center justify-evenly gap-x-4 bg-white px-10 shadow"
>
	<span class="p-2 text-2xl font-medium">
		<a class="block transition-colors focus-within:text-primary-600 hover:text-primary-600" href="/"
			>DEMPS</a
		>
	</span>

	<nav>
		<ul class="inline-flex gap-x-4">
			{#each navItems as { name, href }}
				<li
					class={`p-2 font-medium ${$page.url.pathname === href ? 'text-primary-600 focus-within:text-primary-400 hover:text-primary-400' : 'text-slate-500 focus-within:text-slate-900 hover:text-slate-900'} transition-colors `}
				>
					<a class="block" {href}>{name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="inline-flex gap-x-8 p-2">
		<Button as="a" href="/simulacion">
			<span>Ejecutar</span>
			<PlayIcon />
		</Button>
	</div>
</header>
