const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const knexfile = require('./knexfile');
const { Model } = require('objection');

// Set up express
const app = express();

// Set up knex
const knex = require('knex')(knexfile.development);
Model.knex(knex);

// Set up express middleware
app.use(jsonParser);
app.use(express.json());
app.use(cors());
app.use('/', router);

// Set up port data
port = 5000;

// Set up test GET endpoint
router.get('/test', function (req, res) {
  return res.send(`Get Hello World!`);
});

// Set up test POST endpoint
router.post('/test', function (req, res) {
  return res.send(`Post Hello World!`);
});

// Mount routes
app.use('/api/users/', require('./router/user-router'));

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
