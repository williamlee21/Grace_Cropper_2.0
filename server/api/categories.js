const router = require('express').Router()
const {Category} = require('../db/models')

// PARAM /api/categories/ID
router.param('id', (req, res, next, id) => {
    Category.scope('populated').findById(id)
    .then(category => {
      if (!category) {
        const err = new Error('Oops! Category not found!');
        err.status = 404;
        throw err
      }
      else {
        req.category = category;
        next()
      }
    })
    .catch(next)
  });

// GET api/categories
router.get('/', (req, res, next) => {
    Category.scope('populated').findAll()
        .then(categories => res.json(categories))
        .catch(next)
})

// GET api/categories/:ID
router.get('/:id', (req, res, next) => {
    res.json(req.category)
  });

// POST api/categories
router.post('/', (req, res, next) => {
    Category.create(req.body)
        .then(category => res.json(category))
        .catch(next)
})

// PUT api/categories/:id
router.put('/:id', (req, res, next) => {
    req.category.update(req.body)
    .then(updatedCategory => {
      res.json(updatedCategory)
    })
    .catch(next)
  });

// DELETE api/categories/:id
// Sandy - Actually, I don't think this is necessary for our project.....
router.delete('/:id', (req, res, next) => {
    req.category.destroy()
    .then(() => res.sendStatus(202))
    .catch(next)
  });

module.exports = router
