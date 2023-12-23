import type { ClassValue } from 'clsx';
import type { Feature, FeatureCollection } from 'geojson';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// @ts-expect-error - TS can't find the module
import simplify from '@turf/simplify';
// @ts-expect-error - TS can't find the module
import truncate from '@turf/truncate';
// @ts-expect-error - TS can't find the module
import { feature } from '@turf/helpers';

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
	const simplified =
		tolerance !== 0
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

export const areEqualGeoJSON = (
	geojson1: FeatureCollection,
	geojson2: FeatureCollection
): boolean => {
	if (JSON.stringify(geojson1) === JSON.stringify(geojson2)) return true;
	return false;
};

export const coordsToFeature = (coords: number[][]): Feature => {
	return feature(
		{
			type: 'Polygon',
			coordinates: [coords]
		},
		{},
		{ id: crypto.randomUUID() }
	);
};
