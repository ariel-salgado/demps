import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => void>(
	this: ThisParameterType<T>,
	fn: T,
	delay: number
) {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(this, args), delay);
	};
}

export const strEqualsObj = (str: string, obj: object) => {
	try {
		return JSON.stringify(JSON.parse(str)) === JSON.stringify(obj);
	} catch (_) {
		return false;
	}
};