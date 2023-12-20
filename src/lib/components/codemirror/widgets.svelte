<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet<void>;
	}

	let { children, ...props } = $props<Props>();
</script>

<div class="sticky top-6 z-10 float-right mr-14 h-0 w-0" {...props}>
	<div class="grid gap-y-4">
		{@render children()}
	</div>
</div>
