class AppointmentMiddleware {


    assignMentorsSchedule(req, res, next){
        // var date_regex = /(0[1-9]|1\d|2\d|3[01])\/^(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
        var date_regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$/

        if ((date_regex.test(req.body.appointment_date))) {
            console.log("matched")
            next();
        }
        else{
            console.log("not macthc")
            next()
        }
        // if(
        //     req.body.mentor_id === undefined ||
        //     req.body.start_time === undefined ||
        //     req.body.end_time === undefined ||
        //     req.body.appointment_date === undefined
        // ){
           
        //     res.status(400).send({message:"Please insert every field properly! and try again. Thank you."})
        // }
        // else if(
        //     req.body.mentor_id === null ||
        //     req.body.start_time === null ||
        //     req.body.end_time === null ||
        //     req.body.appointment_date === null
        // ){
        //     res.status(400).send({message:"Please insert every field properly! and try again. Thank you."})

        // }
        // else{
        //     let a = (req.body.appointment_date).length
        //     console.log(a)
        //     next();
        // }
    }





    // createAnAppointment(req, res){
    //     if(
    //         req.body.mentor_id === undefined ||
    //         req.body.student_id === undefined ||
    //         req.body.start_time === undefined ||
    //         req.body.end_time === undefined ||
    //         req.body.appointment_date === undefined ||
    //         req.body.time_zone === undefined
    //     ){
    //         return res(null, true);
    //     }
    //     else{
            
    //     }
        

    // }
}

module.exports = new AppointmentMiddleware();