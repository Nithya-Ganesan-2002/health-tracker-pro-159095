const express = require('express');
const exercisesController = require('../controllers/exercises');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Workout logging
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: List exercise logs
 *     tags: [Exercises]
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
 *         description: List of exercises
 */
router.get('/', exercisesController.list.bind(exercisesController));

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create an exercise log
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, type, durationMin, caloriesBurned]
 *             properties:
 *               date: { type: string, format: date }
 *               type: { type: string }
 *               durationMin: { type: number }
 *               caloriesBurned: { type: number }
 *               notes: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', exercisesController.create.bind(exercisesController));

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise log by id
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Exercise fetched
 *       404:
 *         description: Not found
 */
router.get('/:id', exercisesController.getById.bind(exercisesController));

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise log by id
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', exercisesController.update.bind(exercisesController));

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise log by id
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', exercisesController.delete.bind(exercisesController));

module.exports = router;
