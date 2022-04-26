/**************************************
 *  Application Name: Abroad Inquery Communication Server
 *  Developer: Tareque, Himel
 *  Date: 07/08/2021
 *************************************/

// packages
const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 4000;
const sequelize = require("./util/database");
const cors = require('cors')

// importing routers
const stdRouters = require("./routes/students.routes");
const loginRoutes = require("./routes/login.routes");
const mentorRoutes = require("./routes/mentor.routes");
const countryRoutes = require("./routes/country.routes")
const appointmentRoutes = require("./routes/appointment.routes")
const administration_login = require("./Admin/routes/main_routes")
const {expressServer, app} = require("./server/express")
const io = require("./sockets/configure")
const userController = require("./sockets/userController")
const notificationRoutes =require('./routes/notifications')
dotenv.config({ path: "./config.env" });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static(__dirname + "/uploads"));

//db connection
sequelize.sync();

// routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
  );

  next();
});

app.use("/mentor", mentorRoutes);
app.use("/student", stdRouters);
app.use("", loginRoutes);
app.use("/country", countryRoutes);
app.use("/administration", administration_login)
app.use("/appointment", appointmentRoutes)
app.use("/notification", notificationRoutes)

//real time api server.






io.on("connection", (socket) => {
  socket.on("newUser", (user) => {
    userController.addNewUser(user, socket.id);
    console.log(userController.onlineUsers)
  });

  socket.on("sendNotification", (data) => {
    console.log(data)
    try {
      const receiverId = userController.getUser(data.receiver);
      io.to(receiverId.socketId).emit("getNotification", data);
    }
    catch(error){
      console.log(error)
    }
  });

  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getText", {
  //     senderName,
  //     text,
  //   });
  // });

  socket.on("disconnect", () => {
    userController.removeUser(socket.id);
  });
});




app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log({ message: message, data: data });
  return res.status(status).json({ message: message, data: data });
});

expressServer.listen(port, (error) => {
  if (error) {
    console.log("making connection failed");
  } else {
    console.log(`server running on port ${port} ...`);
  }
});