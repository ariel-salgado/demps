import type { UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()]
} satisfies UserConfig;

export default config;
