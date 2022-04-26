const Sequelize = require("sequelize");


// const sequelize = new Sequelize("abroadinquiry_data", "abroadinquiry_ad", "*#AbroA@dinqUirY*#2021!DatAbAse", {
//   dialect: "mysql",
//   host: "localhost",
// });


const sequelize = new Sequelize("xyz", "root", "", {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize;