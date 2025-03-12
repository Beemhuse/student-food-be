/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/password-reset:
 *   post:
 *     summary: Reset your password
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               newPassword:
 *                 type: string
 *                 description: Your new password.
 *              
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */

import { Router } from 'express';
import { resetPassword } from '../../controllers/resetPasswordController.js';

const router = Router();

router.post('/', resetPassword);

export default router;
