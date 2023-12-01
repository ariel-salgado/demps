<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description } = $props<Props>();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="{description}" />
	<slot />
</svelte:head>
