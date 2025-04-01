/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Signup a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for Signup.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's fullname.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successful signup.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */

import { Router } from 'express';
import { signup } from '../../controllers/signupController.js';

const router = Router();

router.post('/', signup);

export default router;
