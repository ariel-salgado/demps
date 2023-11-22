<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div class="px-2 py-4" {...rest}>
	<h2 class="text-3xl font-medium p-3">
		<slot />
	</h2>
	<hr />
</div>
