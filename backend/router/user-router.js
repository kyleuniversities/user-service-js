/**
 * Router used for User related services
 */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { setUpRouterMiddleware, throwError } = require('../util/router-util');

// Set up router middleware
setUpRouterMiddleware(router);

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
