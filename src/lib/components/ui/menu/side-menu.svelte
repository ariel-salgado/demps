<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		title: string;
	}

	let { title, ...rest } = $props<Props>();
</script>

<aside
	class="sticky top-20 flex h-[calc(100vh-5rem)] min-w-[20rem] flex-col gap-y-6 bg-primary-50 px-8 py-6 shadow-md"
	{...rest}
>
	<span>
		<h2 class="px-4 py-2 text-2xl font-medium">
			{title}
		</h2>
		<hr />
	</span>
	<div class="flex h-full flex-col justify-between">
		<ul>
			<slot name="list" />
		</ul>
		<div class="flex flex-col gap-y-4">
			<slot name="actions" />
		</div>
	</div>
</aside>
