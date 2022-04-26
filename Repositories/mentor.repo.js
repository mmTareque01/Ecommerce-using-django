const ActWithDB = require("../util/DBFunction");
const {
    Personal,
    SocialMedia,
    temp_mentor_data,
    moreAboutMentors,
    mentorResponsibility,
} = require("../models/Mentor.model");
const { Result } = require("express-validator");
const {Country} = require("../models/servicesCountry.model")
const Student = require("../models/Students.model")

const databaseObj = new ActWithDB(); //database query  instance

var MentorsRepo = {
   

    //==============={update mentors personal data}===============//
    updatePersonal(jsonData, clue) {
        return databaseObj.updateData(Personal, jsonData, clue)
    },

   
    //==============={insert data into more about mentors table}===============//
    insertIntoMoreAboutMentor(jsonData) {
        return databaseObj.insertData(moreAboutMentors, jsonData)
    },

    //==============={update more about mentors table}===============//
    updateMoreAboutMentors(jsonData, clue) {
        return databaseObj.updateData(moreAboutMentors, jsonData, clue)
    },

    //==============={get mentor from specific key}===============//
    getMentor(jsonData) {
        return databaseObj.getData(Personal, jsonData);
    },

   

    //==============={update mentor profile }===============//
    updateProfile(jsonData) {
        return databaseObj.insertData(temp_mentor_data, jsonData);
    },

    //==============={update profile pi}===============//
    updateProfilePic(jsonData, clue) {
        return databaseObj.updateData(temp_mentor_data, jsonData, clue);
    },

    //==============={get update profile data}===============//
    findUpdateProfileData(jsonData) {
        return databaseObj.getData(temp_mentor_data, jsonData);
    },

    //==============={get data from mentor responsible countries}===============//
    getDataFromResponsibleCountry(attr, where) {
        return databaseObj.getSpecifiqDataForOnePerson(mentorResponsibility, attr, where)
    },

    //==============={insert data into mentor responsibility table}===============//
    mentorSignUpThird(data, second, clue) {
        return databaseObj.mentorSignUpThird(mentorResponsibility, data, moreAboutMentors, second, clue)
    },

    //==============={Schedules}===============//
    getAllMentorsData(clue) {
        // return databaseObj.getAllMentorData(Personal, SocialMedia, moreAboutMentors, mentorResponsibility, data)
        return databaseObj.getData(Personal, clue, null, [SocialMedia, moreAboutMentors, mentorResponsibility])
    },

    //==============={Schedules}===============//
    getMultipleMentorData(data) {
        return databaseObj.orOperation(Personal, data)
    },

    //==============={ show all mentors }===============//
    showAllMentors(clue, attr, skip, limit = 10) {
        return databaseObj.getDataUsingPagination(
            Personal,
            clue,
            attr,
            [SocialMedia, moreAboutMentors, mentorResponsibility],
            limit,
            skip
        )
    },

    //==============={ creating mentor profile }===============//
    createMentorProfile(data) {
        return databaseObj.insertDataToMentorProfile(Student, Personal, data, [SocialMedia, moreAboutMentors])
    },

    updateMentorProfile(data, clue, secondClue = {}) {
        return databaseObj.updateData2(Personal, data, clue, [SocialMedia, moreAboutMentors], secondClue)
    },

    updateMentorProfile2(data, clue) {
        return databaseObj.updateData2(Personal, data, clue)
    },

    getSpecificData(clue, attr){
        return databaseObj.getData(Personal, clue, attr)
    }
}

module.exports = MentorsRepo;

