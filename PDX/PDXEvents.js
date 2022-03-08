const { Page } = require('puppeteer');

const { loginSelectors } = require('./Helpers/Login/selectors');
const { links } = require('./Helpers/links');
const { credentials } = require('./Helpers/Login/credentials');

const { login } = require('../helpers');
const { clickOnClient } = require('./ClientSelector/clientSelector');
const { clickOnChannel } = require('./ChannelSelector/channelSelector');
const {
  showAllProducts,
  refreshItem,
} = require('./ItemRefresher/itemRefresher');

/**
 *
 * @param {Page} page
 */
const PDXEvents = async (page) => {
  const clientName = 'American Buyers Group';
  const clientChannel = 'TheHomeDepot';
  const { login: loginLink, homeDepot } = links;

  await login(page, loginLink, loginSelectors, credentials);

  clickOnClient(page, clientName);
  clickOnChannel(page, clientName, clientChannel, homeDepot);
  showAllProducts(page);

  await refreshItem(page);
};

module.exports = { PDXEvents };
