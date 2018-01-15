const Sequelize = require('sequelize')
const db = require('../db')
const productOrders = require('./productOrders')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'created'
  },
  // Sandy: not sure what 'subtotal' refers to here
  // subtotal: {
  //   type: Sequelize.FLOAT,
  //   allowNull: false
  // },
  // Sandy: what does 'authenticated' mean?
  // authenticated: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false
  // }
  //may need to keep track of timestamp of status change
  //Sandy - consider how to differentiate between cart vs order => wasSold: boolean?
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
