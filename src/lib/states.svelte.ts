import type { ParametersSchema } from '$lib/types';
import type { Feature, FeatureCollection } from 'geojson';

import { browser } from '$app/environment';

function saveToLocalStorage(key: string, value: unknown) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string) {
	return browser ? localStorage.getItem(key) : null;
}

export function createEnvironment(initialValue?: FeatureCollection) {
	const storedValue = getFromLocalStorage('environment');

	const defaultValue: FeatureCollection = {
		type: 'FeatureCollection',
		features: []
	};

	const v: FeatureCollection = storedValue ? JSON.parse(storedValue) : initialValue ?? defaultValue;

	let value = $state(v);

	$effect(() => {
		saveToLocalStorage('environment', value);
	});

	function addFeature(feature: Feature) {
		value.features.push(feature);
	}

	function updateFeature(id: string | number, feature: Feature) {
		const index = value.features.findIndex((f) => String(f.id) === String(id));
		if (index !== -1) value.features[index] = feature;
	}

	function updateFeatureProps(id: string | number, props: Record<string, unknown>) {
		const index = value.features.findIndex((f) => String(f.id) === String(id));

		if (index !== -1) {
			value.features[index]!.properties = {
				...value.features[index]!.properties,
				...props
			};
		}
	}

	function removeFeature(id: string | number) {
		value.features = value.features.filter((f) => String(f.id) !== String(id));
	}

	function getFeatureById(id: string | number) {
		return value.features.find((f) => String(f.id) === String(id));
	}

	return {
		set value(newValue: FeatureCollection) {
			value = newValue;
		},
		get value(): FeatureCollection | undefined {
			return value;
		},
		addFeature,
		updateFeature,
		updateFeatureProps,
		removeFeature,
		getFeatureById
	};
}

export function createParameters(initialValue?: ParametersSchema) {
	const storedValue = getFromLocalStorage('parameters');
	const defaultValue = {} as ParametersSchema;

	const v = storedValue
		? (JSON.parse(storedValue) as ParametersSchema)
		: initialValue ?? defaultValue;

	let value: ParametersSchema = $state(v);

	$effect(() => {
		saveToLocalStorage('parameters', value);
	});

	return {
		get value(): ParametersSchema {
			return value;
		},
		set value(newValue: ParametersSchema) {
			value = newValue;
		}
	};
}

export type Environment = ReturnType<typeof createEnvironment>;
export type Parameters = ReturnType<typeof createParameters>;
