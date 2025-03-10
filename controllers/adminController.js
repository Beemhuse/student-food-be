// /src/controllers/adminController.js
import { client } from '../config/sanityClient.js';

export const getAllAdmins = async (req, res) => {
  try {
    const query = `*[_type == "admin"]`; // Adjust as needed
    const admins = await client.fetch(query);
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch admins', error });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const newAdmin = {
      _type: 'admin',
      // Fields from the request body
      name: req.body.name,
      // Add more fields as needed
    };

    const created = await client.create(newAdmin);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create admin', error });
  }
};
