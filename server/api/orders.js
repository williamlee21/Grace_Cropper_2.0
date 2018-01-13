const router = require('express').Router()
const {Order} = require('../db/models')

const gatekeeperMiddleware = require('../utils/gatekeeperMiddleware');

// router.get('/', (req, res, next) => {
//     if (gatekeeperMiddleware.isLoggedIn) {

//     }
// })

// router.get('/:orderId', (req, res, next) => {
//     Product.findById(req.params.productId)
//         .then(product => res.json(product))
//         .catch(next)
// })

router.post('/', (req, res, next) => {
    if (gatekeeperMiddleware.isLoggedIn) {
        Order.create(req.body.product)
            .then(order => {
                return (
                    order.setUser(req.user),
                    res.json(order)
                )
            })
            .catch(next)

    }

})

router.put('/', (req, res, next) => {
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
