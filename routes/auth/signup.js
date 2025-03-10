import { Router } from 'express';
import { signup } from '../../controllers/signupController.js';

const router = Router();

router.post('/', signup);

export default router;
