import { client } from '../config/sanityClient.js';
import bcrypt from 'bcrypt';

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate required fields
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and newPassword are required' });
    }

    // Find user by email
    const query = `*[_type == "customer" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user document in Sanity
    await client
      .patch(user._id)
      .set({ password: hashedPassword })
      .commit();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Reset password failed', error });
  }
};