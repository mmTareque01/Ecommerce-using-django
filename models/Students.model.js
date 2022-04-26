const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Students = sequelize.define("students", {
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
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

// these informations are not mandatory for initial time
  english_proficiency: {
    type: Sequelize.STRING,
  },
  last_academic_qualification: {
    type: Sequelize.STRING,
  },
  last_academic_result: {
    type: Sequelize.STRING,
  },
  institution_name: {
    type: Sequelize.STRING,
  },
  want_to_study: {
    type: Sequelize.STRING,
  },
  want_to_go: {
    type: Sequelize.STRING,
  },
  working_experience: {
    type: Sequelize.STRING(1234),
  },
  extracurricular_activities: {
    type: Sequelize.STRING(1234),
  },
  publications: {
    type: Sequelize.STRING(1234),
  },
  currently_live_in: {
    type: Sequelize.STRING,
  },
  country_of_origin: {
    type: Sequelize.STRING,
  },
  community_work: {
    type: Sequelize.STRING(1234),
  },
  profilePic: {
    type: Sequelize.STRING(1234),
  },
  about_yourself: {
    type: Sequelize.STRING(1234),
  },
  gender:{
    type:Sequelize.STRING
  }
});

module.exports = Students;
