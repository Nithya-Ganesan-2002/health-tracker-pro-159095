const express = require('express');
const healthController = require('../controllers/health');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const foodRoutes = require('./foods');
const exerciseRoutes = require('./exercises');
const analyticsRoutes = require('./analytics');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', healthController.check.bind(healthController));

// Mount API routes
router.use('/api/auth', authRoutes);

// Protected routes
router.use('/api/users', authenticate, userRoutes);
router.use('/api/foods', authenticate, foodRoutes);
router.use('/api/exercises', authenticate, exerciseRoutes);
router.use('/api/analytics', authenticate, analyticsRoutes);

module.exports = router;
