// /src/config/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  // Example using Gmail SMTP; replace with your own service
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. "your_email@gmail.com"
    pass: process.env.EMAIL_PASS  // e.g. "your_email_password_or_app_password"
  }
});
