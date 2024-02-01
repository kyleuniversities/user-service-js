/**
 * Router used for Session related services
 */
const express = require('express');
const router = express.Router();
const { setUpRouterMiddleware, throwError } = require('../util/router-util');

// Set up router middleware
setUpRouterMiddleware(router);

/**
 * Session API Routes
 */
// READ Method
// Gathers the data from the current session
router.get(`/`, async (req, res) => {
  try {
    if (!req.session.locals) {
      req.session.locals = { token: '#null' };
      req.session.save();
    }
    return res.send(req.session.locals);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// UPDATE Method
// Updates a user by id
router.patch(`/:id`, async (req, res) => {
  try {
    req.session.locals = req.body;
    req.session.save();
    return res.send(req.session.locals);
  } catch (error) {
    return throwError(req, res, error);
  }
});

// Export routes
module.exports = router;
