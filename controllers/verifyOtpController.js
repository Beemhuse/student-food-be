import { client } from '../config/sanityClient.js';

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find user by email
    const query = `*[_type == "customer" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired (optional)
    const currentTime = new Date();
    if (user.otpExpiry && currentTime > new Date(user.otpExpiry)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP after successful verification
    await client
      .patch(user._id)
      .set({ otp: null, otpExpiry: null })
      .commit();

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'OTP verification failed', error });
  }
};