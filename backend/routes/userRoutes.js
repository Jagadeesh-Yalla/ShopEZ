const express = require("express");
const { 
  registerUser, 
  loginUser, 
  getAllUsers   // ✅ NEW
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// ✅ ADMIN - GET ALL USERS
router.get("/", protect, admin, getAllUsers);

module.exports = router;