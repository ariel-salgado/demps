import Input from './input.svelte';

export const onlyAllowNumbers = (e: KeyboardEvent) => {
	const input = e.target as HTMLInputElement;
	const cursorPosition = input.selectionStart;
	const hasMinusSign = input.value.includes('-');
	const hasDecimalPoint = input.value.includes('.');

	if (e.key === 'Backspace' || e.key === 'Delete' || e.key.startsWith('Arrow') || e.key === 'Tab') {
		return;
	}

	if (e.key === '-' && cursorPosition !== 0) e.preventDefault();
	else if (e.key === '.' && hasDecimalPoint) e.preventDefault();
	else if (
		!/[\d.-]/.test(e.key) ||
		(e.key === '-' && hasMinusSign) ||
		(e.key === '.' && cursorPosition === 0)
	)
		e.preventDefault();
};

export { Input };
