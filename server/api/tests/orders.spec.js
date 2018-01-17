/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        name: 'Cody',
        email: codysEmail,
        address: '12 fake st'
      })
      .then((user) => {
        return Order.create({
          userId: user.id
        })
      })
    })

    it('GET /api/orders/:orderId', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.userId).to.be.equal(1)
        });
    });
  }); // end describe('/api/orders')
}); // end describe('Order routes')
