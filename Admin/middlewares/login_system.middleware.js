const { validationResult } = require("express-validator");


const checking_login_data = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error(
          "Credentials not valid. Provide valid credentials."
        );
        error.statusCode = 401;
        error.data = errors.array();
        console.log(error)
        res.send(error)
    }
    else{
        next()
    }


} 

module.exports = checking_login_data;