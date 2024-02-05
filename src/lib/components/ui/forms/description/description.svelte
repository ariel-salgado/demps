<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		children: Snippet;
	}

	const { children, class: className, ...props } = $props<Props>();
</script>

<p class={cn('text-sm text-slate-500', className)} {...props}>
	{@render children()}
</p>
