// /src/controllers/signupController.js
import { client } from '../config/sanityClient.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const query = `*[_type == "user" && email == $email][0]`;
    const existingUser = await client.fetch(query, { email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Sanity
    const newUser = {
      _type: 'user',
      email,
      password: hashedPassword
    };

    const createdUser = await client.create(newUser);

    return res.status(201).json({
      message: 'User created successfully',
      userId: createdUser._id
    });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed', error });
  }
};
