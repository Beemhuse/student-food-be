// /src/routes/forgot-password.js
import { Router } from 'express';
import { forgotPassword } from '../../controllers/forgotPasswordController.js';

const router = Router();

router.post('/', forgotPassword);

export default router;
