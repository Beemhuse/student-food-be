import { client } from "../config/sanityClient.js";
import slugify from "slugify";

// Fetch all categories
export const getAllCategories = async (req, res) => {
  try {
    const query = `*[_type == "category"]{
      _id,
      title,
      description,
      slug
    }`;
    const categories = await client.fetch(query);
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const newCategory = {
      _type: "category",
      title,
      slug: { current: slug }, // Sanity requires slug as an object
      description: description || "",
    };

    const createdCategory = await client.create(newCategory);

    return res.status(201).json({ message: "Category created successfully", category: createdCategory });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

// Update an existing category
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Get categoryId from the URL
    const { title, description } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    // Fetch existing category
    const category = await client.getDocument(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Generate new slug if title is updated
    const slug = title ? slugify(title, { lower: true, strict: true }) : category.slug.current;

    const updatedCategory = {
      ...category,
      title: title || category.title,
      description: description || category.description,
      slug: { current: slug }, // Only update the slug if the title changes
    };

    // Update category in Sanity
    const result = await client.patch(categoryId).set(updatedCategory).commit();

    return res.status(200).json({ message: "Category updated successfully", category: result });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Get categoryId from the URL

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    // Fetch the category to check if it exists
    const category = await client.getDocument(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category from Sanity
    await client.delete(categoryId);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};
