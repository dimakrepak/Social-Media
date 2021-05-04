const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const http = require('http');
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
// const socketio = require('socket.io');
const appRouter = require('./routes/app.routes');
dotenv.config()

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', appRouter);

// const server = http.createServer(app);
// const io = socketio(server);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize routeget
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// io.on('connection', () => console.log('new websocket connected'))

//Connection to db with mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('database connect'))
  .catch(err => console.log(err))

app.listen(port, () => console.log(`application start at ${port}`));
