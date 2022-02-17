const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://pdx.stibosystems.com/#/login?returnUrl=%2Fdashboard'
  );
  await page.type('ng-touched ng-dirty ng-valid', 'jfinkel@ecomdiversify.com');
  await page.click('._main next');

  await browser.close();
})();
