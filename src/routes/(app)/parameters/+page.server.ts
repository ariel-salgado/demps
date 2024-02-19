import type { Actions } from '@sveltejs/kit';

import { getFormData } from './form';

export const prerender = false;

export const actions = {
	download: async ({ request }) => {
		const { schema } = getFormData();
		const formData = Object.fromEntries(await request.formData());

		const result = schema.safeParse(formData);

		if (!result.success) {
			return {
				errors: result.error.flatten().fieldErrors
			};
		}

		return formData;
	}
} satisfies Actions;
