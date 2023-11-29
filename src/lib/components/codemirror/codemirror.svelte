<script lang="ts">
	import { get } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { Action } from 'svelte/action';

	import { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { key } from '$lib/components/codemirror';
	import { extensions } from '$lib/components/codemirror';

	import { EnvStore } from '$lib/stores';
	import { isValidGeoJSON, stringify } from '$lib/utils/helpers';

	let editor: EditorView | undefined = $state(undefined);

	setContext(key, {
		getEditor: () => editor
	});

	const initEditor: Action<HTMLDivElement> = (editorContainer: HTMLDivElement) => {
		editor = new EditorView({
			parent: editorContainer,
			state: EditorState.create({
				doc: stringify(get(EnvStore).data),
				extensions: [
					...extensions,
					EditorView.updateListener.of((update) => {
						if (update.docChanged) {
							const value = update.state.doc.toString();
							if (isValidGeoJSON(value) && get(EnvStore).trigger !== 'editor:subscribe') {
								EnvStore.set({ data: JSON.parse(value), trigger: 'editor:doc' });
							}
						}
					})
				]
			})
		});

		return {
			destroy: () => {
				editor?.destroy();
				editor = undefined;
			}
		};
	};

	EnvStore.subscribe((update) => {
		if (editor) {
			// Updates the editor only if the changes are not triggered by the editor itself
			if (update.trigger === 'map' || update.trigger === 'fileUploader') {
				editor.dispatch({
					changes: {
						from: 0,
						to: editor.state.doc.length,
						insert: stringify(update.data)
					}
				});
			}

			return {
				...update.data,
				trigger: 'editor:subscribe'
			};
		}
	});
</script>

<div class="h-full grid grid-rows-[1fr_auto]">
	<div class="relative overflow-y-scroll text-sm" use:initEditor>
		{#if editor}
			<slot name="widgets" />
		{/if}
	</div>
	{#if editor}
		<slot name="file-upload" />
	{/if}
</div>
