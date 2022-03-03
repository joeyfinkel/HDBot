const puppeteer = require('puppeteer');

/**
 * Creates an array of elements from `document.querySelectorAll()`.
 * @param {string} selector The selector for the element to get.
 * @returns Array of the specified selector.
 */
const getArrayOfElements = (selector) =>
  Array.from(document.querySelectorAll(selector));

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

/**
 * Clicks a button on the page.
 * @param {puppeteer.Page} page The page to perform clicks on.
 * @param {{parent: string, child: string, btnIdx?: number}} selector The selectors to look for.
 */
const click = async (page, selector) => {
  await page.waitForSelector(selector.parent);
  await page.evaluate((_selector) => {
    const { child, btnIdx } = _selector;
    const elements = Array.from(document.querySelectorAll(child));

    elements.map((element) => {
      elements.length === 1 ? element.click() : elements[btnIdx].click();
    });
  }, selector);
  await page.waitForTimeout(500);
};

module.exports = { login, click, getArrayOfElements };
