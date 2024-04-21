import { describe, it, expect } from 'vitest';
import { strEqualsObj, isValidGeoJSON, capitalize } from '$lib/utils';

describe('strEqualObj', () => {
	it('expect success', () => {
		const str = '{"a":1,"b":2}';
		const obj = { a: 1, b: 2 };

		expect(strEqualsObj(str, obj)).toBe(true);
	});

	it('expect failure', () => {
		const str = '["a":1,"b":2]';
		const obj = { a: 1, b: 2 };

		expect(strEqualsObj(str, obj)).toBe(false);
	});
});

describe('isValidGeoJSON', () => {
	it('expect success', () => {
		const data = '{"type":"FeatureCollection","features":[]}';

		expect(isValidGeoJSON(data)).toBe(true);
	});

	it('expect failure', () => {
		const data = '{"type":"FeatureCollection", "features": {}}';

		expect(isValidGeoJSON(data)).toBe(false);
	});
});

describe('capitalize', () => {
	it('expect success', () => {
		const str = 'hello';

		expect(capitalize(str)).toBe('Hello');
	});
});
