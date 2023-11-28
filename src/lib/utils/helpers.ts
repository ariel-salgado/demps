export const capitalize = (input: string | object): string => {
	if (typeof input === 'string') return input.charAt(0).toUpperCase() + input.slice(1);
	if (typeof input === 'object' && Object.keys(input).length > 0)
		return capitalize(Object.keys(input)[0] as string);
	return '';
};

export const toKebabCase = (input: string | object): string => {
	if (typeof input === 'string') return input.toLowerCase().replace(/\s+/g, '-');
	if (typeof input === 'object' && Object.keys(input).length > 0)
		return toKebabCase(Object.keys(input)[0] as string);
	return '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (obj: any, space: boolean = true) => {
	if (typeof obj === 'string') return obj;
	if (typeof obj === 'object') {
		try {
			return JSON.stringify(obj, null, space ? 2 : undefined);
		} catch (_) {
			console.error('Error stringifying object', obj);
			return obj;
		}
	}
};

export const unflatten = (inputObject: Record<string, string>) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const outputObject: Record<string, any> = {};

	for (const key in inputObject) {
		const keys = key.split('.');
		let currentObj = outputObject;

		for (let i = 0; i < keys.length; i++) {
			const k = keys[i] as string;

			if (i === keys.length - 1) {
				currentObj[k] = inputObject[key];
			} else {
				const nextKey = keys[i + 1] as string;
				const isArrayKey =
					/^\d+$/.test(nextKey) || (nextKey.startsWith('[') && nextKey.endsWith(']'));

				if (isArrayKey) {
					// Handle numeric keys
					const numericKey = parseInt(nextKey.replace(/[[\]]/g, ''), 10);
					currentObj[k] = currentObj[k] || [];
					currentObj[k][numericKey] = currentObj[k][numericKey] || {};
					currentObj = currentObj[k][numericKey];
					i++; // Skip the numeric key in the loop
				} else {
					currentObj[k] = currentObj[k] || {};

					currentObj = currentObj[k];
				}
			}
		}
	}

	return outputObject;
};

export const flatten = (obj: object, prefix = '') => {
	let result = {};

	for (const key in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(key)) {
			const value = obj[key as keyof typeof obj];

			if (value && typeof value === 'object' && !Array.isArray(value)) {
				result = {
					...result,
					...flatten(value, prefix + key + '.')
				};
			} else if (Array.isArray(value)) {
				for (let i = 0; i < (value as []).length; i++) {
					result = {
						...result,
						...flatten({ [i]: value[i] }, prefix + key + '.')
					};
				}
			} else {
				result[(prefix + key) as keyof typeof result] = value;
			}
		}
	}

	return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedKeys = (obj: any): string[] => {
	const keys: string[] = [];

	for (const key in obj) {
		if (obj[key] !== null && typeof obj[key] === 'object') {
			keys.push(key);
			const nestedKeys = getNestedKeys(obj[key]);
			if (nestedKeys.length > 0) {
				keys.push(...nestedKeys.map((nestedKey) => `${key}.${nestedKey}`));
			}
		}
	}

	return keys;
};

export const isValidGeoJSON = (geojson: string | object) => {
	if (typeof geojson === 'string') {
		try {
			geojson = JSON.parse(geojson) as object;
		} catch (_) {
			return false;
		}
	}

	if (
		typeof geojson === 'object' &&
		geojson !== null &&
		geojson !== undefined &&
		(geojson as GeoJSON.FeatureCollection).type === 'FeatureCollection' &&
		'features' in geojson
	) {
		return true;
	} else {
		return false;
	}
};
