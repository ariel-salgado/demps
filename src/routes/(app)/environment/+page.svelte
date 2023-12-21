<script lang="ts">
	import { envStore } from '$lib/stores';
	import { Button } from '$lib/components/ui/button';
	import { Editor, Widgets, Clipboard, Download } from '$lib/components/codemirror';
</script>

<Editor data={envStore}>
	{#snippet widgets()}
		<Widgets>
			<Clipboard />
			<Download />
		</Widgets>
	{/snippet}
	{#snippet actions()}
		<Button>Button</Button>
	{/snippet}
</Editor>
