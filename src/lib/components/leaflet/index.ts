import type L from 'leaflet';

import { key } from './context';
import Map from './map.svelte';
import Draw from './draw.svelte';

export type MapContext = {
	getLeaflet: () => typeof L;
	getMap: () => L.Map;
	getFeatureGroup: () => L.FeatureGroup;
};

export { key, Map, Draw };
