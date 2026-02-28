const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,   // ✅ NEW
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// ✅ CREATE ORDER
router.post("/", protect, createOrder);

// ✅ GET USER ORDERS
router.get("/myorders", protect, getMyOrders);

// ✅ ADMIN - GET ALL ORDERS
router.get("/", protect, admin, getAllOrders);

router.put("/:id/status", updateOrderStatus);

module.exports = router;