import { key } from './key';
import type L from 'leaflet';
import Marker from './marker.svelte';
import Leaflet from './leaflet.svelte';
import LeafletGeoman from './leaflet-geoman.svelte';
import LeafletGeosearch from './leaflet-geosearch.svelte';

export type MapContext = {
	getMap: () => L.Map;
	getLeaflet: () => typeof L;
};

export { Leaflet, LeafletGeoman, LeafletGeosearch, Marker, key };
