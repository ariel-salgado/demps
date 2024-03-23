<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	type ButtonOrLinkProps =
		| (HTMLButtonAttributes & { as?: 'button' })
		| (HTMLAnchorAttributes & { as: 'a' });

	type Props = {
		children: Snippet;
	} & ButtonOrLinkProps;

	let { children, class: className, ...props }: Props = $props();
</script>

{#if props.as === 'a'}
	<a
		class={cn(
			'flex h-9 w-full items-center justify-center gap-x-1 whitespace-nowrap rounded-lg bg-primary-700 px-4 py-2 font-medium text-white ring-offset-white transition-colors focus-within:bg-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-primary-600 disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	>
		{@render children()}
	</a>
{:else}
	<button
		type="button"
		class={cn(
			'flex h-9 w-full items-center justify-center gap-x-1 whitespace-nowrap rounded-lg bg-primary-700 px-4 py-2 font-medium text-white ring-offset-white transition-colors focus-within:bg-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:bg-primary-600 disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	>
		{@render children()}
	</button>
{/if}
