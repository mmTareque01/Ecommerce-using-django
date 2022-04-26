const administration_model = require("../models/administration_users.model")
const database_function = require("../../util/DBFunction")
const databaseObj = new database_function();

var login_system_repo = {
    get_data_from_administration(clue){
        return databaseObj.getData(administration_model, clue)
    },

    insert_into_administration(data){
        return databaseObj.insertData(administration_model, data)
    },

    update_administration(data, clue){
        return databaseObj.updateData(administration_model, data, clue)
    },





}
module.exports = login_system_repo;