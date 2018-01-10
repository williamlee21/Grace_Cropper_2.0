const chance = require('chance')(123);
const Promise = require('bluebird');

const { db, User, Product, Review, Order, ProductOrder } = require('./server/db/models');

const numUsers = 10;
const numProducts = 15;
const numReviews = 20;

const emails = chance.unique(chance.email, numUsers);
const products = [
    {name: 'Apple', category: 'fruit', description: 'this is an apple', price: 1.99, inventoryQuantity: 10},
    {name: 'Banana', category: 'fruit', description: 'this is a banana', price: 2.99, inventoryQuantity: 25},
    {name: 'Lemon', category: 'fruit', description: 'this is a lemon', price: 3.99, inventoryQuantity: 10},
    {name: 'Lime', category: 'fruit', description: 'this is a lime', price: 4.99, inventoryQuantity: 10},
    {name: 'Grape', category: 'fruit', description: 'this is a grape', price: 5.99, inventoryQuantity: 100},
    {name: 'Avocado', category: 'fruit', description: 'this is an avocado', price: 6.99, inventoryQuantity: 10},
    {name: 'Plum', category: 'fruit', description: 'this is a plum', price: 7.99, inventoryQuantity: 10},
    {name: 'Strawberry', category: 'fruit', description: 'this is a strawberry', price: 8.99, inventoryQuantity: 20},
    {name: 'Watermelon', category: 'fruit', description: 'this is a watermelon', price: 9.99, inventoryQuantity: 10},
    {name: 'Peach', category: 'fruit', description: 'this is a peach', price: 10.99, inventoryQuantity: 10},
    {name: 'Lettuce', category: 'veggies', description: 'this is a lettuce', price: 11.99, inventoryQuantity: 54},
    {name: 'Cucumber', category: 'fruit', description: 'this is a cucumber', price: 12.99, inventoryQuantity: 23},
    {name: 'Potato', category: 'tuber', description: 'this is a potato', price: 13.99, inventoryQuantity: 78},
    {name: 'Yucca', category: 'root', description: 'this is yucca', price: 14.99, inventoryQuantity: 54},
    {name: 'Yam', category: 'tuber', description: 'this is a yam', price: 15.99, inventoryQuantity: 38},
] 

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
    password: chance.word()
  });
}

function addProduct () {
    return Product.build({

    })
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Zeke Nierenberg',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phone: '(510) 295-5523',
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: false
  }));
  users.push(User.build({
    name: 'Omri Bernstein',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(781) 854-8854',
    email: 'omri@omri.omri',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    name: 'Kate Humphrey',
    photo: 'https://learndotresources.s3.amazonaws.com/workshop/59ea65d1badb1d0004bf4ca3/baby%20hippo.jpg',
    phone: '(555) 623-7878',
    email: 'kate@kate.kate',
    password: '7890',
    isAdmin: true
  }));
  return users;
}

function generateStories (createdUsers) {
  return doTimes(numStories, () => randStory(createdUsers));
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

function createStories (createdUsers) {
  return Promise.map(generateStories(createdUsers), story => story.save());
}

function seed () {
  return createUsers()
  .then(createdUsers => createStories(createdUsers));
}

console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
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