var express = require("express"); //importing express
var stdControlers = require("../controllers/students.controler");
var stdRouters = express.Router(); //making router handlers
var { uploadSingleImageForStudent } = require("../middleware/fileUploader");
const AppointmentController = require("../controllers/appointment.controller");
var passwordMatcher = require("../middleware/passwordMatcher");
var notificationController = require("../controllers/notifications");
const userAuthentication = require("../middleware/userAuthentication.middleware");


stdRouters.post("/signup", stdControlers.signUp)
stdRouters.get("/get_all_data", userAuthentication, stdControlers.getAllData); //it will return all data of specifice students;
stdRouters.put("/update_all_data", userAuthentication, stdControlers.updateAllData);
stdRouters.get("/profile_view/:id", userAuthentication, stdControlers.studentProfileView)
stdRouters.post("/update_password/:id", passwordMatcher, stdControlers.updatePassword)
stdRouters.post("/find_user_by_mail", stdControlers.getStudentsByEmail);
stdRouters.post(
  "/profile/:id",
  uploadSingleImageForStudent.single("profile"),
  stdControlers.updateProfilePic
);
stdRouters.get("/get_notification/:id/:page", notificationController.showNotificationDataToStudent)
stdRouters.get("/get_total_unread_notification", userAuthentication, notificationController.getUnReadNotificationOfStudent)



module.exports = stdRouters;


