const Sequelize = require('sequelize');
const db = require('../db');

const productOrders = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  //OB/AZ - Get rid of dead code
  // price: {
  //   type: Sequelize.FLOAT,
  //   allowNull: false
  // }
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
