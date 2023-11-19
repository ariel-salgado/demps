export const capitalize = (input: string | object): string => {
	if (typeof input === 'string') return input.charAt(0).toUpperCase() + input.slice(1);
	if (typeof input === 'object' && Object.keys(input).length > 0)
		return capitalize(Object.keys(input)[0] as string);
	return '';
};

export const spaceCamelCase = (str: string) => {
	const resultado = str.replace(/([a-z])([A-Z])/g, '$1 $2');

	return capitalize(resultado);
};

export const toKebabCase = (input: string | object): string => {
	if (typeof input === 'string') return input.toLowerCase().replace(/\s+/g, '-');
	if (typeof input === 'object' && Object.keys(input).length > 0)
		return toKebabCase(Object.keys(input)[0] as string);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

export const parseObjectByDots = (inputObject: object) => {
	const outputObject = {};

	for (const key in inputObject) {
		const keys = key.split('.');
		let currentObj = outputObject;

		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];

			if (i === keys.length - 1) {
				// @ts-expect-error Object is any
				currentObj[k] = inputObject[key];
			} else {
				// @ts-expect-error Object is any
				currentObj[k] = currentObj[k] || {};
				// @ts-expect-error Object is any
				currentObj = currentObj[k];
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
