const Appointment_rep = require('../repositories/appointment.repositories')


var Appointmnet_controller = {
    async get_appointmnet_application(req, res){
        Appointment_rep.getAppointmentData({})
            .then(appointment_data=>{
                res.send(appointment_data)
            })
            .catch(error=>{
                res.send(error)
            })
    }
}
module.exports = Appointmnet_controller;








