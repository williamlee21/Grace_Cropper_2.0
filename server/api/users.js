const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', (req, res, next) => {
    let whereStatement = {}
    if (Object.keys(req.query).length){
        whereStatement = {where: req.query}
    }
    User.findAll(whereStatement)
        .then(users => res.json(users))
        .catch(next)
})

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => res.json(user))
        .catch(next)
})

router.post('/', (req, res, next) => {
    User.create(req.body.user)
        .then(user => res.json(user))
        .catch(next)
})

router.put('/', (req, res, next) => {
    User.update(req.body, {
        where: {id: req.body.id},
        returning: true,
        plain: true
    })
    .spread((rows, user) => res.json(user))
    .catch(next)
})

router.delete('/', (req, res, next) => {
    User.destroy( {where: {id: req.body.id}})
        .then(() => res.status(202).send('Deleted'))
        .catch(next)
})

module.exports = router
