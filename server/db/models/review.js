const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      longEnough: function(comment) {
        if(comment.length <= 10) {
          throw new Error('Comment not long enough - must be at least 10 characters');
        }
      }
    }
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      withinRange: function(rating) {
        if(!(rating >= 0 && rating <= 5)) {
          throw new Error('please rate this product from 0 to 5');
        }
      }
    }
  }
});

module.exports = Review;
