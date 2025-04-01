import express from "express";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Process checkout and create an order
 *     description: Handles order creation, initializes Paystack payment, and logs the transaction.
 *     tags:
 *       - Checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartItems
 *               - amount
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - streetAddress
 *               - townCity
 *               - userId
 *             properties:
 *               cartItems:
 *                 type: array
 *                 description: List of products in the cart.
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The product ID.
 *                     name:
 *                       type: string
 *                       description: The product name.
 *                     price:
 *                       type: number
 *                       description: The price of the product.
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product.
 *               amount:
 *                 type: number
 *                 description: Total order amount.
 *               fullName:
 *                 type: string
 *                 description: Full name of the customer.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the customer.
 *               serviceFee:
 *                 type: string
 *                 description: Service fee reference ID.
 *               phoneNumber:
 *                 type: string
 *                 description: Customer's phone number.
 *               streetAddress:
 *                 type: string
 *                 description: Customer's street address.
 *               apartment:
 *                 type: string
 *                 description: Apartment or suite number (optional).
 *               townCity:
 *                 type: string
 *                 description: Customer's city.
 *               orderNotes:
 *                 type: string
 *                 description: Additional order notes (optional).
 *               userId:
 *                 type: string
 *                 description: The ID of the signed-in user.
 *     responses:
 *       200:
 *         description: Checkout successful, returns order and transaction details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 order:
 *                   type: object
 *                   description: The created order details.
 *                 transaction:
 *                   type: object
 *                   description: Transaction details for the order.
 *                 paymentResponse:
 *                   type: object
 *                   description: Response from Paystack API.
 *       401:
 *         description: User is not authenticated.
 *       500:
 *         description: Internal server error.
 */

router.post("/checkout", checkout);

export default router;
