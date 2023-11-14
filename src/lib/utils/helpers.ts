export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toKebabCase = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (obj: any) => JSON.stringify(obj, null, 2);
