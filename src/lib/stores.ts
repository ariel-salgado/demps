import type { ConfigurationSchema } from './types';
import type { Updater, Writable } from 'svelte/store';
import type { FeatureCollection, Feature, Point } from 'geojson';

import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

// https://www.w3.org/TR/json-ld11/#the-context
const createGeoJSONStore = (initialState?: FeatureCollection) => {
	const data = initialState ?? {
		'@context': {
			'@simplified': false
		},
		type: 'FeatureCollection',
		features: []
	};

	const store = writable<FeatureCollection>(data);

	const addFeature = (feature: Feature) => {
		store.update((current) => {
			current.features.push(feature);
			return {
				...current
			};
		});
	};

	const removeFeatureByID = (id: string | number) => {
		store.update((current) => {
			const index = current.features.findIndex((feature) => String(feature.id) === String(id));
			if (index !== -1) current.features.splice(index, 1);

			return {
				...current
			};
		});
	};

	const removeFeatureByCoords = (coords: number[][]) => {
		store.update((current) => {
			const index = current.features.findIndex((feature) => {
				// @ts-expect-error - GeoJSON types are not fully especified
				const featureCoords = feature.geometry.coordinates[0];
				return featureCoords.toString() === coords.toString();
			});
			if (index !== -1) current.features.splice(index, 1);

			return {
				...current
			};
		});
	};

	const updateFeatureCoords = (id: string | number, coords: number[][]) => {
		store.update((current) => {
			const index = current.features.findIndex((feature) => String(feature.id) === String(id));
			if (index !== -1) {
				// @ts-expect-error - GeoJSON types are not fully especified
				current.features[index].geometry.coordinates = coords;
			}

			return {
				...current
			};
		});
	};

	const updateFeatureProps = (id: string | number, props: Record<string, string | number>) => {
		store.update((current) => {
			const index = current.features.findIndex((feature) => String(feature.id) === String(id));
			if (index !== -1)
				current.features[index]!.properties = {
					...(current.features[index]!.properties ?? {}),
					...props
				};

			return {
				...current
			};
		});
	};

	const fns = {
		addFeature,
		removeFeatureByID,
		removeFeatureByCoords,
		updateFeatureCoords,
		updateFeatureProps
	};

	return {
		...store,
		...fns
	} satisfies Writable<FeatureCollection> & typeof fns;
};

export const toleranceOptions = {
	deshabilitado: 0,
	bajo: 0.0001,
	medio: 0.00015,
	alto: 0.0002
} as const;

const createToleranceStore = (initialState?: keyof typeof toleranceOptions) => {
	const data = initialState ? toleranceOptions[initialState] : toleranceOptions.medio;

	const store = writable<number>(data);

	const set = (value: number | keyof typeof toleranceOptions) => {
		typeof value === 'number' ? store.set(value) : store.set(toleranceOptions[value]);
	};

	const update = (updater: Updater<number>) => {
		store.update((current) => {
			const value = updater(current);
			return value;
		});
	};

	const subscribe = store.subscribe;

	return {
		set,
		update,
		subscribe
	};
};

const createConfigStore = (initialState?: ConfigurationSchema) => {
	const data = initialState ?? ({} as ConfigurationSchema);

	const store = writable<ConfigurationSchema>(data);

	return {
		...store
	} as Writable<ConfigurationSchema>;
};

const createSimStore = (initialState?: FeatureCollection) => {
	const data = initialState ?? {
		type: 'FeatureCollection',
		features: []
	};

	const store = writable<FeatureCollection>(data);

	return {
		...store
	} as Writable<FeatureCollection<Point>>;
};

const persistedStore = <T extends Writable<unknown>>(key: string, initialStore: T): T => {
	const storedValue = browser ? localStorage.getItem(key) : null;
	const data = storedValue ? JSON.parse(storedValue) : get(initialStore);

	const setLocalStorage = (key: string, value: unknown) => {
		if (!browser) return;
		localStorage.setItem(key, JSON.stringify(value));
	};

	const unsubscribe = initialStore.subscribe((value: unknown) => {
		setLocalStorage(key, value);
	});

	initialStore.set(data);

	return {
		...initialStore,
		unsubscribe
	};
};

export type SimStore = ReturnType<typeof createSimStore>;
export type ConfigStore = ReturnType<typeof createConfigStore>;
export type GeoJSONStore = ReturnType<typeof createGeoJSONStore>;
export type ToleranceStore = ReturnType<typeof createToleranceStore>;

export const simStore = createSimStore();
export const envStore = persistedStore<GeoJSONStore>('env', createGeoJSONStore());
export const configStore = persistedStore<ConfigStore>('config', createConfigStore());
export const toleranceStore = persistedStore<ToleranceStore>('tolerance', createToleranceStore());
