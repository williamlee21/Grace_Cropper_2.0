const router = require('express').Router();
const {Order, productOrders} = require('../db/models');
const addToCart = require('../utils/addToCart');

// router.get('/', (req, res, next) => {
// })

// router.get('/:orderId', (req, res, next) => {
//   Product.findById(req.params.productId)
//       .then(product => res.json(product))
//       .catch(next)
// })

router.post('/', (req, res, next) => {
  addToCart(req)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/', (req, res, next) => {
    Product.update(req.body, {
        where: {id: req.body.id},
        returning: true,
        plain: true
    })
    .spread((rows, product) => res.json(product))
    .catch(next);
});

router.delete('/', (req, res, next) => {
    Product.destroy( {where: {id: req.body.id}})
        .then(() => res.status(202).send('Deleted'))
        .catch(next);
});

module.exports = router;
