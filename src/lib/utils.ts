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

export function strEqualsObj(str: string, obj: object) {
	try {
		return JSON.stringify(JSON.parse(str)) === JSON.stringify(obj);
	} catch (_) {
		return false;
	}
}

export function isValidGeoJSON(data: string | object): boolean {
	try {
		const geojson = typeof data === 'string' ? JSON.parse(data) : data;

		return (
			geojson && geojson.type && geojson.features !== undefined && Array.isArray(geojson.features)
		);
	} catch (_) {
		return false;
	}
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function flattenJSON(obj: object, prefix: string = '') {
	const flatObj: Record<string, unknown> = {};

	for (const key of Object.keys(obj)) {
		const value: Array<unknown> = obj[key as keyof typeof obj];
		const fullKey = prefix ? `${prefix}.${key}` : key;

		if (value && typeof value === 'object') {
			if (Array.isArray(value)) {
				value.forEach((item, index) => {
					if (typeof item === 'object') {
						Object.assign(flatObj, flattenJSON(item!, `${fullKey}.${index}`));
					} else {
						flatObj[`${fullKey}.${index}`] = item;
					}
				});
			} else {
				Object.assign(flatObj, flattenJSON(value, fullKey));
			}
		} else {
			flatObj[fullKey] = value;
		}
	}

	return flatObj;
}

export function deflattenJSON(obj: object) {
	return Object.keys(obj).reduce(
		(deflatObj, key) => {
			const keys = key.split('.');
			let currentObj = deflatObj;
			for (let i = 0; i < keys.length - 1; i++) {
				const currentKey = keys[i] as string;
				currentObj[currentKey] = currentObj?.[currentKey] || (/^\d+$/.test(keys[i + 1]!) ? [] : {});
				currentObj = currentObj[currentKey] as Record<string, unknown>;
			}
			currentObj[keys.at(-1)!] = obj[key as keyof typeof obj];
			return deflatObj;
		},
		{} as Record<string, unknown>
	);
}
