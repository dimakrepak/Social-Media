const appRouter = require('./routes/app.routes');
// const socketio = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require("dotenv");
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const http = require('http');
const app = express();
const port = process.env.PORT || 8000;
dotenv.config()

// express middleware
app.use(cors());
app.use(express.json({ limit: '1.5mb' }));
app.use('/api', appRouter);

//Connection to db with mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('database connect'))
  .catch(err => console.log(err))

//Connection to client side
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize routeget
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`application start at ${port}`));
