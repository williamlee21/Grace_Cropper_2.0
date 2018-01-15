const Sequelize = require('sequelize');
const db = require('../db');

const productCategories = db.define('productCategories', {

  //OB/AZ - should be able to delete ids; should be created automatically from association
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = productCategories;
