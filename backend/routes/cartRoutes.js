const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  deleteCartItem,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, addToCart)
  .get(protect, getCart);

router.route("/:id")
  .delete(protect, deleteCartItem);

module.exports = router;