/**
 * Router used for Authentication related services
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setUpRouterMiddleware, throwError } = require('../util/router-util');

// Set up router middleware
setUpRouterMiddleware(router);

/**
 * Authentication API Helper Methods
 */
function userExistsWithPasswordMatch(matchingUsers, password) {
  return (
    matchingUsers.length === 0 ||
    !bcrypt.compareSync(password, matchingUsers[0].password)
  );
}

async function queryMatchingUser(username, password) {
  const matchingUsers = await User.query().where('username', username);
  if (userExistsWithPasswordMatch(matchingUsers, password)) {
    throw new Error('Incorrect username or password');
  }
  return matchingUsers[0];
}

function collectSignedSessionToken(user) {
  return jwt.sign(
    {
      sub: user.username,
      username: user.username,
      email: user.email,
      id: user.id,
    },
    'secret123456'
  );
}

/**
 * Authentication API Routes
 */
// CREATE Method
// Logs in a user
router.post(`/login`, async (req, res) => {
  try {
    const user = await queryMatchingUser(req.body.username, req.body.password);
    const token = collectSignedSessionToken(user);
    return res.send({ token });
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
