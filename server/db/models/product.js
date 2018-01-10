const Sequelize = require('sequelize')
const db = require('../db')

// OB/AZ: consider validations (not urgent)
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
    // OB/AZ: watch out for ~the devil~ floating point math, consider using DECIMAL type (which is kind of for this) or INTEGER and measure in cents
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
