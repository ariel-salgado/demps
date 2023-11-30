import { persisted } from '$lib/utils/persisted-store';

export const configFormStore = persisted('configForm', {} as Record<string, string | number>, {
	storage: 'local'
});

export const EnvStore = persisted(
	'editorState',
	{
		data: {
			type: 'FeatureCollection',
			features: []
		} as GeoJSON.FeatureCollection,
		trigger: null as 'map' | 'editor:doc' | 'editor:subscribe' | 'fileUploader' | null
	},
	{ storage: 'local' }
);
