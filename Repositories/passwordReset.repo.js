const { Personal } = require("../models/Mentor.model");
const Otp = require("../models/otp.model");
const Students = require("../models/Students.model");
const ActWithDB = require("../util/DBFunction");
const databaseObj = new ActWithDB();

var passwordResetRepo = {
    checkingDataExistence(clue){
        return databaseObj.dataChecking([Students, Personal, Otp], clue)
    },

    passwordReset(data, clue){
        return databaseObj.updateDateByCheckingModel([Students, Personal], data, clue)
    }
}
module.exports = passwordResetRepo