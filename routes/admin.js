// /src/routes/admin.js
import { Router } from 'express';
import { getAllAdmins, createAdmin } from '../controllers/adminController.js';

const router = Router();

router.get('/', getAllAdmins);  // GET /api/admin
router.post('/', createAdmin);  // POST /api/admin

export default router;
