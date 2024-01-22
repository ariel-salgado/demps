<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet<void>;
	}

	const { children, class: className, ...props } = $props<Props>();
</script>

<div
	class={cn(
		'space-y-2 rounded-md px-6 py-4 transition-colors focus-within:bg-primary-50 hover:bg-primary-50 has-[input:disabled]:bg-slate-100 has-[select:disabled]:bg-slate-100',
		className
	)}
	{...props}
>
	{@render children()}
</div>
