function isContainsNumber(_string) {
    return /\d/.test(_string);
  }
function isContainsStringLowwerCase(_string) {
    return /[a-z]/.test(_string);
  }
function isContainsStringUpperCase(_string) {
    return /[A-Z]/.test(_string);
  }
function isContainsSpecialCharacters(string){
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(string);
}

const checkpassword = (req, res, next) => {

    if (
        // req.body.confirm_password == undefined ||
        req.body.password == undefined
    ) {
        res.status(400).send({ error: "Please use our app app carefully..." });
    }
    else {
        let password_len = Object.keys(req.body.password).length;
        if (
            isContainsNumber(req.body.password) && 
            isContainsStringLowwerCase(req.body.password) && 
            isContainsStringUpperCase(req.body.password) && 
            isContainsSpecialCharacters(req.body.password) && 
            password_len > 5
        ) {
                    next()
        }
        else {
            res.status(400).send({ error: "Please follow the password rules, thank you." });
        }

    }
}

module.exports = checkpassword;