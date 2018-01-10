const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'created'
  },
  subtotal: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  authenticated: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
  //may need to keep track of timestamp of status change
});

module.exports = Order;
