require('dotenv').config();

const puppeteer = require('puppeteer');
const { loginSelectors } = require('./PDX/selectors');
const clickOnClient = require('./PDX/clientSelector');
const { login } = require('./helpers');
const { clickOnChannel } = require('./PDX/channelSelector');
const { refreshItem, showAllProducts } = require('./PDX/itemRefresher');

(async () => {
  const browser = await puppeteer.launch({
    devtools: true,
    headless: false,
    slowMo: 20,
    defaultViewport: { width: 1530, height: 830 },
    args: ['--start-maximized'],
  });
  const page = await browser.newPage();
  const client = 'American Buyers Group';
  const channel = 'TheHomeDepot';
  const PDXCredentials = {
    email: process.env.PDX_EMAIL,
    password: process.env.PDX_PASSWORD,
  };

  await page.goto(
    'https://pdx.stibosystems.com/#/login?returnUrl=%2Fdashboard'
  );

  // PDX Actions
  await login(page, loginSelectors, PDXCredentials);
  await clickOnClient(page, client);
  await clickOnChannel(page, channel);

  await showAllProducts(page);
  await refreshItem(page);
  // await itemRefresher(page);
  // Get channel categories
  // Click on channel categories
  // Option: Refresh products, get UPC/OMSID, get export

  //   await browser.close();
})();
