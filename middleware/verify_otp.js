const verify_otp = (req, res, next)=>{
    if(isNaN(parseInt(req.body.otpCode))){
        res.send({isOTPMatched: false})
    }
    else{
        next()
    }
}

module.exports = verify_otp;