const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},{
  scopes: {
    populated: () => ({
      include: {
        all:true
      }
    })
  }
});

module.exports = Category;
