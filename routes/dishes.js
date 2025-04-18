// /src/routes/dishes.js
import { Router } from "express";
import { getAllDishes, createDish, getDishBySlug, deleteDish, updateDish } from "../controllers/dishesController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: API for managing dishes
 */

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: Successfully retrieved all dishes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllDishes); // GET /api/dishes

/**
 * @swagger
 * /api/dishes:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       201:
 *         description: Successfully created a dish
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", createDish); // POST /api/dishes

/**
 * @swagger
 * /api/dishes/{slug}:
 *   get:
 *     summary: Get a dish by slug
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the dish
 *     responses:
 *       200:
 *         description: Successfully retrieved the dish
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.get("/:slug", getDishBySlug); // GET /api/dishes/:slug

/**
 * @swagger
 * /api/dishes/{dishId}:
 *   patch:
 *     summary: Update a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the dish to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               status:
 *                 type: boolean
 *               sortOrder:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to update dish
 */
router.patch("/:dishId", updateDish);

/**
 * @swagger
 * /api/dishes/{dishId}:
 *   delete:
 *     summary: Delete a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the dish to delete
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       500:
 *         description: Failed to delete dish
 */
router.delete("/:dishId", deleteDish);
export default router;
