/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Product.bulkCreate([
      {
        name: 'Apple',
        description: 'pretty tasty',
        price: 10.99
      },
      {
        name: 'Orange',
        description: 'pretty orange',
        price: 1.50
      }
      ]);
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[1].price).to.be.equal(1.50);
        });
    });

    it('POST /api/products', () => {
      return request(app)
        .post('/api/products')
        .send({product: {
          name: 'Pear',
          description: 'kinda appley',
          price: 2.75
        }})
        .expect(200)
        .then(() => {
          return request(app).get('/api/products');
        })
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[2].price).to.be.equal(2.75);
        });
    });
  }); // end describe('/api/products')
}); // end describe('Product routes')
