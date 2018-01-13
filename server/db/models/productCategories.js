const Sequelize = require('sequelize');
const db = require('../db');

const productCategories = db.define('productCategories', {
  productId: {
    type: Sequelize.INTEGER
    // ,
    // allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER
    // ,
    // allowNull: false
  }
});

module.exports = productCategories;
