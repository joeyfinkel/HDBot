const puppeteer = require('puppeteer');
// const { changeURL } = require('../helpers');
const {
  links: { PDX },
} = require('../links');
const {
  channelSelectors: { channelsList, activeChannel },
} = require('./selectors');

// /**
//  * Gets a list of all the channel link from a client.
//  * @param {puppeteer.Page} page The page.
//  * @returns {Promise<string[]>} A list of all channels for the selected client.
//  */
// const getChannelLinks = async (page) => {
//   await page.waitForTimeout(1000);
//   await page.waitForSelector(parent);
//   return page.$$eval(child, (groups) => groups.map((group) => group.src));
// };

// /**
//  * Gets a list of all the channels from a client.
//  * @param {puppeteer.Page} page The page.
//  * @returns {Promise<string[]>} A list of all channels for the selected client.
//  */
// // const getChannels = async (page) => {
// //   await page.waitForTimeout(1000);
// //   await page.waitForSelector(parent);

// //   return page.$$eval(child, (groups) =>
// //     groups.map((group) => {
// //       const link = group.src;
// //       const endOfLink = link.substring(group.src.lastIndexOf('/') + 1);

// //       return endOfLink.split('.')[0];
// //     })
// //   );
// // };

// /**
//  * This function will select the channel specified.
//  * @param {puppeteer.Page} page The page.
//  * @param {string} channel The channel to select.
//  */
// // const changeChannel = async (page, channel) => {
// //   await page.evaluate(
// //     /**
// //      *
// //      * @param {activeChannel} active The active channel selectors.
// //      * @param {string} ch The channel to click on
// //      */
// //     (active, ch) => {
// //       const channelDiv = Array.from(document.querySelectorAll(active.child));

// //       const channelToClick = channelDiv.map((channelSelector) => {
// //         const channelLogo = channelSelector.children[0];
// //         const channelImg = channelLogo.children[0];

// //         if (channelImg.src.includes(ch))
// //           return channelImg.parentElement.parentElement;
// //         else return;
// //       });

// //       channelToClick.forEach((element) => {
// //         if (element !== undefined) element.click();
// //       });
// //     },
// //     activeChannel,
// //     channel
// //   );
// // };

// /**
//  * This function will either select the channel specified or navigate to the link to show all products for the Home Depot channel.
//  * @param {puppeteer.Page} page The page.
//  * @param {string} channel The channel to select. If the channel is Home Depot, then it will navigate to a new link.
//  * Otherwise, it will select the channel specified.
//  */
// // const clickOnChannel = async (page, channel) => {
// //   await page.waitForSelector(parent);

// //   if (channel === 'TheHomeDepot') await page.goto(links.PDX.homeDepot);
// //   else await changeChannel(page, channel);
// // };

// New functions here:

/**
 *
 * @param {string} child
 * @param {string} clientChanel
 */
const changeChannel = (child, clientChannel) => {
  const channelDiv = Array.from(document.querySelectorAll(child));

  const channelToClick = channelDiv.map((channelSelector) => {
    const channelLogo = channelSelector.children[0];
    const channelImg = channelLogo.children[0];

    if (channelImg.src.includes(clientChannel))
      return channelImg.parentElement.parentElement;
    else return;
  });

  channelToClick.forEach((element) => {
    if (element !== undefined) element.click();
  });
};

/**
 *
 * @param {string} child
 * @param {string} clientChanel
 */
const clickOnChannel = async (child, clientChannel, changeURL) => {
  if (clientChannel === 'TheHomeDepot') changeURL();
  else changeChannel(child, clientChannel);
};

module.exports = { clickOnChannel };
