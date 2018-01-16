const router = require('express').Router();
const {Order, productOrders, Product} = require('../db/models');
const addToCart = require('../utils/addToCart');
const chalk = require('chalk');

router.get('/', (req, res, next) => {
  let whereObj = {where: {}};
  if(req.user) {
    whereObj.where = {
      userId: req.user.id,
      status: req.query.status
    };
  } else {
    whereObj.where = {
      id: req.session.orderId,
      status: req.query.status
    };
  }
  Order.scope('populated').find(whereObj)
    .then((order) => {
      res.json(order);
    })
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  Order.scope('populated').findById(req.params.orderId)
    .then((order) => {
      res.json(order);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  addToCart(req)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/', (req, res, next) => {
  addToCart(req)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.delete('/product/:id', (req, res, next) => {
  let whereObj = {where: {}};
  if(req.user) {
    whereObj.where = {
      userId: req.user.id,
      status: 'created'
    };
  } else {
    whereObj.where = {
      id: req.session.orderId,
      status: 'created'
    };
  }
  Order.find(whereObj)
  .then((order) => {
    console.log(chalk.red('order', order))
    productOrders.destroy({where: {productId: req.params.id, orderId: order.id}});
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch(next);
});

router.delete('/', (req, res, next) => {
    Product.destroy( {where: {id: req.body.id}})
        .then(() => res.status(202).send('Deleted'))
        .catch(next);
});

module.exports = router;
