require('dotenv').config();

const puppeteer = require('puppeteer');
const clickOnClient = require('./PDX/clientSelector');
const { login } = require('./helpers');
const { loginSelectors } = require('./PDX/selectors');
const { clickOnChannel } = require('./PDX/channelSelector');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 5,
    args: [
      '--start-maximized', // you can also use '--start-fullscreen'
    ],
  });
  const page = await browser.newPage();
  const client = 'American Buyers Group';
  const channel = 'TheHomeDepot';

  await page.goto(
    'https://pdx.stibosystems.com/#/login?returnUrl=%2Fdashboard'
  );

  // PDX Actions
  login(page, loginSelectors, {
    email: process.env.PDX_EMAIL,
    password: process.env.PDX_PASSWORD,
  });
  clickOnClient(page, client);
  clickOnChannel(page, channel);
  // Get channel categories
  // Click on channel categories
  // Option: Refresh products, get UPC/OMSID, get export

  //   await browser.close();
})();
