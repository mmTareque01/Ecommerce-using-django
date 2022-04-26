const { getStudentsByEmail } = require("../Repositories/students.repo");
const StudentsRepo = require("../Repositories/students.repo");
const MentorRepo = require("../Repositories/mentor.repo")
const errorStatus = require("../util/error_status")
const otp = require("../util/OTP");
const OtpRepo = require("../Repositories/otp.repo")
const sendOTP = require("../util/otpmail");

function updateOTP(clue, res, return_data){
    let otp_code = otp()
    sendOTP(clue.email, otp_code)
        .then(result=>{
            OtpRepo.updateOTP(clue, {otp_code: otp_code})
            .then(output=>{
                res.send(return_data)
            })
            .catch(error=>{
                console.log(error)
                errorStatus.serverError(res)
            })
        })
        .catch(error=>{
            console.log(error)
            res.send({error:"Invalid email"})
        })
}

function insertIntoOTP(clue, res, return_data){
    let otp_code = otp()
    sendOTP(clue.email, otp_code)
        .then(result=>{
            OtpRepo.insertIntoOtp({email : clue.email, otp_code : otp_code})
                .then(output=>{
                    res.send(return_data)
                })
                .catch(error=>{
                    console.log(error)
                    errorStatus.serverError(res)
                })
        })
        .catch(error=>{
            console.log(error);
            res.send({error:"Invalid email"})
        })




}

var Reset_password = {

    async sendOTPToUserIfMailExist(req, res){
        let clue = {email:req.body.email}
        StudentsRepo.getAllData(clue)
          .then(data =>{
              if(data.length > 0){

                OtpRepo.getData(clue)
                    .then(otp_response=>{
                        if(otp_response.length > 0){
                            // update
                            updateOTP(
                                clue, 
                                res,
                                {
                                    id: data[0].id,
                                    email: data[0].email,
                                    userStatus: 'student',
                                }
                            )
                        }
                        else{
                            //insert
                            insertIntoOTP(
                                clue,
                                res,
                                {
                                    id: data[0].id,
                                    email: data[0].email,
                                    userStatus: 'student',  
                                }
                                )
                        }
                    })
                    .catch(error=>{
                        console.log(error)
                        errorStatus.serverError(res)
                    })
              }
              else{
                MentorRepo.getMentor(clue)
                    .then(data => {
                        if(data.length > 0){


                            OtpRepo.getData(clue)
                            .then(otp_response=>{
                                if(otp_response.length > 0){
                                    // update
                                    updateOTP(
                                        clue, 
                                        res,
                                        {
                                            id: data[0].id,
                                            email: data[0].email,
                                            userStatus: 'mentor',
                                        }
                                    )
                                }
                                else{
                                    //insert
                                    insertIntoOTP(
                                        clue,
                                        res,
                                        {
                                            id: data[0].id,
                                            email: data[0].email,
                                            userStatus: 'mentor',  
                                        }
                                        )                                }
                            })
                            .catch(error=>{
                                errorStatus.serverError(res)
                            })
                        }
                        else{
                            errorStatus.dataNotFound(res)
                        }   
                    })
                    .catch(error => {
                        console.log(error)
                        errorStatus.serverError(res)
                    })
              }
          })
          .catch(error=>{
            console.log(error)
            errorStatus.serverError(res)
          })
      },
    
    async checkingOTP(req, res){
        OtpRepo.getData({
            email: req.body.email,
            otp_code: parseInt(req.body.otp_code)
        })
        .then(result=>{
            if(result.length > 0){
                res.send({isOTPMatched: true})
            }
            else{
                res.send({isOTPMatched: false})
            }
        })
        .catch(error=>{
            errorStatus.serverError(res)
            // res.send(error)
        })
    }

    
    
}

module.exports = Reset_password
