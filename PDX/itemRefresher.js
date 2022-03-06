const {
  channelSelectors: { listAllProducts },
  itemRefresherSelectors,
} = require('./selectors');
const { click, getArrayOfElements } = require('../helpers');
const puppeteer = require('puppeteer');

/**
 *
 * @param {puppeteer.Page} page
 */
const showAllProducts = async (page, channel) => {
  if (channel !== 'TheHomeDepot') {
    await page.waitForSelector('lp-dashboard-category-list');
    await page.$$eval(
      listAllProducts.child,
      (buttons) =>
        buttons.length === 2 &&
        buttons.map((button) => console.log(button.href))
    );
    await click(page, listAllProducts, 3000);
  }
};

/**
 *
 * @param {puppeteer.Page} page
 * @returns
 */
const getProducts = async (page) => {
  await page.waitForSelector(items);

  return page.$$eval(items, (products) =>
    products.map((product) => product.firstChild)
  );
};

// /**
//  *
//  * @param {puppeteer.Page} page
//  */
// const refreshItem = async (page) => {
//   await page.waitForSelector(items, {
//     visible: true,
//   });
//   await page.evaluate(
//     /** @param {items} item */
//     async (item) => {
//       const products = Array.from(document.querySelectorAll(item));

//       /**
//        * Gets information about a product.
//        * @returns {Promise<[{status: string, name: string, upc: string}]>} An array of objects for each product with information about that product.
//        */
//       const getItemData = () =>
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             const statuses = Array.from(
//               document.querySelectorAll('.event-status')
//             );
//             const status =
//               statuses[0].firstChild.firstChild.lastChild.textContent;
//             const name = document.querySelector(
//               '.product-name.ng-star-inserted'
//             ).textContent;
//             const upc = document.querySelector('.product-id').textContent;

//             resolve([{ status, name, upc: upc.replace('ID:', '') }]);
//             reject([
//               { status: 'Not found', name: 'Not found', upc: 'Not found' },
//             ]);
//           }, 2000);
//         });

//       const closeView = () => {
//         const closeButton = document.querySelector('button.close-button');
//         closeButton && closeButton.click();
//       };

//       products[0].children[0].click();
//       const data = await getItemData();
//       console.log(data);
//       closeView();
//     },
//     items
//   );
// };

const refreshItem = async (items) => {
  const products = Array.from(document.querySelectorAll(items));
  console.log('Item refresher');
  /**
   * Gets information about a product.
   * @returns {Promise<[{status: string, name: string, upc: string}]>} An array of objects for each product with information about that product.
   */
  const getItemData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const statuses = Array.from(document.querySelectorAll('.event-status'));
        const status = statuses[0].firstChild.firstChild.lastChild.textContent;
        const name = document.querySelector(
          '.product-name.ng-star-inserted'
        ).textContent;
        const upc = document.querySelector('.product-id').textContent;

        resolve([{ status, name, upc: upc.replace('ID:', '') }]);
        reject([{ status: 'Not found', name: 'Not found', upc: 'Not found' }]);
      }, 2000);
    });

  const closeView = () => {
    const closeButton = document.querySelector('button.close-button');
    closeButton && closeButton.click();
  };

  products[0].children[0].click();
  const data = await getItemData();
  console.log(data);
  closeView();
};

module.exports = { showAllProducts, refreshItem };
