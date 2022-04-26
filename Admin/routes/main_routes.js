const express = require("express");
const administration = express.Router();

//controllers
const authentication_system_controllers = require("../controllers/authentication_system.controller")
const students_controller = require("../controllers/students.controller")
const mentors_controller = require("../controllers/mentors.controller")
const appointment_controller = require("../controllers/appointment.controller")

//middlewares
const update_password_middleware = require("../middlewares/password_update.middlewares")
const user_authentication = require("../middlewares/user_authentication.middleware.js")



administration.post("/login", authentication_system_controllers.login)
administration.put("/update_password",update_password_middleware, authentication_system_controllers.update_password) //middleware has to be added to check user authentication
administration.post("/reset_password", authentication_system_controllers.reset_password)




// handle students
administration.get("/get_all_students_overview", students_controller.get_students_overview)
administration.get("/get_one_students_data/:students_id", students_controller.get_one_students_data)
administration.delete("/delete_students_data/:student_id",  students_controller.delete_student)


// administration.post("/login", (req, res)=>{console.log(login_system.login); res.send(login_system.login)})

// handle mentors
administration.get("/get_all_mentors_overview", mentors_controller.get_mentors_overview);
administration.get("/get_one_mentors_information/:mentor_id", mentors_controller.get_all_information_about_mentor)
administration.put("/block_mentor/:mentor_id",  mentors_controller.block_a_mentor)
administration.put("/unblock_mentor/:mentor_id",  mentors_controller.unblock_a_mentor)
administration.delete("/delete_mentor/:mentor_id", user_authentication, mentors_controller.delete_a_mentor)
administration.put("/update_mentor/:mentor_id", user_authentication, mentors_controller.update_mentor)
administration.get("/get_mentor_applications_overview", mentors_controller.get_new_mentor_application_overview);
administration.get("/get_mentor_applications_info/:mentorId", mentors_controller.get_new_mentor_application_info);
administration.put("/approve_a_mentor/:mentor_id", mentors_controller.approve_new_mentor_application);


//-------------
administration.get("/get_profile_update_application_overview", mentors_controller.get_profile_update_application_overview);


//-------------
administration.get("/get_blocked_mentors", mentors_controller.get_blocked_mentors);
administration.get("/get_blocked_mentors_info/:mentor_id", mentors_controller.get_blocked_mentors_info);


// ------------
administration.get("/get_appointment_application", appointment_controller.get_appointmnet_application)



module.exports = administration
