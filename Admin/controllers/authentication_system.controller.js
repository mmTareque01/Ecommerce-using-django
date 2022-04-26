const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authentication_system_repo = require("../repositories/authentication_system.repo")
const error_status = require("../../util/error_status")
const otp = require("../../util/OTP");

var login_system = {

    async login (req, res){
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        authentication_system_repo.get_data_from_administration({email : data.email})
            .then(administartion_data=>{

                
                if(administartion_data.length > 0){

                    bcrypt.compare(`${data.password}`, administartion_data[0].password)
                        .then(isEqual => {
                            if(!isEqual){
                                res.status(404).send({error:"Invalid User!"})
                            }
                            else{
                                // res.send("adf")
                                const token = jwt.sign({
                                    email: administartion_data[0].email,
                                    administartion_id : administartion_data[0].administartion_id,
                                    status : administartion_data[0].status
                                },"administration_token",
                                {expiresIn: "7d"}
                                );
                                res.send({
                                    name: administartion_data[0].name,
                                    profile: administartion_data[0].profile_pic,
                                    token: token
                                })
                            }
                        })
                        .catch(error=>{
                            res.send(error)
                        })




                   



                }
                else{
                    res.send({error:"Invalid User"})
                }
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })
    },

    async reset_password(req, res){
        authentication_system_repo.get_data_from_administration({email:req.body.email})
            .then(administartion_data=>{
                if(administartion_data.length > 0){
                    res.send("got data")

                    // send otp to email

                    





                }
                else{
                    res.send({error: "Email is not exists"})
                }
            })
            .catch(error=>{
                console.log(error)
                error_status.serverError(res)
            })
    },

    async update_password(req, res){

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(`${req.body.password}`, salt, (err, hash) =>{
                if(!err){
                    authentication_system_repo.update_administration(
                        {password: hash},
                        {email: req.body.email}
                    ).then(isUpdated => {
                        res.send({
                            result: isUpdated,
                            message: "Password has been updated"
                        })
                    })
                    .catch(error=> {
                        console.log(error)
                        error_status.serverError(res)
                    })
                }
                else{
                    console.log(err)
                    res.send({error: "Incorrect data"})
                }
                
            });
        });
    }
}

module.exports = login_system;
