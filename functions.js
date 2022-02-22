const puppeteer = require('puppeteer');

/**
 *
 * @param {puppeteer.Page} page
 * @param {{email: string, password: string, loginBtn: string}} selectors
 * @param {{email: string, password: string}} credentials
 */
const login = async (page, selectors, credentials) => {
  await page.type(selectors.email, credentials.email);
  await page.click(selectors.loginBtn);
  await page.waitForSelector(selectors.password);
  await page.type(selectors.password, credentials.password);
  await page.click(selectors.loginBtn);
};

module.exports = login;
