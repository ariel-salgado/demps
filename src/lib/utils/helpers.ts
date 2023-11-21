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
export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

export const parseObjectByDots = (inputObject: Record<string, string>) => {
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
