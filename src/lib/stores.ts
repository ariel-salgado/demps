import { persisted } from '$lib/utils/persisted-store';

export const GeoJSONStore = persisted(
	'geojson',
	{
		type: 'FeatureCollection',
		features: []
	} as GeoJSON.FeatureCollection,
	{ storage: 'local' }
);
