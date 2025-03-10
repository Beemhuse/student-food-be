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

    // Create a 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await client.patch(user._id)
      .set({
        otp: otpCode,
        otpExpiry: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      })
      .commit();

    // Define mail options for sending the OTP code
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP code is: ${otpCode}. It will expire in 15 minutes.`,
      html: `<p>Your OTP code is: <strong>${otpCode}</strong></p><p>This code will expire in 15 minutes.</p>`
    };

    // Send the email with the OTP code
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password reset OTP sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        message: 'Email authentication failed. Please check your email service configuration.',
        error: error.message
      });
    }
    return res.status(500).json({ message: 'Forgot password failed', error: error.message });
  }
};
