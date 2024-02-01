const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const knexfile = require('./knexfile');
const knexSessionStore = require('connect-session-knex')(session);
const { Model } = require('objection');

// Set up knex
const knex = require('knex')(knexfile.development);
Model.knex(knex);

// Set up express
const app = express();

// Set up parser middleware
app.use(cookieParser());

// Set up session middleware
app.use(
  session({
    key: 'key123456',
    store: new knexSessionStore({
      knex: knex,
      tablename: 'session',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
    secret: 'secret12345',
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: true,
      clearInterval: 1000 * 60 * 60,
    },
  })
);

// Set up express middleware
app.use(express.json());
app.use('/', router);

// Set up port data
port = process.env['BACKEND_DEVELOPMENT_PORT'] || 8080;

// Set up test GET endpoint
router.get('/api/test', function (req, res) {
  return res.send(`Get Hello World!`);
});

// Set up test POST endpoint
router.post('/api/test', function (req, res) {
  return res.send(`Post Hello World!`);
});

// Mount routes
app.use('/api/users/', require('./router/user-router'));
app.use('/api/auth/', require('./router/auth-router'));
app.use('/api/sessions/', require('./router/session-router'));
app.use('/', require('./web-router'));

// Launch app
app.listen(port, () => {
  console.log(`Example app listening at ${port}.`);
});

// Export app
module.exports = app;
