const Sequelize = require('sequelize');
const db = require('../db');

const productOrders = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  // price: {
  //   type: Sequelize.FLOAT,
  //   allowNull: false
  // }
});

module.exports = productOrders;
