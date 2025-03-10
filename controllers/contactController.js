// import { client } from "../config/sanityClient.js";

// export const createContactMessage = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ message: 'Name, email, and message are required' });
//     }

//     const newContactMessage = {
//       _type: 'contact',
//       name,
//       email,
//       message,
//       createdAt: new Date().toISOString()
//     };

//     const createdMessage = await client.create(newContactMessage);
//     return res.status(201).json({ message: 'Contact message created successfully', data: createdMessage });
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to create contact message', error });
//   }
// };

import { client } from "../config/sanityClient.js";
import { transporter } from "../config/emailService.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Create the contact message document in Sanity
    const newContactMessage = {
      _type: 'contact',
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    const createdMessage = await client.create(newContactMessage);

    // Build email options
    const mailOptions = {
      to: email, // Recipient email from env
      from: process.env.NEXT_PRIVATE_EMAIL, // Sender's email from the form
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    // Send the email (using callback style)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(201).json({ message: 'Contact message created successfully', data: createdMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create contact message', error });
  }
};
