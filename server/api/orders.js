const router = require('express').Router()
const {Order, productOrders} = require('../db/models')


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
    // we will check whether human user is logged in, if so, we will create an order,
    // set req.user as UserId on order table
    // set the productId on productOrder table
    // pending issues => what do we want on Order table?
        // how to set multiple productId?
    if (gatekeeperMiddleware.isLoggedIn) {

        console.log('what is req.body??????', req.body),

        Order.scope('populated').create(req.body)
            .then(order => order.setUser(req.user))
            .then(order => order.setProducts(
                req.body.productId, {
                    through: {
                        quantity: req.body.quantity,
                        price: req.body.price
                    }
                })
            )
            .then(order => res.send(order))
            .catch(next)
    } else {

    }
})

router.put('/', (req, res, next) => {
    if (gatekeeperMiddleware.isLoggedIn) {

    }
    Product.update(req.body, {
        where: {id: req.body.id},
        returning: true,
        plain: true
    })
    .spread((rows, product) => res.json(product))
    .catch(next)
})

router.delete('/', (req, res, next) => {
    Product.destroy( {where: {id: req.body.id}})
        .then(() => res.status(202).send('Deleted'))
        .catch(next)
})

module.exports = router
