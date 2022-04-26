var express = require("express"); //importing express
var loginController = require("../controllers/login.controller")
var loginRouters = express.Router();
var userAuthentication = require("../middleware/userAthentication");
const verify_otp = require("../middleware/verify_otp");



loginRouters.post("/login", loginController.login)
loginRouters.get("/login_from_session", userAuthentication, loginController.loginFromSession)


loginRouters.post("/checking_email_existence", loginController.sendOTPToUserIfMailExist)
loginRouters.post("/check_opt", verify_otp, loginController.checkingOTP)
loginRouters.post("/reset_password", loginController.passwordReset)



module.exports = loginRouters


