var express = require("express"); //importing express
var notificationsController = require("../controllers/notifications");
var notificationRouter = express.Router(); //making router handlers
// var ChatControllers = require("../controllers/chat.controller");
// var appointmentControllers = require("../controllers/appointment.controller");
var AppointmentMiddleware = require("../middleware/appointment.middleware");
var {
  uploadSingleImageForMentor,
  uploadMultipleFilesForMentor,
} = require("../middleware/fileUploader");
var passwordMatcher = require("../middleware/passwordMatcher");
const userAuthentication = require("../middleware/userAuthentication.middleware");


notificationRouter.post("/read_notification", userAuthentication, notificationsController.readNotification)
notificationRouter.post("/add_to_calender", userAuthentication, notificationsController.addToCalender)


module.exports = notificationRouter;