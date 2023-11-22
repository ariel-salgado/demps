import { persisted } from '$lib/utils/persisted-store';

export const configFormStore = persisted('configForm', {} as Record<string, string | number>, {
	storage: 'local'
});

export const GeoJSONStore = persisted(
	'geojson',
	{
		type: 'FeatureCollection',
		features: []
	} as GeoJSON.FeatureCollection,
	{ storage: 'local' }
);
