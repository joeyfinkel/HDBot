const puppeteer = require('puppeteer');

const clientSelector = async (chosenClient, page, selectors) => {
  const _chosenClient = chosenClient;

  const clickChangeClientIcon = async () => {
    await page.waitForSelector(selectors.changeIconParent);
    await page.$$eval(selectors.changeClientIcon, (group) => group[0].click());
  };
};
