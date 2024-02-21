import type { Feature } from 'geojson';

type Field = {
	id: string;
	type: string;
	defaultValue: string | number;
	attributes: Record<string, unknown>;
};

const fields: Field[] = [
	{
		id: 'id',
		type: 'text',
		defaultValue: '',
		attributes: {
			readonly: true
		}
	},
	{
		id: 'nameID',
		type: 'text',
		defaultValue: '',
		attributes: {}
	},
	{
		id: 'zoneType',
		type: 'text',
		defaultValue: '',
		attributes: {}
	},
	{
		id: 'stroke',
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	{
		id: 'stroke-width',
		type: 'number',
		defaultValue: 3,
		attributes: {
			min: 0
		}
	},
	{
		id: 'stroke-opacity',
		type: 'number',
		defaultValue: 1,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	},
	{
		id: 'fill',
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	{
		id: 'fill-opacity',
		type: 'number',
		defaultValue: 0.2,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	}
];

const formatAttributes = (attributes: Record<string, unknown>) => {
	return Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
};

const createFormField = (field: Field, feature: Feature) => {
	const attributes = formatAttributes(field.attributes);
	const value = field.id === 'id' ? feature.id : feature.properties![field.id];

	return (
		`<div>` +
		`<label class="block p-1 font-semibold text-slate-500" for="${field.id}-${feature.id}">${field.id}</label>` +
		`<input class="w-full px-3 py-1.5 rounded border border-slate-300 read-only:bg-neutral-200 read-only:text-neutral-600" type="${field.type}" id="${field.id}-${feature.id}" name="${field.id}" value="${value || field.defaultValue}" placeholder="Feature ${field.id}" ${attributes}>` +
		`</div>`
	);
};

export const createPopup = (layer: L.Layer) => {
	return (
		`<h3 class="text-base font-semibold text-slate-500">Edit Feature</h3>` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		`<form id="form-${layer.feature.id}" class="w-[300px] grid grid-cols-2 items-center place-content-center gap-4 py-2">` +
		// @ts-expect-error - Property 'feature' does not exist on type 'Layer'
		fields.map((field) => createFormField(field, layer.feature)).join('') +
		`<hr class="col-span-2" />` +
		`<button class="w-full px-3 py-1.5 text-white bg-primary-700 rounded hover:bg-primary-600 col-span-2">Save</button>` +
		`</form>`
	);
};
