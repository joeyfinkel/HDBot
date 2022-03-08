const selectors = {
  items: '.row',
  status: '.event-status',
  name: '.product-name.ng-star-inserted',
  upc: '.product-id',
  closeButton: 'button.close-button',
  listAllProducts: {
    parent: '.side-actions-container',
    child:
      '.side-actions-container > lp-channel-dashboard-sidebar-actions > a.ng-star-inserted',
    btnIdx: 0,
  },
};

module.exports = { itemRefresherSelectors: selectors };
