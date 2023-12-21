import type { ClassValue } from 'clsx';
import type { Feature, FeatureCollection } from 'geojson';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// @ts-expect-error - TS can't find the module
import simplify from '@turf/simplify';
// @ts-expect-error - TS can't find the module
import truncate from '@turf/truncate'


export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const strEqualsObj = (str: string, obj: object): boolean => {
	try {
		return JSON.stringify(JSON.parse(str)) === JSON.stringify(obj);
	} catch (_) {
		return false;
	}
};

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

export const preprocessGeoJSON = (geojson: FeatureCollection, tolerance?: number) => {
	const simplified = simplify(geojson, {
		tolerance: tolerance || 0.0001,
		highQuality: true,
		mutate: true
	});

	const truncated = truncate(simplified, {
		precision: 6,
		coordinates: Number.MAX_VALUE,
		mutate: true
	});

	truncated.features = truncated.features.map(({ id, ...feature }: Feature) => ({
		id: id || crypto.randomUUID(),
		...feature
	}));

	return truncated as FeatureCollection;
};