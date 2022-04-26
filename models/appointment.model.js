const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const JoinOperation = require('../util/Join_Operation')
const { Personal } = require("./Mentor.model")
const Student = require("./Students.model")

//==============={Schedules}===============//
const Schedules = sequelize.define("schedules", {
  Schedule_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mentor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  end_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  appointment_starting_date: {
    type: Sequelize.STRING(1000),
  },
  appointment_ending_date: {
    type: Sequelize.STRING(1000),
  },
  
});

//==============={Mainframe Appointments}===============//
const Appointments = sequelize.define("appointments", {
  appointment_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mentor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  end_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  appointment_date: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  student_feedback: {
    type: Sequelize.TEXT,
  },
  mentor_feedback: {
    type: Sequelize.TEXT,
  },
  query:{
    type : Sequelize.STRING(1000)
  }
});

//==============={Completed Appointments}===============//
const AppointmentRecords = sequelize.define("appointment_records", {
  appointment_record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appointment_id:{
    type: Sequelize.INTEGER,
  },
  mentor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  end_time: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  appointment_date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  student_feedback: {
    type: Sequelize.TEXT,
  },
  mentor_feedback: {
    type: Sequelize.TEXT,
  },
  query:{
    type : Sequelize.STRING(1000)
  }
});

//==============={Denied Appointments}===============//
const DeniedAppointments = sequelize.define("denied_appointments", {
  denied_appointment_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appointment_id:{
    type: Sequelize.INTEGER
  },
  mentor_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  start_time: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  end_time: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  appointment_date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reason: {
    type: Sequelize.STRING,
  },
  query:{
    type : Sequelize.STRING(1000)
  }
});

//==============={Making Association}===============//
JoinOperation.hasOne(Personal, Appointments, 'mentor_id')
JoinOperation.hasOne(Student, Appointments, 'student_id')
JoinOperation.belongsTo(Appointments, Personal, 'mentor_id')
JoinOperation.belongsTo(Appointments, Student, 'student_id')

JoinOperation.hasOne(Personal, DeniedAppointments, 'mentor_id')
JoinOperation.hasOne(Student, DeniedAppointments, 'student_id')
JoinOperation.belongsTo(DeniedAppointments, Personal, 'mentor_id')
JoinOperation.belongsTo(DeniedAppointments, Student, 'student_id')

JoinOperation.hasOne(Personal, AppointmentRecords, 'mentor_id')
JoinOperation.hasOne(Student, AppointmentRecords, 'student_id')
JoinOperation.belongsTo(AppointmentRecords, Personal, 'mentor_id')
JoinOperation.belongsTo(AppointmentRecords, Student, 'student_id')

module.exports = {
  Schedules,
  Appointments,
  AppointmentRecords,
  DeniedAppointments,
};
