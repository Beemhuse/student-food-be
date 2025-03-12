// /src/routes/reset-password.js
import { Router } from 'express';
import { verifyOtp } from '../../controllers/verifyOtpController.js';

const router = Router();

router.post('/', verifyOtp);

export default router;
