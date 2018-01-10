const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      withinRange: function(rating) {
        if(!(rating >= 0 && rating <= 5)) {
          throw new Error('please rate this product from 0 to 5')
        }
      }
    }
  }
})

module.exports = Review
