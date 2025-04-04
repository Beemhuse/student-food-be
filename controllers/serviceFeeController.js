import { client } from "../config/sanityClient.js";
// Fetch all categories
export const getAllService = async (req, res) => {
  try {
    const query = `*[_type == "serviceFee"]{
      _id,
      location,
      fee,
    }`;
    const categories = await client.fetch(query);
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch Service Fee', error: error.message });
  }
};