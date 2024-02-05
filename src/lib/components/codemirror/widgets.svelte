<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	const { children, ...props } = $props<Props>();
</script>

<div class="sticky top-6 z-10 float-right mr-14 size-0" {...props}>
	<div class="space-y-4">
		{@render children()}
	</div>
</div>
