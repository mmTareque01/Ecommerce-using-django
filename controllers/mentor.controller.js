const MentorsRepo = require("../Repositories/mentor.repo");
const bcrypt = require("bcryptjs");
const errorStatus = require("../util/error_status");
const CountryRepo = require("../Repositories/servicesCountry.repo");
const Email = require("../util/mailer")
// const Email = require('../util/email/transporter')

var mentorsDataController = {

  //==============={ Mentor Sign Up Api For First Section }===============//
  async signUpPage1(req, res) {
    let data = {
      full_name: req.body.full_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      phone: req.body.phone,
      status: 0,
      is_blocked: 0
    };
    if (data.password != undefined) {
      MentorsRepo.createMentorProfile(data)
        .then(result => {
          if (result.isCreated) { res.send({ mentorId: result.mentor_id }) }
          else { res.status(422).send({ message: result.message }) }
        })
        .catch(error => {
          console.log(error)
          errorStatus.serverError(res);
        })
    }
    else {
      console.log("password encryption issues!")
      errorStatus.serverError(res);
    }
  },

  //==============={ Mentor Sign Up Api For Second Section }===============//
  async signUpPage2(req, res) {
    MentorsRepo.updateMentorProfile({
      present_address: req.body.present_address,
      parmanent_address: req.body.permanent_address,
      country: req.body.country,
      whatsapp: req.body.whatsapp_number,
      gender: req.body.gender,
      city: req.body.city,
      facebook: req.body.facebook_url,
      linkedIn: req.body.linkedIn_url,
      instagram: req.body.instagram_url,
      student_email: req.body.student_email,
      bank_account: req.body.bank_account,
    }, { id: req.body.mentor_id })
      .then(result => {
        res.send({ mentorId: req.body.mentor_id })
      })
      .catch(error => {
        console.log(error)
        errorStatus.serverError(res);
      })
  },

  //==============={ Mentor Sign Up Api For Third Section }===============//
  async signUpPage3(req, res) {
    let responsible_for_info = []
    req.body.responsible_for.map(countryId => {
      responsible_for_info.push({
        mentor_id: req.body.mentor_id,
        country_id: countryId
      })
    })
    MentorsRepo.mentorSignUpThird(
      responsible_for_info,
      {
        location: req.body.country_studying_working,
        institution_name: req.body.study_institution,
        studying_in: req.body.study_program,
        working_for: req.body.company_working,
        position: req.body.company_working_position,
        latest_certificate: req.body.previous_education,
        pre_scholarship_info: req.body.awarded_scholarship,
        extra_activities: req.body.extracurricular_activities,
        experience_with_students: req.body.community_group,
        experience: req.body.working_consultancy_currently,
        about_yourself: req.body.about_yourself,
        about_us: req.body.know_abroad_inquiry,
        comments: req.body.comments,
        intention: req.body.intention_working_other_firm,
        profession: req.body.profession,
        mentoring_for: JSON.stringify(req.body.mentoring_for)
      },
      { mentor_id: req.body.mentor_id })
      .then(re => {
        res.send({ mentorId: req.body.mentor_id })
      })
      .catch(error => {
        console.log(error)
        errorStatus.serverError(res);
      })
  },

  //==============={ show all mentors overview }===============//
  async getAllMentorOverview(req, res) {
    MentorsRepo.showAllMentors(
      {
        status: true,
        is_blocked: false
      },
      ((req.params.page - 1) * 10)
    )
      .then(result => {
        let returningData = []
        result[0].map(data => {
          returningData.push({
            "id": data.id,
            "mentorName": data.full_name,
            "profilePic": data.profile_pic,
            "liveIn": data.more_about_mentor.location,
            "mentoringFor": JSON.parse(data.more_about_mentor.mentoring_for)
          })
        })
        res.send({ mentor: returningData, totalMentor: result[1] })
      })
      .catch(error => {
        console.log(error)
        errorStatus.serverError(res);
      })
  },

  //==============={ get all mentors data }===============//
  async getAllData(req, res) {
    MentorsRepo.getAllMentorsData({ id: req.user.userId })
      .then(responseData => {
        res.send({
          mentorId: responseData[0].id,
          mentorName: responseData[0].full_name,
          mentorEmail: responseData[0].email,
          mentorPhone: responseData[0].phone,
          mentorWhatsapp: responseData[0].whatsapp,
          mentorPresentAddress: responseData[0].present_address,
          mentorPermanentAddress: responseData[0].parmanent_address,
          mentorCountry: responseData[0].country,
          mentorCity: responseData[0].city,
          mentorGender: responseData[0].gender,
          mentorProfilePic: responseData[0].profile_pic,
          mentorFacebook: responseData[0].mentors_contact.facebook,
          mentorLinkedIn: responseData[0].mentors_contact.linkedIn,
          mentorInstagram: responseData[0].mentors_contact.instagram,
          mentorStudentEmail: responseData[0].mentors_contact.student_email,
          mentorBankAccount: responseData[0].mentors_contact.bank_account,
          mentorWorkingOrStudying: responseData[0].more_about_mentor.location,
          mentorInstitutionName: responseData[0].more_about_mentor.institution_name,
          mentorStudyingIn: responseData[0].more_about_mentor.studying_in,
          mentorWorkingFor: responseData[0].more_about_mentor.working_for,
          mentorPositionAtCompany: responseData[0].more_about_mentor.position,
          mentorLatestCertificate: responseData[0].more_about_mentor.latest_certificate,
          mentorPreScholarshipInfo: responseData[0].more_about_mentor.pre_scholarship_info,
          mentorExtraActivities: responseData[0].more_about_mentor.extra_activities,
          mentorExperienceWithStudents: responseData[0].more_about_mentor.experience_with_students,
          mentorExperience: responseData[0].more_about_mentor.experience,
          mentorIntention: responseData[0].more_about_mentor.intention,
          mentorAboutUs: responseData[0].more_about_mentor.about_us,
          mentorComments: responseData[0].more_about_mentor.comments,
          mentorAboutYourself: responseData[0].more_about_mentor.about_yourself,
          mentorResidentPermitPassport: responseData[0].more_about_mentor.resident_permit_passport,
          campus_or_employee_card: responseData[0].more_about_mentor.campus_or_employee_card,
          signature: responseData[0].more_about_mentor.signature,
          mentorProfession: responseData[0].more_about_mentor.profession,
          mentoringFor: JSON.parse(responseData[0].more_about_mentor.mentoring_for)
        });
      })
      .catch(err => {
        console.log(err)
        errorStatus.serverError(res);
      })
  }, // need improvement..

  //==============={ get all mentors data }===============//
  async profileView(req, res) {
    MentorsRepo.getAllMentorsData({ id: req.params.id })
      .then(responseData => {
        res.send({
          mentorId: responseData[0].id,
          mentorName: responseData[0].full_name,
          mentorEmail: responseData[0].email,
          mentorPhone: responseData[0].phone,
          mentorWhatsapp: responseData[0].whatsapp,
          mentorPresentAddress: responseData[0].present_address,
          mentorPermanentAddress: responseData[0].parmanent_address,
          mentorCountry: responseData[0].country,
          mentorCity: responseData[0].city,
          mentorGender: responseData[0].gender,
          mentorProfilePic: responseData[0].profile_pic,
          mentorFacebook: responseData[0].mentors_contact.facebook,
          mentorLinkedIn: responseData[0].mentors_contact.linkedIn,
          mentorInstagram: responseData[0].mentors_contact.instagram,
          // mentorStudentEmail: response_data[0].mentors_contact.student_email,
          // mentorBankAccount: response_data[0].mentors_contact.bank_account,
          mentorWorkingOrStudying: responseData[0].more_about_mentor.location,
          mentorInstitutionName: responseData[0].more_about_mentor.institution_name,
          mentorStudyingIn: responseData[0].more_about_mentor.studying_in,
          mentorWorkingFor: responseData[0].more_about_mentor.working_for,
          mentorPositionAtCompany: responseData[0].more_about_mentor.position,
          mentorLatestCertificate: responseData[0].more_about_mentor.latest_certificate,
          mentorPreScholarshipInfo: responseData[0].more_about_mentor.pre_scholarship_info,
          mentorExtraActivities: responseData[0].more_about_mentor.extra_activities,
          mentorExperienceWithStudents: responseData[0].more_about_mentor.experience_with_students,
          mentorExperience: responseData[0].more_about_mentor.experience,
          // mentorIntention: response_data[0].more_about_mentor.intention,
          // mentorAboutUs: response_data[0].more_about_mentor.about_us,
          // mentorComments: response_data[0].more_about_mentor.comments,
          mentorAboutYourself: responseData[0].more_about_mentor.about_yourself,
          // mentorResidentPermitPassport: response_data[0].more_about_mentor.resident_permit_passport,
          // campus_or_employee_card: response_data[0].more_about_mentor.campus_or_employee_card,
          // signature: response_data[0].more_about_mentor.signature,
          mentorProfession: responseData[0].more_about_mentor.profession,
          mentoringFor: JSON.parse(responseData[0].more_about_mentor.mentoring_for)
        });

      })
      .catch(err => {
        console.log(err)
        errorStatus.serverError(res);
      })
  }, // need improvement..

  //==============={ mentor profile update }===============//
  async updateMentorProfile(req, res) {
    MentorsRepo.updateProfile({
      mentor_id: req.body.mentorId,
      full_name: req.body.mentorName,
      email: req.body.mentorEmail,
      phone: req.body.mentorPhone,
      whatsapp: req.body.mentorWhatsapp,
      present_address: req.body.mentorPresentAddress,
      parmanent_address: req.body.mentorParmanentAddress,
      country: req.body.mentorCountry,
      city: req.body.mentorCity,
      gender: req.body.mentorGender,
      facebook: req.body.mentorFacebook,
      linkedIn: req.body.mentorLinkedIn,
      instagram: req.body.mentorInstagram,
      location: req.body.mentorLocation,
      institution_name: req.body.mentorInstitutionName,
      studying_in: req.body.mentorStudyingIn,
      working_for: req.body.mentorWorkingFor,
      position: req.body.mentorPosition,
      latest_certificate: req.body.mentorLatestCertificate,
      pre_scholarship_info: req.body.mentorPreScholarshipInfo,
      extra_activities: req.body.mentorExtraActivities,
      experience_with_students: req.body.mentorExperienceWithStudents,
      experience: req.body.mentorExperience,
      intention: req.body.mentorIntention,
      about_us: req.body.mentorAboutUs,
      comments: req.body.mentorComments,
      about_yourself: req.body.mentorAboutYourself,
      student_email: req.body.mentorStudentEmail,
      bank_account: req.body.mentorBankSccount,
    })
      .then((result) => {
        res.status(200).send({
          message:
            "You have applied to update your profile. Please wait for approval.",
        });
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);
      });
  }, // need to work with id

  //==============={Schedules}===============//
  async uploadMultipleFile(req, res) {
    let data = {
      resident_permit_passport: req.files.resident_permit_passport[0].path,
      campus_or_employee_card: req.files.campus_or_employee_card[0].path,
      signature: req.files.signature[0].path,
    };
    MentorsRepo.updateMoreAboutMentors(data, {
      mentor_id: req.params.mentor_id,
    })
      .then((result) => {

        res.send({ message: "Application has been successful" })

      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);
      });

    // res.send("weorking");
  }, //update mentors file

  //==============={ update password }===============//
  async updatePassword(req, res) {
    MentorsRepo.updatePersonal(
      { password: await bcrypt.hash(req.body.password, 12) },
      { id: req.body.mentor_id }
    )
      .then((result) => {
        res.status(200).send({ message: "Your password has been updated" });
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);

      });
  },

  //==============={ upload profile pic }===============//
  async uploadProfilePic(req, res) {
    if (req.file == undefined) {
      res.send({ message: "Please select an image" });
    } else {
      MentorsRepo.updatePersonal(
        { profile_pic: req.file.path },
        { id: req.params.id }
      )
        .then((data) => {
          res.send({
            message: "profile picture has been updated",
            path: req.file.path,
          });
        })
        .catch((err) => {
          errorStatus.serverError(res);
        });
    }
  },


  async meilTesitn(req, res) {
    console.log(Email())
    res.send("requested...")
  },



  //==============={update profile pic}===============//
  async updateProfilePic(req, res) {
    if (req.file == undefined) {
      res.send({ message: "Please select an image" });
    } else {
      let data = {
        mentor_id: req.body.mentor_id,
        profile_pic: req.file.path,
      };

      MentorsRepo.findUpdateProfileData({ mentor_id: data.mentor_id })
        .then((temp_data) => {
          let temp_data_len = Object.keys(temp_data).length;

          if (temp_data_len > 0) {
            MentorsRepo.updateProfile(
              { profile_pic: data.profile_pic },
              { mentor_id: data.mentor_id }
            )
              .then((result) => {
                res.status(200).send({
                  message:
                    "Your application has been submitted. Need to be approved.",
                });
              })
              .catch((error) => {
                errorStatus.serverError(res);
              });
          } else {
            MentorsRepo.insertIntoMoreAboutMentor(data)
              .then((result) => {
                res.status(200).send({
                  message:
                    "Your application has been submitted. Need to be approved.",
                });
              })
              .catch((error) => {
                errorStatus.serverError(res);
              });
          }
        })
        .catch((error) => {
          errorStatus.serverError(res);
        });
    }
  }, // need to work with it




};

module.exports = mentorsDataController;
