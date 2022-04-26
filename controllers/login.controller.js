const { getStudentsByEmail } = require("../Repositories/students.repo");
const StudentsRepo = require("../Repositories/students.repo");
const MentorRepo = require("../Repositories/mentor.repo")
const errorStatus = require("../util/error_status")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordResetRepo = require("../Repositories/passwordReset.repo")
const OtpRepo = require("../Repositories/otp.repo");
const otp = require("../util/OTP");
const sendEmail = require("../util/mailer");



var Login = {

  async login(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Credentials not valid. Provide valid credentials."
      );
      error.statusCode = 401;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    var userStatus;


    StudentsRepo.getAllData({ email: email })
      .then(students_data => {
        let students_data_len = Object.keys(students_data).length;
        if (students_data_len > 0) {
          userStatus = "student"
          bcrypt.compare(password, students_data[0].password)
            .then(isEqual => {
              if (!isEqual) {
                res.status(404).send({
                  message: "Email and Password didn't match!"
                })
              }
              else {
                const token = jwt.sign(
                  {
                    email: students_data[0].email,
                    userId: students_data[0].id,
                    userStatus: userStatus
                  },
                  "secretkey",
                  { expiresIn: "7d" }
                );
                res.status(200).json({
                  token: token,
                  userId: students_data[0].id,
                  userStatus: userStatus,

                });
              }
            })
            .catch(error => {
              errorStatus.serverError(res)
            })
        }
        else {
          MentorRepo.getMentor({ email: email, status: true })
            .then(gotMentor => {
              let gotMentor_len = Object.keys(gotMentor).length;
              if (gotMentor_len > 0) {
                userStatus = 'mentor'
                bcrypt.compare(password, gotMentor[0].password)
                  .then(isEqual => {
                    if (!isEqual) {
                      res.status(404).send({
                        message: "Email and Password didn't match!"
                      })
                    }
                    else {
                      const token = jwt.sign(
                        {
                          email: gotMentor[0].email,
                          userId: gotMentor[0].id,
                          userStatus: userStatus
                        },
                        "secretkey",
                        { expiresIn: "7d" }
                      );

                      res.status(200).json({
                        token: token,
                        userId: gotMentor[0].id,
                        userStatus: userStatus,

                      });
                    }
                  })
              }
              else {
                res.status(404).send({ message: "Email and Password didn't match!" })
              }
            })
            .catch(error => {
              errorStatus.serverError(res)
            })
        }
      })
      .catch(error => {
        errorStatus.serverError(res)
      })
  },

  async loginFromSession(req, res) {
    let clue = {
      id: req.body.userId,
      email: req.body.email
    }
    if (req.body.userStatus == "student") {
      StudentsRepo.getAllData(clue)
        .then((data) => {
          res.send({
            id: data[0].id,
            email: data[0].email,
            phone: data[0].phone,
            name: data[0].name,
            password: data[0].password,
            english_proficiency: data[0].english_proficiency,
            last_academic_qualification: data[0].last_academic_qualification,
            last_academic_result: data[0].last_academic_result,
            institution_name: data[0].institution_name,
            want_to_go: data[0].want_to_go,
            want_to_study: data[0].want_to_study,
            working_experience: data[0].working_experience,
            extracurricular_activities: data[0].extracurricular_activities,
            publications: data[0].publications,
            currently_live_in: data[0].currently_live_in,
            country_of_origin: data[0].country_of_origin,
            community_work: data[0].community_work,
            profilePic: data[0].profilePic,
            about_yourself: data[0].about_yourself,
            userStatus: req.body.userStatus,
          });
        })
        .catch((err) => {
          console.log(err)
          errorStatus.serverError(res);
        });
    }
    else if (req.body.userStatus == 'mentor') {
      MentorRepo.getAllMentorsData(req.body.userId)
        .then(response_data => {
          let returning_data = {
            id: response_data[0].id,
            name: response_data[0].full_name,
            email: response_data[0].email,
            password: response_data[0].password,
            phone: response_data[0].phone,
            whatsapp: response_data[0].whatsapp,
            present_address: response_data[0].present_address,
            parmanent_address: response_data[0].parmanent_address,
            country: response_data[0].country,
            city: response_data[0].city,
            gender: response_data[0].gender,
            profilePic: response_data[0].profile_pic,
            status: response_data[0].status,
            userStatus: req.body.userStatus,
            facebook: response_data[0].mentors_contact.facebook,
            linkedIn: response_data[0].mentors_contact.linkedIn,
            instagram: response_data[0].mentors_contact.instagram,
            student_email: response_data[0].mentors_contact.student_email,
            bank_account: response_data[0].mentors_contact.bank_account,

            working_or_studying: response_data[0].more_about_mentor.location,
            institution_name: response_data[0].more_about_mentor.institution_name,
            studying_in: response_data[0].more_about_mentor.studying_in,
            working_for: response_data[0].more_about_mentor.working_for,
            position_at_company: response_data[0].more_about_mentor.position,
            latest_certificate: response_data[0].more_about_mentor.latest_certificate,
            pre_scholarship_info: response_data[0].more_about_mentor.pre_scholarship_info,
            extra_activities: response_data[0].more_about_mentor.extra_activities,
            experience_with_students: response_data[0].more_about_mentor.experience_with_students,
            experience: response_data[0].more_about_mentor.experience,
            intention: response_data[0].more_about_mentor.intention,
            about_us: response_data[0].more_about_mentor.about_us,
            comments: response_data[0].more_about_mentor.comments,
            about_yourself: response_data[0].more_about_mentor.about_yourself,
            resident_permit_passport: response_data[0].more_about_mentor.resident_permit_passport,
            campus_or_employee_card: response_data[0].more_about_mentor.campus_or_employee_card,
            signature: response_data[0].more_about_mentor.signature,
            profession: response_data[0].more_about_mentor.profession,
          };
          res.send(returning_data)
        })
        .catch(err => {

          errorStatus.serverError(res);
        })
    }
    else {
      res.status(403).send({ Error: "Forbidden!!!" })
    }

  },

  async sendOTPToUserIfMailExist(req, res) {
    let clue = { email: req.body.email }
    let OTPCode = otp()

    passwordResetRepo.checkingDataExistence(clue)
      .then(result => {
        if (!result[0] && !result[1] && !result[2]) {
          errorStatus.dataNotFound(res)
        }
        else if (result[2]) {
          
          OtpRepo.updateOTP(clue, { otp_code: OTPCode })
            .then(updatedOTP=>{

              sendEmail({
                to: clue.email,
                subject: "Password recovery",
                text : `Use this ${OTPCode} OTP to reset your password.`
              }).then(isSent=>{
                res.send({isOTPSent: true, message: `OTP has been sent to ${clue.email}`, email: clue.email})
              }).catch(error=>{
                console.log(error)
              errorStatus.serverError(res)
              })


            })
            .catch(error=>{
              console.log(error)
              errorStatus.serverError(res)
            })
        }
        else {
          OtpRepo.insertIntoOtp({
            email : clue.email,
            otp_code : OTPCode
          }).then(isCreated=>{
            

            sendEmail({
              to: clue.email,
              subject: "Password recovery",
              text : `Use this ${OTPCode} OTP to reset your password.`
            }).then(isSent=>{
              res.send({isOTPSent: true,message: `OTP has been sent to ${clue.email}`, email: clue.email})
            }).catch(error=>{
              console.log(error)
              errorStatus.serverError(res)
            })


          })
          .catch(error=>{
            console.log(error)
            errorStatus.serverError(res)
          })
        }
      })
      .catch(error => {
        console.log(error)
        errorStatus.serverError(res)
      })
  },

  async checkingOTP(req, res){
    OtpRepo.checkOTPExistence({otp_code: req.body.otpCode, email: req.body.email})
      .then(isFound=>{
        res.send(isFound[0]?{isOTPMatched: true}: {isOTPMatched: false})
      })
      .catch(error=>{
        console.log(error)
        errorStatus.dataNotFound(res)
      })
  },

  async passwordReset(req, res){
    let encryptedPassword = await bcrypt.hash(req.body.password, 12);
    passwordResetRepo.passwordReset({password: encryptedPassword}, { email: req.body.email})
      .then(r=>{
        if(r[0][0] || r[1][0]){
          res.send({message: "Password has been updated"})
        }else{
          errorStatus.dataNotFound(res)
        }
      })
      .catch(e=>{
        res.send(e)
      })
  },
  

};
module.exports = Login;
