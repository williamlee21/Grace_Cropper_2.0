const Sequelize = require('sequelize');
const db = require('../db');

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = ProductOrder;
