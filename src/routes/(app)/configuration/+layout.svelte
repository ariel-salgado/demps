<script lang="ts">
	import { SEO } from '$lib/components';
	import { configurationFormFields as fields } from '$lib/utils/form-fields';
	import { spaceCamelCase, toKebabCase } from '$lib/utils/helpers';

	let selected: number | null = null;

	const asideItems: Array<{ title: string; href: string }> = Object.keys(fields).map((section) => {
		return {
			title: spaceCamelCase(section),
			href: `#${toKebabCase(section)}`
		};
	});

	const handleSelected = (index: number) => {
		selected = index;
	};
</script>

<SEO title="DEMPS | Configuration" description="DEMPS Configuration" />

<div class="wrapper">
	<aside class="side-menu">
		<div>
			<h2 class="nav-title">Configuration</h2>
			<hr />
		</div>

		<nav>
			<ul>
				{#each asideItems as { title, href }, index}
					<li class:selected={index === selected}>
						<a {href} on:click={() => handleSelected(index)}>{title}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
	<div class="slot">
		<slot />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply w-full flex relative;
	}

	.side-menu {
		@apply sticky top-20 min-w-[20rem] h-[calc(100vh-5rem)] flex flex-col gap-y-3 px-8 py-6 shadow-md bg-primary-50;
	}

	.nav-title {
		@apply text-2xl p-2;
	}

	nav {
		@apply py-4;
	}

	nav ul {
		@apply flex flex-col;
	}

	ul li {
		@apply w-full text-primary-900 border-l-4 border-primary-200 hover:bg-primary-300 focus-within:bg-primary-300 hover:border-primary-600 focus-within:border-primary-600 hover:text-white focus-within:text-white transition-colors duration-300 rounded-r-md;
	}

	.selected {
		@apply bg-primary-600 border-primary-600 text-white;
	}

	li a {
		@apply block px-3 py-2 h-10;
	}

	.slot {
		@apply w-full;
	}
</style>
