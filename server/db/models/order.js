const Sequelize = require('sequelize');
const db = require('../db');
const productOrders = require('./productOrders');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'created'
  }
},{
  scopes: {
    populated: () => ({
      include: {
        all:true
      }
    })
  }
});


module.exports = Order;
