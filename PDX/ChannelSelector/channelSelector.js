const { Page } = require('puppeteer');
const { channelSelectors } = require('./selectors');

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

/**
 * This function will select the channel specified.
 * @param {Page} page The page.
 * @param {string} channel The channel to select.
 */
const changeChannel = async (page, channel) => {
  await page.evaluate(
    /**
     *
     * @param {channelSelectors} activeChannel The active channel selectors.
     * @param {string} pChannel The channel to click on
     */
    (elements, activeChannel, pChannel) => {
      const channelDiv = Array.from(
        document.querySelectorAll(activeChannel.activeChannel)
      );
      const channelToClick = channelDiv.map((channelSelector) => {
        const channelLogo = channelSelector.children[0];
        const channelImg = channelLogo.children[0];

        if (channelImg.src.includes(pChannel))
          return channelImg.parentElement.parentElement;
        else return;
      });

      channelToClick.forEach((element) => {
        if (element !== undefined) element.click();
      });
    },
    channelSelectors,
    channel
  );
};

/**
 * This function will either select the channel specified or navigate to the link to show all products for the Home Depot channel.
 * @param {Page} page The page.
 * @param {string} client The client to select.
 * @param {string} channel The channel to select. If the channel is Home Depot, then it will navigate to a new link.
 * Otherwise, it will select the channel specified.
 * @param {string} redirectLink The link to go to if on the client's page.
 */
const clickOnChannel = (page, client, channel, redirectLink) => {
  setTimeout(async () => {
    const companyName = await page.$eval(
      '.company',
      (company) => company.textContent
    );

    if (client === companyName && channel === 'TheHomeDepot') {
      console.log(
        `${client} === ${companyName} AND ${channel} === TheHomeDepot`
      );
      await page.goto(redirectLink);
    }
    // if (companyName === 'TheHomeDepot') await page.goto(redirectLink);
    else {
      console.log('changing channel');
      await changeChannel(page, channel);
    }
  }, 5000);
};

module.exports = { clickOnChannel };
