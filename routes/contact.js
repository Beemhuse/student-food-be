// /src/routes/contact.js
import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController.js';

const router = Router();

// POST /api/contact
router.post('/', createContactMessage);

export default router;
