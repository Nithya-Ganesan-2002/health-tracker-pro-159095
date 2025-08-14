const userService = require('../services/user');

class AuthController {
  // PUBLIC_INTERFACE
  async register(req, res) {
    /** Register a new user with email and password. Returns JWT and user profile. */
    try {
      const { name, email, password } = req.body || {};
      const result = await userService.register({ name, email, password });
      return res.status(201).json(result);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      if (err.message === 'EmailAlreadyUsed') {
        return res.status(409).json({ message: 'Email is already in use' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  async login(req, res) {
    /** Authenticate an existing user. Returns JWT and user profile. */
    try {
      const { email, password } = req.body || {};
      const result = await userService.login({ email, password });
      return res.status(200).json(result);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      if (err.message === 'InvalidCredentials') {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  me(req, res) {
    /** Get current authenticated user profile. */
    try {
      const profile = userService.getProfile(req.user.id);
      if (!profile) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ user: profile });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AuthController();
