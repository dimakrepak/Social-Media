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

// const server = http.createServer(app);
// const io = socketio(server);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize routeget
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

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', appRouter);
//multer middleware
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   }
// });
// const upload = multer({ storage });

// app.post('/api/upload', upload.single('file'), (req, res) => {
//   try {
//     res.status(200).send('File uploaded successfully')
//   } catch (err) {
//     console.log(err);
//   }
// })

app.listen(port, () => console.log(`application start at ${port}`));
