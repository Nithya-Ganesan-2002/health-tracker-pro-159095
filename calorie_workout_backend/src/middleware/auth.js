const jwt = require('jsonwebtoken');

// PUBLIC_INTERFACE
function authenticate(req, res, next) {
  /** Middleware: Verify JWT in Authorization header and attach user to request. */
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized: missing or invalid Authorization header' });
    }
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
}

// PUBLIC_INTERFACE
function signToken(user) {
  /** Create a signed JWT for a given user. */
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(
    { sub: user.id, email: user.email },
    secret,
    { expiresIn: '7d' }
  );
}

module.exports = {
  authenticate,
  signToken,
};
