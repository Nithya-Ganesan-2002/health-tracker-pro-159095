const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and goals
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched
 */
router.get('/me', usersController.getMe.bind(usersController));

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update my profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: number }
 *               heightCm: { type: number }
 *               weightKg: { type: number }
 *               gender: { type: string, enum: [male, female, other] }
 *               activityLevel: { type: string, enum: [sedentary, light, moderate, active, very_active] }
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/me', usersController.updateMe.bind(usersController));

/**
 * @swagger
 * /api/users/me/goal:
 *   get:
 *     summary: Get my goal
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goal fetched
 */
router.get('/me/goal', usersController.getGoal.bind(usersController));

/**
 * @swagger
 * /api/users/me/goal:
 *   put:
 *     summary: Set my goal
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dailyCalories, weeklyWorkouts]
 *             properties:
 *               dailyCalories: { type: number }
 *               weeklyWorkouts: { type: number }
 *               weightTarget: { type: number }
 *               startWeight: { type: number }
 *               targetDate: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Goal set
 */
router.put('/me/goal', usersController.setGoal.bind(usersController));

module.exports = router;
