const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Student = require("./Students.model")
const { Personal } = require("./Mentor.model")
const Join_Operation = require('../util/Join_Operation')

const Mentors_Notifications = sequelize.define("mentors_notifications", {
  mentors_notification_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mentor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  notification: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  is_read: {
    type: Sequelize.BOOLEAN(),
    allowNull: false,
  },
  appointment_id: {
    type: Sequelize.INTEGER,
  }

});


const Students_Notifications = sequelize.define("students_notifications", {
  students_notification_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  notification: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  is_read: {
    type: Sequelize.BOOLEAN(),
    allowNull: false,
  },
  appointment_id: {
    type: Sequelize.INTEGER,
  }

});

// Join_Operation.hasOne(Student, Mentors_Notifications, 'notification_from')
// Join_Operation.belongsTo(Mentors_Notifications, Student, 'notification_from')

// Join_Operation.hasOne(Personal, Students_Notifications, 'notification_from')
// Join_Operation.belongsTo(Students_Notifications, Personal, 'notification_from')




module.exports = {
  Mentors_Notifications,
  Students_Notifications
}