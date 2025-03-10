// /src/routes/dishes.js
import { Router } from 'express';
import { getAllDishes, createDish, getDishBySlug } from '../controllers/dishesController.js';

const router = Router();

router.get('/', getAllDishes);   // GET /api/dishes
router.post('/', createDish);    // POST /api/dishes
router.get('/:slug', getDishBySlug);       // GET /api/dishes/:id - get dish details by ID


export default router;
