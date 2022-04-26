const res = require("express/lib/response");
const { Op, where } = require("sequelize");

class ActWithDB {


  getAllData(model, clue = {}, limit, skip = 0) {
    let data = model.findAll({
      where: clue,
      offset: skip,
      limit: limit
    });
    return data;
  }

  insertData(model, data) {
    return model.create(data);
  }

  //==============={ responsible for mentor sign up }===============//
  insertDataToMentorProfile(studentModel, parentModel, data, childModel) {
    return new Promise((resolve, reject) => {
      studentModel.count({
        where: { email: data.email }
      }).then(foundStudent => {
        if (foundStudent > 0) {
          return resolve({ isCreated: false, message: "Email is already exist!" })
        }
        else {
          parentModel.findOrCreate({
            where: { email: data.email },
            defaults: data
          }).then(isRegistered => {
            if (isRegistered[1]) {
              childModel.map(model => {
                model.create({ mentor_id: isRegistered[0].id })
              })
              return resolve({ isCreated: true, mentor_id: isRegistered[0].id })
            }
            else {
              return resolve({ isCreated: false, message: "Email is already exist!" })
            }
          }).catch(error => {
            return reject(error)
          })
        }
      }).catch(error => {
        return reject(error)
      })
    })
  }

  //==============={ responsible for student sign up }===============//
  studentSignUp(mentorModel, parentModel, data) {
    return new Promise((resolve, reject) => {
      mentorModel.count({
        where: { email: data.email }
      }).then(foundStudent => {
        if (foundStudent > 0) {
          return resolve({ isCreated: false, message: "Email is already exist!" })
        }
        else {
          parentModel.findOrCreate({
            where: { email: data.email },
            defaults: data
          }).then(isRegistered => {
            if (isRegistered[1]) {

              return resolve({ isCreated: true, message: isRegistered[0] })
            }
            else {
              return resolve({ isCreated: false, message: "Email is already exist!" })
            }
          }).catch(error => {
            return reject(error)
          })
        }
      }).catch(error => {
        return reject(error)
      })
    })
  }

  //==============={ responsible for mentor sign up }===============//
  mentorSignUpThird(model, data, secondModel, secondData, clue) {
    return Promise.all([
      model.bulkCreate(data),
      secondModel.update(secondData, { where: clue })
    ])
  }

  getData(parentModel, clue = {}, attr = null, childModel = []) {
    return parentModel.findAll({
      where: clue,
      attributes: attr,
      include: childModel
    });
  }

  getAppointmentInformation(parentModel=[], clue, childModel){
   let returningData = []
    parentModel.map(model=>{
      returningData.push(model.findAll({
        where: clue,
        include: childModel
      }))
    })
    return Promise.all(returningData)
  }

  getDataUsingPagination(parentModel, clue = {}, attr = null, childModel = [], limit, page = 1, order = ['id', 'ASC']) {
    return Promise.all([
      parentModel.findAll({
        where: clue,
        attributes: attr,
        order: [order],
        offset: (page - 1) * limit,
        limit: limit,
        include: childModel
      }
      ),
      parentModel.count({
        where: clue
      })
    ]);
  }

  deleteData(model, clue) {
    return model.destroy({
      where: clue
    })
  }

  studentProfileUpdate(model, data, clue){
    return new Promise((resolve, reject)=>{
      model.update(data, {where: clue})
        .then(res=>{
          return resolve(model.findAll({where: clue}))
        })
        .catch(error=>{return reject(error)})
    })
  }

  deleteDataUsingJoin(parentModel, childModel1, childModel2, childModel3, data) {
    return parentModel.destroy({
      where: { id: data },
      include: [childModel1, childModel2, childModel3]
    })
  }

  updateData(parentModel, data, clue) {
    return parentModel.update(data, {
      where: clue
    })
  }

  updateData2(parentModel, data, clue, childModel = [], childModelClue = {}) {
    return Promise.all([
      parentModel.update(data, { where: clue }),
      childModel.map(model => {
        model.update(data, { where: childModelClue })
      })
    ])
  }

  updateDataUsingJoin(parentModel, childModel1, childModel2, childModel3, data, clue) {
    return parentModel.update(data, {
      where: { id: clue },
      include: [childModel1, childModel2, childModel3]
    })
  }

