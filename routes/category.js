import express from 'express';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllCategories);  // GET all categories

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the category
 *               description:
 *                 type: string
 *                 description: The description of the category (optional)
 *     responses:
 *       201:
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request if the title is not provided
 *       500:
 *         description: Internal server error
 */
router.post("/", createCategory);  // POST new category

/**
 * @swagger
 * /api/category/{categoryId}:
 *   patch:
 *     summary: Update an existing category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the category (optional)
 *               description:
 *                 type: string
 *                 description: The updated description of the category (optional)
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request if the category ID is not valid or missing fields
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:categoryId", updateCategory);  // PATCH update category by ID

/**
 * @swagger
 * /api/category/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:categoryId", deleteCategory);  // DELETE category by ID

export default router;
