import { test, expect } from '@playwright/test';

import path from 'node:path';
import { fileURLToPath } from 'url';

test.describe('Mapa', () => {
	const errors: string[] = [];

	const drawRect = 'a[aria-label="Dibujar Rectángulo"]';
	const drawPoly = 'a[aria-label="Dibujar Polígono"]';
	const drawCircle = 'a[aria-label="Dibujar Círculo"]';

	const edit = 'a[aria-label="Editar Capas"]';
	const drag = 'a[aria-label="Arrastrar Capas"]';
	const rotate = 'a[aria-label="Rotar capa"]';
	const remove = 'a[aria-label="Eliminar Capas"]';

	test.beforeEach(async ({ page, baseURL }) => {
		errors.length = 0;

		await page.goto(`${baseURL}/entorno`);
		await page.waitForLoadState('networkidle');

		page.on('pageerror', (error) => {
			errors.push(error.message);
		});
	});

	test.afterEach(() => {
		expect(errors.length).toBe(0);
	});

	test('Interacciones Rectángulo', async ({ page }) => {
		await test.step('Dibujar', async () => {
			await page.click(drawRect);

			await page.mouse.move(300, 300);
			await page.mouse.click(300, 300);

			await page.mouse.move(500, 500);
			await page.mouse.click(500, 500);

			await page.click(drawRect);
		});

		await test.step('Editar', async () => {
			await page.click(edit);

			await page.mouse.move(500, 500);
			await page.mouse.down();
			await page.mouse.move(600, 600);
			await page.mouse.up();

			await page.click(edit);
		});

		await test.step('Arrastrar', async () => {
			await page.click(drag);

			await page.mouse.move(400, 400);
			await page.mouse.down();
			await page.mouse.move(300, 300);
			await page.mouse.up();

			await page.click(drag);
		});

		await test.step('Rotar', async () => {
			await page.click(rotate);

			await page.mouse.move(500, 500);
			await page.mouse.down();
			await page.mouse.move(500, 600);
			await page.mouse.up();

			await page.click(rotate);
		});

		await test.step('Eliminar', async () => {
			await page.click(remove);

			await page.mouse.move(400, 400);
			await page.mouse.click(400, 400);

			await page.click(remove);
		});
	});

	test('Interacciones Polígono', async ({ page }) => {
		await test.step('Dibujar', async () => {
			await page.click(drawPoly);

			await page.mouse.move(300, 300);
			await page.mouse.click(300, 300);

			await page.mouse.move(500, 300);
			await page.mouse.click(500, 300);

			await page.mouse.move(400, 500);
			await page.mouse.click(400, 500);

			await page.mouse.move(300, 300);
			await page.mouse.click(300, 300);

			await page.click(drawPoly);
		});

		await test.step('Editar', async () => {
			await page.click(edit);

			await page.mouse.move(400, 500);
			await page.mouse.down();
			await page.mouse.move(400, 600);
			await page.mouse.up();

			await page.click(edit);
		});

		await test.step('Arrastrar', async () => {
			await page.click(drag);

			await page.mouse.move(400, 400);
			await page.mouse.down();
			await page.mouse.move(300, 300);
			await page.mouse.up();

			await page.click(drag);
		});

		await test.step('Rotar', async () => {
			await page.click(rotate);

			await page.mouse.move(200, 200);
			await page.mouse.down();
			await page.mouse.move(200, 300);
			await page.mouse.up();

			await page.click(rotate);
		});

		await test.step('Eliminar', async () => {
			await page.click(remove);

			await page.mouse.move(300, 300);
			await page.mouse.click(300, 300);

			await page.click(remove);
		});
	});

	test('Interacciones Círculo', async ({ page }) => {
		await test.step('Dibujar', async () => {
			await page.click(drawCircle);

			await page.mouse.move(400, 400);
			await page.mouse.click(400, 400);

			await page.mouse.move(500, 400);
			await page.mouse.click(500, 400);

			await page.click(drawCircle);
		});

		await test.step('Editar', async () => {
			await page.click(edit);

			await page.mouse.move(500, 400);
			await page.mouse.down();
			await page.mouse.move(600, 400);
			await page.mouse.up();

			await page.click(edit);
		});

		await test.step('Arrastrar', async () => {
			await page.click(drag);

			await page.mouse.move(400, 400);
			await page.mouse.down();
			await page.mouse.move(300, 300);
			await page.mouse.up();

			await page.click(drag);
		});

		await test.step('Eliminar', async () => {
			await page.click(remove);

			await page.mouse.move(300, 300);
			await page.mouse.click(300, 300);

			await page.click(remove);
		});
	});
});

test.describe('Editor', () => {
	const errors: string[] = [];

	test.beforeEach(async ({ page, baseURL }) => {
		errors.length = 0;

		await page.goto(`${baseURL}/entorno`);
		await page.waitForLoadState('networkidle');

		page.on('pageerror', (error) => {
			errors.push(error.message);
		});
	});

	test.afterEach(() => {
		expect(errors.length).toBe(0);
	});

	test('Subir GeoJSON', async ({ page }) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		await page
			.locator('input[type="file"]')
			.setInputFiles(path.join(__dirname, './input/data.geojson'));

		await page.locator('div[class="leaflet-control-layers leaflet-control"]').hover();
	});
});
