import { Page } from "@playwright/test";

export class FormHelper  {
  readonly page: Page;

  constructor (page: Page) {
    this.page = page;
  }

  async goTo (path: string) {
    await this.page.goto(path)
  }
}