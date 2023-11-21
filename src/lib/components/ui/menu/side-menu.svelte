<script lang="ts">
	export let title: string;
</script>

<aside>
	<span>
		<h2>
			{title}
		</h2>
		<hr />
	</span>
	<div>
		<ul>
			<slot name="list" />
		</ul>
		<div>
			<slot name="actions" />
		</div>
	</div>
</aside>

<style lang="postcss">
	h2 {
		@apply text-2xl font-medium px-4 py-2;
	}
	aside {
		@apply sticky top-20 min-w-[20rem] h-[calc(100vh-5rem)] flex flex-col gap-y-6 px-8 py-6 shadow-md bg-primary-50;
	}

	aside > div {
		@apply h-full flex flex-col justify-between;
	}
</style>
