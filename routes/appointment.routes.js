var express = require("express");
var appointmentRouters = express.Router();
var appointmentController = require("../controllers/appointment.controller")
var userAuthenticationMiddleware = require("../middleware/userAuthentication.middleware")

appointmentRouters.post("/schedule_appointment", userAuthenticationMiddleware, appointmentController.assignMentorsSchedule);
appointmentRouters.get("/get_all_schedule", userAuthenticationMiddleware, appointmentController.getAssignedMentorsSchedule)
appointmentRouters.post("/complete_appointment", userAuthenticationMiddleware, appointmentController.completingAppointment);
appointmentRouters.post("/accept_or_deny_appointment",userAuthenticationMiddleware,  appointmentController.acceptOrDenyAppointment);
appointmentRouters.post("/delete_schedule/:id", userAuthenticationMiddleware, appointmentController.deleteMentorsSchedule);
appointmentRouters.post("/get_appointment_time_slot", userAuthenticationMiddleware, appointmentController.showingTimeSlot);
appointmentRouters.post("/apply_for_appointment", userAuthenticationMiddleware, appointmentController.createAnAppointment);
appointmentRouters.get("/get_appointment_application/:page", userAuthenticationMiddleware, appointmentController.showAppointmentApplications)
appointmentRouters.get("/get_scheduled_appointment/:page", userAuthenticationMiddleware, appointmentController.showScheduledAppointment)
appointmentRouters.get('/get_appointment_info/:appointmentId', userAuthenticationMiddleware, appointmentController.showAppointmentInformation)
appointmentRouters.get('/get_appointment_records/:page', userAuthenticationMiddleware, appointmentController.showAppointmentRecords)

module.exports = appointmentRouters;
