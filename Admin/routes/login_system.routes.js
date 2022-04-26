// const express = require("express");
// const login_system_router = express.Router();
const login_system_middleware = require("../middlewares/login_system.middleware")
const login_system_controller = require("../controllers/authentication_system.controller")

// login_system_router.post("/login", login_system_middleware, login_system_controller.login);
// login_system_router.post("/reset_password", login_system_controller.reset_password)

class login_system{

        login(){
            return "/login", login_system_controller.login
        }





}




module.exports = new login_system();