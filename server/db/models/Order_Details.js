const Sequelize = require("sequelize");
const db = require("../db");

const Order_Details = db.define("order_details", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Order_Details;
