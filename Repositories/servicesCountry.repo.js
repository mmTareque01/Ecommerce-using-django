const ActWithDB = require("../util/DBFunction");
const { Country } = require("../models/servicesCountry.model")


const databaseObj = new ActWithDB();


var CountryRepo = {

  //==============={Showing all country information using pagination}===============//
  getAllCountryUsingPagination(clue, attr, limit, page) {
    return databaseObj.getDataUsingPagination(Country, clue, attr, [], limit, page, ['country_id', 'ASC'])
  },

  //==============={Schedules}===============//
  getOneCountry(clue) {
    return databaseObj.getData(Country, clue);
  },

  //==============={Schedules}===============//
  getAllCountry(attr) {
    return databaseObj.getData(Country, {}, attr)
  },

  //==============={Schedules}===============//
  getCountryInfo(where, attr) {
    return databaseObj.getSpecifiqDataForOnePerson(Country, attr, where)
  }

}

module.exports = CountryRepo;