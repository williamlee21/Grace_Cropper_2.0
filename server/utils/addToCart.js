const {Order, productOrders} = require('../db/models');

const addToCart = (req) => {
  return Order.findOrCreate({where: {id: req.session.orderId}})
    .spread((order, isCreated) => {
      if(req.user && isCreated) {
        order.setUser(req.user);
      }
      return [order, isCreated];
    })
    .spread((order, isCreated) => {
      req.session.orderId = order.id;
      return productOrders.findOrCreate({where: {orderId: order.id, productId: req.body.productId}});
    })
    .then((prodOrd) => {
      return productOrders.update({quantity: req.body.quantity, price: req.body.price}, {where: {orderId: prodOrd[0].orderId, productId: prodOrd[0].productId}});
    });
};

module.exports = addToCart;

