import { parseObjectByDots } from '$lib/utils/helpers';
import type { Actions } from '@sveltejs/kit';

export const prerender = false;

export const actions: Actions = {
	download: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		// @ts-expect-error - formData is a Record<string, string>
		return parseObjectByDots(formData);
	}
};
