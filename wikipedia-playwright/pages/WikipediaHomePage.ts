import { Page, Locator, expect } from '@playwright/test';

export class WikipediaHomePage {
  readonly page: Page;
  readonly subtitle: Locator;
  readonly birthdayButton: Locator;
  readonly searchInput: Locator;
  readonly languageSelect: Locator;
  readonly searchButton: Locator;
  readonly englishLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtitle = page.getByText('years of the free encyclopedia');
    this.birthdayButton = page.getByRole('button', { name: /Unlock birthday surprises on/i });
    this.searchInput = page.locator('input[name="search"]');
    this.languageSelect = page.locator('select[name="language"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.englishLink = page.getByRole('link', { name: /English/i }).first();
  }

  async goto() {
    await this.page.goto('https://www.wikipedia.org/');
  }

  async expectHomeLoaded() {
    await expect(this.page).toHaveTitle('Wikipedia');
    await expect(this.subtitle).toBeVisible();
    await expect(this.birthdayButton).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }

  async goToEnglishWikipedia() {
    await this.englishLink.click();
  }

  async searchInEnglish(term: string) {
    await this.languageSelect.selectOption('en');
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }
}