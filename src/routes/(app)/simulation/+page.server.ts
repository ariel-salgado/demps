import type { PageServerLoad } from './$types';
import type { Feature, FeatureCollection, Point } from 'geojson';

export const ssr = false;

const NUM_POINTS = 1000;

export const load = (async () => {
	const geoJSON = generateGeoJSON(NUM_POINTS);
	return geoJSON;
}) satisfies PageServerLoad;

// Mocking
function generateRandomPoint(polygons: [number, number][][]): Point {
	const polygon = polygons[Math.floor(Math.random() * polygons.length)];
	const minX = Math.min(...(polygon as [number, number][]).map((point) => point[0]));
	const maxX = Math.max(...(polygon as [number, number][]).map((point) => point[0]));
	const minY = Math.min(...(polygon as [number, number][]).map((point) => point[1]));
	const maxY = Math.max(...(polygon as [number, number][]).map((point) => point[1]));

	const randomX = Math.random() * (maxX - minX) + minX;
	const randomY = Math.random() * (maxY - minY) + minY;

	return {
		type: 'Point',
		coordinates: [randomX, randomY]
	};
}

function generateGeoJSON(numPoints: number): FeatureCollection {
	// Coordinates of Viña del Mar, Chile
	const vinadelmarPolygon: [number, number][][] = [
		[
			[-71.557988, -33.019315],
			[-71.547492, -33.003053],
			[-71.532464, -33.009874],
			[-71.542959, -33.026134],
			[-71.557988, -33.019315]
		]
	];

	const features: Feature[] = [];
	for (let i = 0; i < numPoints; i++) {
		const point = generateRandomPoint(vinadelmarPolygon);
		features.push({
			type: 'Feature',
			properties: {},
			geometry: point
		});
	}

	return {
		type: 'FeatureCollection',
		features: features
	} as FeatureCollection<Point>;
}
