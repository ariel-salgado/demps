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

export const areEqualObject = (a: object, b: object) => {
	if (JSON.stringify(a) === JSON.stringify(b)) return true;
	return false;
};

export const isValidGeoJSON = (data: string | object): boolean => {
	try {
		const geojson = typeof data === 'string' ? JSON.parse(data) : data;

		return (
			geojson && geojson.type && geojson.features !== undefined && Array.isArray(geojson.features)
		);
	} catch (_) {
		return false;
	}
};

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const flattenJSON = (obj: object, prefix: string = '') => {
	let flatObj = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];

			if (typeof value === 'object' && !Array.isArray(value)) {
				const nestedObj = flattenJSON(value, prefix + key + '.');
				flatObj = { ...flatObj, ...nestedObj };
			} else if (Array.isArray(value)) {
				value.forEach((item, index) => {
					if (typeof item === 'object') {
						const nestedObj = flattenJSON(item, prefix + key + '.' + index + '.');
						flatObj = { ...flatObj, ...nestedObj };
					} else flatObj[prefix + key + '.' + index] = item;
				});
			} else flatObj[prefix + key] = value;
		}
	}

	return flatObj;
};

export const deflattenJSON = (obj: object) => {
	const deflatObj = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const keys = key.split('.');
			let currentObject: Record<string, string> | string = deflatObj;

			for (let i = 0; i < keys.length - 1; i++) {
				const currentKey = keys[i] as string;
				const nextKey = keys[i + 1] as string;

				if (!currentObject[currentKey]) {
					currentObject[currentKey] = /^\d+$/.test(nextKey) ? [] : {};
				}

				currentObject = currentObject[currentKey];
			}

			currentObject[keys[keys.length - 1] as string] = obj[key];
		}
	}

	return deflatObj;
};
