const io = require("./configure")

const orientConnection = () => {
    io.on('connection', (socket) => {
        console.log('A user is connected');
      
        socket.on('message', (message) => {
          console.log(`message from ${socket.id} : ${message}`);
        })
      
        socket.on('disconnect', () => {
          console.log(`socket ${socket.id} disconnected`);
        })
      })
    return io
}
module.exports = orientConnection