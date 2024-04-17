import type { Actions } from '@sveltejs/kit';

export const prerender = false;

export const actions = {
	download: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		/* const { schema } = getFormData();

		const result = schema.safeParse(formData);

		if (!result.success) {
			return {
				errors: result.error.flatten().fieldErrors
			};
		}

		 */

		return formData;
	}
} satisfies Actions;
