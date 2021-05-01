const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(cors());
app.get('/api/getUser', (req, res) => {
  const user = 'Evgeni';
  res.json(user);
})

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize routeget
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(port, () => console.log(`application start at ${port}`));
