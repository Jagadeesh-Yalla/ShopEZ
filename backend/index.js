const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = 5000;

// Test route
app.get("/", (req, res) => {
  res.send("ShopEZ Backend is running 🚀");
});


const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