  getSpecifiqData(model, attr) {
    return model.findAll(
      {
        attributes: attr
      }
    )
  }

  getSpecifiqDataForOnePerson(model, attr, where) {
    return model.findAll(
      {
        where: where,
        attributes: attr
      }
    )
  }

  orOperation(model, clue) {
    return model.findAll(
      {
        where: {
          [Op.or]: clue
        }
      }
    )
  }

  getAllMentorData(parentModel, childModel1, childModel2, childModel3, data) {
    return parentModel.findAll({
      where: { id: data },
      include: [childModel1, childModel2, childModel3]
    })
  }

  joinTwoTable(parentModel, childModel, clue) {
    return parentModel.findAll({
      where: clue,
      include: [childModel]
    })
  }

  joinThreeTable(model1, model2, model3, clue) {

    return model3.findAll({
      where: clue,
      include: [
        {
          model: model1
        },
        {
          model: model2
        }
      ]
    })
  }

  getAllDataOfMentor(parentModel, childModel1, childModel2, childModel3, clue) {
    return parentModel.findAll({
      where: clue,
      include: [childModel1, childModel2, childModel3]
    })
  }

  insertAndFetch(insertTo, insertData, fetchFrom, dataFetchingClue, insertTo_, insertData_) {
    return Promise.all([
      insertTo.create(insertData),
      fetchFrom.findAll({
        where: dataFetchingClue
      }),
      insertTo_.create(insertData_)
    ])
  }

  updateAndCreate(updateOf, updateOfClue, updateData, insertTo_, insertData_) {
    return Promise.all([
      updateOf.update(updateData, { where: updateOfClue }),
      insertTo_.create(insertData_)
    ])
  }

  getAndCreate(gettingFrom, gettingDataClue, insertTo, insertData) {
    return Promise.all([
      gettingFrom.findAll({ where: gettingDataClue }),
      insertTo.create(insertData)
    ])
  }

  updateAndDelete(updateOf, updateData, updateDataClue, deleteOf, deletingDataClue) {
    return Promise.all([
      updateOf.update(updateData, { where: updateDataClue }),
      deleteOf.destroy({ where: deletingDataClue })
    ])
  }


  //==============={ apply for appointment }===============//
  applyForAppointment(appointmentModel, mentorNotificationModel, data) {
    return new Promise((resolve, reject) => {
      appointmentModel.create({
        mentor_id: data.mentor_id,
        student_id: data.student_id,
        start_time: data.start_time,
        end_time: data.end_time,
        appointment_date: data.appointment_date,
        status: false,
        query : data.query
      })
        .then(res => {
          // return resolve(res)
          return resolve(mentorNotificationModel.create({
            mentor_id: data.mentor_id,
            notification: data.notification,
            appointment_id: res.appointment_id,
            is_read: false
          }))
        })
        .catch(error => {
          return reject(error)
        })
    })
  }

  //==============={ completing appointment }===============//

  completingAppointment(appointmentModel, clue, appointmentRecords, feedback) {
    return new Promise((resolve, reject) => {
      appointmentModel.findAll({ where: clue })
        .then(res => {
          resolve(
            Promise.all([
              appointmentRecords.create({
                mentor_id: res[0].mentor_id,
                student_id: res[0].student_id,
                start_time: res[0].start_time,
                end_time: res[0].end_time,
                appointment_date: res[0].appointment_date,
                mentor_feedback: feedback,
                query:  res[0].query,
                appointment_id: clue.appointment_id
              })
              ,
              appointmentModel.destroy({ where: clue })
            ])
          )
        })
        .catch(error => { reject(error) })
    })
  }

  //==============={ password resetting system }===============//
  dataChecking(model, clue){
    let returningData = []
    model.map(myModel=>{
      returningData.push(myModel.count({where: clue}))
    })
    return Promise.all(returningData)
  }

  updateDateByCheckingModel(model, data, clue){
    let returningData = []
    model.map(myModel=>{
      returningData.push(
        myModel.update(data, {where: clue})
      )
    })
    return Promise.all(returningData)
  }



}

module.exports = ActWithDB;