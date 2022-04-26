const {Appointments} = require('../../models/appointment.model')
const {Personal} = require('../../models/Mentor.model')
const database_function = require("../../util/DBFunction")
const databaseObj = new database_function();


var Appointment = {
    getAppointmentData(clue){
        return databaseObj.joinTwoTable(Personal, Appointments, clue)
    },




}
module.exports = Appointment;










