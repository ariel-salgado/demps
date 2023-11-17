export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const spaceCamelCase = (str: string) => {
	const resultado = str.replace(/([a-z])([A-Z])/g, '$1 $2');

	return capitalize(resultado);
};

export const toKebabCase = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

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
