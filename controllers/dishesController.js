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
    const newDish = {
      _type: 'dish',
      name: req.body.name,
      price: req.body.price,
      // add other fields as needed
    };
    const createdDish = await client.create(newDish);
    return res.status(201).json(createdDish);
  } catch (error) {
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
  