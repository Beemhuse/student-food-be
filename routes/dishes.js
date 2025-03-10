// /src/routes/dishes.js
import { Router } from 'express';
import { getAllDishes, createDish, getDishById } from '../controllers/dishesController.js';

const router = Router();

router.get('/', getAllDishes);   // GET /api/dishes
router.post('/', createDish);    // POST /api/dishes
router.get('/:id', getDishById);       // GET /api/dishes/:id - get dish details by ID


export default router;
