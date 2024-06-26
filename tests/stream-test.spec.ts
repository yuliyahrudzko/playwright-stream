import { test, expect } from '@playwright/test';
import { FormHelper } from '../utils/form-helper';
import { MainPage } from '../pages/main-page';
import { ActionCategory } from '../pages/category-action-page';
import { InstallGamePage } from '../pages/install-game-page';
import { AgentPage } from '../pages/agent-check-page';

test.only('Stream test', async ({ page, context, browser }) => {
  const formHelper = new FormHelper(page);
  const mainPage = new MainPage(page);
  const actionCategory = new ActionCategory(page);
  const installGame = new InstallGamePage(page);
  const agentCheck = new AgentPage(page);

  await test.step('Select game category', async () => {
    await formHelper.goTo('/');

    await mainPage.selectCategoryInNavBar('Action');
  
    await expect(page).toHaveURL('/category/action/');
  })

  await test.step('Select game with Max Discount or Max Price', async () => {
    expect(actionCategory.showMoreButton).toBeVisible();

    await actionCategory.hoverShowMoreButton();
  
    await actionCategory.selectFilterForGames('New & Trending');
  
    await actionCategory.hoverShowMoreGamesButton();

    await formHelper.makeScreenshot('New & Trending page.png', true)
  
    let gameWithMaxDiscount = await actionCategory.findGameWithMaxDiscount();

    console.log(gameWithMaxDiscount);

    if (gameWithMaxDiscount === null) {
      let gameWithMaxPrice = await actionCategory.findGameWithMaxPrice();
  
      await actionCategory.selectGameWithMaxPrice(gameWithMaxPrice);

      console.log(`Max Price = ${gameWithMaxPrice}`);
      
    } else {
      await actionCategory.selectGamewithMaxDiscount(gameWithMaxDiscount);

      console.log(`Max Discount = ${gameWithMaxDiscount}`);
    } 
  })

  await test.step('Download Install Stream file', async () => {
    await formHelper.handleNewPage();

    await formHelper.clickInstallStreamButton();
  
    await agentCheck.fillInAgentPage(21, 'March', 2000);
  
    await page.waitForURL('https://store.steampowered.com/about/');
    
    await installGame.clickInstallStreamButton(); 
  })
});
