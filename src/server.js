const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const appRouter = require('./routes/app.routes')
const port = process.env.PORT || 8000;
const uri = "mongodb+srv://dimkre:1234@bankdb.rtm4i.mongodb.net/social-mediaDB?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use('/api', appRouter);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize routeget
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//Connection to db with mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('database connect'))
  .catch(err => console.log(err))

app.listen(port, () => console.log(`application start at ${port}`));
