import type { Writable } from 'svelte/store';
import type { FeatureCollection, Feature } from 'geojson';

import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

const createGeoJSONStore = (initialState?: FeatureCollection) => {
	const data = initialState ?? {
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

	const fns = {
		addFeature,
		removeFeatureByID,
		removeFeatureByCoords,
		updateFeatureCoords
	};

	return {
		...store,
		...fns
	} satisfies Writable<FeatureCollection> & typeof fns;
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

export type GeoJSONStore = ReturnType<typeof createGeoJSONStore>;

export const envStore = persistedStore<GeoJSONStore>('env', createGeoJSONStore());