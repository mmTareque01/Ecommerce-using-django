const jwt = require("jsonwebtoken")

const password_update = (req, res, next)=>{
    let data = req.body;
    const auth_header = req.headers['authentication_token']
    const token = auth_header && auth_header.split(' ')[1]
    if(token == null){return res.status(404).send({error:"Data Not Found"})}

    jwt.verify(token, "administration_token", (error, user)=>{
        if(error) return res.status(403).send({error: "Session expired!"})

        if(data.password != data.confirm_password){
            res.send({error:"Confirm password not matched"})
        }
        req.body = {
            email: user.email,
            password: data.password
        }
        next()
    })
}
module.exports = password_update

