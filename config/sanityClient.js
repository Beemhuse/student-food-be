// /src/config/sanityClient.js
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // e.g. 'abcd1234'
  dataset: process.env.SANITY_DATASET, 
  apiVersion: "2024-01-01",  // e.g. 'production'
  token: process.env.SANITY_TOKEN,         // Only if you need write privileges
  useCdn: false                            // `false` if you want to ensure fresh data
});
