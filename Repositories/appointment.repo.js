const ActWithDB = require("../util/DBFunction");
const { Appointments,
    Schedules,
    AppointmentRecords,
    DeniedAppointments } = require("../models/appointment.model");
const Student = require('../models/Students.model')
const { Personal } = require("../models/Mentor.model")
const { Mentors_Notifications,
    Students_Notifications } = require("../models/Notifications")
const databaseObj = new ActWithDB();

var AppointmentRepo = {
    //==============={insert data into schedules table}===============//
    assignMentorsSchedule(data) {
        return databaseObj.insertData(Schedules, data);
    },

    //==============={delete data form schedules}===============//
    deleteScheduleOfMentor(clue) {
        return databaseObj.deleteData(Schedules, clue)
    },

    //==============={get schedules data}===============//
    getMentorSchedules(clue) {
        return databaseObj.orOperation(Schedules, clue);
        // return databaseObj.getDataUsingPagination(
        //     Schedules,
        //     clue,
        //     null,
        //     [],
        //     10,
        //     page,
        //     ['Schedule_id', 'DESC']
        // )
    },

    //==============={get data from appointment table}===============//
    getAppointment(clue) {
        return databaseObj.getData(Appointments, clue);
    },

    //==============={insert data into appointments}===============//
    createAnAppointment(data) {
        return databaseObj.applyForAppointment(Appointments, Mentors_Notifications, data);
    },

    //==============={accepting appointments}===============//
    acceptAppointment(updateOfClue, updateData, notificationData) {
        return databaseObj.updateAndCreate(Appointments, updateOfClue, updateData, Students_Notifications, notificationData);
    },

    //==============={denying appointments part one}===============//
    denyingAppointment(deniedAppointmentData, appointmentsClue, notificationData) {
        return databaseObj.insertAndFetch(DeniedAppointments, deniedAppointmentData, Appointments, appointmentsClue, Students_Notifications, notificationData)
    },

    //==============={denying appointments part two}===============//
    updateDenyAppointmentAndDeleteAppointment(updatingData, updatingDataClue, deletingDataClue) {
        return databaseObj.updateAndDelete(DeniedAppointments, updatingData, updatingDataClue, Appointments, deletingDataClue)
    },

    //==============={Schedules}===============//
    getDataById(jsonData) {
        return databaseObj.getData(Appointments, jsonData);
    }, //get appointment data it should be changed.........

    //==============={Schedules}===============//
    deleteDataById(jsonData) {
        return databaseObj.deleteData(Appointments, jsonData);
    }, //delte appointment data it should be changed

    //==============={get denied appointments}===============//
    getDeniedAppointment(jsonData) {
        return databaseObj.getData(DeniedAppointments, jsonData);
    },

    //==============={show all pending appointments}===============//
    showAllPendingAppointmentToMentor(jsonData) {
        return databaseObj.getData(Appointments, jsonData);
    },

    //==============={show all approved appointments}===============//
    showAllApprovedAppointmentToMentor(jsonData) {
        return databaseObj.getData(Appointments, jsonData);
    },

    //==============={update appointments records}===============//
    updateAppointmentRecords(jsonData) {
        return databaseObj.insertData(AppointmentRecords, jsonData);
    },

    //==============={showing appointment applications}===============//
    getAppointmentApplications(clue) {
        return databaseObj.joinTwoTable(Student, Appointments, clue)
    },

    //==============={showing appointment data}===============//
    getAppointmentData(clue, page) {
        return databaseObj.getDataUsingPagination(
            Appointments,
            clue,
            null,
            [Personal, Student],
            5,
            page,
            ['appointment_id', 'DESC']
        )
    },



    //==============={showing appointment history}===============//
    getAppointmentHistory(clue, page) {
        return databaseObj.getDataUsingPagination(
            AppointmentRecords,
            clue,
            null,
            [Personal, Student],
            5,
            page,
            ['appointment_record_id', 'DESC']
        )
    },

    //==============={showing appointment information}===============//
    getAppointmentInformationForMentor(clue) {
        return databaseObj.getAppointmentInformation(
            [Appointments, DeniedAppointments, AppointmentRecords],
            clue,
            [Student]
        )
    },

    getAppointmentInformationForStudent(clue) {
        return databaseObj.getAppointmentInformation(
            [Appointments, DeniedAppointments, AppointmentRecords],
            clue,
            [Personal]
        )
    },



    completingAppointment(clue, feedback) {
        return databaseObj.completingAppointment(Appointments, clue, AppointmentRecords, feedback)
    }
}

module.exports = AppointmentRepo;





