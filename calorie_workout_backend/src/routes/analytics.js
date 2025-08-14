const express = require('express');
const analyticsController = require('../controllers/analytics');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics and progress
 */

/**
 * @swagger
 * /api/analytics/daily:
 *   get:
 *     summary: Daily summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Daily summary
 */
router.get('/daily', analyticsController.daily.bind(analyticsController));

/**
 * @swagger
 * /api/analytics/weekly:
 *   get:
 *     summary: Weekly summary
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Weekly summary
 */
router.get('/weekly', analyticsController.weekly.bind(analyticsController));

/**
 * @swagger
 * /api/analytics/progress:
 *   get:
 *     summary: Progress series
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Progress series
 */
router.get('/progress', analyticsController.progress.bind(analyticsController));

module.exports = router;
