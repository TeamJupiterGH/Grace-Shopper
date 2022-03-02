//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Order_Details = require("./models/Order_Details");
//associations could go here!

Order.belongsToMany(Product, { through: Order_Details });
Product.belongsToMany(Order, { through: Order_Details });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Details,
  },
};
