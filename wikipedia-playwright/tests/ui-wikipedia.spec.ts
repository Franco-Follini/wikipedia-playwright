import { test, expect } from '@playwright/test';

test.describe('Wikipedia UI', () => {
  test('Validación de carga del home', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    await expect(page).toHaveTitle("Wikipedia");
    await expect(page.getByText('years of the free encyclopedia')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unlock birthday surprises on' })).toBeVisible();
    await expect(page.locator('input[name="search"]')).toBeVisible();
  });

  test('Validación de navegación a Wikipedia en inglés', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    await page.getByRole('link', { name: 'English 7,141,000+ articles'  }).click();

    await expect(page).toHaveURL("https://en.wikipedia.org/wiki/Main_Page");
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('Validar búsqueda de Playwright (software)', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');

    await page.locator('select[name="language"]').selectOption('en');
    await page.locator('input[name="search"]').fill('Playwright (software)');
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL("https://en.wikipedia.org/wiki/Playwright_(software)");
    await expect(
      page.getByRole('heading', { name: "Playwright (software)" }).first()
    ).toBeVisible();
  });
});