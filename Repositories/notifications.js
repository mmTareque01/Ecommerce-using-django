const ActWithDB = require("../util/DBFunction");
const { Mentors_Notifications, Students_Notifications } = require("../models/Notifications")
const Student = require("../models/Students.model")
const { Personal } = require("../models/Mentor.model")
const databaseObj = new ActWithDB();


var NotificationsRepo = {
    getMentorsNotification(clue, page) {
        return databaseObj.getDataUsingPagination(Mentors_Notifications, clue, null, [], 10, page, ['mentors_notification_id', 'DESC'])

    },

    getStudentsNotifications(clue, page) {
        return databaseObj.getDataUsingPagination(Students_Notifications, clue, null, [], 10, page, ['students_notification_id', 'DESC'])

    },
    
    countUnReadNotificationOfMentor(clue){
        return databaseObj.dataChecking([Mentors_Notifications], clue)
    },

    countUnReadNotificationOfStudent(clue){
        return databaseObj.dataChecking([Students_Notifications], clue)
    },

    updateStudentNotification(data, clue){
        return databaseObj.updateData(Students_Notifications, data, clue)
    },

    updateMentorNotification(data, clue){
        return databaseObj.updateData(Mentors_Notifications, data, clue)
    },
    // Aa@123
}
module.exports = NotificationsRepo

