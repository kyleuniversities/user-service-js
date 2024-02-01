const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Utility function for setting up router middleware
 */
function setUpRouterMiddleware(router) {
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
    console.log(` SESSION_ID: ${req.session.id}`);
    console.log(` TIME: ${new Date().toISOString()}`);
    next();
  });
}

/**
 * Utility function for throwing an router error
 */
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

module.exports.setUpRouterMiddleware = setUpRouterMiddleware;
module.exports.throwError = throwError;
