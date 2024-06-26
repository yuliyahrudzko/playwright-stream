import { Locator, Page } from "@playwright/test";

export class ActionCategory {
  readonly page: Page;
  readonly discount: Locator;
  readonly showMoreButton: Locator;
  readonly showMoreGamesButton: Locator;
  readonly gamePrice: Locator;
  readonly gameTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.discount = page.locator('#SaleSection_13268 ._2fpFvkG2gjtlAHB3ZxS-_7');
    this.showMoreButton = page.locator('.ShowContentsButton');
    this.showMoreGamesButton = page.locator('._3d9cKhzXJMPBYzFkB_IaRp');
    this.gamePrice = page.locator('.hWbTIbfDv_T6qCKW7NQHG .Wh0L8EnwsPV_8VAu8TOYr');
    this.gameTitle = page.locator('._1F4bcsKc9FjeWQ2TX8CWDe a');

  }
  
  async selectFilterForGames(name: string) {
    await this.page.locator('//*[@id="SaleSection_13268"]//*[contains(@class, "Dhg57Pg1m91mAChUNE5_V")]').getByText(`${name}`).click();
  }

  async findGameWithMaxDiscount() {
    let gamesWithDiscount = await this.getNumberOfGamesWithDiscount();
    let array: any[] = [];
    let item;
  
    if (gamesWithDiscount > 0) {
        for (let i = 0; i < gamesWithDiscount; i++) {
            item = await this.discount.nth(i).textContent();
        
            array.push(parseInt(item));
        }
    }
    return (array.length === 0) ? null : array.sort((a, b) => a - b)[0];
  }

  async findGameWithMaxPrice() {
    let numberOfGames = await this.getNubmerOfGames();
    let array: any[] = [];
    let item;

    for (let i = 0; i < numberOfGames; i++) {
        item  = await this.gamePrice.nth(i).textContent();

        item = parseFloat(item.slice(1, item.length + 1));

        isFinite(item) ? array.push(item) : array;
    }
    return array.sort((a, b) => b - a)[0];
  }

  async getNumberOfGamesWithDiscount() {
    return await this.discount.count();
  }

  async getNubmerOfGames() {
    return await this.gamePrice.count();
  }

  async selectGamewithMaxDiscount(value) {
    let gamesWithDiscount = await this.getNumberOfGamesWithDiscount();

    for (let i = 0; i < gamesWithDiscount; i++) {
      if (await this.discount.nth(i).textContent() == value) this.gameTitle.nth(i).click();
    }
  }

  async selectGameWithMaxPrice(value) {
    let numberOfGames = await this.getNubmerOfGames()

    for (let i = 0; i < numberOfGames; i++) {
      if (await this.gamePrice.nth(i).textContent() == value) this.gameTitle.nth(i).click();
    }
  }

  async hoverShowMoreButton() {
    await this.showMoreButton.hover();
  }

  async hoverShowMoreGamesButton() {
    await this.showMoreGamesButton.hover();
  }
}