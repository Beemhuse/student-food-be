import { client } from "../config/sanityClient.js";

export const getAllCategories = async (req, res) => {
  try {
    const query = `*[_type == "category"]{
      _id,
      title,
      description
    }`;
    const categories = await client.fetch(query);
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};
