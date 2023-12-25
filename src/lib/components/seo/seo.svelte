<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		description: string;
		children?: Snippet<void>;
	}

	const { children, title, description } = $props<Props>();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if children}
		{@render children()}
	{/if}
</svelte:head>
