const router = require('express').Router();
const {User} = require('../db/models');
const {Order} = require('../db/models');
const chalk = require('chalk');
const login = require('../utils/login');

router.post('/login', (req, res, next) => {
  login(req, res, next)
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

module.exports = router;
