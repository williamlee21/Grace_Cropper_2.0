const router = require('express').Router()
const {Product, Category} = require('../db/models')

router.get('/', (req, res, next) => {
    let whereStatement = {}
    if (Object.keys(req.query).length){
      console.log('=======', req.query)
        whereStatement = {where: req.query, include: [{ model: Category }]}
    }else{
      whereStatement = {include: [{ model: Category }]}
    }
    Product.scope('populated').findAll(whereStatement)
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.scope('populated').findById(req.params.productId)
        .then(product => res.json(product))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body.product)
        .then(product => res.json(product))
        .catch(next)
})

router.put('/', (req, res, next) => {
    Product.scope('populated').update(req.body, {
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
