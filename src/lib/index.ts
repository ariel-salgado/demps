/**
 * @Environment
 * Tolerance options for flood zones simplification
 */

export const toleranceOptions = {
	deshabilitado: 0,
	bajo: 0.0001,
	medio: 0.00015,
	alto: 0.0002
} as const;

/**
 * @Environment
 * Form fields for feature properties edition
 */

export const popupFields = {
	id: {
		type: 'text',
		defaultValue: '',
		attributes: {
			readonly: true
		}
	},
	nameID: {
		type: 'text',
		defaultValue: '',
		attributes: {}
	},
	zoneType: {
		type: 'select',
		defaultValue: '',
		attributes: {},
		options: ['initial', 'flood', 'safe']
	},
	stroke: {
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	'stroke-width': {
		type: 'number',
		defaultValue: 3,
		attributes: {
			min: 0,
			step: 1
		}
	},
	'stroke-opacity': {
		type: 'number',
		defaultValue: 1,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	},
	fill: {
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	'fill-opacity': {
		type: 'number',
		defaultValue: 0.2,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	}
} as const;
