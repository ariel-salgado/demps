<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLLabelAttributes {
		children: Snippet;
	}

	let { children, class: className, ...props }: Props = $props();
</script>

<label
	for={undefined}
	class={cn(
		'text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...props}
>
	{@render children()}
</label>
