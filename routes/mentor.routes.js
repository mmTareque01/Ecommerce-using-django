var express = require("express"); //importing express
var mentorController = require("../controllers/mentor.controller");
var mentorRouter = express.Router(); //making router handlers
var appointmentControllers = require("../controllers/appointment.controller");
var {
    uploadSingleImageForMentor,
    uploadMultipleFilesForMentor,
} = require("../middleware/fileUploader");
var passwordMatcher = require("../middleware/passwordMatcher");
var notificationsController = require("../controllers/notifications");
const userAuthentication = require("../middleware/userAuthentication.middleware");


mentorRouter.get("/get_all_data", userAuthentication, mentorController.getAllData)
mentorRouter.post("/signup_page1", passwordMatcher, mentorController.signUpPage1)
mentorRouter.post("/signup_page2", mentorController.signUpPage2)
mentorRouter.post("/signup_page3", mentorController.signUpPage3)
mentorRouter.post("/update_mentor", mentorController.updateMentorProfile)
mentorRouter.post("/upload_profile_pic/:id",
    uploadSingleImageForMentor.single("profile"),
    mentorController.uploadProfilePic);
mentorRouter.post("/update_password", passwordMatcher, mentorController.updatePassword);
mentorRouter.post("/signup_page4/:mentor_id",
    uploadMultipleFilesForMentor.fields([
        { name: "resident_permit_passport", maxCount: 1 },
        { name: "campus_or_employee_card", maxCount: 1 },
        { name: "signature", maxCount: 1 },
    ]),
    mentorController.uploadMultipleFile);
mentorRouter.get("/mail", mentorController.meilTesitn)
mentorRouter.get("/get_all_mentor_overview/:page", mentorController.getAllMentorOverview)
mentorRouter.get("/get_notification/:id/:page", notificationsController.showNotificationDataToMentor)
mentorRouter.get("/profile_view/:id", mentorController.profileView)
mentorRouter.get("/get_total_unread_notification", userAuthentication, notificationsController.getUnReadNotificationOfMentor)

//has been transferred to appointment.routes
module.exports = mentorRouter;
