// /src/routes/reset-password.js
import { Router } from 'express';
import { resetPassword } from '../../controllers/resetPasswordController.js';

const router = Router();

router.post('/', resetPassword);

export default router;
