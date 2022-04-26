class userController {
     onlineUsers = [];


     addNewUser = (username, socketId) => {
        !this.onlineUsers.some((user) => user.username === username) &&
          this.onlineUsers.push({ username, socketId });
      };
       removeUser = (socketId) => {
        this.onlineUsers = this.onlineUsers.filter((user) => user.socketId !== socketId);
      };

       getUser = (username) => {
        return this.onlineUsers.find((user) => user.username === username);
      };
      



}
module.exports = new userController()