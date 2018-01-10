const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

router.get('/categories/:category', (req, res, next) => {
    Product.findAll( { where: {category: req.params.category}})
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => res.json(product))
        .catch(next)
})
router.post('/', (req, res, next) => {
    Product.create(req.body.product)
        .then(product => res.json(product))
        .catch(next)
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
