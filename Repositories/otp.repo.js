const ActWithDB = require("../util/DBFunction");
const Otp = require("../models/otp.model");




const databaseObj = new ActWithDB();

var OtpRepo = {
    insertIntoOtp (data) {
        return databaseObj.insertData(Otp, data)
    },

    getData(clue){
        return databaseObj.getData(Otp, clue)
    },

    updateOTP(clue, data){
        return databaseObj.updateData(Otp, data, clue)
    },

    checkOTPExistence(clue){
        return databaseObj.dataChecking([Otp],clue)
    },

    deleteOTP(clue){
        return databaseObj.deleteData(Otp, clue)
    }
}
module.exports = OtpRepo