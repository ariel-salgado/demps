import type { Actions } from '@sveltejs/kit';
import { unflatten } from '$lib/utils/helpers';

export const actions: Actions = {
	download: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		return unflatten(formData as Record<string, string>);
	}
};
