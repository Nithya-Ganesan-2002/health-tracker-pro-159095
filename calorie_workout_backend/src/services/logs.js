const Joi = require('joi');
const dayjs = require('dayjs');
const store = require('../data/store');

const foodSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  name: Joi.string().min(1).max(200).required(),
  mealType: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
  calories: Joi.number().integer().min(0).max(10000).required(),
  protein: Joi.number().min(0).max(500).default(0),
  carbs: Joi.number().min(0).max(1000).default(0),
  fat: Joi.number().min(0).max(500).default(0),
  notes: Joi.string().allow('', null),
});

const exerciseSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  type: Joi.string().min(1).max(200).required(),
  durationMin: Joi.number().integer().min(1).max(10000).required(),
  caloriesBurned: Joi.number().integer().min(0).max(20000).required(),
  notes: Joi.string().allow('', null),
});

class LogsService {
  // PUBLIC_INTERFACE
  addFood(userId, payload) {
    /** Add a food log for a user. */
    const { error, value } = foodSchema.validate(payload);
    if (error) throw new Error(`ValidationError: ${error.message}`);
    return store.addFood(userId, value);
  }

  // PUBLIC_INTERFACE
  listFoods(userId, { from, to }) {
    /** List food logs with optional date range filters. */
    const all = store.listFoods(userId);
    let filtered = all;
    if (from) {
      const f = dayjs(from);
      filtered = filtered.filter((x) => dayjs(x.date).isAfter(f.subtract(1, 'day')));
    }
    if (to) {
      const t = dayjs(to);
      filtered = filtered.filter((x) => dayjs(x.date).isBefore(t.add(1, 'day')));
    }
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // PUBLIC_INTERFACE
  getFood(userId, id) {
    /** Get a single food log by id. */
    return store.getFood(userId, id);
  }

  // PUBLIC_INTERFACE
  updateFood(userId, id, payload) {
    /** Update a food log with validation. */
    const { error, value } = foodSchema.fork(Object.keys(foodSchema.describe().keys), (schema) => schema.optional()).validate(payload);
    if (error) throw new Error(`ValidationError: ${error.message}`);
    return store.updateFood(userId, id, value);
  }

  // PUBLIC_INTERFACE
  deleteFood(userId, id) {
    /** Delete a food log. */
    return store.deleteFood(userId, id);
  }

  // Exercises
  // PUBLIC_INTERFACE
  addExercise(userId, payload) {
    /** Add an exercise log for a user. */
    const { error, value } = exerciseSchema.validate(payload);
    if (error) throw new Error(`ValidationError: ${error.message}`);
    return store.addExercise(userId, value);
  }

  // PUBLIC_INTERFACE
  listExercises(userId, { from, to }) {
    /** List exercise logs with optional date range filters. */
    const all = store.listExercises(userId);
    let filtered = all;
    if (from) {
      const f = dayjs(from);
      filtered = filtered.filter((x) => dayjs(x.date).isAfter(f.subtract(1, 'day')));
    }
    if (to) {
      const t = dayjs(to);
      filtered = filtered.filter((x) => dayjs(x.date).isBefore(t.add(1, 'day')));
    }
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // PUBLIC_INTERFACE
  getExercise(userId, id) {
    /** Get a single exercise log by id. */
    return store.getExercise(userId, id);
  }

  // PUBLIC_INTERFACE
  updateExercise(userId, id, payload) {
    /** Update an exercise log with validation. */
    const { error, value } = exerciseSchema.fork(Object.keys(exerciseSchema.describe().keys), (schema) => schema.optional()).validate(payload);
    if (error) throw new Error(`ValidationError: ${error.message}`);
    return store.updateExercise(userId, id, value);
  }

  // PUBLIC_INTERFACE
  deleteExercise(userId, id) {
    /** Delete an exercise log. */
    return store.deleteExercise(userId, id);
  }
}

module.exports = new LogsService();
