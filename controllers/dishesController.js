// /src/controllers/dishesController.js

import { client } from "../config/sanityClient.js";

export const getAllDishes = async (req, res) => {
  try {
    const query = `*[_type == "dish"]`;
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

export const getDishById = async (req, res) => {
    try {
      const { id } = req.params;
      const query = `*[_type == "dish" && _id == $id][0]`;
      const dish = await client.fetch(query, { id });
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      return res.status(200).json(dish);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch dish details', error });
    }
  };