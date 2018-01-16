const router = require('express').Router();
const {Order, productOrders} = require('../db/models');
const placeOrder = require('../utils/placeOrder');

const gatekeeperMiddleware = require('../utils/gatekeeperMiddleware');

// router.get('/', (req, res, next) => {
//     if (gatekeeperMiddleware.isLoggedIn) {

//     }
// })

// router.get('/:orderId', (req, res, next) => {
//     if (gatekeeperMiddleware.isLoggedIn ) {
//         Product.findById(req.params.productId)
//             .then(product => res.json(product))
//             .catch(next)
//     }
// })

router.post('/', (req, res, next) => {
  placeOrder(req)
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.put('/', (req, res, next) => {
    if (gatekeeperMiddleware.isLoggedIn) {
    }
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
