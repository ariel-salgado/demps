import type { Extension } from '@codemirror/state';

import { json } from '@codemirror/lang-json';
import { lintKeymap } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import {
	keymap,
	highlightSpecialChars,
	drawSelection,
	highlightActiveLine,
	dropCursor,
	rectangularSelection,
	crosshairCursor,
	lineNumbers,
	highlightActiveLineGutter,
	EditorView
} from '@codemirror/view';
import {
	defaultHighlightStyle,
	syntaxHighlighting,
	indentOnInput,
	bracketMatching,
	foldGutter,
	foldKeymap
} from '@codemirror/language';
import {
	autocompletion,
	completionKeymap,
	closeBrackets,
	closeBracketsKeymap
} from '@codemirror/autocomplete';

const baseTheme: Extension = EditorView.baseTheme({
	'&.cm-focused': {
		outline: 'none'
	},
	'.cm-gutters': {
		borderRight: 'none',
		backgroundColor: '#fff',
		userSelect: 'none'
	},
	'.cm-gutterElement': {
		padding: '0 0.2rem'
	},
	'.cm-activeLine': {
		backgroundColor: '#f3f3f3'
	},
	'.cm-activeLineGutter': {
		backgroundColor: '#f3f3f3'
	},
	'.cm-lineNumbers': {
		color: '#aaa',
		minWidth: '1.6rem'
	},
	'.cm-gutterElement > span[title="Fold line"]': {
		color: '#aaa'
	},
	'.cm-lineNumbers > .cm-activeLineGutter': {
		color: '#222'
	},
	'.cm-gutterElement .cm-activeLineGutter > span[title="Fold line"]': {
		color: '#222'
	},
	'.cm-scroller': {
		fontFamily: 'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace'
	}
});

export const extensions: Extension = (() => [
	lineNumbers(),
	highlightActiveLineGutter(),
	highlightSpecialChars(),
	history(),
	foldGutter({
		openText: '▾',
		closedText: '▸'
	}),
	drawSelection(),
	dropCursor(),
	EditorState.allowMultipleSelections.of(true),
	indentOnInput(),
	syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	bracketMatching(),
	closeBrackets(),
	autocompletion(),
	rectangularSelection(),
	crosshairCursor(),
	highlightActiveLine(),
	highlightSelectionMatches(),
	EditorView.lineWrapping,
	EditorView.contentAttributes.of({
		'aria-label': 'GeoJSON editor'
	}),
	json(),
	baseTheme,
	keymap.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
		...completionKeymap,
		...lintKeymap
	])
])();
