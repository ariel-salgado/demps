<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/forms';
</script>

<section class="grid h-full place-items-center items-center">
	<div class="-mt-40 text-balance text-center">
		<h1 class="py-1.5 text-5xl font-medium tracking-tight">Error {$page.status}</h1>
		<p>{$page.error?.message}</p>
		<Button class="mt-10" as="a" href="/">Volver a inicio</Button>
	</div>
</section>
