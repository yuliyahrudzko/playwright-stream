import { Locator, Page } from "@playwright/test";

export class AgentPage {
  readonly page: Page;
  readonly ageYear: Locator;
  readonly ageMonth: Locator;
  readonly ageDay: Locator;
  readonly viewPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ageYear = page.locator('#ageYear');
    this.ageMonth = page.locator('#ageMonth');
    this.ageDay = page.locator('#ageDay');
    this.viewPageButton = page.locator('#view_product_page_btn');
  }

  async selectAgeYear (value: number) {
    await this.ageYear.selectOption(`${value}`);
  }

  async selectAgeMonth (value: string) {
    await this.ageMonth.selectOption(value);
  }

  async selectAgeDay (value: number) {
    await this.ageDay.selectOption(`${value}`);
  }

  async fillInAgentPage (day: number, month: string, year: number) {
    if (this.page.url() == '/agecheck/app/**') {
        await this.selectAgeDay(day);
    
        await this.selectAgeMonth(month);
    
        await this.selectAgeYear(year);
    
        await this.clickViewPageButton();
      }
  }

  async clickViewPageButton() {
    this.viewPageButton.click()
  }
}