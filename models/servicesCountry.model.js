const Sequelize = require("sequelize");
const sequelize = require("../util/database");



const Country = sequelize.define("countries", {
    country_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    country_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country_img: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  

  module.exports = {Country}
   