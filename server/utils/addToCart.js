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
        if (isCreated) {
            req.session.orderId = order.id;
            return productOrders.create({quantity: req.body.quantity, price: req.body.price, orderId: order.id, productId: req.body.productId});
        } else {
            return productOrders.update({quantity: req.body.quantity, price: req.body.price}, {where: {orderId: order.id, productId: req.body.productId}});
        }
    });
};

module.exports = addToCart;

