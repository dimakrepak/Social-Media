const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

function add_user(user_id, socket_id) {
  console.log("socketId", socket_id);

  if (users.length > 0) {
    let id_exist = false;

    for (user of users) {
      if (user.user_id === user_id) {
        id_exist = true;
      }
      if (user.user_id === user_id && user.socket_id !== socket_id) {
        user.socket_id = socket_id;
      }
    }
    if (id_exist === false) {
      users.push({ user_id, socket_id });
    }
  } else {
    users.push({ user_id, socket_id });
  }
}
function remove_user(socket_id) {
  users = users.filter((user) => user.socket_id !== socket_id);
  console.log("remove user");
}

io.on("connection", (socket) => {
  //Connection
  //Take current user ID and current socket ID from client/user
  socket.on("addUser", (current_user_id) => {
    console.log("socketId", socket.id);
    add_user(current_user_id, socket.id);
    console.log("User connected successfully");
    console.log("users connection", users);
    io.emit("getOnlineUsers", users);
  });
  //Disconnect
  socket.on("disconnect", () => {
    remove_user(socket.id);
    console.log("User disconnected");
    console.log("users disconnecyion", users);
    io.emit("getOnlineUsers", users);
  });
  //Send Message
  socket.on("sendMessage", ({ sender_id, receiver_id, text }) => {
    console.log("send message users", users);
    let user = users.find((u) => u.user_id === receiver_id);
    console.log(receiver_id);
    console.log("receiver user", user);
    console.log("sender user", sender_id);
    io.to(user?.socket_id).emit("getMessage", {
      sender_id,
      text,
    });
  });
});
