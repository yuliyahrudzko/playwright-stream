import { Locator, Page } from "@playwright/test";

export class InstallGamePage {
  readonly page: Page;
  readonly installStreamButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.installStreamButton = page.locator('.about_install_steam_link').first();
  }

  async clickInstallStreamButton() {
    // Start waiting for download before clicking
    const downloadPromise = this.page.waitForEvent('download');
    await this.installStreamButton.click();
    
    const download = await downloadPromise;
    
    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs(Date.now() + ' ' + download.suggestedFilename());
  }
}