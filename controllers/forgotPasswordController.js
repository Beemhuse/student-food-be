// /src/controllers/forgotPasswordController.js
import jwt from 'jsonwebtoken';
import { transporter } from '../config/emailService.js';
import { client } from '../config/sanityClient.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const query = `*[_type == "customer" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Create a reset token (JWT) that expires soon
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // 15 minutes or whatever you prefer
    );

    // Optionally store the token in the user doc or a separate "resetToken" doc
    // For demonstration, we’ll skip storing it in Sanity and just rely on the JWT itself.
    // If you want to store, you'd do something like:
    // await client.patch(user._id).set({ resetToken }).commit();

    // Send email with reset link
    const resetLink = `http://localhost:3000/api/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click here to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });

    return res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    return res.status(500).json({ message: 'Forgot password failed', error });
  }
};
