import { test } from '@playwright/test';
import { WikipediaHomePage } from '../pages/WikipediaHomePage';
import { WikipediaEnglishPage } from '../pages/WikipediaEnglishPage';

test.describe('Wikipedia UI', () => {
  test('Validación de carga del home', async ({ page }) => {
    const wikipediaHome = new WikipediaHomePage(page);

    await wikipediaHome.goto();
    await wikipediaHome.expectHomeLoaded();
  });

  test('Validación de navegación a Wikipedia en inglés', async ({ page }) => {
    const wikipediaHome = new WikipediaHomePage(page);
    const wikipediaEnglish = new WikipediaEnglishPage(page);

    await wikipediaHome.goto();
    await wikipediaHome.goToEnglishWikipedia();

    await wikipediaEnglish.expectMainPageLoaded();
  });

  test('Validar búsqueda de Playwright (software)', async ({ page }) => {
    const wikipediaHome = new WikipediaHomePage(page);
    const wikipediaEnglish = new WikipediaEnglishPage(page);

    await wikipediaHome.goto();
    await wikipediaHome.searchInEnglish('Playwright (software)');

    await wikipediaEnglish.expectArticleUrl('https://en.wikipedia.org/wiki/Playwright_(software)');
    await wikipediaEnglish.expectHeadingText('Playwright (software)');
  });

  const busquedas = [
    'Playwright (software)',
    'Selenium (software)',
    'TypeScript'
  ];

  busquedas.forEach((termino) => {
    test(`Buscar ${termino} en Wikipedia`, async ({ page }) => {
      const wikipediaHome = new WikipediaHomePage(page);
      const wikipediaEnglish = new WikipediaEnglishPage(page);

      await test.step('Abrir Wikipedia', async () => {
        await wikipediaHome.goto();
      });

      await test.step('Búsqueda', async () => {
        await wikipediaHome.searchInEnglish(termino);
      });

      await test.step('Validar resultado', async () => {
        await wikipediaEnglish.expectSearchResultVisible();
      });
    });
  });
});