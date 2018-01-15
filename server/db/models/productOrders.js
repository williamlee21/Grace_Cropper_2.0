const Sequelize = require('sequelize');
const db = require('../db');

const productOrders = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  // Sandy - I am assuming that this will hold the `final price` of the product when order is placed
  // e.g if User bought 2 avocados, we will just record the price of Avocado sold at the time. and the math will happen in the front end
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  scopes: {
    populated: () => ({
      include: {
        all:true
      }
    })
  }
});


module.exports = productOrders;
