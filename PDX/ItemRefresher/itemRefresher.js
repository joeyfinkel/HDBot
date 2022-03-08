const { Page } = require('puppeteer');
const { itemRefresherSelectors } = require('./selectors');
const { click } = require('../../helpers');

/**
 * Clicks on 'list all products' button.
 * @param {Page} page
 */
const showAllProducts = (page) => {
  setTimeout(async () => {
    // await page.waitForSelector('lp-dashboard-category-list');
    await click(page, itemRefresherSelectors.listAllProducts, 5000);
  }, 3500);
};

/**
 *
 * @param {Page} page
 */
const refreshItem = async (page) => {
  const options = { timeout: 60_000 };

  await page.waitForSelector(itemRefresherSelectors.items, options);

  setTimeout(async () => {
    await page.evaluate(
      /** @param {itemRefresherSelectors} selectors */
      async (selectors) => {
        const { items, status, name, upc, closeButton } = selectors;
        const products = Array.from(document.querySelectorAll(items));
        const productsToClick = products.slice(1);

        /**
         * Gets information about a product.
         * @returns {Promise<[{status: string, name: string, upc: string}]>} An array of objects for each product with information about that product.
         */
        const getItemData = () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const statuses = Array.from(document.querySelectorAll(status));
              const itemStatus =
                statuses[0].firstChild.firstChild.lastChild.textContent;
              const itemName = document.querySelector(name).textContent;
              const itemUpc = document.querySelector(upc).textContent;

              resolve([
                { itemStatus, itemName, itemUpc: itemUpc.replace('ID:', '') },
              ]);
              reject([
                {
                  itemStatus: 'Not found',
                  itemName: 'Not found',
                  itemUpc: 'Not found',
                },
              ]);
            }, 2000);
          });

        const closeView = () => {
          const button = document.querySelector(closeButton);
          button && button.click();
        };

        productsToClick[0].click();
        console.log(await getItemData());
        // closeView();
      },
      itemRefresherSelectors
    );
  }, 5000);
};

module.exports = { showAllProducts, refreshItem };
