const error_status = require("../../util/error_status")
const students_repo = require("../repositories/students.repositories")



var students_controller = {

    async get_students_overview(req, res){
        students_repo.get_all_students()
            .then(data=>{
                let returning_data = []
                data.map(students_data=>{
                    returning_data.push({
                        students_id: students_data.id,
                        students_name: students_data.name,
                        students_email: students_data.email,
                        students_profile_pic: students_data.profilePic,
                        students_id: students_data.id
                    })
                })
                if(returning_data.length > 0){
                    res.status(200).send(returning_data)
                }else{
                    res.status(404).send(returning_data)
                }
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })
    },

    async get_one_students_data(req, res){
        students_repo.get_one_students_data({id : req.params.students_id})
            .then(students_data=>{
                if(students_data.length > 0){
                    res.status(200).send({
                        students_id: students_data[0].id,
                        students_email: students_data[0].email,
                        students_name: students_data[0].name,
                        students_phone: students_data[0].phone,
                        students_gender: students_data[0].gender,
                        students_profile_pic: students_data[0].profilePic,
                        students_country_of_origin: students_data[0].country_of_origin,
                        students_currently_live_in: students_data[0].currently_live_in,
                        students_english_proficiency: students_data[0].english_proficiency,
                        students_last_academic_qualification: students_data[0].last_academic_qualification,
                        students_last_academic_result: students_data[0].last_academic_result,
                        students_institution_name: students_data[0].institution_name,
                        students_want_to_study: students_data[0].want_to_study,
                        students_want_to_go: students_data[0].want_to_go,
                        students_working_experience: students_data[0].working_experience,
                        students_extracurricular_activities: students_data[0].extracurricular_activities,
                        students_publications: students_data[0].publications,
                        students_community_work: students_data[0].community_work,
                        students_about_yourself: students_data[0].about_yourself,
                    })
                }else{
                    res.status(404).send({error:"Data Not Found"})
                }
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })

    },

    async delete_student(req, res){
        students_repo.delete_student({id:req.params.student_id})
            .then(is_deleted=>{
                res.send({is_deleted: true})
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })
    }



}

module.exports = students_controller;