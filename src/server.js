const appRouter = require("./routes/app.routes");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");
const http = require("http");
const app = express();
const port = process.env.PORT || 8000;

dotenv.config();

// express middleware
app.use(cors());
app.use(express.json({ limit: "1.5mb" }));
app.use("/api", appRouter);

//Connection to db with mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("database connect"))
  .catch((err) => console.log(err));

//Connection to client side
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));
  // Express serve up index.html file if it doesn't recognize routeget
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
const server = http.createServer(app);
const io = socketio(server);
let users = [];

function add_user(user_id, socket_id) {
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
  console.log("User connected successfully");
}

function remove_user(socket_id) {
  users = users.filter((user) => user.socket_id !== socket_id);
}

io.on("connection", (socket) => {
  //Connection
  //Take current user ID and current socket ID from client/user
  socket.on("addUser", (current_user_id) => {
    add_user(current_user_id, socket.id);
    io.emit("getOnlineUsers", users);
  });
  //Disconnect
  socket.on("disconnect", () => {
    remove_user(socket.id);
    io.emit("getOnlineUsers", users);
  });
  //Send Message
  socket.on("sendMessage", ({ sender_id, receiver_id, text }) => {
    let user = users.find((u) => u.user_id === receiver_id);
    io.to(user?.socket_id).emit("getMessage", {
      sender_id,
      text,
    });
  });
});

server.listen(port, () => console.log(`application start at ${port}`));

