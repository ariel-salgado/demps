import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	},
	testDir: './tests/',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	outputDir: './tests/output/',
	reporter: [['html', { open: 'always', outputFolder: './tests/report/' }]]
};

export default config;
