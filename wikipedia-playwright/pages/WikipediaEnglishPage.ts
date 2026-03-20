import { Page, Locator, expect } from '@playwright/test';

export class WikipediaEnglishPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly welcomeHeading: Locator;
  readonly firstHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('#pt-login-2').getByRole('link', { name: 'Log in' });
    this.welcomeHeading = page.locator('#Welcome_to_Wikipedia');
    this.firstHeading = page.locator('#firstHeading');
  }

  async expectMainPageLoaded() {
    await expect(this.page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
    await expect(this.loginLink).toBeVisible();
    await expect(this.welcomeHeading).toBeVisible();
  }

  async expectSearchResultVisible() {
    await expect(this.firstHeading).toBeVisible();
  }

  async expectArticleUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectHeadingText(text: string) {
    await expect(this.firstHeading).toContainText(text);
  }
}