const Sequelize = require('sequelize')
const db = require('../db')
// const {sessionStore} = require('../../')

var Sessions = db.define('Sessions', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  userId: Sequelize.STRING,
  orderId: Sequelize.INTEGER,
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
});

function extendDefaultFields(defaults, session) {
  return (
    console.log('what is session?????', session),
    {
    data: defaults.data,
    expires: defaults.expires,
    userId: session,
    orderId: session.orderId
  });
}


module.exports = Sessions;
