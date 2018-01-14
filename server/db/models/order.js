const Sequelize = require('sequelize')
const db = require('../db')
const productOrders = require('./productOrders')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'created'
  },
  // subtotal: {
  //   type: Sequelize.FLOAT,
  //   allowNull: false
  // },
  // what does 'authenticated' mean?
  // authenticated: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false
  // }
  //may need to keep track of timestamp of status change
  // consider how to differentiate between cart vs ordwr
},{
  scopes: {
    populated: () => ({
      include: {
        all:true
      }
    })
  }
});

Order.scope('populated').beforeSave((orderInstance, options) => {
  console.log('what is this?????', orderInstance.id)
  // orderInstance.getProducts({
  //     where: {
  //      productId: orderInstance.orderProduct.productId
  //     }
  // })
  // .then(productDetails => console.log('deeets', productDetails, orderInstance.id))
})

module.exports = Order;
