/**
 * Router used for Authentication related services
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Router setup methods
 */
// Prepare request body parser
router.use(bodyParser.json());

// Prepare CORS functionality
router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Prepare logging functionality for each request
router.use(function (req, res, next) {
  console.log(`REQUEST: ${req.method} ${req.originalUrl}`);
  console.log(` TIME: ${new Date().toISOString()}`);
  next();
});

/**
 * Router helper methods
 */
// Throws an Api Error
function throwError(req, res, error, status = 500) {
  return res.status(status).json({
    class: 'ApiError',
    message: error.message,
    status,
    time: new Date().toISOString(),
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });
}

/**
 * Authentication API Routes
 */
// CREATE Method
// Logs in a user
router.post(`/login`, async (req, res) => {
  try {
    console.log(`LOGIN: ${JSON.stringify(req.body)}`);
    const user = await User.query()
      .where('username', req.body.username)
      .first();
    console.log(`user: ${JSON.stringify(user)}`);
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error('Incorrect username or password');
    }
    console.log(`BCRYPT_PASSED`);
    const token = jwt.sign(
      {
        sub: user.username,
        username: user.username,
        email: user.email,
        id: user.id,
      },
      'secret'
    );
    const loginResponse = { token };
    console.log(`loginResponse: ${JSON.stringify(loginResponse)}`);
    return res.send(loginResponse);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
