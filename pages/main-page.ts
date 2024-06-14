import { Locator, Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly categories: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categories = page.locator('#store_nav_area .tab .pulldown_desktop').filter({ hasText: 'Categories' });;
  }

  async selectCategoryInNavBar (name: string) {
    await this.categories.hover();

    await this.page.locator('//*[@id="store_nav_area"]/*//a[@class="popup_menu_item"]').getByText(`${name}`, { exact: true }).click();
  }
}