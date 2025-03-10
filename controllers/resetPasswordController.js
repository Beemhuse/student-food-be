// /src/controllers/resetPasswordController.js
import { client } from '../config/sanityClient.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.query; // e.g. /api/reset-password?token=XYZ
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and newPassword are required' });
    }

    // Verify token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find user by ID from token
    const userId = payload.userId;
    const query = `*[_type == "user" && _id == $userId][0]`;
    const user = await client.fetch(query, { userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user document in Sanity
    const updatedUser = await client
      .patch(user._id)
      .set({ password: hashedPassword })
      .commit();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Reset password failed', error });
  }
};
