<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div class="px-4 py-3" {...rest}>
	<h3 class="text-2xl font-medium p-1">
		<slot />
	</h3>
	<hr />
</div>
