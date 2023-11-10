import type L from 'leaflet';
import Leaflet from './leaflet.svelte';
import Marker from './marker.svelte';
import { key } from './key';

export type MapContext = {
	getLeaflet: () => typeof L;
	getMap: () => L.Map;
};

export { Leaflet, Marker, key };
