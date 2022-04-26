const StudentsRepo = require("../Repositories/students.repo");
const bcrypt = require("bcryptjs");
const errorStatus = require('../util/error_status')
const jwt = require("jsonwebtoken");

var studensDataControllers = {

  async signUp(req, res){
    StudentsRepo.signUp(
      {
        email : req.body.email,
        name : req.body.name,
        phone : req.body.phone,
        password : await bcrypt.hash(req.body.password, 12)
      }
    )
    .then(result=>{


      if(result.isCreated){
        const token = jwt.sign({
          email : result.message.email,
          userId : result.message.id,
          userStatus : "student"
        },"secretkey",
        {expiresIn: "7d"}
        )
        console.log(token)
        res.status(201).json({
          message: "User created!",
          userId: result.message.id,
          email: result.message.email,
          phone: result.message.phone,
          token : token
        });
      }
      else{
        res.status(422).send({message: result.message})
      }
    })
    .catch(error=>{
      res.send(error)
    })
  },

  async getAllData(req, res) {
    StudentsRepo.getAllData({id: req.user.userId})
      .then((data) => {
        res.send({
          studentId : data[0].id,
          studentEmail : data[0].email,
          studentPhone : data[0].phone,
          studentName : data[0].name,
          studentEnglishProficiency : data[0].english_proficiency,
          studentAcademicQualification : data[0].last_academic_qualification,
          studentAcademicResult : data[0].last_academic_result,
          studentInstitutionName : data[0].institution_name,
          studentWantToStudy : data[0].want_to_study,
          studentWantToGo : data[0].want_to_go,
          studentWorkingExperience : data[0].working_experience,
          studentExtraActivities : data[0].extracurricular_activities,
          studentPublications : data[0].publications,
          studentCurrentlyLive : data[0].currently_live_in,
          studentOrigin : data[0].country_of_origin,
          studentCommunityWork : data[0].community_work,
          studentProfilePic : data[0].profilePic,
          studentAbout : data[0].about_yourself,
          studentGender : data[0].gender,
        });
      })
      .catch((err) => {
        console.log(err)
        errorStatus.serverError(res);
      });
  }, //getting students data by using id

  async studentProfileView(req, res) {
    StudentsRepo.getAllData({id: req.params.id})
      .then((data) => {
        res.send({
          studentId : data[0].id,
          studentEmail : data[0].email,
          studentPhone : data[0].phone,
          studentName : data[0].name,
          studentEnglishProficiency : data[0].english_proficiency,
          studentAcademicQualification : data[0].last_academic_qualification,
          studentAcademicResult : data[0].last_academic_result,
          studentInstitutionName : data[0].institution_name,
          studentWantToStudy : data[0].want_to_study,
          studentWantToGo : data[0].want_to_go,
          studentWorkingExperience : data[0].working_experience,
          studentExtraActivities : data[0].extracurricular_activities,
          studentPublications : data[0].publications,
          studentCurrentlyLive : data[0].currently_live_in,
          studentOrigin : data[0].country_of_origin,
          studentCommunityWork : data[0].community_work,
          studentProfilePic : data[0].profilePic,
          studentAbout : data[0].about_yourself,
          studentGender : data[0].gender,
        });
      })
      .catch((err) => {
        console.log(err)
        errorStatus.serverError(res);
      });
  }, //getting students data by using id


  async updateAllData(req, res) {
    StudentsRepo.updateProfile(
      {
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        english_proficiency: req.body.english_proficiency,
        last_academic_qualification: req.body.last_academic_qualification,
        last_academic_result: req.body.last_academic_result,
        institution_name: req.body.institution_name,
        want_to_study: req.body.want_to_study,
        want_to_go: req.body.want_to_go,
        working_experience: req.body.working_experience,
        extracurricular_activities: req.body.extracurricular_activities,
        publications: req.body.publications,
        currently_live_in: req.body.currently_live_in,
        country_of_origin: req.body.country_of_origin,
        community_work: req.body.community_work,
        about_yourself: req.body.about_yourself,
        gender: req.body.gender
      }, 
      {id: req.user.userId})
      .then(data=>{
        res.send({
          studentId : data[0].id,
          studentEmail : data[0].email,
          studentPhone : data[0].phone,
          studentName : data[0].name,
          studentEnglishProficiency : data[0].english_proficiency,
          studentAcademicQualification : data[0].last_academic_qualification,
          studentAcademicResult : data[0].last_academic_result,
          studentInstitutionName : data[0].institution_name,
          studentWantToStudy : data[0].want_to_study,
          studentWantToGo : data[0].want_to_go,
          studentWorkingExperience : data[0].working_experience,
          studentExtraActivities : data[0].extracurricular_activities,
          studentPublications : data[0].publications,
          studentCurrentlyLive : data[0].currently_live_in,
          studentOrigin : data[0].country_of_origin,
          studentCommunityWork : data[0].community_work,
          studentProfilePic : data[0].profilePic,
          studentAbout : data[0].about_yourself,
          studentGender : data[0].gender,
        });
      })
      .catch(error=>{
        console.log(error)
        errorStatus.serverError(res);
      })
      
  }, //update specific students data

  
  async updatePassword(req, res) {
    let data = {
      password: await bcrypt.hash(req.body.password, 12),
    };
    let clue = {
      id: req.params.id,
    };
    StudentsRepo.updateData(data, clue)
      .then((result) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        errorStatus.serverError(res);
      });
  }, //update password

  async getAllMentors(req, res) {
    let clue = {
      status: true,
      is_blocked : false
    }
    StudentsRepo.getAllMentors(clue)
      .then((data) => {
          res.send(data);
      })
      .catch((err) => {
        errorStatus.serverError(res);
      });
  }, //show all approved mentors to students 

  async updateProfilePic(req, res) {
    if (req.file == undefined) {
      res.send({ message: "Please select an image" });
    } else {

      let clue = {
        id: req.params.id,
      }

      let data = {
        profilePic: req.file.path,
      }

      StudentsRepo.updateData(data, clue)
        .then((data) => {
          res.send({
            message: "profile picture has been updated",
            path: req.file.path,
          });
        })
        .catch((err) => {
          console.log(err)
          errorStatus.serverError(res);
        });
    }
  }, //update profile picture for student

  async getStudentsByEmail(req, res) {
    let clue = {
      email: req.body.email,
    }
    StudentsRepo.getAllData(clue)
      .then((data) => {

          res.send({ email: data[0].email });

      })
      .catch((error) => {
        errorStatus.serverError(res);
      });
  }, //get students by using e-mail

};
module.exports = studensDataControllers;
