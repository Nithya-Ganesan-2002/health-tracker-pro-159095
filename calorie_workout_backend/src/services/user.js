const bcrypt = require('bcryptjs');
const Joi = require('joi');
const store = require('../data/store');
const { signToken } = require('../middleware/auth');

const profileSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  age: Joi.number().integer().min(0).max(120).allow(null),
  heightCm: Joi.number().min(50).max(300).allow(null),
  weightKg: Joi.number().min(20).max(400).allow(null),
  gender: Joi.string().valid('male', 'female', 'other').allow(null),
  activityLevel: Joi.string().valid('sedentary', 'light', 'moderate', 'active', 'very_active').allow(null),
});

const goalSchema = Joi.object({
  dailyCalories: Joi.number().integer().min(500).max(10000).required(),
  weeklyWorkouts: Joi.number().integer().min(0).max(21).required(),
  weightTarget: Joi.number().min(20).max(400).allow(null),
  startWeight: Joi.number().min(20).max(400).allow(null),
  targetDate: Joi.string().isoDate().allow(null),
});

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

class UserService {
  // PUBLIC_INTERFACE
  async register({ name, email, password }) {
    /** Register a new user with hashed password. */
    const { error, value } = registerSchema.validate({ name, email, password });
    if (error) {
      const msg = error.details.map((d) => d.message).join(', ');
      throw new Error(`ValidationError: ${msg}`);
    }
    const existing = store.getUserByEmail(value.email);
    if (existing) {
      throw new Error('EmailAlreadyUsed');
    }
    const passwordHash = await bcrypt.hash(value.password, 10);
    const user = store.createUser({
      name: value.name,
      email: value.email.toLowerCase(),
      passwordHash,
      age: null,
      heightCm: null,
      weightKg: null,
      gender: null,
      activityLevel: 'sedentary',
    });

    const token = signToken(user);
    return { user: this._sanitize(user), token };
  }

  // PUBLIC_INTERFACE
  async login({ email, password }) {
    /** Authenticate user and issue JWT. */
    const { error, value } = loginSchema.validate({ email, password });
    if (error) {
      const msg = error.details.map((d) => d.message).join(', ');
      throw new Error(`ValidationError: ${msg}`);
    }
    const user = store.getUserByEmail(value.email);
    if (!user) throw new Error('InvalidCredentials');
    const match = await bcrypt.compare(value.password, user.passwordHash);
    if (!match) throw new Error('InvalidCredentials');

    const token = signToken(user);
    return { user: this._sanitize(user), token };
  }

  // PUBLIC_INTERFACE
  getProfile(userId) {
    /** Get user profile by id (sanitized). */
    const user = store.getUserById(userId);
    if (!user) return null;
    return this._sanitize(user);
  }

  // PUBLIC_INTERFACE
  updateProfile(userId, updates) {
    /** Update profile fields with validation. */
    const { error, value } = profileSchema.validate(updates);
    if (error) {
      const msg = error.details.map((d) => d.message).join(', ');
      throw new Error(`ValidationError: ${msg}`);
    }
    const updated = store.updateUser(userId, value);
    return updated ? this._sanitize(updated) : null;
  }

  // PUBLIC_INTERFACE
  setGoal(userId, goal) {
    /** Set user goal with validation. */
    const { error, value } = goalSchema.validate(goal);
    if (error) {
      const msg = error.details.map((d) => d.message).join(', ');
      throw new Error(`ValidationError: ${msg}`);
    }
    return store.setGoal(userId, value);
  }

  // PUBLIC_INTERFACE
  getGoal(userId) {
    /** Get user goal. */
    return store.getGoal(userId);
  }

  _sanitize(user) {
    const { passwordHash, ...safe } = user;
    return safe;
  }
}

module.exports = new UserService();
