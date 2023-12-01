<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div class="px-4 py-3" {...rest}>
	<h3 class="p-1 text-2xl font-medium">
		<slot />
	</h3>
	<hr />
</div>
