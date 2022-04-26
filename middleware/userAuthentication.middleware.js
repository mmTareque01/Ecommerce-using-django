const jwt = require("jsonwebtoken")

const userAuthentication = (req, res, next) => {

    const authHeader = req.headers['authentication_token']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log
    if(token == null){return res.status(404).send({error:"Data Not Found"})}
    jwt.verify(token, "secretkey", (err, user) => {
        if(err) {
            console.log(err)
            return res.status(403).send({error: "Session expired!"})
        }
        req.user = user
        next()
    })


}

module.exports = userAuthentication;