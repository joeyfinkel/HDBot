const loginSelectors = {
  email: 'input[type=email]',
  password: 'input[type=password]',
  loginBtn: 'lp-processing-button',
};

const clientSelectors = {
  active: 'mat-radio-button.active',
  buttons: {
    icon: {
      parent: '.action-group',
      child:
        '.action-group > lp-toolbar-feature-actions-menu > lp-toolbar-menu > button',
    },
    changeAccount: {
      parent: '.cdk-overlay-container',
      child:
        '.cdk-overlay-container > .cdk-overlay-connected-position-bounding-box > #cdk-overlay-0 > .mat-menu-panel > .mat-menu-content > .mat-focus-indicator > lp-change-client > button',
    },
    /**
     * Creates an object for the button specified.
     * @param {'cancel' | 'switch' } button The button to click.
     * @returns An object with  information about the button.
     */
    actionButtons: (button) => {
      return {
        button,
        parent: 'mat-dialog-actions',
        child: 'mat-dialog-actions > button',
        btnIdx: button === 'cancel' ? 0 : 1,
      };
    },
  },
  all: {
    parent: '.cdk-global-overlay-wrapper',
    child: '.mat-radio-label-content',
  },
  switchAccount: {
    parent: 'mat-dialog-actions',
    child: 'mat-dialog-actions > button',
    btnIdx: 1,
  },
  /**
   *
   * @param {number} clientId Id of the client.
   * @returns The HTML selector of the specific client.
   */
  selectClient: (clientId) =>
    `#mat-radio-${clientId + 2} > label > .mat-radio-container`,
};

const channelSelectors = {
  channelsList: {
    parent: '.channels-list',
    child: '.channels-list > lp-dashboard-main-channel-list-item > div > img',
  },
  activeChannel: {
    parent: '.channels-list',
    child: '.channels-list > lp-dashboard-main-channel-list-item',
  },
  listAllProducts: {
    parent: '.side-actions-container',
    child:
      '.side-actions-container > lp-channel-dashboard-sidebar-actions > a.ng-star-inserted',
    btnIdx: 0,
  },
};

const itemRefresherSelectors = {
  items:
    '.list-container > cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > lp-product-list-view-item',
  closeButton:
    'mat-sidenav-content > lp-product-details-name-toolbar > mat-toolbar',
};

const selectors = {
  loginSelectors: {
    email: 'input[type=email]',
    password: 'input[type=password]',
    loginBtn: 'lp-processing-button',
  },
  clientSelectors: {
    active: 'mat-radio-button.active',
    names: '.mat-radio-label-content',
    buttons: {
      icon: {
        parent: '.action-group',
        child:
          '.action-group > lp-toolbar-feature-actions-menu > lp-toolbar-menu > button',
      },
      changeAccount: {
        parent: '.cdk-overlay-container',
        child:
          '.cdk-overlay-container > .cdk-overlay-connected-position-bounding-box > #cdk-overlay-0 > .mat-menu-panel > .mat-menu-content > .mat-focus-indicator > lp-change-client > button',
      },
      /**
       * Creates an object for the button specified.
       * @param {'cancel' | 'switch' } button The button to click.
       * @returns An object with  information about the button.
       */
      actionButtons: (button) => {
        return {
          button,
          parent: 'mat-dialog-actions',
          child: 'mat-dialog-actions > button',
          btnIdx: button === 'cancel' ? 0 : 1,
        };
      },
    },
    all: {
      parent: '.cdk-global-overlay-wrapper',
      child: '.mat-radio-label-content',
    },
    switchAccount: {
      parent: 'mat-dialog-actions',
      child: 'mat-dialog-actions > button',
      btnIdx: 1,
    },
    selectClient: (clientId) =>
      `#mat-radio-${clientId + 2} > label > .mat-radio-container`,
  },
  channelSelectors: {
    channelsList: {
      parent: '.channels-list',
      child: '.channels-list > lp-dashboard-main-channel-list-item > div > img',
    },
    activeChannel: {
      parent: '.channels-list',
      child: '.channels-list > lp-dashboard-main-channel-list-item',
    },
    listAllProducts: {
      parent: '.side-actions-container',
      child:
        '.side-actions-container > lp-channel-dashboard-sidebar-actions > a.ng-star-inserted',
      btnIdx: 0,
    },
  },
  itemRefresherSelectors: {
    items:
      '.list-container > cdk-virtual-scroll-viewport > .cdk-virtual-scroll-content-wrapper > lp-product-list-view-item',
    closeButton:
      'mat-sidenav-content > lp-product-details-name-toolbar > mat-toolbar',
  },
};

module.exports = {
  selectors,
  loginSelectors,
  clientSelectors,
  channelSelectors,
  itemRefresherSelectors,
};
