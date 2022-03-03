const puppeteer = require('puppeteer');
const { channelSelectors } = require('./selectors');
const { click } = require('../helpers');

const {
  channelsList: { parent, child },
  activeChannel,
} = channelSelectors;

/**
 * Gets a list of all the channel link from a client.
 * @param {puppeteer.Page} page The page.
 * @returns {Promise<string[]>} A list of all channels for the selected client.
 */
const getChannelLinks = async (page) => {
  await page.waitForTimeout(1000);
  await page.waitForSelector(parent);
  return page.$$eval(child, (groups) => groups.map((group) => group.src));
};

/**
 * Gets a list of all the channels from a client.
 * @param {puppeteer.Page} page The page.
 * @returns {Promise<string[]>} A list of all channels for the selected client.
 */
const getChannels = async (page) => {
  await page.waitForTimeout(1000);
  await page.waitForSelector(parent);
  return page.$$eval(child, (groups) =>
    groups.map((group) => {
      const link = group.src;
      const endOfLink = link.substring(group.src.lastIndexOf('/') + 1);

      return endOfLink.split('.')[0];
    })
  );
};

const clickOnChannel = async (page, channel) => {
  await page.waitForSelector(parent);
  await page.evaluate(
    (active, ch) => {
      const channelDiv = Array.from(document.querySelectorAll(active.child));

      const channelToClick = channelDiv.map((channelSelector) => {
        const channelLogo = channelSelector.children[0];
        const channelImg = channelLogo.children[0];

        if (channelImg.src.includes(ch))
          return channelImg.parentElement.parentElement;
        else return;
      });

      channelToClick.forEach((element) => {
        if (element !== undefined) element.click();
      });
    },
    activeChannel,
    channel
  );
};

module.exports = { getChannels, clickOnChannel };
