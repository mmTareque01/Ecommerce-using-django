const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Students.model");
const Otp = require("../models/otp.model");
const {Personal} = require("../models/Mentor.model")

// login controller
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "Credentials not valid. Provide valid credentials."
    );
    error.statusCode = 401;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  var userStatus;
  let loadedUser;
  console.log({ email, password });
  //connect to model and validate data here
    User.findOne({ where: { email: email } })
    .then((user) => { 
        userStatus = "student"
        bcrypt.compare(password, user.password)
        .then((isEqual)=>{
          if(!isEqual){
            res.status(404).send({
              message:"user not found"
            })
          }
          else{
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id,
              },
              "secretkey",
              { expiresIn: "7d" }
            );
            res.status(200).json({ 
              token: token, 
              userId: user.id,
              userStatus : userStatus,
            
            });
          }
        })
    })
    .catch((err) => {
      Personal.findOne({where:{email: email}})
        .then((user_mentor)=>{
          // res.send("got mentor")
          userStatus = "mentor"
          const token = jwt.sign(
                  {
                    email: user_mentor.email,
                    userId: user_mentor.id,
                  },
                  "secretkey",
                  { expiresIn: "7d" }
                );
                res.status(200).json({ 
                  token: token, 
                  userId: user_mentor.id,
                  userStatus : userStatus,
                });
        })
        .catch((error)=>{
          res.status(405).send({
            message: "User not found"
          })
        })
    });
};
//signup controller
exports.signup = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const phone = req.body.phone;
  //   hash password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = User.create({
        email: email,
        phone: phone,
        name: name,
        password: hashedPassword,
      });
      return user;
    })
    .then((createdUser) => {
      const token = jwt.sign({
        email : createdUser.email,
        usereId : createdUser.id,
        userStatus : "student"
      },"tokenKey",
      {expiresIn: "7d"}
      )
      res.status(201).json({
        message: "User created!",
        userId: createdUser.id,
        email: createdUser.email,
        phone: createdUser.phone,
        token : token
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
//forget password controller
exports.forgetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Unauthenticated.");
    error.statusCode = 401;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  let otpCode = Math.floor(1000 + Math.random() * 9000);
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1 / 24);
  Otp.create({
    email: email,
    otpCode: otpCode,
    exiration: expireDate,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
