import type L from 'leaflet';
import type { GeoJSONStore } from '$lib/stores';

import { key } from './context';

import Map from './map.svelte';
import Draw from './draw.svelte';
import Search from './search.svelte';

export type MapContext = {
	getMap: () => L.Map;
	getStore: () => GeoJSONStore;
	getLeaflet: () => typeof L;
	getFeatureGroup: () => L.FeatureGroup;
	getOverlayLayer: () => L.Control.Layers;
};

export { key, Map, Draw, Search };
