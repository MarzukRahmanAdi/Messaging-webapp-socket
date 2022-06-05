const io = require("socket.io")(3002, {
    cors: {
      origin: "*",
    },
  });

const {addUser, getUser, removeUser} = require('./actions')
let users = [];

io.on("connection", (socket) => {

  socket.on("addUser", (userId) => {
    console.log(userId)
    addUser(userId, socket.id);
  });
  

  socket.on("sendMessage", ({ senderId, receiverId, text, senderName }) => {
    const user = getUser(receiverId);
    if(user){
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          senderName
        });
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});