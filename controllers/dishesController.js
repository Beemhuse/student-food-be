// /src/controllers/dishesController.js

import { client } from "../config/sanityClient.js";

export const getAllDishes = async (req, res) => {
  try {
    const query = `*[_type == "dish"]{
        _id,
        _createdAt,
        status,
        title,
        description,
        price,
        sortOrder,
        slug {
          current,
          _type
        },
        "imageUrl":image.asset->url,
        category->{
          _id,
          title,       // Adjust these fields as defined in your category schema.
        }
      }`;
          const dishes = await client.fetch(query);
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch dishes', error });
  }
};

export const createDish = async (req, res) => {
  try {
    const { title, description, price, category, status, sortOrder, image } = req.body;

    // Validation: Ensure required fields are provided
    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new dish
    const newDish = {
      _type: 'dish',
      title,
      description,
      price: Number(price),
      category: { _type: 'reference', _ref: category },
      status: status ?? true, // Default status to true
      sortOrder: sortOrder ?? 1, // Default sortOrder to 1
      image: { asset: { _ref: image } }, // Image should be a valid Sanity asset reference
    };

    const createdDish = await client.create(newDish);
    
    return res.status(201).json({
      message: 'Dish created successfully',
      dish: createdDish,
    });
  } catch (error) {
    console.error("Error creating dish:", error);
    return res.status(500).json({ message: 'Failed to create dish', error });
  }
};
export const getDishBySlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const query = `*[_type == "dish" && slug.current == $slug][0]{
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        status,
        title,
        description,
        price,
        sortOrder,
        slug {
          current,
          _type
        },
        "imageUrl":image.asset->url,

        category->{
          _id,
          title,
          description,
          _createdAt,
          _updatedAt,
          _rev
        }
      }`;
      const dish = await client.fetch(query, { slug });
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      return res.status(200).json(dish);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch dish details', error });
    }
  };
  