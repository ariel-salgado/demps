<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { ...rest } = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div class="px-2 py-4" {...rest}>
	<h2 class="p-3 text-3xl font-medium">
		<slot />
	</h2>
	<hr />
</div>
