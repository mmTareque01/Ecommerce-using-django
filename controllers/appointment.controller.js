const AppointmentRepo = require("../Repositories/appointment.repo");
const errorStatus = require("../util/error_status")
const { } = require("../models/Notifications");


var AppointmentController = {

  //==============={ Assign Schedules }===============//
  async assignMentorsSchedule(req, res) {
    AppointmentRepo.assignMentorsSchedule({
      mentor_id: req.user.userId,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      appointment_starting_date: req.body.appointment_starting_date,
      appointment_ending_date: req.body.appointment_ending_date,
    })
      .then((result) => {
        res.status(200).send({
          message: "You have scheduled  your appointment time successfully.",
        });
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res)
      });
  },

  //==============={ Show Assigned Schedules }===============//
  async getAssignedMentorsSchedule(req, res) {
    AppointmentRepo.getMentorSchedules({
      mentor_id: req.user.userId
    })
      .then((result) => {
        let returningData = []
        result[0].map(data => {
          returningData.push({
            scheduleId: data.Schedule_id,
            startTime: data.start_time,
            endTime: data.end_time,
          })
        })
        res.send({
          totalSchedules: result[1],
          schedules: returningData
        })
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res)
      });
  },

  //==============={ Delete Assigned Schedules }===============//
  async deleteMentorsSchedule(req, res) {
    AppointmentRepo.deleteScheduleOfMentor({
      Schedule_id: req.params.id,
    })
      .then(result => {
        res.send(
          {
            message: "Your schedule has been deleted",
            isDeleted: true
          }
        )
      })
      .catch(error => {
        errorStatus.serverError(res)
      })
  },

  //==============={ Showing Time Slot }===============//
  async showingTimeSlot(req, res) {
    let data = {
      mentor_id: req.body.mentor_id,
      todays_date: req.body.dates,
    };

    AppointmentRepo.getMentorSchedules([
      { mentor_id: data.mentor_id, appointment_starting_date: data.todays_date },
      { mentor_id: data.mentor_id, appointment_ending_date: data.todays_date }
    ])
      .then((schedule_data) => {

        // res.send(schedule_data)
        if (schedule_data.length > 0) {
          AppointmentRepo.getAppointment({
            mentor_id: data.mentor_id,
            appointment_date: data.todays_date,
          })
            .then(appointment_data => {

              let booked_data = []

              appointment_data.map((item) => {
                booked_data.push(item.dataValues.start_time);
              });
              res.send([{
                schedule: schedule_data,
                booked_data: booked_data
              }])
            })
        }
        else {
          res.send([])
        }
      })
      .catch((error) => {
        errorStatus.serverError(res)
      });
  },

  //==============={ Apply For Appointment }===============//
  async createAnAppointment(req, res) {
    AppointmentRepo.createAnAppointment(
      {
        mentor_id: req.body.mentor_id,
        student_id: req.user.userId,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        appointment_date: req.body.appointment_date,
        notification: req.body.notification,
        query: req.body.query
      }
    )
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res)
      });
  },

  //==============={ Accept Or Deny Appointment }===============//
  async acceptOrDenyAppointment(req, res) {
    if (req.body.confirm === true) {
      AppointmentRepo.acceptAppointment(
        { appointment_id: req.body.appointment_id },
        { status: req.body.confirm },
        {
          student_id: req.body.student_id,
          notification: `Your appointment has been accepted by ${req.body.mentorName}`,
          is_read: false,
          // notification_from: req.body.mentor_id,
          appointment_id: req.body.appointment_id
        }
      )
        .then((result) => {
          // res.send(result)
          res.send({
            status: 'Accepted',
            message: "You Have Accepted An Appointment",
            notificationId: result[1].students_notification_id,
            notification: result[1].notification,
            isRead: result[1].is_read,
            appointmentId: result[1].appointment_id,
            createdAt: result[1].createdAt
          });
        })
        .catch((error) => {
          console.log(error)
          errorStatus.serverError(res)
        });
    } else if (req.body.confirm === false) {
      AppointmentRepo.denyingAppointment(
        {
          status: 'denied',
          reason: req.body.reason
        },
        { appointment_id: req.body.appointment_id },
        {
          student_id: req.body.student_id,
          notification: `Your appointment has been denied by ${req.body.mentorName}`,
          is_read: false,
          // notification_from: req.body.mentor_id,
          appointment_id: req.body.appointment_id
        }
      )
        .then(response => {
          // res.send(response)
          AppointmentRepo.updateDenyAppointmentAndDeleteAppointment(
            {
              mentor_id: response[1][0].mentor_id,
              appointment_id: response[1][0].appointment_id,
              student_id: response[1][0].student_id,
              start_time: response[1][0].start_time,
              end_time: response[1][0].end_time,
              appointment_date: response[1][0].appointment_date,
              query: response[1][0].query,
            },
            { denied_appointment_id: response[0].denied_appointment_id },
            { appointment_id: req.body.appointment_id }
          ).then(result => {
            res.send({
              status: 'Denied',
              message: "You have denied an appointment",
              notificationId: response[2].students_notification_id,
              notification: response[2].notification,
              isRead: response[2].is_read,
              appointmentId: response[2].appointment_id,
              createdAt: response[2].createdAt
            })
          })
            .catch(error => {
              console.log(error)
              errorStatus.serverError(res)
            })
        })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    } else {
      // errorStatus.dataNotFound(res)
      res.send("error")
    }
  },

  //==============={ Show All Pending Appointments }===============//
  async showAppointmentApplications(req, res) {
    if (req.user.userStatus === "mentor") {
      AppointmentRepo.getAppointmentData(
        { mentor_id: req.user.userId, status: false },
        req.params.page
      ).then(result => {
        let returningData = []
        result[0].map(item => {
          returningData.push({
            appointmentId: item.appointment_id,
            id: item.student_id,
            name: item.student.name,
            profilePic: item.student.profilePic,
            startTime: item.start_time,
            endTime: item.end_time,
            query: item.query
          })
        })
        res.send({
          totalAppointmentApplication: result[1],
          appointmentApplication: returningData
        })
      })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else if (req.user.userStatus === "student") {
      AppointmentRepo.getAppointmentData(
        { student_id: req.user.userId, status: false },
        req.params.page
      ).then(result => {
        let returningData = []
        result[0].map(item => {
          returningData.push({
            appointmentId: item.appointment_id,
            id: item.mentor_id,
            name: item.mentors_personal.full_name,
            profilePic: item.mentors_personal.profile_pic,
            startTime: item.start_time,
            endTime: item.end_time,
            query: item.query
          })
        })
        res.send({
          totalAppointmentApplication: result[1],
          appointmentApplication: returningData
        })
      })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else {
      res.send({
        totalAppointmentApplication: 0,
        appointmentApplication: 0
      })
    }

  },

  //==============={ Show All Scheduled Appointment }===============//
  async showScheduledAppointment(req, res) {

    if (req.user.userStatus === "mentor") {
      AppointmentRepo.getAppointmentData(
        { mentor_id: req.user.userId, status: true },
        req.params.page
      ).then(result => {
        let returningData = []
        result[0].map(item => {
          returningData.push({
            appointmentId: item.appointment_id,
            id: item.student_id,
            name: item.student.name,
            profilePic: item.student.profilePic,
            startTime: item.start_time,
            endTime: item.end_time,
            query: item.query
          })
        })
        res.send({
          totalScheduledAppointment: result[1],
          scheduledAppointment: returningData
        })
      })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else if (req.user.userStatus === "student") {
      AppointmentRepo.getAppointmentData(
        { student_id: req.user.userId, status: true },
        req.params.page
      ).then(result => {
        let returningData = []
        result[0].map(item => {
          returningData.push({
            appointmentId: item.appointment_id,
            id: item.mentor_id,
            name: item.mentors_personal.full_name,
            profilePic: item.mentors_personal.profile_pic,
            startTime: item.start_time,
            endTime: item.end_time,
            query: item.query
          })
        })
        res.send({
          totalScheduledAppointment: result[1],
          scheduledAppointment: returningData
        })
      })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else {
      res.send({
        totalScheduledAppointment: 0,
        scheduledAppointment: 0
      })
    }
  },

  //==============={ Completing Appointment }===============//
  async completingAppointment(req, res) {
    AppointmentRepo.completingAppointment(
      { appointment_id: req.body.appointmentId },
      req.body.feedback
    )
      .then(result => {
        console.log(result.length ? { isDone: true } : { isDone: false })
        res.send(result.length ? { isDone: true } : { isDone: false })
      })
      .catch(error => {
        res.send(error)
      })
  },

  //==============={ Show Appointment Records To Mentor }===============//
  async showAppointmentRecords(req, res) {
    if (req.user.userStatus === "mentor") {
      AppointmentRepo.getAppointmentHistory(
        { mentor_id: req.user.userId },
        req.params.page
      )
        .then(result => {
          let returningData = []
          result[0].map(item => {
            returningData.push({
              appointmentId: item.appointment_record_id,
              id: item.mentor_id,
              name: item.student.name,
              profilePic: item.student.profilePic,
              startTime: item.start_time,
              endTime: item.end_time,
              query: item.query
            })
          })
          res.send({
            totalAppointmentRecords: result[1],
            appointmentRecords: returningData
          })
        })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else if (req.user.userStatus === "student") {
      AppointmentRepo.getAppointmentHistory(
        { student_id: req.user.userId },
        req.params.page
      )
        .then(result => {
          let returningData = []
          result[0].map(item => {
            returningData.push({
              appointmentId: item.appointment_record_id,
              id: item.mentor_id,
              name: item.mentors_personal.full_name,
              profilePic: item.mentors_personal.profile_pic,
              startTime: item.start_time,
              endTime: item.end_time,
              query: item.query
            })
          })
          res.send({
            totalAppointmentRecords: result[1],
            appointmentRecords: returningData
          })
        })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res)
        })
    }
    else {
      res.send({
        totalAppointmentRecords: 0,
        appointmentRecords: 0
      })
    }
  },

  //==============={ Show Appointment Information }===============//
  async showAppointmentInformation(req, res) {
    if (req.user.userStatus === 'student') {

      AppointmentRepo.getAppointmentInformationForStudent({ appointment_id: req.params.appointmentId })
        .then(result => {
          if (result[0].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[0][0].appointment_id,
                id: result[0][0].mentor_id,
                startTime: result[0][0].start_time,
                endTime: result[0][0].end_time,
                name: result[0][0].mentors_personal.full_name,
                profilePic: result[0][0].mentors_personal.profile_pic,
                query: result[0][0].query,
                reason: '',
                status: result[0][0].status ? "Accepted" : "Pending",
              }
            })
          }
          else if (result[1].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[1][0].appointment_id,
                id: result[1][0].mentor_id,
                startTime: result[1][0].start_time,
                endTime: result[1][0].end_time,
                name: result[1][0].mentors_personal.full_name,
                profilePic: result[1][0].mentors_personal.profile_pic,
                query: result[1][0].query,
                reason: result[1][0].reason,
                status: "Denied"
              }
            })
          }
          else if (result[2].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[2][0].appointment_id,
                id: result[2][0].mentor_id,
                startTime: result[2][0].start_time,
                endTime: result[2][0].end_time,
                name: result[2][0].mentors_personal.full_name,
                profilePic: result[2][0].mentors_personal.profile_pic,
                query: result[2][0].query,
                reason: '',
                status: "Done"
              }
            })
          }
          else {
            res.status(404).send({ message: "data not found" })
          }
        })
        .catch(error => { res.send(error) })


    }
    else if (req.user.userStatus === 'mentor') {
      AppointmentRepo.getAppointmentInformationForMentor({ appointment_id: req.params.appointmentId })
        .then(result => {
          if (result[0].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[0][0].appointment_id,
                id: result[0][0].student_id,
                startTime: result[0][0].start_time,
                endTime: result[0][0].end_time,
                name: result[0][0].student.name,
                profilePic: result[0][0].student.profilePic,
                query: result[0][0].query,
                reason: '',
                status: result[0][0].status ? "Accepted" : "Pending",
              }
            })
          }
          else if (result[1].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[1][0].appointment_id,
                id: result[1][0].student_id,
                startTime: result[1][0].start_time,
                endTime: result[1][0].end_time,
                name: result[1][0].student.name,
                profilePic: result[1][0].student.profilePic,
                query: result[1][0].query,
                reason: result[1][0].reason,
                status: "Denied"
              }
            })
          }
          else if (result[2].length > 0) {
            res.send({
              appointmentInfo: {
                appointmentId: result[2][0].appointment_id,
                id: result[2][0].student_id,
                startTime: result[2][0].start_time,
                endTime: result[2][0].end_time,
                name: result[2][0].student.name,
                profilePic: result[2][0].student.profilePic,
                query: result[2][0].query,
                reason: '',
                status: "Done"
              }
            })
          }
          else {
            res.status(404).send({ message: "data not found" })
          }



        })
        .catch(error => { res.send(error) })
    }
    else {
      res.status(404).send({ message: "Data not found" })
    }
  }

};
module.exports = AppointmentController;
