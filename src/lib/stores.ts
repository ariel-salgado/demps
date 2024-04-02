import type { ConfigurationSchema } from './types';
import type { Writable } from 'svelte/store';

import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

const createConfigStore = (initialState?: ConfigurationSchema) => {
	const data = initialState ?? ({} as ConfigurationSchema);

	const store = writable<ConfigurationSchema>(data);

	return {
		...store
	} as Writable<ConfigurationSchema>;
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

export type ConfigStore = ReturnType<typeof createConfigStore>;

export const configStore = persistedStore<ConfigStore>('config', createConfigStore());
