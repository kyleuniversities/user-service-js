/**
 * Router used for Session related services
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
 * Session API Routes
 */
// READ Method
// Gathers the data from the current session
router.get(`/`, async (req, res) => {
  try {
    if (!req.session.locals) {
      req.session.locals = { token: '#null' };
      req.session.locals.sessionId = req.sessionID;
      console.log('__null__req.session.id-1: ' + req.session.id);
      console.log('__null__req.session.id-1x: ' + req.session.locals.sessionId);
      req.session.save();
      console.log('__null__req.session.id-2: ' + req.session.id);
    }
    console.log('_req.session.id: ' + req.session.id);
    return res.send(req.session.locals);
    //return res.send([req.session.locals]);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a user by id
router.patch(`/:id`, async (req, res) => {
  try {
    req.session.locals = req.body;
    req.session.locals.sessionId = req.session.id;
    console.log('REQ_BODY: ' + JSON.stringify(req.body));
    console.log('req.session.id-1: ' + req.session.id);
    console.log('req.session.id-1x: ' + req.session.locals.sessionId);
    req.session.save();
    console.log('__null__req.session.id-2: ' + req.session.id);
    return res.send(req.session.locals); // VVV
    //return res.send([req.session.locals]); // VVV
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
