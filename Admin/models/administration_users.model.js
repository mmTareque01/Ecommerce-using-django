const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const administration = sequelize.define("administrations", {
    administration_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING(1234),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile_pic: {
      type: Sequelize.STRING(1234)
  }
  
});

module.exports = administration;




