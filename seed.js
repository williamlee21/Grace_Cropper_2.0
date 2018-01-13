const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('./server/db');
const { User, Product, Review, Order, Category, productOrder, productCategories} = require('./server/db/models');

const numUsers = 10;
const numProducts = 15;
const numReviews = 20;
const numCategories = 30;

const emails = chance.unique(chance.email, numUsers);
const products = [
    {name: 'Apple', description: 'this is an apple', price: 1.99, inventoryQuantity: 10},
    {name: 'Banana', description: 'this is a banana', price: 2.99, inventoryQuantity: 25},
    {name: 'Lemon', description: 'this is a lemon', price: 3.99, inventoryQuantity: 10},
    {name: 'Lime', description: 'this is a lime', price: 4.99, inventoryQuantity: 10},
    {name: 'Grape', description: 'this is a grape', price: 5.99, inventoryQuantity: 100},
    {name: 'Avocado', description: 'this is an avocado', price: 6.99, inventoryQuantity: 10},
    {name: 'Plum', description: 'this is a plum', price: 7.99, inventoryQuantity: 10},
    {name: 'Strawberry', description: 'this is a strawberry', price: 8.99, inventoryQuantity: 20},
    {name: 'Watermelon', description: 'this is a watermelon', price: 9.99, inventoryQuantity: 10},
    {name: 'Peach', description: 'this is a peach', price: 10.99, inventoryQuantity: 10},
    {name: 'Lettuce', description: 'this is a lettuce', price: 11.99, inventoryQuantity: 54},
    {name: 'Cucumber', description: 'this is a cucumber', price: 12.99, inventoryQuantity: 23},
    {name: 'Potato', description: 'this is a potato', price: 13.99, inventoryQuantity: 78},
    {name: 'Yucca', description: 'this is yucca', price: 14.99, inventoryQuantity: 54},
    {name: 'Yam', description: 'this is a yam', price: 15.99, inventoryQuantity: 38},
];

const categories = [
  {name: 'all-natural'},
  {name: 'local'},
  {name: 'organic'},
  {name: 'eco-friendly'},
  {name: 'GMO'},
  {name: 'farm-fresh'}
];

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randUser () {
  return User.build({
    name: [chance.first(), chance.last()].join(' '),
    email: emails.pop(),
    password: chance.word(),
    address: chance.address()
  });
}

function randReview (createdUsers, createdProducts) {
  const user = chance.pick(createdUsers);
  const product = chance.pick(createdProducts);
  const numSents = chance.natural({
    min: 1,
    max: 10
  });
  return Review.build({
    userId: user.id,
    productId: product.id,
    rating: Math.floor(Math.random() * 6),
    comment: chance.n(chance.sentence, numSents).join('. ')
  });
}

function randProductCategories(createdCategories, createdProducts) {
  const category = chance.pick(createdCategories);
  const product = chance.pick(createdProducts);

  return productCategories.build({
    categoryId: category.id,
    productId: product.id
  });
}

function addProducts (products) {
  const productList = products.map((product) => {
    return Product.build(product)
  });
  return productList;
}

function addCategories (categories){
  const categoryList = categories.map( category => {
    return Category.build(category)
  });
  return categoryList;
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Zeke Nierenberg',
    address: '123 test ave',
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: false
  }));
  users.push(User.build({
    name: 'Omri Bernstein',
    address: '1 fake st',
    email: 'omri@omri.omri',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    name: 'Kate Humphrey',
    address: '55 some pl',
    email: 'kate@kate.kate',
    password: '7890',
    isAdmin: true
  }));
  return users;
}

function generateReviews(createdUsers, createdProducts) {
  return doTimes(numReviews, () => randReview(createdUsers, createdProducts));
}

function generateProductCategories(createdCategories, createdProducts) {
  return doTimes(numCategories, () => randProductCategories(createdCategories, createdProducts))
}

function createCategories (categories) {
  const categs = addCategories(categories);
  return Promise.map(categs, categ => categ.save());
}

function createProducts (products) {
  const prods = addProducts(products);
  return Promise.map(prods, prod => prod.save());
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

function createReviews (createdUsers, createdProducts) {
  return Promise.map(generateReviews(createdUsers, createdProducts), review => review.save());
}

function createProductCategories (createdCategories, createdProducts) {
  return Promise.map(generateProductCategories(createdCategories, createdProducts), association => association.save())
}

function seed (products, categories) {
  return Promise.all([createUsers(), createProducts(products), createCategories(categories)])
    .spread((createdUsers, createdProducts, createdCategories) => {
      return (createReviews(createdUsers, createdProducts), createProductCategories(createdCategories, createdProducts))
    })
};

console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed(products, categories);
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });