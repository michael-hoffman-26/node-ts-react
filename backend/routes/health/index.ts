import express from 'express'

import { health } from '../../controller/health';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Health check API
 */


/**
 * @swagger
 * /api/health/check:
 *   get:
 *     summary: Health check endpoint
  *     tags:
 *       - Health Check
 *     description: Returns the health status of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 */
router.get('/check',
    health
);

export default router;
