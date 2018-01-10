const router = require('express').Router()
const {Product} = require('../db/models')
// OB/AZ: keep consistent style for whether module.exports appears at top or bottom
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

// OB/AZ: it's good to have filtering / querying logic "as far back as possible"
// OB/AZ: the route is not standard with modern REST practices
/*
Part of the standard means having the URL identify a resource unambiguously
currently: GET /products/categories/someCategory
Will we receive a product array or a category array?
one alternative: GET /categories/:someCategory/products
another alternative: GET /products?category=someCategory
Using the query string makes it clear that we're "filtering"
*/
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

// OB/AZ: standard practice is to put the id in the URL, i.e. access it via req.params
router.put('/', (req, res, next) => {
    Product.update(req.body, {
        where: {id: req.body.id},
        returning: true,
        plain: true
    })
    // OB/AZ: watch out, "product" below is actually an array of affected rows
    .spread((rows, product) => res.json(product))
    .catch(next)
})
// OB/AZ: is necessary to put the id in the URL, i.e. access it via req.params, delete requests don't have a body
router.delete('/', (req, res, next) => {
    Product.destroy( {where: {id: req.body.id}})
        .then(() => res.status(202).send('Deleted')) // OB/AZ: maybe 204 instead ("No Content")
        .catch(next)
})

