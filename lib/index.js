import { client } from '../config/sanityClient.js';
import { ensureUserExists } from '../lib/user.js';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const generateTransactionRef = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const createOrder = async ({
    products,
    total,
    email,
    serviceFee,
    name,
    streetAddress,
    apartment,
    townCity,
    phone,
    transactionRef,
    notes,
    customer
  }) => {
    try {
      // Ensure the user exists or create a new one if necessary
      const ensuredUserId = await ensureUserExists(customer?._ref);
  
      // Map products to an array of references with unique keys
      const cartItemsWithKeys = products.map((item, index) => ({
        _key: `orderedItem_${index}`, // Unique key for each item
        _type: 'reference',
        _ref: item._id, // Reference to the product document in Sanity
      }));
  
      // Ensure that the serviceFee and user references are valid strings
      const serviceFeeRef = typeof serviceFee === 'string' ? serviceFee : serviceFee._ref;
      const userRef = typeof ensuredUserId === 'string' ? ensuredUserId : ensuredUserId._id;
      // Create the order document in Sanity
      const order = await client.create({
        _type: 'order',
        products: cartItemsWithKeys, // Use the mapped products array
        total,
        serviceFee: serviceFeeRef,
        transactionDate: new Date(), // Use current date for transactionDate
        email,
        name,
        streetAddress,
        apartment,
        townCity,
        phone,
        transactionRef,
        notes,
        customer, 
        status: 'pending', // Set the initial status to "Pending"
  
      });
  
      // Update the order with its own ID as orderId (optional)
      await client.patch(order._id).set({ orderId: order._id }).commit();
  
      // console.log('Order saved to Sanity:', order);
      return order;
    } catch (sanityError) {
      console.error('Error saving order to Sanity:', sanityError);
      return { error: 'Internal Server Error', message: sanityError.message };
    }
  };
  
  
  export const createTransaction = async ({
    order,
    amount,
    transactionRef,
    userId,
    status = 'pending', // Default value is 'pending'
    method
  }) => {
    
    console.log("transaction ==>>>", order)
    try {
      // Your logic to create a transaction document in Sanity
      // Generate a shorter custom ID for the transaction
      const shortUuid = uuidv4().split('-')[0]; // Take only the first segment of the UUID
      const customTransactionId = `txn-${shortUuid}`;
  
  
      const transaction = await client.create({
        _type: 'transaction',
        id: customTransactionId,
        order,
        amount,
        transactionRef,
        userId,
        transactionDate: new Date(), // Use current date for transactionDate
        status,
        method
      });
  
      console.log('Transaction saved to Sanity:', transaction);
  
      
      return transaction;
    } catch (sanityError) {
      console.error('Error saving transaction to Sanity:', sanityError);
      return { error: 'Internal Server Error', message: sanityError.message };
    }
  };




export const initializePaystack = async (email, amount) => {
  
  try {
    if (!amount) {
      throw new Error("Amount is required.");
    }

    if (isNaN(amount) || parseInt(amount, 10) !== amount) {
      throw new Error("Amount must be a valid number.");
    }

    if (amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }

    // Ensure amount is in kobo (smallest currency unit)
    const amountInKobo = parseInt(amount, 10) * 100;
    const transactionRef = generateTransactionRef(7);

    // Log for potential debugging

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        reference: `Euodia-${transactionRef}`,
        // callback_url: callbackUrl,

      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;
    return { data };
  } catch (error) {
    console.error("Paystack initialization error:", error);
    throw error; // Re-throw for handling in your application
  }
};


export async function updateTransaction(customerId, transaction) {
  try {
     await client
      .patch(customerId) // ID of the customer to update
      .append('transactions', [{ _type: 'reference', _ref: transaction._id, _key: uuidv4()  }]) // Add transaction reference to the array
      .commit(); // Commit the changes
  } catch (error) {
    console.error('Error updating customer transactions:', error);
    throw error;
  }
}