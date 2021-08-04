const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

function add_user(user_id, socket_id, users_array) {
  if (!users_array.some((user) => user.user_id === user_id)) {
    users_array.push({ user_id, socket_id });
  }
}
function remove_user(socket_id) {
  users = users.filter((user) => user.socket_id !== socket_id);
}

io.on("connection", (socket) => {
  //Connection
  //Take current user ID and current socket ID from client/user
  socket.on("addUser", (current_user_id) => {
    add_user(current_user_id, socket.id, users);
    console.log("User connected successfully");
    io.emit("getOnlineUsers", users);
  });
  //Disconnect
  socket.on("disconnect", () => {
    remove_user(socket.id);
    console.log("User disconnected");
    io.emit("getOnlineUsers", users);
  });
  //Send Message
  socket.on("sendMessage", ({ sender_id, receiver_id, text }) => {
    const user = users.find((u) => u.id == receiver_id);
    io.to(user.socket_id).emit("getMessage", {
      sender_id,
      text,
    });
  });
});
