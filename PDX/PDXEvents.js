const { Page } = require('puppeteer');

const { env } = require('process');
const {
  links: { PDX },
} = require('../links');

const { login } = require('../helpers');
const { clickOnClient } = require('./clientSelector');
const { clickOnChannel } = require('./channelSelector');
const { showAllProducts, refreshItem } = require('./itemRefresher');
const { selectors } = require('./selectors');

/**
 *
 * @param {Page} page
 */
const PDXEvents = async (page) => {
  const PDXCredentials = {
    email: env.PDX_EMAIL,
    password: env.PDX_PASSWORD,
  };
  const clientInformation = {
    name: 'American Buyers Group',
    channel: 'TheHomeDepot',
  };

  await login(page, PDX.login, selectors.loginSelectors, PDXCredentials);
  await page.exposeFunction('clickOnChannel', clickOnChannel);
  await page.exposeFunction('refreshItem', refreshItem);
  await page.evaluate(
    /**
     * @param {selectors} selectorObj
     * @param {clientInformation} clientInfo
     * @param {PDX} PDX
     */
    (selectorObj, clientInfo, PDX) => {
      const { channelSelectors, clientSelectors, itemRefresherSelectors } =
        selectorObj;
      const { channel: clientChannel, name: clientName } = clientInfo;

      //   const chooseClient = (clients) => {
      //     const clientId = clients.indexOf(clientName);
      //     const _clients = Array.from(
      //       document.querySelectorAll(clientSelectors.selector(clientId))
      //     );

      //     _clients[0].click();
      //   };

      //   const changeClient = () => {
      //     const { icon, changeAccount: changeAccountSelector } =
      //       clientSelectors.buttons;

      //     setTimeout(() => {
      //       document.querySelector(icon.child).click();
      //     }, 2000);

      //     setTimeout(() => {
      //       document.querySelector(changeAccountSelector.child).click();
      //     }, 1000);

      //     setTimeout(() => {
      //       // Get all clients
      //       const clients = Array.from(
      //         document.querySelectorAll(clientSelectors.name)
      //       );
      //       const clientsNames = clients.map((client) => client.innerText);

      //       if (clientsNames.includes(clientName)) {
      //         chooseClient(clients);
      //         document.querySelectorAll(clientSelectors.switchAccount)[1].click();
      //       }
      //     }, 1000);
      //   };

      const changeURL = () => {
        location.href = PDX.homeDepot;
      };

      setTimeout(async () => {
        const company = document.querySelector('.company');
        const { child } = channelSelectors.activeChannel;

        if (company.textContent === clientName) {
          await clickOnChannel(child, clientChannel, changeURL());
          console.log('after redirect');
          console.log(await refreshItem(itemRefresherSelectors.items));
        } else {
          // changeClient();
          // clickOnChannel(channelSelectors.activeChannel.child, clientChannel);
        }
      }, 2000);
    },
    selectors,
    clientInformation,
    PDX
  );
  //   await clickOnClient(page, client);
  //   await clickOnChannel(page, channel);
  //   await showAllProducts(page, channel);
  //   await refreshItem(page);
};

module.exports = { PDXEvents };
