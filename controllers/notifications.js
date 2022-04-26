// const { response } = require("express")
const NotificationsRepo = require("../Repositories/notifications")
const StudentRepo = require("../Repositories/students.repo")
const MentorRepo = require("../Repositories/mentor.repo")
const { google, outlook, office365, yahoo, ics } = require("calendar-link");
const sendEmail = require("../util/mailer");
const { response } = require("express");


var NotificationsController = {
    async showNotificationDataToMentor(req, res) {
        NotificationsRepo.getMentorsNotification({ mentor_id: req.params.id }, req.params.page)
            .then(result => {
                let returningData = [];
                result[0].map(data => {
                    returningData.push({
                        notificationId: data.mentors_notification_id,
                        notification: data.notification,
                        isRead: data.is_read,
                        appointmentId: data.appointment_id,
                        createdAt: data.createdAt
                    })
                })
                res.send({
                    totalNotification: result[1],
                    notificationData: returningData
                })
            })
            .catch(error => {
                res.send(error)
            })
    },

    async showNotificationDataToStudent(req, res) {
        NotificationsRepo.getStudentsNotifications({ student_id: req.params.id }, req.params.page)
            .then(result => {
                let returningData = [];
                result[0].map(data => {
                    returningData.push({
                        notificationId: data.students_notification_id,
                        notification: data.notification,
                        isRead: data.is_read,
                        appointmentId: data.appointment_id,
                        createdAt: data.createdAt
                    })
                })
                res.send({
                    totalNotification: result[1],
                    notificationData: returningData
                })
            })
            .catch(error => {
                res.send(error)
            })
    },

    async getUnReadNotificationOfMentor(req, res) {
        NotificationsRepo.countUnReadNotificationOfMentor({
            mentor_id: req.user.userId,
            is_read: false
        }).then(result => {
            res.send({ totalNotification: result[0] })
        })
            .catch(error => {
                res.send(error)
            })
    },

    async getUnReadNotificationOfStudent(req, res) {
        NotificationsRepo.countUnReadNotificationOfStudent({
            student_id: req.user.userId,
            is_read: false
        }).then(result => {
            res.send({ totalNotification: result[0] })
        })
            .catch(error => {
                res.send(error)
            })
    },

    async readNotification(req, res) {

        if (req.user.userStatus === 'student') {
            NotificationsRepo.updateStudentNotification(
                { is_read: true },
                { students_notification_id: req.body.notificationId }
            ).then(result => {
                res.send({ message: "read" })
            }).catch(error => {
                res.send(error)
            })
        }
        else if (req.user.userStatus === 'mentor') {
            console.log()
            NotificationsRepo.updateMentorNotification(
                { is_read: true },
                { mentors_notification_id: req.body.notificationId }
            ).then(result => {
                console.log(result)
                res.send({ message: "read" })
            })
                .catch(error => {
                    res.send(error)
                })
        }
        else {
            res.status(404).send({ message: "data not found" })
        }
    },

    async addToCalender(req, res) {
        const event = {
            title: "Appointment",
            description: `You have an appointment with ${req.body.appointmentWith}. So please be ready with your queries. Thank you.`,
            start: new Date(req.body.appointmentTime),
            duration: [30, "minutes"],
        };

        let calendar_link = null;

        switch (req.body.calender) {
            case 'google':
                calendar_link = google(event)
                break;
            case 'outlook':
                calendar_link = outlook(event)
                break;

            case 'office365':
                calendar_link = office365(event)
                break;

            case 'yahoo':
                calendar_link = yahoo(event)
                break;

            default:
                calendar_link = google(event)
        }


        if (req.user.userStatus === 'student') {
            StudentRepo.getSpecificData(
                { id: req.user.userId },
                ['email']
            ).then(result => {
                //sending email
                sendEmail(
                    {
                        to: result[0].email,
                        subject: "Appointment",
                        text: `Click here to ${calendar_link} to add appointment time with ${req.body.calender} calender.`
                    }
                )
                    .then(response => {
                       
                        res.send({ added: true, calender: req.body.calender })
                    })
                    .catch(error => {
                        console.log(error)
                        res.send({ added: false, calender: req.body.calender })
                    })





            }).catch(error => {
                console.log(error)
                res.send({ message: "user is not valid" })
            })
        }
        else if (req.user.userStatus === 'mentor') {
            MentorRepo.getSpecificData(
                { id: req.user.userId },
                ['email']
            ).then(result => {
                //sending email




                sendEmail(
                    {
                        to: result[0].email,
                        subject: "Appointment",
                        text: `Click here to ${calendar_link} to add appointment time with ${req.body.calender} calender.`
                    }
                )
                    .then(response => {
                        res.send({ added: true, calender: req.body.calender })
                    })
                    .catch(error => {
                        res.send({ added: false, calender: req.body.calender })
                    })






            })
                .catch(error => {
                    console.log(error)
                    res.send({ message: "user is not valid" })
                })
        }
        else {
            //user not found
        }
    }

}
module.exports = NotificationsController
