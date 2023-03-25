const Cart = require("../models/cart.model");


// GET /foodCarts
const getAllFoodCarts = async (req, res) => {
  try {
    // Find all food carts
    let carts = await Cart.find({}).populate("category");
    // Return the food carts
      return res.status(200).json({
          message: "Food lists",
          data: carts,
      });
      
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          message: "Server issues"
      })
  }
};

// GET /foodCarts/:id
const getFoodCartById = async (req, res) => {
  try {
    // Find the food cart by ID
    let cart = await Cart.findById(req.params.id).populate("category");

    // If the food cart doesn't exist, return a 404 error
    if (!cart) {
        return res.status(404).json({
            message: 'Food not found',
        });
    }

    // Return the food cart
      return res.status(200).json({
          message: "sucessful",
          data: cart,
      });
    
  } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Issues"
    });
  }
};

// POST /foodCarts
const createFoodCart = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Create a new food cart
    const cart = new Cart({
      name,
      description,
      price,
    });

    // Save the new food cart
    await cart.save();

    // Return the new food cart
      return res.status(201).json({
          message: "Successful",
          data: cart,
      });

      
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          message: "Server Issues"
      });
  }
};

// PUT /foodCarts/:id
const updateFoodCartById = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Find the food cart by ID
    let cart = await Cart.findById(req.params.id);

    // If the food cart doesn't exist, return a 404 error
    if (!cart) {
        return res.status(404).json({
            message: 'Food not found'
        });
    }

    // Update the food cart
    cart.name = name;
    cart.description = description;
    cart.price = price;

    // Save the updated food cart
    await cart.save();

    // Return the updated food cart
      return res.status(200).json({
          message: "successful",
          data: cart,
      });
      
  } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Issues"
    });
  }
};

// DELETE /foodCarts/:id
const deleteFoodCart = async (req, res, next) => {
  try {
    // Find the food cart by ID and remove it
    let cart = await Cart.findByIdAndRemove(req.params.id);

    // If the food cart doesn't exist, return a 404 error
    if (!cart) {
        return res.status(404).json({
            message: 'Not found'
        });
    }

    // Return a success message
      return res.status(200).json({
          message: 'Deleted sucessful',
      });

  } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Issues"
    });
  }
};


module.exports = {
  getAllFoodCarts,
  getFoodCartById,
  createFoodCart,
  updateFoodCartById,
  deleteFoodCart
};
