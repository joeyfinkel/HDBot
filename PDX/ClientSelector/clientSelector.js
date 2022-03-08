const { Page } = require('puppeteer');
const { clientSelectors } = require('./selectors');
const { click } = require('../../helpers');
const { clickOnChannel } = require('../ChannelSelector/channelSelector');

/**
 *
 * @param {Page} page The page.
 * @returns {Promise<string[]>} List of all clients.
 */
const getClients = async (page) => {
  const { all } = clientSelectors;
  await page.waitForSelector(all.parent);

  return page.evaluate(
    /**
     *
     * @param {all} selector The HTML selector.
     * @returns Array of all the client's names.
     */
    (selector) =>
      Array.from(document.querySelectorAll(selector.child)).map(
        (client) => client.textContent
      ),
    all
  );
};

/**
 * Gets the client the page is on already.
 * @param {Page} page The page.
 * @param {string} selector The selector.
 * @returns {Promise<string>} The current active client.
 */
const getActiveClient = async (page, selector) => {
  await page.waitForSelector(selector);
  return page.$eval(selector, (selectedClient) => selectedClient.innerText);
};

/**
 *
 * @param {Page} page
 * @param {string[]} clients
 * @param {string} chosenClient
 * @param {(clientId: number) => string} selector
 */
const chooseClient = async (page, clients, chosenClient, selector) => {
  const clientId = clients.indexOf(chosenClient);
  await page.$$eval(selector(clientId), (group) => group[0].click());
};

const stayOnCurrentClient = async (page) => {
  await click(page, clientSelectors.buttons.actionButtons('cancel'));
};

/**
 * This function will click on the client specified.
 * @param {Page} page The page to perform the functions on.
 * @param {string} client The client to click on.
 */
const changeClient = async (page, client) => {
  const { buttons, switchAccount, selectClient } = clientSelectors;
  const clients = await getClients(page);

  console.log('Changing client...');

  await click(page, buttons?.icon, { wait: true, delay: 3000 });
  await click(page, buttons?.changeAccount, { wait: true });

  if (clients.includes(client)) {
    await chooseClient(page, clients, client, selectClient);
    await click(page, switchAccount);
  }
};

/**
 * Selects the client.
 * @param {Page} page The page to perform the functions on.
 * @param {string} client The client you want.
 */
const clickOnClient = (page, client) => {
  setTimeout(async () => {
    const isTheSame = await page.$eval(
      '.company',
      (company, clientName) =>
        company.textContent === clientName ? true : false,
      client
    );

    !isTheSame && (await changeClient(page, client));
  }, 5000);
};

module.exports = { clickOnClient };
