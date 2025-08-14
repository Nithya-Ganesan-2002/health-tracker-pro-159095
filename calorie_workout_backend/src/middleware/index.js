const { authenticate, signToken } = require('./auth');

// This file will export middleware as the application grows
module.exports = {
  authenticate,
  signToken,
};
