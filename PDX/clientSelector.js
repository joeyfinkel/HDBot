const puppeteer = require('puppeteer');
const selectors = require('./selectors');

const click = async (page, { parent, child }, btnIdx) => {
  console.log(parent, child);
  await page.waitForSelector(parent);
  await page.$$eval(child, (group) => group[btnIdx].click());
};

const allClients = async (page, { parent, child }) => {
  await page.waitForSelector(parent);
  return await page.evaluate(() =>
    Array.from(document.querySelectorAll(child)).map(
      (client) => client.innerText
    )
  );
};

const activeClient = async (page, selector) => {
  await page.waitForSelector(selector);
  return page.$eval(selector, (selectedClient) => selectedClient.innerText);
};

const selectClient = async (page, chosenClient, selector) => {
  const clientId = clients.indexOf(chosenClient);
  await page.$$eval(selector.client(clientId), (group) => group[0].click());
};

const selectActiveChannel = async (page, { parent, child }) => {
  await page.waitForTimeout(1000);
  await page.waitForSelector(parent);
  return await page.$$eval(child, (groups) =>
    groups.map((group) => group.src.substring(group.src.lastIndexOf('/') + 1))
  );
};

/**
 *
 * @param {string} chosenClient
 * @param {puppeteer.Page} page
 */
const clientSelector = async (chosenClient, page) => {
  const {
    activeClient: activeClientSelector,
    allClients: allClientsSelector,
    activeChannel,
    switchAccount,
    buttons: { icon, changeAccount },
    selectClient: _client,
  } = selectors.client;
  const _activeClient = await activeClient(page, activeClientSelector);

  await click(page, icon, 0);
  await click(page, changeAccount, 0);

  if (_activeClient !== chosenClient) {
    const clients = await allClients(page, allClientsSelector);

    if (clients.includes(chosenClient)) {
      await selectClient(page, chosenClient, _client);
      await click(page, switchAccount, 1);
      await selectActiveChannel(page, activeChannel);
    } else {
      await click(page, switchAccount, 1);
      await selectActiveChannel(page, activeChannel);
    }
  }
};

module.exports = clientSelector;
