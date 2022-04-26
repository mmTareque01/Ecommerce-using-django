const Sequelize = require("sequelize");

const sequelize = require("../util/database");




const Otp = sequelize.define("opt", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp_code: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  expiration: {
    type: Sequelize.DATE,
  },
});

module.exports = Otp;
