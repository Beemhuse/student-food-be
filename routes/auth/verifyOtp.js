/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for Verify Otp.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               otp:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       401:
 *         description: Unauthorized, invalid credentials.
 */

import { Router } from 'express';
import { verifyOtp } from '../../controllers/verifyOtpController.js';

const router = Router();

router.post('/', verifyOtp);

export default router;
