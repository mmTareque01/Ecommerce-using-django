var express = require("express"); //importing express
var resetPasswordRouters = express.Router();
var resetPasswordController = require("../controllers/resetPassword.controller")
const verify_otp = require("../middleware/verify_otp")

resetPasswordRouters.post("/forgot_password", resetPasswordController.sendOTPToUserIfMailExist)
resetPasswordRouters.post("/check_opt", verify_otp, resetPasswordController.checkingOTP)

module.exports = resetPasswordRouters;