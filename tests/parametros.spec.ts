import { test, expect } from '@playwright/test';

import path from 'node:path';
import { fileURLToPath } from 'url';

test.describe('Parametros', () => {
	const errors: string[] = [];

	test.beforeEach(async ({ page, baseURL }) => {
		errors.length = 0;

		await page.goto(`${baseURL}/parametros`);
		await page.waitForLoadState('domcontentloaded');

		page.on('pageerror', (error) => {
			errors.push(error.message);
		});
	});

	test.afterEach(() => {
		expect(errors.length).toBe(0);
	});

	test('Cargar Configuración', async ({ page }) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		await page
			.locator('input[type="file"]')
			.setInputFiles(path.join(__dirname, './input/parameters.config'));

		expect((await page.locator('input[id="duration"]').inputValue()).length).toBeGreaterThan(0);
	});

	test('Descargar Configuración', async ({ page }) => {
		const downloadPromise = page.waitForEvent('download');
		await page.locator('button[form="parameters-form"]').click();
		const download = await downloadPromise;

		await download.saveAs('./tests/output/' + download.suggestedFilename());
	});

	test('Valores Guardados', async ({ page }) => {
		await page.locator('input[id="duration"]').fill('100');
		await page.locator('select[id="densityModelEnable"]').selectOption({ label: 'Habilitado' });

		await page.reload();
		await page.waitForLoadState('domcontentloaded');

		expect(await page.locator('input[id="duration"]').inputValue()).toBe('100');
		expect(await page.locator('select[id="densityModelEnable"]').inputValue()).toBe('true');
	});
});
