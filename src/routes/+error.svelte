<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/forms';
	import { Header } from '$lib/components/ui/header';
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<Header />

	<main class="h-full">
		<section class="grid h-full place-items-center items-center">
			<div class="-mt-40 text-balance text-center">
				<h1 class="py-1.5 text-5xl font-medium tracking-tight">Error {$page.status}</h1>
				<p>{$page.error?.message}</p>
				<Button class="mt-10" as="a" href="/">Volver a inicio</Button>
			</div>
		</section>
	</main>

	<footer></footer>
</div>
