import type L from 'leaflet';
import type { GeoJSONStore } from '$lib/stores';

import { key } from './context';
import Map from './map.svelte';
import Draw from './draw.svelte';

export type MapContext = {
	getLeaflet: () => typeof L;
	getMap: () => L.Map;
	getFeatureGroup: () => L.FeatureGroup;
	getData: () => GeoJSONStore;
};

export { key, Map, Draw };
