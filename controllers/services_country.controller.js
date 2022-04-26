const CountryRepo = require("../Repositories/servicesCountry.repo");
const MentorRepo = require("../Repositories/mentor.repo");
const errorStatus = require("../util/error_status");

var serviceCountryController = {

  //==============={ Showing Overview Of All Country}===============//
  async getAllCountryOverview(req, res) {
    CountryRepo.getAllCountryUsingPagination(
      {},
      ["country_id", "country_name", "country_img"],
      10,
      req.params.page
    )
      .then((result) => {
        let returningData = []
        result[0].map(data => {
          returningData.push({
            countryId: data.country_id,
            countryName: data.country_name,
            countryImage: data.country_img
          })
        })
        res.send({totalCountry: result[1], country : returningData});
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);
      });
  },

  //==============={Get One Country Information}===============//
  async getOneCountry(req, res) {
    CountryRepo.getOneCountry({ country_id: req.params.id })
      .then((result) => {
        res.send({
          countryId: result[0].country_id,
          countryName: result[0].countryName,
          countryImage: result[0].country_img,
          description: JSON.parse(result[0].description)
        })
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);
      });
  },

  //==============={Get All Country Overview Without Pagination}===============//
  async getIdAndName(req, res) {
    CountryRepo.getAllCountry(["country_id", "country_name"])
      .then((result) => {
        let returningData = []
        result.map(data => {
          returningData.push({
            countryId: data.country_id,
            countryName: data.country_name
          })
        })
        res.send(returningData);
      })
      .catch((error) => {
        console.log(error)
        errorStatus.serverError(res);
      });
  },

  //==============={will be removed}===============//
  async showingCountryWiseMentor(req, res) {
    let where = {
      country_id: req.params.id,
    };

    let mentors = [];

    MentorRepo.getDataFromResponsibleCountry(["mentor_id"], where)
      .then((result) => {
        if (result.length > 0) {
          let mentor_clue = []
          result.map(data => {
            mentor_clue.push({
              id: data.mentor_id,
              status: true
            })
          })


          MentorRepo.getMultipleMentorData(mentor_clue)
            .then(mentor_info => {
              res.send(mentor_info)
            })
            .catch(error => {
              res.send(error)
            })
        }
        else {
          res.send([])
        }

      })
      .catch((error) => {
        errorStatus.serverError(res);
      });
  },

};
module.exports = serviceCountryController;
