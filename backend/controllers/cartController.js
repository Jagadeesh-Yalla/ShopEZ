const Cart = require("../models/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER CART
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id })
      .populate("product", "name price image");

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CART ITEM
const deleteCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, deleteCartItem };