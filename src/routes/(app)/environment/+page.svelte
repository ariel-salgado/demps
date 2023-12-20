<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Editor, Widgets, Clipboard, Download } from '$lib/components/codemirror';
</script>

<Editor>
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
