<script lang="ts">
	import { envStore } from '$lib/stores';
	import { Editor, Widgets, Clipboard, Download } from '$lib/components/codemirror';
</script>

<section class="h-full">
	<Editor store={envStore}>
		{#snippet widgets()}
			<Widgets>
				<Clipboard />
				<Download />
			</Widgets>
		{/snippet}
	</Editor>
</section>
