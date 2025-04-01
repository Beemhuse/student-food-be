import { client } from '../config/sanityClient.js';

import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const storage = multer.memoryStorage(); // Store file in memory before upload
const upload = multer({ storage });

// POST route to handle image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageAsset = await client.assets.upload('image', req.file.buffer, {
      contentType: req.file.mimetype,
      filename: req.file.originalname,
    });

    res.status(200).json({
      success: true,
      imageUrl: imageAsset.url, // Return the image URL
      assetId: imageAsset._id, // Return asset ID (optional)
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
