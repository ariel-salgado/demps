<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	type ButtonOrLinkProps =
		| (HTMLAttributes<HTMLButtonElement> & { as?: 'button' })
		| (HTMLAttributes<HTMLAnchorElement> & { as: 'a' });

	type Props = {
		children: Snippet<void>;
	} & ButtonOrLinkProps;

	let { children, class: className, ...props } = $props<Props>();
</script>

{#if props.as === 'a'}
	<a
		class={cn(
			'inline-flex h-10 w-full items-center justify-center gap-x-1 whitespace-nowrap rounded-lg bg-indigo-700 px-4 py-2 font-medium text-white ring-offset-white transition-colors hover:bg-indigo-600 focus-visible:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
			'inline-flex h-10 w-full items-center justify-center gap-x-1 whitespace-nowrap rounded-lg bg-indigo-700 px-4 py-2 font-medium text-white ring-offset-white transition-colors hover:bg-indigo-600 focus-visible:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	>
		{@render children()}
	</button>
{/if}
