const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'created'
  },
  // OB/AZ: this is redundant with order_product price, watch out for your data getting out of sync
  subtotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  // OB/AZ: is redundant with "whether or not his order has a user id", consider a virtual
  authenticated: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
  //may need to keep track of timestamp of status change
});

// OB/AZ: consider instance method for handling the logic around adding items to the cart, e.g. order.addLineItem, which would search for an existing order_product and increment it, or create one otherwise

module.exports = Order;
