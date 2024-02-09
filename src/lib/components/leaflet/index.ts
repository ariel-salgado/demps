import type L from 'leaflet';
import type { GeoJSONStore } from '$lib/stores';

//@ts-expect-error - TS doesn't know about the module context api
import Map, { contextKey } from './map.svelte';
import Draw from './draw.svelte';
import Search from './search.svelte';
import MarkerCluster from './markercluster.svelte';

export type MapContext = {
	getMap: () => L.Map;
	getStore: () => GeoJSONStore;
	getLeaflet: () => typeof L;
	getFeatureGroup: () => L.FeatureGroup;
	getOverlayLayer: () => L.Control.Layers;
};

export { contextKey, Map, Draw, Search, MarkerCluster };
