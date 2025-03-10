import { client } from "../config/sanityClient.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const newContactMessage = {
      _type: 'contact',
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    const createdMessage = await client.create(newContactMessage);
    return res.status(201).json({ message: 'Contact message created successfully', data: createdMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create contact message', error });
  }
};
