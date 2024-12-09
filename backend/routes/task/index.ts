import express from 'express'

import { validateRequest } from '../../validator/validator';
import { deleteTaskValidator, postTaskValidator, } from './validators';
import { createTask, deleteItem, getItems } from '../../controller/items';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     description: Creates a new task with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the task to create.
 *                 example: "New Task"
 *     responses:
 *       201:
 *         description: The task was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the created task.
 *                   example: "New Task"
 *                 id:
 *                   type: integer
 *                   description: The unique identifier of the created task.
 *                   example: 123
 *       400:
 *         description: Invalid request body.
 */
router.post('',
    postTaskValidator,
    validateRequest,
    createTask
);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags:
 *       - Tasks
 *     description: Returns an array of task objects.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the task.
 *                     example: "Task 1"
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the task.
 *                     example: 1
 */
router.get('',
    getItems
);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     description: Deletes a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: The task was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: "Task with id 123 has been deleted."
 *       400:
 *         description: Invalid request (e.g., ID is invalid).
 *       404:
 *         description: Task not found.
 */
router.delete('/:id',
    deleteTaskValidator,
    validateRequest,
    deleteItem
);

export default router;
