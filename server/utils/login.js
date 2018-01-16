const {Order} = require('../db/models');
const {User} = require('../db/models');

const login = (req, res, next) => {
  const orderId = req.session.orderId || null;
  return User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 401
        throw err;
      } else if (!user.correctPassword(req.body.password)) {
        let err = new Error('Incorrect password');
        err.status = 401
        throw err;
      } else {
        req.login(user, (err) => {
          if(err) {
            next(err)
          }
        });
      }
      return user;
    })
    .then((user) => {
      if(orderId) {
        Order.update({userId: user.id}, {where: {id: orderId}});
      }
      res.json(user);
    })
}

module.exports = login;
