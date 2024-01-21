import type { ClassValue } from 'clsx';
import type { Feature, FeatureCollection } from 'geojson';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// @ts-expect-error - TS can't find the module
import simplify from '@turf/simplify';
// @ts-expect-error - TS can't find the module
import truncate from '@turf/truncate';

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

export const areEqualGeoJSON = (gj1: FeatureCollection, gj2: FeatureCollection) => {
	if (JSON.stringify(gj1) === JSON.stringify(gj2)) return true;
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

export const preprocessGeoJSON = (geojson: FeatureCollection, tolerance?: number) => {
	const simplified =
		tolerance! > 0
			? simplify(geojson, {
					tolerance: tolerance,
					highQuality: true,
					mutate: true
				})
			: geojson;

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