import type { PageServerLoad } from './$types';

const NUM_POINTS: number = 40000;

export const load = (async () => {
	const latLngs = generateLatLngs(NUM_POINTS);

	return { numPoints: NUM_POINTS, agents: latLngs };
}) satisfies PageServerLoad;

const generateLatLngs = (numPoints: number): [number, number][] => {
	// Viña del Mar, Chile boundaries
	const minLat = -33.024168;
	const maxLat = -33.002444;
	const minLng = -71.556766;
	const maxLng = -71.534021;

	const latLngs: [number, number][] = [];

	for (let i = 0; i < numPoints; i++) {
		const lat = minLat + Math.random() * (maxLat - minLat);
		const lng = minLng + Math.random() * (maxLng - minLng);
		latLngs.push([lat, lng]);
	}

	return latLngs;
};
