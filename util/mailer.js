const nodemailer = require('nodemailer')
require('dotenv').config();

const {
    GMAIL = process.env.GMAIL_CLIENT,
    SENDER_EMAIL = process.env.SENDER_EMAIL,
    CLIENT_ID = process.env.CLIENT_ID,
    CLIENT_SECRET = process.env.CLIENT_SECRET,
    REFRESH_TOKEN = process.env.REFRESH_TOKEN,
    PASS = process.env.PASS
} = process.env

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: GMAIL,
      pass: PASS,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN
    }
  });

const sendEmail = (mailOptions) =>{

  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, (err, data)=>{
      if(err){
        console.log(err)
        return reject(err)
      }
      else{
        // console.log(data)
        return resolve({message: "Email has been sent", isSent: true})
      }
    })
  })
}

module.exports = sendEmail;


