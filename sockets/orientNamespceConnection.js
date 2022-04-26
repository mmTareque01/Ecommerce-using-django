const io = require("./configure")

function orientNameSpaceConnection ()  {
    let nameSpace = io.of("/mentor3")
    nameSpace.on('connection', (socket) => {
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
module.exports = orientNameSpaceConnection