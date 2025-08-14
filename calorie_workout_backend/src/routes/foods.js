const express = require('express');
const foodsController = require('../controllers/foods');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Calorie intake logging
 */

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: List food logs
 *     tags: [Foods]
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
 *         description: List of foods
 */
router.get('/', foodsController.list.bind(foodsController));

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Create a food log
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, name, mealType, calories]
 *             properties:
 *               date: { type: string, format: date }
 *               name: { type: string }
 *               mealType: { type: string, enum: [breakfast, lunch, dinner, snack] }
 *               calories: { type: number }
 *               protein: { type: number }
 *               carbs: { type: number }
 *               fat: { type: number }
 *               notes: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', foodsController.create.bind(foodsController));

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get a food log by id
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Food fetched
 *       404:
 *         description: Not found
 */
router.get('/:id', foodsController.getById.bind(foodsController));

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food log by id
 *     tags: [Foods]
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
router.put('/:id', foodsController.update.bind(foodsController));

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food log by id
 *     tags: [Foods]
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
router.delete('/:id', foodsController.delete.bind(foodsController));

module.exports = router;
