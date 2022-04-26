const jwt = require("jsonwebtoken")


const user_authentication = (req, res, next)=>{
    const auth_header = req.headers['authentication_token']
    const token = auth_header && auth_header.split(' ')[1]
    if(token == null){return res.status(404).send({error:"Invalid user"})}

    jwt.verify(token, "administration_token", (error, user)=>{
        if(error) return res.status(403).send({error: "Invalid user"})
        next()
    })
}

module.exports = user_authentication