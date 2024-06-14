import { test, expect } from '@playwright/test';
import { FormHelper } from '../utils/form-helper';
import { MainPage } from '../pages/main-page';
import { ActionCategory } from '../pages/category-action-page';

test('Stream test', async ({ page }) => {
  const formHelper = new FormHelper(page);
  const mainPage = new MainPage(page);
  const actionCategory = new ActionCategory(page);

  await formHelper.goTo('/');

  await mainPage.selectCategoryInNavBar('Action');

  await expect(page).toHaveURL('/category/action/');

  await actionCategory.hoverShowMoreButton();

  await actionCategory.selectFilterForGames('New & Trending');
  
  await page.screenshot({ path: 'New & Trending page.png', fullPage: true });

  await actionCategory.hoverShowMoreGamesButton();

  let gameToSelect = await actionCategory.findGameToSelect();

  console.log(gameToSelect);

  await actionCategory.selectGame(gameToSelect);
});

