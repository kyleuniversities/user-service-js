/**
 * Router used for User related services
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
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

// Creates a User Update Request
function toUserUpdateRequest(body) {
  const userUpdateRequest = {};
  const passableKeys = ['username', 'email', 'picture', 'thumbnail'];
  passableKeys.forEach((key) => {
    if (key in body) {
      userUpdateRequest[key] = body[key];
    }
  });
  return userUpdateRequest;
}

/**
 * User API Routes
 */
// CREATE Method
// Register a user
router.post(`/`, async (req, res) => {
  try {
    const user = await User.query().insert({
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    return res.send(user);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets all users
router.get(`/`, async (req, res) => {
  try {
    const users = await User.query();
    return res.send(users);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// READ Method
// Gets a user by id
router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.query().where('id', req.params.id).first();
    return res.send(user);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a user by id
router.patch(`/:id`, async (req, res) => {
  try {
    await User.query()
      .patch(toUserUpdateRequest(req.body))
      .findById(req.params.id);
    const user = await User.query().where('id', req.params.id).first();
    return res.send(user);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// DELETE Method
// Deletes a user by id
router.delete(`/:id`, async (req, res) => {
  try {
    await User.query().deleteById(req.params.id);
    return res.send({
      message: `User with id "${req.params.id}" been successfully deleted.`,
    });
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
