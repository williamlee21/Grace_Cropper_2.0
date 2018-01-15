const router = require('express').Router()
const {Order} = require('../db/models')
//OB/AZ - make sure to import Product Model

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

    //OB/AZ - this is a function - so will always be truthy and never returns a boolean
    //Insert this funciton before (req,res,next)
    if (gatekeeperMiddleware.isLoggedIn) {

        //OB/AZ - Remove console.log
        console.log('what is req.body??????', req.body)

        Order.create(req.body.product)
            .then(order => order.setUser(req.user))
            .then(order => order.setProducts(req.body.productId))
            .then(order => res.send(order))
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
