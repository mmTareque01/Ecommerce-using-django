const administration_model = require("../models/administration_users.model")
const student_model = require("../../models/Students.model")
const database_function = require("../../util/DBFunction")
const databaseObj = new database_function();


var students_repo = {
    get_all_students(){
        return databaseObj.getAllData(student_model)
    },

    get_one_students_data(clue){
        return databaseObj.getData(student_model, clue)
    },

    delete_student(clue){
        return databaseObj.deleteData(student_model, clue)
    }
}

module.exports = students_repo;