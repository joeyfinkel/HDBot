require('dotenv').config();

const puppeteer = require('puppeteer');
const login = require('./functions');

const _selectors = {
  PDX: {
    login: {
      email: 'input[type=email]',
      password: 'input[type=password]',
      loginBtn: 'lp-processing-button',
    },
    clientsSelector: {
      changeClientIcon:
        '.action-group > lp-toolbar-feature-actions-menu > lp-toolbar-menu > button',
      changeAccount:
        '.cdk-overlay-container > .cdk-overlay-connected-position-bounding-box > #cdk-overlay-0 > .mat-menu-panel > .mat-menu-content > .mat-focus-indicator > lp-change-client > button',
      clientsName: '.mat-radio-label-content',
    },
  },
};

const getChannels = (link) =>
  link.substring(link.lastIndexOf('/') + 1).split('.')[0];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: [
      '--start-maximized', // you can also use '--start-fullscreen'
    ],
  });
  const page = await browser.newPage();
  const {
    clientsSelector: { changeClientIcon, changeAccount },
  } = _selectors.PDX;

  await page.goto(
    'https://pdx.stibosystems.com/#/login?returnUrl=%2Fdashboard'
  );

  // PDX Login
  login(page, _selectors.PDX.login, {
    email: process.env.PDX_EMAIL,
    password: process.env.PDX_PASSWORD,
  });

  // Selecting client
  const chosenClient = 'American Buyers Group';

  // 1. Click the first icon to change client
  await page.waitForSelector('.action-group');
  await page.$$eval(changeClientIcon, (group) => group[0].click());

  // 2. Click "change account"
  await page.waitForSelector('.cdk-overlay-container');
  await page.$$eval(changeAccount, (group) => group[0].click());

  // 3. Get list of clients
  await page.waitForSelector('.cdk-global-overlay-wrapper');
  const clients = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.mat-radio-label-content')).map(
      (client) => client.innerText
    )
  );
  const activeClient = await page.$eval(
    'mat-radio-button.active',
    (selectedClient) => selectedClient.innerText
  );

  if (activeClient !== chosenClient) {
    if (clients.includes(chosenClient)) {
      // 4. Select client
      const clientId = clients.indexOf(chosenClient);
      await page.$$eval(
        `#mat-radio-${clientId + 2} > label > .mat-radio-container`,
        (group) => group[0].click()
      );
    }

    // 5. Click switch account button
    await page.waitForSelector('.mat-button-wrapper');
    await page.$$eval('.mat-dialog-actions > button', (group) =>
      group[1].click()
    );

    // 6. Select active channel
    await page.waitForTimeout(1000);
    await page.waitForSelector('.channels-list');
    const links = await page.$$eval(
      '.channels-list > lp-dashboard-main-channel-list-item > div > img',
      (groups) =>
        groups.map((group) =>
          group.src.substring(group.src.lastIndexOf('/') + 1)
        )
    );
    console.log(links);
  } else {
    // 5. Click switch account button
    await page.waitForSelector('.mat-button-wrapper');
    await page.$$eval('.mat-dialog-actions > button', (group) =>
      group[0].click()
    );

    // 6. Select active channel
    await page.waitForTimeout(1000);
    await page.waitForSelector('.channels-list');
    const links = await page.$$eval(
      '.channels-list > lp-dashboard-main-channel-list-item > div > img',
      (groups) => groups.map((group) => getChannels(group.src))
    );
    console.log(links);
  }

  //   await browser.close();
})();
