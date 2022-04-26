const administration_model = require("../models/administration_users.model")
const student_model = require("../../models/Students.model")
const mentors_model = require("../../models/Mentor.model")
const database_function = require("../../util/DBFunction")
const databaseObj = new database_function();

var mentors_repositories = {
    get_all_mentors(where){
        return databaseObj.getData(mentors_model.Personal, where)
    },

    get_mentors_data(clue){
        return databaseObj.getAllDataOfMentor(
                mentors_model.Personal, 
                mentors_model.SocialMedia, 
                mentors_model.mentorResponsibility,
                 mentors_model.moreAboutMentors,
                 clue)
    },

    update_mentrs_personal(data, clue){
        return databaseObj.updateData(mentors_model.Personal, data, clue)
    },

    update_mentors_data(id, data){
        return databaseObj.updateDataUsingJoin(
                mentors_model.Personal, 
                mentors_model.SocialMedia, 
                mentors_model.mentorResponsibility,
                 mentors_model.moreAboutMentors,
                 id, data)
    },

    delete_mentors_data(id){
        return databaseObj.deleteDataUsingJoin(
                mentors_model.Personal, 
                mentors_model.SocialMedia, 
                mentors_model.mentorResponsibility,
                 mentors_model.moreAboutMentors,
                 id)
    },

    //------------------
    get_profile_update_application(){
        return databaseObj.getAllData(mentors_model.temp_mentor_data)
    },


    //------------------
    get_blocked_mentor(){
        return databaseObj.getData(mentors_model.Personal,{is_blocked: true})
    },
    // get_blocked_mentor_details(){
    //     return databaseObj.getData(mentors_model.Personal,{is_blocked: true})
    // },
}

module.exports = mentors_repositories;