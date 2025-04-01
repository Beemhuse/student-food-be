// import { initializePaystack } from "@/utils/lib/paystack";
// import { createOrder, createTransaction } from "@/utils/sanity/client";
// import { updateTransaction, updateUserAfterOrder } from "@/utils/sanity/updateUserAfterOrder";
import { initializePaystack, createTransaction, createOrder } from "../lib/index.js";
import { v4 as uuidv4 } from "uuid";

export const checkout = async (req, res) => {
  try {
    const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    // Format email
    const formattedEmail = email.toLowerCase();

    // Add unique keys to each cart item
    const productsWithKeys = cartItems.map((item) => ({
      ...item,
      _key: item._key || uuidv4(),
    }));

    // Initialize payment with Paystack
    const paymentResponse = await initializePaystack(formattedEmail, amount);
    const transactionRef = paymentResponse?.data?.reference;

    // Create the order
    const order = await createOrder({
      total: amount,
      products: productsWithKeys,
      serviceFee: { _type: "reference", _ref: serviceFee },
      email: formattedEmail,
      name: fullName,
      streetAddress,
      apartment,
      townCity,
      phone: phoneNumber,
      transactionRef,
      notes: orderNotes,
      customer: { _type: "reference", _ref: userId },
    });

    if (!order?._id) {
      return res.status(500).json({ error: "Error creating order" });
    }

    // Create the transaction
    const transaction = await createTransaction({
      order: { _type: "reference", _ref: order._id },
      amount,
      transactionRef,
      userId: { _type: "reference", _ref: userId },
      status: "pending",
      method: "paystack",
      transactionDate: new Date().toISOString(),
    });

    // Update the user's order history, order count, and total spent
    await updateUserAfterOrder(userId, amount, order, true);

    // Update transaction status
    await updateTransaction(userId, transaction);

    return res.status(200).json({ success: true, order, transaction, paymentResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
