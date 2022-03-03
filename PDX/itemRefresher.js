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
const showAllProducts = async (page) => {
  await page.waitForSelector(listAllProducts.parent);
  await page.evaluate(
    /** @param {listAllProducts} selectors */
    (selectors) => {
      const sidebarButtons = Array.from(
        document.querySelectorAll(selectors.child)
      );

      console.log(sidebarButtons);

      sidebarButtons[0].textContent === 'List all products in channel'
        ? sidebarButtons[0].click()
        : sidebarButtons.length === 3 && sidebarButtons[0].click();
    },
    listAllProducts
  );
};

/**
 *
 * @param {puppeteer.Page} page
 * @returns
 */
const getProducts = async (page) => {
  await page.waitForSelector(itemRefresherSelectors.items.child);
  return page.$$eval(itemRefresherSelectors.items.child, (products) =>
    products.map((product) => product.firstChild)
  );
};

/**
 *
 * @param {puppeteer.Page} page
 */
const refreshItem = async (page) => {
  await page.waitForSelector(itemRefresherSelectors.items.child, {
    visible: true,
  });
  await page.evaluate(
    /** @param {itemRefresherSelectors} selectors */
    (selectors) => {
      const products = Array.from(
        document.querySelectorAll(selectors.items.child)
      );

      const toolbar = () => {
        const productContentSection = document.querySelector(
          'mat-sidenav-content'
        );

        return productContentSection.firstElementChild;
      };

      const getItemData = () => {
        const settingCard = document.querySelectorAll(
          'lp-settings-card.ng-star-inserted'
        )[0];
        // const matCard = settingCard.firstElementChild;
        // const matCardContent = matCard.children[1].firstElementChild;
        // const timeline = matCardContent.firstElementChild.firstElementChild;
        // const history = timeline.lastElementChild.firstElementChild;
        // const eventStatus = history.firstElementChild;
        // const status =
        //   eventStatus.firstElementChild.firstElementChild.lastElementChild;
        // const title = toolbar().childNodes[3].textContent;
        // const upc = toolbar().childNodes[6].textContent;

        // return [{ upc, title, status: status.textContent }];
        console.log(settingCard);
      };

      const closeView = () => {
        const closeButton = document.querySelector('button.close-button');
        closeButton && closeButton.click();
      };

      products[0].children[0].click();
      getItemData();
      closeView();

      // for (const product of products) {
      //   product.firstElementChild.click();
      //   console.log(getItemData());
      //   setTimeout(closeView, 5000);
      // }

      // products.forEach((product) => {
      //   product.firstElementChild.click();
      //   // console.log([{ name: getItemName() }]);
      //   setTimeout(closeView, 5000);
      // });
    },
    itemRefresherSelectors
  );
};

/**
 *
 * @param {puppeteer.Page} page
 */
const itemRefresher = async (page) => {
  console.log('working');
  await showAllProducts(page);
  await refreshItem(page);
};

module.exports = { itemRefresher, showAllProducts, refreshItem };
