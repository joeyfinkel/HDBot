module.exports = {
  login: {
    email: 'input[type=email]',
    password: 'input[type=password]',
    loginBtn: 'lp-processing-button',
  },
  client: {
    activeClient: 'mat-radio-button.active',
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
    },
    allClients: {
      parent: '.cdk-global-overlay-wrapper',
      child: '.mat-radio-label-content',
    },
    switchAccount: {
      parent: '.mat-button-wrapper',
      child: '.mat-button-wrapper',
    },
    activeChannel: {
      parent: '.channels-list',
      child: '.channels-list > lp-dashboard-main-channel-list-item > div > img',
    },
    selectClient: (clientId) =>
      `#mat-radio-${clientId + 2} > label > .mat-radio-container`,
  },
};
