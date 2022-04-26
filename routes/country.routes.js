var express = require("express"); //importing express
var countryRouter = express.Router(); //making router handlers
var ServiceCountryController = require("../controllers/services_country.controller")

countryRouter.get("/get_all_countries/:page", ServiceCountryController.getAllCountryOverview);
countryRouter.get("/get_one_country/:id", ServiceCountryController.getOneCountry);
countryRouter.get("/get_country_name", ServiceCountryController.getIdAndName)
countryRouter.get("/get_mentor_from_country/:id", ServiceCountryController.showingCountryWiseMentor)

module.exports = countryRouter;