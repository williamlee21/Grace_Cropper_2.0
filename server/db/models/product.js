const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  photos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['https://afm-6b83.kxcdn.com/wp-content/uploads/2017/05/avoc-fruit.png']
  }
});

module.exports = Product;
