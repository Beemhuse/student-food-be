// /src/controllers/loginController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { client } from '../config/sanityClient.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from Sanity
    const query = `*[_type == "customer" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT (optional)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // or any desired expiration
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
};
