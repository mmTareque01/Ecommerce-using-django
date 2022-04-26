const socketIO = require("socket.io");
const { expressServer } = require("../server/express")


// function socketConnectionServer() {
const io = socketIO(expressServer, {
  transports: ['polling'],
  cors: {
  cors: {
    // origin: "*"
    origin: "http://localhost:3000"
  }
}
});

// io.on('connection', (socket) => {
//   console.log('A user is connected');

//   socket.on('message', (message) => {
//     console.log(`message from ${socket.id} : ${message}`);
//   })

//   socket.on('disconnect', () => {
//     console.log(`socket ${socket.id} disconnected`);
//   })
// })


module.exports = io;