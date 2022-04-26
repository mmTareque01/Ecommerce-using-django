const mentors_repo = require("../repositories/mentors.repositories")
const error_status = require("../../util/error_status")

var mentors_controller = {

    async get_mentors_overview(req, res) {
        mentors_repo.get_all_mentors({ status: true, is_blocked: false })
            .then(data => {
                let retruning_data = []
                data.map(mentors_info => {
                    retruning_data.push({
                        mentor_id: mentors_info.id,
                        mentor_name: mentors_info.full_name,
                        mentor_profile_pic: mentors_info.profile_pic,
                        mentor_email: mentors_info.email
                    })
                })


                res.send(retruning_data)
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async get_all_information_about_mentor(req, res) {
        mentors_repo.get_mentors_data({ id: req.params.mentor_id })
            .then(data => {
                res.send({
                    name: data[0].full_name,
                    email: data[0].email,
                    phone: data[0].phone,
                    whatsapp: data[0].whatsapp,
                    present_address: data[0].present_address,
                    parmanent_address: data[0].parmanent_address,
                    country: data[0].country,
                    city: data[0].city,
                    gender: data[0].gender,
                    // facebook: data.mentors_contact.facebook,
                    // linkedIn: data.mentors_contact.linkedIn,
                    // instagram: data.mentors_contact.instagram,
                    // student_email: data.mentors_contact.student_email,
                    // bank_account: data.mentors_contact.bank_account,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,

                })
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async block_a_mentor(req, res) {
        mentors_repo.update_mentrs_personal(
            { is_blocked: true },
            { id: req.params.mentor_id }
        ).then(is_blocked => {
            if (is_blocked[0] === 1) {
                res.send({ message: "blocked" })
            }
            else {
                error_status.dataNotFound(res)
            }
        })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async unblock_a_mentor(req, res) {
        mentors_repo.update_mentrs_personal(
            { is_blocked: false },
            { id: req.params.mentor_id }
        ).then(is_unblocked => {
            // if (is_unblocked[0] == 1) {
            res.send({ message: "unblocked" })
            // }
            // else {
            //     error_status.dataNotFound(res)
            // }
        })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async update_mentor(req, res) {
        mentors_repo.update_mentors_data(req.params.mentor_id, req.body)
            .then(is_updated => {
                if (is_updated[0] == 1) {
                    res.send({ message: "updated" })
                }
                else {
                    error_status.dataNotFound(res)
                }
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async delete_a_mentor(req, res) {
        // res.send("werokf")
        mentors_repo.delete_mentors_data(req.params.mentor_id)
            .then(is_deleted => {
                res.send({ message: "mantor has been removed" })
            })
            .catch(error => {
                console.log(error)
                res.send(error)
            })
    }, //this can be used to delete or deny any mentor profile

    async get_new_mentor_application_overview(req, res) {
        mentors_repo.get_mentors_data({ status: false })
            .then(new_mentors_data => {
                // if(new_mentors_data.length > 0){
                let returning_data = []
                new_mentors_data.map(data => {
                    returning_data.push({
                        mentor_id: data.id,
                        mentor_name: data.full_name,
                        mentor_profile_pic: data.profile_pic,
                        mentor_email: data.email
                    })
                })
                res.send(returning_data)
                // }
                // else{
                //     res.status(200).send({message: "New applications not found"})
                // }
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async get_new_mentor_application_info(req, res){
        mentors_repo.get_mentors_data({id: req.params.mentorId, status: false})
            .then(data => {
                res.send({
                    name: data[0].full_name,
                    email: data[0].email,
                    phone: data[0].phone,
                    whatsapp: data[0].whatsapp,
                    present_address: data[0].present_address,
                    parmanent_address: data[0].parmanent_address,
                    country: data[0].country,
                    city: data[0].city,
                    gender: data[0].gender,
                    // facebook: data.mentors_contact.facebook,
                    // linkedIn: data.mentors_contact.linkedIn,
                    // instagram: data.mentors_contact.instagram,
                    // student_email: data.mentors_contact.student_email,
                    // bank_account: data.mentors_contact.bank_account,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,

                })
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })
    },

    async approve_new_mentor_application(req, res) {
        mentors_repo.update_mentrs_personal(
            { status: true },
            { id: req.params.mentor_id }
        ).then(is_unblocked => {
                res.send({ message: "approved" })
           
        })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },


    // this is updat3ed



    async get_profile_update_application_overview(req, res) {
        mentors_repo.get_profile_update_application()
            .then(profile_update_data => {
                let returning_data = []
                profile_update_data.map(data => {
                    returning_data.push({
                        mentor_name: data.full_name,
                        mentor_profile_pic: data.profile_pic,
                        mentor_email: data.email
                    })
                })
                res.send(returning_data)
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },


    async get_blocked_mentors(req, res) {
        mentors_repo.get_blocked_mentor()
            .then(blocked_mentor => {
                let returning_data = []
                blocked_mentor.map(data => {
                    returning_data.push({
                        mentor_id: data.id,
                        mentor_name: data.full_name,
                        mentor_profile_pic: data.profile_pic,
                        mentor_email: data.email
                    })
                })
                res.send(returning_data)
            })
            .catch(error => {
                console.log(error)
                error_status.serverError(res)
            })
    },

    async get_blocked_mentors_info(req, res) {
        mentors_repo.get_mentors_data({ status: true, is_blocked: true, id: req.params.mentor_id })
            .then(mentors_data => {
                res.send({
                    name: mentors_data[0].full_name,
                    email: mentors_data[0].email,
                    phone: mentors_data[0].phone,
                    whatsapp: mentors_data[0].whatsapp,
                    present_address: mentors_data[0].present_address,
                    parmanent_address: mentors_data[0].parmanent_address,
                    country: mentors_data[0].country,
                    city: mentors_data[0].city,
                    gender: mentors_data[0].gender,
                    // facebook: data.mentors_contact.facebook,
                    // linkedIn: data.mentors_contact.linkedIn,
                    // instagram: data.mentors_contact.instagram,
                    // student_email: data.mentors_contact.student_email,
                    // bank_account: data.mentors_contact.bank_account,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,
                    // city: data.mentor_responsibles.dg,

                })
            })
            .catch(error => {
                res.send(error)
            })
    }


}
module.exports = mentors_controller