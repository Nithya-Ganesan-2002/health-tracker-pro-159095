const { v4: uuidv4 } = require('uuid');

/**
 * Simple in-memory data store to keep the backend functional without a database.
 * IMPORTANT: This is not persistent and should be replaced with real DB integration.
 */
class InMemoryStore {
  constructor() {
    this.users = new Map();           // id -> user
    this.userByEmail = new Map();     // email -> id
    this.goals = new Map();           // userId -> goal
    this.foodLogs = new Map();        // userId -> [foods]
    this.exerciseLogs = new Map();    // userId -> [exercises]
  }

  // PUBLIC_INTERFACE
  createUser(user) {
    /** Create a new user record with a unique id. */
    const id = uuidv4();
    const record = { id, ...user, createdAt: new Date().toISOString() };
    this.users.set(id, record);
    this.userByEmail.set(record.email.toLowerCase(), id);
    return record;
  }

  // PUBLIC_INTERFACE
  getUserByEmail(email) {
    /** Fetch a user by email (case-insensitive). */
    const id = this.userByEmail.get((email || '').toLowerCase());
    return id ? this.users.get(id) : null;
  }

  // PUBLIC_INTERFACE
  getUserById(id) {
    /** Fetch a user by id. */
    return this.users.get(id) || null;
  }

  // PUBLIC_INTERFACE
  updateUser(id, updates) {
    /** Update a user profile by id with partial updates. */
    const existing = this.users.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    this.users.set(id, updated);
    return updated;
  }

  // PUBLIC_INTERFACE
  setGoal(userId, goal) {
    /** Set user goal. Overwrites previous goal for simplicity. */
    const record = { ...goal, userId, updatedAt: new Date().toISOString() };
    this.goals.set(userId, record);
    return record;
  }

  // PUBLIC_INTERFACE
  getGoal(userId) {
    /** Get goal for a user. */
    return this.goals.get(userId) || null;
  }

  // Food logs
  // PUBLIC_INTERFACE
  addFood(userId, food) {
    /** Add a food log item for a user. */
    const id = uuidv4();
    const record = { id, userId, ...food, createdAt: new Date().toISOString() };
    const arr = this.foodLogs.get(userId) || [];
    arr.push(record);
    this.foodLogs.set(userId, arr);
    return record;
  }

  // PUBLIC_INTERFACE
  listFoods(userId) {
    /** List all food logs for a user. */
    return this.foodLogs.get(userId) || [];
  }

  // PUBLIC_INTERFACE
  getFood(userId, id) {
    /** Get a specific food by id for a user. */
    return (this.foodLogs.get(userId) || []).find((f) => f.id === id) || null;
  }

  // PUBLIC_INTERFACE
  updateFood(userId, id, updates) {
    /** Update a specific food log by id for a user. */
    const arr = this.foodLogs.get(userId) || [];
    const idx = arr.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    const updated = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
    arr[idx] = updated;
    this.foodLogs.set(userId, arr);
    return updated;
  }

  // PUBLIC_INTERFACE
  deleteFood(userId, id) {
    /** Delete a specific food log by id for a user. */
    const arr = this.foodLogs.get(userId) || [];
    const idx = arr.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    arr.splice(idx, 1);
    this.foodLogs.set(userId, arr);
    return true;
  }

  // Exercise logs
  // PUBLIC_INTERFACE
  addExercise(userId, exercise) {
    /** Add an exercise log item for a user. */
    const id = uuidv4();
    const record = { id, userId, ...exercise, createdAt: new Date().toISOString() };
    const arr = this.exerciseLogs.get(userId) || [];
    arr.push(record);
    this.exerciseLogs.set(userId, arr);
    return record;
  }

  // PUBLIC_INTERFACE
  listExercises(userId) {
    /** List all exercise logs for a user. */
    return this.exerciseLogs.get(userId) || [];
  }

  // PUBLIC_INTERFACE
  getExercise(userId, id) {
    /** Get a specific exercise log by id for a user. */
    return (this.exerciseLogs.get(userId) || []).find((e) => e.id === id) || null;
  }

  // PUBLIC_INTERFACE
  updateExercise(userId, id, updates) {
    /** Update a specific exercise log by id for a user. */
    const arr = this.exerciseLogs.get(userId) || [];
    const idx = arr.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    const updated = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
    arr[idx] = updated;
    this.exerciseLogs.set(userId, arr);
    return updated;
  }

  // PUBLIC_INTERFACE
  deleteExercise(userId, id) {
    /** Delete a specific exercise log by id for a user. */
    const arr = this.exerciseLogs.get(userId) || [];
    const idx = arr.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    arr.splice(idx, 1);
    this.exerciseLogs.set(userId, arr);
    return true;
  }
}

module.exports = new InMemoryStore();
