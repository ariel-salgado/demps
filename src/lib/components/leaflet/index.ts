import type { Environment } from '$lib/states.svelte';

import Map from './map.svelte';
import Draw from './draw.svelte';
import Search from './search.svelte';
import Canvas from './canvas.svelte';

export const contextKey = Symbol();

export type MapContext = {
	getMap: () => Map;
	getEnvironment: () => Environment;
	getFeatureGroup: () => L.FeatureGroup;
	getOverlayLayer: () => L.Control.Layers;
};

export { Map, Draw, Search, Canvas };
