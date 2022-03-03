const puppeteer = require('puppeteer');
const { clientSelectors } = require('./selectors');
const { click } = require('../helpers');
const { getChannels, clickOnChannel } = require('./channelSelector');

/**
 *
 * @param {puppeteer.Page} page The page.
 * @param {{parent: string, child: string}} selector The HTML selectors.
 * @returns {Promise<string[]>} List of all clients.
 */
const getClients = async (page, selector) => {
  await page.waitForSelector(selector.parent);

  return page.evaluate(
    (_selector) =>
      Array.from(document.querySelectorAll(_selector.child)).map(
        (client) => client.innerText
      ),
    selector
  );
};

/**
 * Gets the client the page is on already.
 * @param {puppeteer.Page} page The page.
 * @param {string} selector The selector.
 * @returns {Promise<string>} The current active client.
 */
const getActiveClient = async (page, selector) => {
  await page.waitForSelector(selector);
  return page.$eval(selector, (selectedClient) => selectedClient.innerText);
};

/**
 *
 * @param {puppeteer.Page} page
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

const changeClient = async (page, client) => {
  const { all, selectClient, switchAccount } = clientSelectors;
  const clients = await getClients(page, all);

  if (clients.includes(client)) {
    await chooseClient(page, clients, client, selectClient);
    await click(page, switchAccount);
  }
};

/**
 * Selects the client.
 * @param {puppeteer.Page} page The page to perform the functions on.
 * @param {string} client The client you want.
 */
const clickOnClient = async (page, client) => {
  const {
    active: activeClientSelector,
    buttons: { icon, changeAccount },
  } = clientSelectors;
  let currentSelectedClient = '';

  await click(page, icon);
  await click(page, changeAccount);

  currentSelectedClient = await getActiveClient(page, activeClientSelector);
  currentSelectedClient === client
    ? stayOnCurrentClient(page)
    : changeClient(page, client);
};

module.exports = clickOnClient;
