import type { Feature, FeatureCollection } from 'geojson';

import { toleranceOptions } from '$lib';
import { browser } from '$app/environment';

export type Metadata = {
	'@context': {
		'@simplified': boolean;
		'@tolerance'?: keyof typeof toleranceOptions;
	};
};

function saveToLocalStorage(key: string, value: unknown) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string) {
	return browser ? localStorage.getItem(key) : null;
}

export function createEnvironment(initialValue?: Metadata & FeatureCollection) {
	const storedValue = getFromLocalStorage('environment');

	// https://www.w3.org/TR/json-ld11/#the-context
	const defaultValue = {
		'@context': {
			'@simplified': false
		},
		type: 'FeatureCollection',
		features: []
	};

	const v: Metadata & FeatureCollection = storedValue
		? JSON.parse(storedValue)
		: initialValue ?? defaultValue;

	let value: Metadata & FeatureCollection = $state(v);

	$effect(() => {
		saveToLocalStorage('environment', value);
	});

	function addFeature(feature: Feature) {
		value.features.push(feature);
	}

	function updateFeature(id: string | number, feature: Feature) {
		const index = value.features.findIndex((f) => f.id === id);
		if (index !== -1) value.features[index] = feature;
	}

	function updateFeatureProps(id: string | number, props: Record<string, unknown>) {
		const index = value.features.findIndex((f) => f.id === id);
		if (index !== -1) {
			value.features[index]!.properties = {
				...value.features[index]!.properties,
				...props
			};
		}
	}

	function removeFeature(id: string | number) {
		value.features = value.features.filter((f) => f.id !== id);
	}

	return {
		set value(newValue: Metadata & FeatureCollection) {
			value = newValue;
		},
		get value(): (Metadata & FeatureCollection) | undefined {
			return value;
		},
		addFeature,
		updateFeature,
		updateFeatureProps,
		removeFeature
	};
}

export function createTolerance(
	initialValue?: (typeof toleranceOptions)[keyof typeof toleranceOptions]
) {
	const storedValue = getFromLocalStorage('tolerance');
	const defaultValue = Object.values(toleranceOptions).at(
		0
	) as (typeof toleranceOptions)[keyof typeof toleranceOptions];

	const v: (typeof toleranceOptions)[keyof typeof toleranceOptions] = storedValue
		? (JSON.parse(storedValue) as (typeof toleranceOptions)[keyof typeof toleranceOptions])
		: initialValue ?? defaultValue;

	let value: (typeof toleranceOptions)[keyof typeof toleranceOptions] = $state(v);

	function getKeyByValue(value: (typeof toleranceOptions)[keyof typeof toleranceOptions]) {
		return Object.keys(toleranceOptions).find((key) => toleranceOptions[key] === value);
	}

	return {
		get value(): (typeof toleranceOptions)[keyof typeof toleranceOptions] {
			return value;
		},
		set value(newValue: (typeof toleranceOptions)[keyof typeof toleranceOptions]) {
			value = newValue;
			saveToLocalStorage('tolerance', value);
		},
		getKeyByValue
	};
}

export type Environment = ReturnType<typeof createEnvironment>;
export type Tolerance = ReturnType<typeof createTolerance>;
