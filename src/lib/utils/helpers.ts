export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toKebabCase = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

export const parseObjectByKeys = (inputObject: object) => {
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
