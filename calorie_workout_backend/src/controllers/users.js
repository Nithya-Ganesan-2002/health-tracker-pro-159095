const userService = require('../services/user');

class UsersController {
  // PUBLIC_INTERFACE
  getMe(req, res) {
    /** Get profile of the current user. */
    try {
      const profile = userService.getProfile(req.user.id);
      if (!profile) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(profile);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  updateMe(req, res) {
    /** Update profile of the current user. */
    try {
      const updated = userService.updateProfile(req.user.id, req.body || {});
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(updated);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  getGoal(req, res) {
    /** Get goal of the current user. */
    try {
      const goal = userService.getGoal(req.user.id);
      return res.status(200).json(goal || {});
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // PUBLIC_INTERFACE
  setGoal(req, res) {
    /** Set goal for the current user. */
    try {
      const goal = userService.setGoal(req.user.id, req.body || {});
      return res.status(200).json(goal);
    } catch (err) {
      if (String(err.message || '').startsWith('ValidationError')) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new UsersController();
