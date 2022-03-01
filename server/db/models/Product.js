const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.STRING(2000),
    defaultValue: 'https://i.imgur.com/KxJ6Z14.jpg',
  },
});

module.exports = Product
