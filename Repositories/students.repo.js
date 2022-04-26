const StudentsModel = require("../models/Students.model");
const { Personal } = require("../models/Mentor.model")
const ActWithDB = require("../util/DBFunction");

const databaseObj = new ActWithDB();//creating instance of DBfunction class

var StudentsRepo = {

  signUp(data) {
    return databaseObj.studentSignUp(Personal, StudentsModel, data)
  },

  getAllData(jsonData) {
    return databaseObj.getData(StudentsModel, jsonData);
  }, //get all data by using specific key

  getMultipleStudentsData(jsonData) {
    return databaseObj.orOperation(StudentsModel, jsonData)
  },

  getAllMentors(clue) {
    return databaseObj.getData(Personal, clue);
  }, //get all approved mentors

  updateData(jsonData, clue) {
    return databaseObj.updateData(StudentsModel, jsonData, clue);
  }, //update studnts

  updateProfile(data, clue) {
    return databaseObj.studentProfileUpdate(StudentsModel, data, clue)
  },

  getSpecificData(clue, attr) {
    return databaseObj.getData(StudentsModel, clue, attr)
  }

};


module.exports = StudentsRepo;
