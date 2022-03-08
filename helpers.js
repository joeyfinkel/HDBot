const puppeteer = require('puppeteer');

/**
 * Logs into a page.
 * @param {puppeteer.Page} page
 * @param {string} loginLink The link of the page to log into.
 * @param {{email: string, password: string, loginBtn: string}} selectors
 * @param {{email: string, password: string}} credentials
 */
const login = async (page, loginLink, selectors, credentials) => {
  await page.goto(loginLink, { waitUntil: 'networkidle2' });
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
 * @param delay The number of milliseconds to wait before the click.
 */
const click = async (
  page,
  selector,
  options = { delay: 1000, wait: false }
) => {
  const { delay } = options;
  await page.waitForSelector(selector.parent);
  await page.waitForTimeout(delay);
  await page.evaluate(
    /**
     * @param {selector} _selector The HTML selectors
     */
    (_selector) => {
      const { child, btnIdx } = _selector;
      const elements = Array.from(document.querySelectorAll(child));

      elements.map((element) => {
        elements.length === 1 ? element.click() : elements[btnIdx].click();
      });
    },
    selector
  );
  await page.waitForTimeout(delay / 2);
};

module.exports = { login, click };
