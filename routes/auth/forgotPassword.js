/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Get otp to reset password
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
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *              
 *     responses:
 *       200:
 *         description: Password reset OTP sent.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */
import { Router } from 'express';
import { forgotPassword } from '../../controllers/forgotPasswordController.js';

const router = Router();

router.post('/', forgotPassword);

export default router;
