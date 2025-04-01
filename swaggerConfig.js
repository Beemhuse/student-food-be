/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - category
 *         - image
 *         - status
 *         - sortOrder
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the dish
 *         title:
 *           type: string
 *           description: The name of the dish
 *         description:
 *           type: string
 *           description: A brief description of the dish
 *         price:
 *           type: number
 *           description: Price of the dish
 *         category:
 *           type: object
 *           properties:
 *             _ref:
 *               type: string
 *               description: Reference to the category
 *         image:
 *           type: object
 *           properties:
 *             asset:
 *               type: object
 *               properties:
 *                 _ref:
 *                   type: string
 *                   description: Reference to the image asset in Sanity
 *         status:
 *           type: boolean
 *           description: Availability status of the dish
 *         sortOrder:
 *           type: number
 *           description: Sorting order of the dish
 */
