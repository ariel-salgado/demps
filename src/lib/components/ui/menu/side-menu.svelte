<script lang="ts">
	interface Props {
		title: string;
	}

	let { title } = $props<Props>();
</script>

<aside
	class="sticky top-20 min-w-[20rem] h-[calc(100vh-5rem)] flex flex-col gap-y-6 px-8 py-6 shadow-md bg-primary-50"
>
	<span>
		<h2 class="text-2xl font-medium px-4 py-2">
			{title}
		</h2>
		<hr />
	</span>
	<div class="h-full flex flex-col justify-between">
		<ul>
			<slot name="list" />
		</ul>
		<div class="flex flex-col gap-y-4">
			<slot name="actions" />
		</div>
	</div>
</aside>
