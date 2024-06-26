import { Locator, Page } from "@playwright/test";

export class FormHelper  {
  readonly page: Page;
  readonly installStreamButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.installStreamButton = page.locator('.header_installsteam_btn_content');
  }

  async goTo (path: string) {
    await this.page.goto(path)
  }

  async clickInstallStreamButton() {
    await this.installStreamButton.click();
  }

  async makeScreenshot(name: string, answer: boolean){
    await this.page.screenshot( { path: name , fullPage: answer });
  }

  async handleNewPage()  {
    this.page.context().on('page', async page => {
      await page.waitForLoadState();
    });
  }
}